import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/shared/Colors";

export default function Button({ title ,onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        width: "100%",
        borderRadius: 15,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: Colors.BLACK,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
