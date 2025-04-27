import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../shared/Colors'
import Prompt from '../shared/Prompt'
import LoadingDialog from './LoadingDialog'
import { GenerateRecipeOptionsAiModel } from '../service/AiModel'

export default function RecipeOptionList({recipeOption}) {
    const [loading,setLoading]=useState(false);

    const onRecipeOptionSelect=async(recipe)=>{
        setLoading(true)
        const PROMPT = "RecipeName: "+recipe?.recipeName+" Description: "+recipe?.description+Prompt.GENERATE_COMPLETE_RECIPE_PROMPT
        console.log(PROMPT)
        try {
            
            const result = await GenerateRecipeOptionsAiModel(PROMPT)
        
        const extractJSON=result.choices[0].message.content;
          const JSONContent=JSON.parse(extractJSON.replace('```json','').replace('```',''));
          console.log(JSONContent);
          setLoading(false)
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