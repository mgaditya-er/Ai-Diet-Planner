import { View, Text, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CalendarAdd01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import Colors from '../shared/Colors';
import Button from '../components/shared/Button'
import {useConvex} from 'convex/react'
import {api} from '../convex/_generated/api'
import moment from 'moment'
import { UserContext } from '../context/UserContext';
import MealPlanCard from './MealPlanCard';
import { RefreshDataContext } from '../context/RefreshDataContext';
export default function TodaysMealPlan() {
    const [mealPLan,setMealPlan]=useState();
    // const {refreshData,setRefreshData}= useContext(RefreshDataContext)
    
    const convex=useConvex();
    const {user}=useContext(UserContext);
    
    useEffect(()=>{
      user && GetTodaysMealPlan();
    },[user])
    const GetTodaysMealPlan=async ()=>{
      const result=await convex.query(api.MealPlan.GetTodaysMealPlan,{
        date:moment().format('DD/MM/YYYY'),
        uid:user?._id
      });
      console.log(result);
      setMealPlan(result);
    }
  return (
    <View style={{
        marginTop:15,

    }}> 
      <Text style={{
        fontSize:20,
        fontWeight : 'bold'
      }}>Today's Meal Plan</Text>

      {!mealPLan ?
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
            :
            <View>
              <FlatList
              data={mealPLan}
              renderItem={({item})=>(
                <MealPlanCard mealPlanInfo={item} />
              )}
              />
            </View>

      }
    </View>
  )
}