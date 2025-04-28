import { View, Text, FlatList } from "react-native";
import React from "react";
import Colors from "../shared/Colors";
export default function RecipeSteps({ resipeIntro }) {
  const steps = resipeIntro?.jsonData?.steps;
  console.log(steps);

  return (
    <View style={{ marginTop: 15, flex: 1 }}>
      {/* Heading */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Directions
      </Text>

      {/* Steps List */}
      <FlatList
        data={steps}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item, index }) => (
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              padding : 10,
              alignItems : 'center',
              borderWidth : 0.3,
              borderRadius : 15
              
            }}
          >
            {/* Step Number */}
            <Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 8, 

                backgroundColor:Colors.SECONDARY,
                padding : 5,
                borderRadius : 99,
                paddingHorizontal : 10,
                alignItems : "center"

            }}>
              {index + 1}
            </Text>

            {/* Step Description */}
            <Text style={{ fontSize: 16, flex: 1 }}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
