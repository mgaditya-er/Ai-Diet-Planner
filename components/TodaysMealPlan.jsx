import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { CalendarAdd01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Colors from '../shared/Colors';
import Button from '../components/shared/Button'
export default function TodaysMealPlan() {
    const [mealPLan,setMealPlan]=useState();

  return (
    <View style={{
        marginTop:15,

    }}> 
      <Text style={{
        fontSize:20,
        fontWeight : 'bold'
      }}>Today's Meal Plan</Text>

      {!mealPLan &&
            <View style={{
                display : 'flex',
                alignItems : 'center',
                padding : 20,
                backgroundColor : Colors.WHITE,
                marginTop:10,
                borderRadius : 10


            }}>
                <HugeiconsIcon icon={CalendarAdd01Icon} size={40}/>
            <Text style={{
                fontSize : 14,
                color : Colors.GREY,
                marginBottom : 10
                
            }} >You Don't have any meal plan for Today</Text>

            <Button title={'Create New Meal Plan'}/>

            </View>


      }
    </View>
  )
}