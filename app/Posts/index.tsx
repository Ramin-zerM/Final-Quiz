import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { PostsAPI } from "../../lib/api";
import { useRouter } from "expo-router";

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const load = async () => {
    setLoading(true);
    try {
      const data = await PostsAPI.list();
      setPosts(data);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string, liked: boolean) => {
    await (liked ? PostsAPI.unlike(postId) : PostsAPI.like(postId));
    load();
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 30 }} />;

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 14, borderBottomWidth: 1, borderColor: "#eee" }}>
          <Text style={{ fontWeight: "700" }}>{item.author}</Text>
          <Text style={{ marginVertical: 8 }}>{item.content}</Text>

          <TouchableOpacity onPress={() => handleLike(item.id, item.liked)}>
            <Text style={{ color: "#2563EB" }}>
              {item.liked ? "❤️ Unlike" : "🤍 Like"} ({item.likes})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push(`/Posts/${item.id}`)}>
            <Text style={{ color: "#757575", marginTop: 5 }}>💬 View comments</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
