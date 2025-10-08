import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { MembersAPI } from "../lib/api";

export default function Members() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MembersAPI.getByYear("2565")
      .then((data) => setMembers(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
        สมาชิกชั้นปี 2565
      </Text>
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: "#eee",
            }}
          >
            <Text style={{ fontWeight: "600" }}>{item.name_th}</Text>
            <Text style={{ color: "#757575" }}>{item.student_id}</Text>
          </View>
        )}
      />
    </View>
  );
}
