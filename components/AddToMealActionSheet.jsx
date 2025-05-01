import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import Colors from '../shared/Colors';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Coffee02Icon, Moon02Icon, Sun02Icon } from '@hugeicons/core-free-icons';
import Button from './shared/Button';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { UserContext } from "../context/UserContext";
import DateSelectionCard from './DateSelectionCard';

export default function AddToMealActionSheet({resipeIntro,hideActionSheet}) {
    const [dateList,setDateList]=useState([]);
    const [selectedDate,SetSelectedDate] = useState();
    const [selectedMeal,setSelectedMeal] = useState();
    const CreateMealPlan = useMutation(api.MealPlan.CreateMealPLan)
    const {user} =useContext(UserContext)

    const mealOptions=[
        {
            title :'Breakfast',
            icon:Coffee02Icon
        },
        {
            title :'Lunch',
            icon:Sun02Icon
        },
        {
            title :'Dinner',
            icon:Moon02Icon
        },
    ]
    
    useEffect(()=>{
        GenerateDates();
    },[]);
    const GenerateDates=()=>{
        const result=[];
        for(let i=0;i<4;i++)
        {
            const nextDate=moment().add(i,'days').format('DD/MM/YYYY')
            result.push(nextDate);
        }
        console.log(result)
        setDateList(result);
    }
    const handleAddToMealPlan = async () => {
        if (!selectedDate || !selectedMeal) {
          alert('Please select both a date and a meal type.');
          return;
        }
      
        const result=await CreateMealPlan( {
            recipeId: resipeIntro?._id,
            date: selectedDate,
            mealType: selectedMeal,
            uid : user?._id

          });
        console.log('Added to meal plan:', result);
        Alert.alert('Success', `${resipeIntro?.name} added to your meal plan.`);
        hideActionSheet(); // close the sheet
      };
      
    return (
    <View style={{
        padding : 20
    }}>
      <Text style={{
        fontSize : 20,
        fontWeight : 'bold',
        textAlign : 'center'
      }}>Add to Meal</Text>


      <DateSelectionCard SetSelectedDate={SetSelectedDate}/>
        <Text style={{
        fontSize : 18,
        fontWeight : 'bold',
        marginTop : 15
      }}>Select Date</Text>
      <FlatList 
        data={dateList}
        numColumns={4}
        renderItem={({item,index})=>(
            <TouchableOpacity 
                onPress={()=> SetSelectedDate(item)}
            style={{
                flex : 1,
                display : 'flex',
                alignItems : 'center',
                padding : 5,
                borderWidth:0.5,
                borderRadius :10,
                margin:5,
                backgroundColor:selectedDate==item?Colors.PRIMARY : Colors.WHITE,
                borderColor:selectedDate==item?Colors.PRIMARY : Colors.GREY,

            }}>
                <Text style={{
                    fontSize : 18,
                    fontWeight : '500'
                }}>{moment(item,'DD/MM/YYYY').format('ddd')}</Text>
                <Text style={{
                    fontSize : 20,
                    fontWeight : 'bold'
                }}>{moment(item,'DD/MM/YYYY').format('DD')}</Text>
                <Text style={{
                    fontSize : 16,
                }}>{moment(item,'DD/MM/YYYY').format('MMM')}</Text>
            </TouchableOpacity>

        )}
      >

      </FlatList>
        
        <Text style={{
            fontSize : 20,
            fontWeight : 'bold',
            marginTop: 15
        }}>Select Meal</Text>
      <FlatList
                data={mealOptions}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => setSelectedMeal(item.title)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            padding: 7,
                            borderWidth: 1,
                            borderRadius: 10,
                            margin: 5,
                            backgroundColor: selectedMeal === item.title ? Colors.SECONDARY : Colors.WHITE,
                        }}
                    >
                        <HugeiconsIcon icon={item.icon} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
            />

     <View style={{
        marginTop : 15
     }}>
     <Button title={'Add to Meal Plan'} onPress={handleAddToMealPlan} />

     <TouchableOpacity 
     onPress={()=>hideActionSheet()}
     style={{
        padding : 15
     }}>
     <Text style={{ 
        fontSize: 20,
        textAlign : 'center'
          }}>Cancel</Text>
     </TouchableOpacity>
     </View>
    </View>
  )
}