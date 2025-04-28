import { View, Text, Platform, Image, StyleSheet } from "react-native";
import React from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Dumbbell02Icon, Fire02Icon, PlusSignSquareIcon, ServingFoodIcon, TimeQuarter02Icon } from "@hugeicons/core-free-icons";
import Colors from "../shared/Colors";

export default function RecipeIntro({ resipeIntro }) {
  const recipeJSON = resipeIntro?.jsonData;
  return (
    <View
      style={{
        
      }}
    >
      <View style={{}}>
        <Image
          source={{ uri: resipeIntro?.imageUrl }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 15,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex:1
        }}
      >
        <View style={{

          width : '80%'
        }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            
          }}
        >
          {resipeIntro?.recipeName}
        </Text>
        </View>
        <HugeiconsIcon
          icon={PlusSignSquareIcon}
          size={40}
          color="#61b105"
          strokeWidth={1.5}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            marginTop: 5,
            color: Colors.GREY,
            lineHeight: 25,
          }}
        >
          {recipeJSON?.description}
        </Text>
      </View>

      <View style={{
            display: "flex",
            flexDirection : 'row',
            justifyContent : 'space-between',
            gap : 10
      }}>
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Fire02Icon} color={Colors.PRIMARY} size={30} />

          <Text style={styles.subText}>Calories</Text>
          <Text style={styles.counts}>{recipeJSON?.calories}</Text>
        </View>
        {/* <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={Dumbbell02Icon} color={Colors.PRIMARY} size={30} />

          <Text style={styles.subText}>Proteins</Text>
          <Text style={styles.counts}>{recipeJSON?.calories}</Text>
        </View> */}
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={TimeQuarter02Icon} color={Colors.PRIMARY} size={30} />

          <Text style={styles.subText}>Time</Text>
          <Text style={styles.counts}>{recipeJSON?.cookTime}</Text>
        </View>
        <View style={styles.propertiesContainer}>
          <HugeiconsIcon icon={ServingFoodIcon} color={Colors.PRIMARY} size={30} />

          <Text style={styles.subText}>Serve</Text>
          <Text style={styles.counts}>{recipeJSON?.serveTo}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBg: {
    padding: 5,
    backgroundColor: Colors.SECONDARY,
  },
  propertiesContainer: {
    marginTop : 5,
    display: "flex",
    // flexDirection : 'column',
    alignItems: "center",
    backgroundColor : '#daeeda',
    padding : 5,
    borderRadius : 10,
    flex: 1
  },
  subText: {
    fontSize: 16,
  },
  counts: {
    fontSize: 20,
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
