import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../shared/Colors";

export default function RecipeIngredients({ resipeIntro }) {
  const ingredients = resipeIntro?.jsonData?.ingredients;
  console.log(ingredients);

  return (
    <View style={{ marginTop: 15, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Ingredients
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "gray" }}>
          {ingredients?.length} Items
        </Text>
      </View>

      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              marginBottom: 15,
              flexDirection: "row",
              alignItems: "flex-start", // Important
              justifyContent: "space-between",
              flexWrap: "wrap", // Important for wrapping
            }}
          >
            {/* Icon + Ingredient */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flex: 1, // Important to allow taking full width
                flexWrap: "wrap",
                marginRight: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  padding: 5,
                  backgroundColor: "#daeeda",
                  borderRadius: 99,
                  marginRight: 8,
                }}
              >
                {item?.icon}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  flexShrink: 1, // Allow shrinking
                  flexWrap: "wrap",
                }}
              >
                {item?.ingredient}
              </Text>
            </View>

            {/* Quantity */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: "#555",
                textAlign: "right",
                flexShrink: 1,
                maxWidth: "40%", // Prevent too wide
              }}
            >
              {item?.quantity}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
