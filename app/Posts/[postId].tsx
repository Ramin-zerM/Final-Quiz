import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { PostsAPI } from "../../lib/api";

export default function PostDetail() {
  const { postId } = useLocalSearchParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await PostsAPI.list();
    if (Array.isArray(data)) {
      const found = data.find((p: any) => String(p.id) === String(postId));
      setPost(found);
    } else {
      setPost(null);
    }
    setLoading(false);
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    await PostsAPI.comment(String(postId), comment);
    setComment("");
    load();
  };

  useEffect(() => {
    load();
  }, [postId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{post.author}</Text>
      <Text style={{ marginVertical: 8 }}>{post.content}</Text>
      <Text style={{ marginVertical: 8, color: "#2563EB" }}>❤️ {post.likes}</Text>

      <FlatList
        data={post.comments || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 6, borderBottomWidth: 1, borderColor: "#eee" }}>
            <Text style={{ fontWeight: "600" }}>{item.author}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", marginTop: 12 }}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Write a comment..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 6,
            paddingHorizontal: 10,
          }}
        />
        <TouchableOpacity
          onPress={handleComment}
          style={{ marginLeft: 8, backgroundColor: "#2563EB", borderRadius: 6, padding: 10 }}
        >
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
