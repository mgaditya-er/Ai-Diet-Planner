import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useState } from "react";
import Custom from "../../components/shared/Custom";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import Button from "../../components/shared/Button";
import {
  CircleIcon,
  Dumbbell01Icon,
  FemaleSymbolIcon,
  MaleSymbolIcon,
  PlusSignSquareIcon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";
import {api} from '../../convex/_generated/api'
import { mutation } from "../../convex/_generated/server";
import {UserContext} from '../../context/UserContext'
import {useRouter} from 'expo-router'
import { useMutation } from 'convex/react';
import { CalculateCaloriesAI } from "../../service/AiModel";
import Prompt from "../../shared/Prompt"
export default function Preferance() {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState();
  const [goal, setGoal] = useState();
  const isSelected = (value) => gender === value;
  const isGoalSelected = (value) => goal === value;
  const router=useRouter();
  const genderOptions = [
    { label: "Male", icon: MaleSymbolIcon, color: "#4a90e2" },
    { label: "Female", icon: FemaleSymbolIcon, color: "#E24ADD" },
    { label: "Other", icon: CircleIcon, color: Colors.GREY },
  ];
  const goals = [
    {
      label: "Weight Loss",
      sub: "Reduce body fat and get leaner",
      icon: WeightScaleIcon,
      color: "#d0021b",
    },
    {
      label: "Muscle Gain",
      sub: "Build Muscle and get Stronger",
      icon: Dumbbell01Icon,
      color: "#61B105",
    },
    {
      label: "Weight Gain",
      sub: "Increase healthy body mass",
      icon: PlusSignSquareIcon,
      color: "#4a90e2",
    },
  ];
  const {user,setUser} =useContext(UserContext)
  const UpdateUserPref=useMutation(api.Users.UpdateUserPref)
  const OnContinue=async ()=>{
    if(!weight || !height || !gender || !goal)
    {
      Alert.alert('Fill all Details','Enter all the details to Continue');
      return;
    }
  const data={
      uid:user?._id,
      weight:weight,
      height:height,
      goal:goal,
      gender:gender
    }
// Calculate Calories and protien using AI
    const PROMPT = JSON.stringify(data)+Prompt.CALORIES_PROMPT
    console.log(PROMPT)
    const AIResult = await CalculateCaloriesAI(PROMPT);
    console.log(AIResult.choices[0].message.content)

    const AIResp=AIResult.choices[0].message.content;
    const JSONContent=JSON.parse(AIResp.replace('```json','').replace('```',''));
    console.log(JSONContent)
  
    const result = await UpdateUserPref({
      ...data,
      ...JSONContent
    })
    setUser(prev=>({
      ...prev,
      ...data
    }))
    console.log(result)
    router.replace('/(tabs)/Home')
  }
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 15,
        }}
      >
        Tell Us About Yourself
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 14,
          color: Colors.GREY,
        }}
      >
        This help us create your personalized meal plan.
      </Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Custom
            placeholder={"e.g : 70"}
            label="Weight (kg)"
            onChangeText={setWeight}
          />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Custom
            placeholder={"e.g : 5.9"}
            label="Height (ft)"
            onChangeText={setHeight}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "medium",
            fontSize: 18,
          }}
        >
          Gender
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 20,
          }}
        >
          {genderOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              onPress={() => {
                setGender(option.label);
              }}
              style={{
                borderWidth: 2,
                padding: 15,
                borderColor: isSelected(option.label) ? "green" : Colors.GREY,
                backgroundColor: isSelected(option.label)
                  ? "rgba(5, 168, 5, 0.12)"
                  : "white",
                borderRadius: 10,
                flex: 1,
                alignItems: "center",
              }}
            >
              <HugeiconsIcon
                icon={option.icon}
                size={40}
                color={option.color}
                strokeWidth={2}
              />
              <Text
                style={{
                  marginTop: 8,
                  fontWeight: "500",
                  color: isSelected(option.label) ? "green" : "black",
                }}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View
        style={{
          marginTop: 15,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "medium",
          }}
        >
          What's your Goal ?
        </Text>
      </View>
      <View >
        {goals.map((goal) => {
          const isgoalSelected = goal === goal.label;

          return (
            <TouchableOpacity
              key={goal.label}
              onPress={() => {
                setGoal(goal.label);
                console.log(goal.label);
              }}
              style={[
                styles.goalContainer,
                {
                  borderColor: isGoalSelected(goal.label)
                    ? "green"
                    : Colors.GREY,
                  backgroundColor: isGoalSelected(goal.label)
                    ? "rgba(5, 168, 5, 0.12)"
                    : "white",
                },
              ]}
            >
              <HugeiconsIcon
                icon={goal.icon}
                color={goal.color}
                strokeWidth={1.5}
                size={32}
                style={{ marginRight: 12 }}
              />
              <View>
                <Text
                  style={[
                    styles.goaltext,
                    { color: isgoalSelected ? "green" : "black" },
                  ]}
                >
                  {goal.label}
                </Text>
                <Text style={styles.goalsubtext}>{goal.sub}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Button title={"Continue"} onPress={OnContinue}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    // borderColor: Colors.GREY,
    marginTop: 10,
  },
  goaltext: {
    fontSize: 20,
    fontWeight: "bold",
  },
  goalsubtext: {
    color: Colors.GREY,
  },
});
