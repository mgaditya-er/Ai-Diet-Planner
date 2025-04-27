import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../shared/Colors';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'

export default function GenerateRecipeCard() {
  return (
     <LinearGradient
    // Button Linear Gradient
    colors={[Colors.BLACK ,Colors.GREY]} 
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{
        
        marginTop : 15,
        padding : 15,
        borderRadius : 10
    }}>
      <Text style={{
        fontSize : 22,
        fontWeight : 'bold',
        color : Colors.WHITE
      }} >Need Meal Ideas?✨</Text>
      <Text style={{
        color :Colors.WHITE,
        fontSize : 14,
        opacity : 0.8,
        marginTop : 5

        
      }}>Let Our AI generate personalized recipes just for you!</Text>

      <TouchableOpacity style={{
        padding : 12,
        backgroundColor :Colors.SECONDARY,
        marginTop : 10,
        borderRadius : 8,
        width : 200,
        display: 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        gap : 7

      }} >
        <Text style={{
            fontSize: 18,
            color : Colors.BLACK
        }}>Generate with AI</Text>
        <HugeiconsIcon icon={ArrowRight02Icon}  color={Colors.BLACK} />
      </TouchableOpacity>
    </LinearGradient>
  )
}