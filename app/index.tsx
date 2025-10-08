import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import AppButton from "../components/common/AppButton";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>CIS Student App</Text>
        <Text style={styles.subtitle}>Connect • Share • Learn</Text>
      </View>

      <View style={styles.buttonGroup}>
        <Link href="/Signin" asChild>
          <AppButton title="เข้าสู่ระบบ" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E3A8A",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 6,
  },
  buttonGroup: {
    width: "100%",
    marginTop: 20,
  },
});
