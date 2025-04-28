import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import Colors from '../shared/Colors'
import Prompt from '../shared/Prompt'
import LoadingDialog from './LoadingDialog'
import { GenerateRecipeImage, GenerateRecipeOptionsAiModel } from '../service/AiModel'
import {useMutation} from 'convex/react'
import {api} from './../convex/_generated/api'
import {UserContext} from './../context/UserContext'
import { useRouter } from 'expo-router'
export default function RecipeOptionList({recipeOption}) {
    const [loading,setLoading]=useState(false);
    const CreateRecipe=useMutation(api.Recipes.CreateRecipe);
    const {user}=useContext(UserContext);
    const router = useRouter();
    const onRecipeOptionSelect=async(recipe)=>{
        setLoading(true)
        const PROMPT = "RecipeName: "+recipe?.recipeName+" Description: "+recipe?.description+Prompt.GENERATE_COMPLETE_RECIPE_PROMPT
        console.log(PROMPT)
        try {
            
                const result = await GenerateRecipeOptionsAiModel(PROMPT)

                const extractJSON=result.choices[0].message.content;
                const JSONContent=JSON.parse(extractJSON.replace('```json','').replace('```',''));
                console.log(JSONContent);
                const aiImageResp = await GenerateRecipeImage(JSONContent?.imagePrompt)
                console.log(aiImageResp?.data?.image);
                const saveRecipeResult = await CreateRecipe({
                  jsonData : JSONContent,
                  imageUrl : aiImageResp?.data?.image,
                  recipeName : JSONContent?.recipeName,
                  uid: user?._id
                })
                console.log(saveRecipeResult)
                setLoading(false)
                router.push({
                  pathname: '/recipe-detail',
                  params: { recipeId: saveRecipeResult }
                });
            } catch (error) {
                setLoading(false)
                console.log(error)
        }
          
    }

  return (
    <View style={{
        marginTop: 20
    }} >
      <Text style={{
        fontSize : 20,
        fontWeight : 'bold'
    }}>Select Recipe</Text>
    <View>
        {recipeOption?.map((item,index)=>(
             <TouchableOpacity
             onPress={()=>onRecipeOptionSelect(item)}
             key={index} style={{
                padding : 15,
                borderWidth : 0.2,
                borderRadius : 15,
                marginTop : 15
            }}>
                <Text style={{
                    fontSize: 16,
                    fontWeight : 'bold'
                }}>{item?.recipeName}</Text>
                <Text style={{
                    color : Colors.GREY
                }} >{item?.description}</Text>
            </TouchableOpacity>))}
    </View>
    <LoadingDialog loading={loading}/>
    </View>
  )
}