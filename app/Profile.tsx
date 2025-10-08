import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;
      try {
        const res = await fetch("https://cis.kku.ac.th/api/classroom/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": "YOUR_API_KEY_HERE", // 🔑 แทรก API Key จริง
            Accept: "application/json",
          },
        });
        const json = await res.json();
        setProfile(json.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ข้อมูลผู้ใช้</Text>
      <Text style={styles.label}>ชื่อ: {profile.firstname} {profile.lastname}</Text>
      <Text style={styles.label}>อีเมล: {profile.email}</Text>
      <Text style={styles.label}>รหัสนักศึกษา: {profile.education?.studentId}</Text>
      <Text style={styles.label}>สาขา: {profile.education?.major}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/Posts")}>
        <Text style={styles.buttonText}>ไปหน้าโพสต์</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.secondary]} onPress={() => router.push("/Members")}>
        <Text style={[styles.buttonText, styles.secondaryText]}>ดูรายชื่อสมาชิก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E3A8A",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  secondary: {
    backgroundColor: "#E5E7EB",
  },
  secondaryText: {
    color: "#1E3A8A",
  },
});
