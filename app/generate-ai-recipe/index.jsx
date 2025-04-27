import { View, Text, Platform, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../shared/Colors'
import Button from  '../../components/shared/Button'
import { GenerateRecipeOptionsAiModel } from '../../service/AiModel'
import Prompt from '../../shared/Prompt'
import RecipeOptionList from '../../components/RecipeOptionList'
export default function index() {

  const [input,setInput] = useState();
  const [loading,setLoading] = useState(false);
  const [recipeOption,setRecipeOption]=useState([]);

  const GenerateRecipeOptions= async()=>{
        setLoading(true);
        try {
          const PROMPT = input+Prompt.GENERATE_RECIPE_OPTION_PROMPT;
          const result= await GenerateRecipeOptionsAiModel(PROMPT);
          console.log(result.choices[0].message);
          const extractJSON=result.choices[0].message.content;
          const JSONContent=JSON.parse(extractJSON.replace('```json','').replace('```',''));
          console.log(JSONContent);
          setRecipeOption(JSONContent);
          setLoading(false);

        } catch (error) {
          setLoading(false);
          console.log(error);
        }

  }
  return (
    <View style={{
      paddingTop : Platform.OS == 'ios' ? 40: 30,
      padding:20
    }} >
      <Text style={{
        fontSize : 30,
        fontWeight : 'bold'
      }}> Ai Recipe Generator</Text>
      <Text style={{
        marginTop : 5,
        color : Colors.GREY,
        fontSize : 16
      }}> Generate Personalized recipes using AI</Text>
      <TextInput 
      style={styles.textArea}
      onChangeText={(value)=>setInput(value)}
      placeholder='Enter your indrdient or recipe name'></TextInput>
      <View style={{
        marginTop:25
      }}>
      <Button title={'Generate Recipe'}
      onPress={GenerateRecipeOptions}
      loading ={loading}
      />
      </View>

      {recipeOption?.length >0 && <RecipeOptionList recipeOption={recipeOption}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  textArea:{
    padding : 15,
    borderWidth: 1,
    borderRadius : 10,
    fontSize : 16,
    marginTop: 15,
    height :150,
    textAlignVertical : 'top',
    backgroundColor : Colors.WHITE


  }
})
