import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Clock01FreeIcons, FireIcon } from "@hugeicons/core-free-icons";
import Colors from "../shared/Colors";
import { Link } from "expo-router";

export default function RecipeCard({ recipe }) {
  const recipeJson = recipe?.jsonData;

  return (
    <Link href={'/recipe-detail?recipeId='+recipe?._id}  style={styles.card}>
      <View>
        <Image
          source={{ uri: recipe?.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.recipeName} >
          {recipe?.recipeName}
        </Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <HugeiconsIcon icon={FireIcon} color="red" size={16} />
            <Text style={styles.infoText}>{recipeJson?.calories} kcal</Text>
          </View>

          <View style={styles.infoItem}>
            <HugeiconsIcon icon={Clock01FreeIcons} color="red" size={16} />
            <Text style={styles.infoText}>{recipeJson?.cookTime} min</Text>
          </View>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderWidth: 0.3,
    borderColor: Colors.GREY,
    borderRadius: 15,
    padding: 8,
    backgroundColor: Colors.WHITE,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
    color: Colors.BLACK,
    overflow: "hidden",
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: Colors.GREY,
  },
});
