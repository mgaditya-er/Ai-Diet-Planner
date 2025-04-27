import { View, Text } from "react-native";
import React, { useContext } from "react";
import moment from "moment";
import Colors from "../shared/Colors";
import { UserContext } from "../context/UserContext";
export default function TodayProgress() {
  const {user} =useContext(UserContext)
  return (
    <View
      style={{
        marginTop: 15,
        padding: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Today's Goal
        </Text>
        <Text
          style={{
            fontSize: 18,
          }}
        >
          {moment().format("MMM DD, yyyy")}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 10,
          color: Colors.PRIMARY,
        }}
      >
        155/{user?.calories} kcal
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          marginTop: 2,
          color: Colors.GREY,
        }}
      >
        You'r doing Great!
      </Text>

      <View style={{
        backgroundColor : Colors.GREY,
        height : 10,
        borderRadius : 99,
        marginTop : 15,
        opacity :0.9
      }} >
        <View style={{
        backgroundColor : Colors.PRIMARY,
        height : 10,
        borderRadius : 99,
        width : '60%',
        
      }}></View>
      </View>

      <View style={{
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginTop : 5
      }} >
        <Text>Calories Consumes</Text>
        <Text>keep it up! 🔥</Text>
      </View>
    </View>
  );
}
