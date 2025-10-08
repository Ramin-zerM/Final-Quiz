import React, { useState } from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppContainer from "../components/common/AppContainer";
import AppInput from "../components/common/AppInput";
import AppButton from "../components/common/AppButton";
import { AuthAPI } from "../lib/api";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignin = async () => {
    try {
      const data = await AuthAPI.login(email, password);
      if (data.token) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userEmail", email);
        Alert.alert("Login Success", "Welcome!");
        router.push("/Profile"); 
      } else {
        Alert.alert("Login Failed", "No token received");
      }
    } catch (err: any) {
      Alert.alert("Login Failed", err.message || "Invalid credentials");
    }
  };

  return (
    <AppContainer>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>
      <AppInput
        placeholder="อีเมลนักศึกษา"
        value={email}
        onChangeText={setEmail}
      />
      <AppInput
        placeholder="รหัสผ่าน"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <AppButton title="เข้าสู่ระบบ" onPress={handleSignin} />
      <AppButton title="กลับหน้าหลัก" type="secondary" onPress={() => router.push("/")} />
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E3A8A",
    textAlign: "center",
    marginBottom: 20,
  },
});
