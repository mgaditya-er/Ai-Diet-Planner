import { View, Text, Platform, FlatList } from 'react-native'
import React, { useRef } from 'react'
import RecipeIntro from '../../components/RecipeIntro'
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Recipeingredients from '../../components/Recipeingredients';
import RecipeSteps from '../../components/RecipeSteps';
import Button from '../../components/shared/Button';
import ActionSheet from 'react-native-actions-sheet';
import AddToMealActionSheet from '../../components/AddToMealActionSheet';
export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams();
  console.log('Received recipeId:', recipeId);  // Now it should print correctly!
  const resipeDetail = useQuery(api.Recipes.GetRecipeById,{
    id:recipeId == undefined || recipeId
  });
  const actionSheetRef = useRef(null);
  return (
    <FlatList 
    data={[]}
    renderItem={()=>null}
    ListHeaderComponent={
    <View style={{
        padding: 20,
        paddingTop: Platform.OS == "ios" ? 40 : 30,
    }}>
      <RecipeIntro resipeIntro={resipeDetail} />
      <Recipeingredients resipeIntro={resipeDetail}/>
      <RecipeSteps resipeIntro={resipeDetail}/>
      <View style={{
        marginTop :10
      }}>
      <Button title={'Add to Meal'} onPress={()=>actionSheetRef.current.show()}/>
      </View>

      <ActionSheet ref={actionSheetRef}  containerStyle={{
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden', // Prevent children from spilling over rounded corners
  }}>
        
        <AddToMealActionSheet 
        resipeIntro={resipeDetail} 
        hideActionSheet={()=> actionSheetRef.current?.hide()}

        />
      </ActionSheet>

    </View>
    }
    >
    </FlatList>
  )
}
