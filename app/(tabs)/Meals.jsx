import { View, Text, Platform, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeCard from '../../components/RecipeCard';

export default function Meals() {
  const recipeList = useQuery(api.Recipes.GetAllRecipes);
  const isLoading = !recipeList;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5BA701" />
        <Text style={{ marginTop: 10 }}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: Platform.OS === 'ios' ? 40 : 30 }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 15 }}>
        Discover Recipes 🥗
      </Text>

      <GenerateRecipeCard />

      <FlatList
        data={recipeList}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
    </View>
  );
}
