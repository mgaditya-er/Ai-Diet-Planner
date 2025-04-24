import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Custom from "../../components/shared/Custom";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import  Button  from "../../components/shared/Button";
import {
  CircleIcon,
  Dumbbell01Icon,
  FemaleSymbolIcon,
  MaleSymbolIcon,
  PlusSignSquareIcon,
  WeightScaleIcon,
} from "@hugeicons/core-free-icons";

export default function Preferance() {
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
          <Custom placeholder={"e.g : 70"} label="Weight (kg)" />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Custom placeholder={"e.g : 5.9"} label="Height (ft)" />
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
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: Colors.GREY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon icon={MaleSymbolIcon} size={40} color="#4a90e2" />
            <Text style={{ marginTop: 8, fontWeight: "500" }}>Male</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: Colors.GREY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon icon={FemaleSymbolIcon} size={40} color="#E24ADD" />
            <Text style={{ marginTop: 8, fontWeight: "500" }}>Female</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              borderColor: Colors.GREY,
              borderRadius: 10,
              flex: 1,
              alignItems: "center",
            }}
          >
            <HugeiconsIcon
              icon={CircleIcon}
              size={40}
              color={Colors.GREY}
              strokeWidth={2}
            />
            <Text style={{ marginTop: 8, fontWeight: "500" }}>Other</Text>
          </View>
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
      <View style={styles.goalContainer}>
        <HugeiconsIcon icon={WeightScaleIcon} color="#d0021b"/>
        <View>
          <Text style={styles.goaltext}>Weight Loss</Text>
          <Text style={styles.goalsubtext}>
            Reduce body fat and get leaner
          </Text>
        </View>
      </View>
      <View style={styles.goalContainer}>
        <HugeiconsIcon icon={Dumbbell01Icon} color="#61B105" strokeWidth={1.5}/>
        <View>
          <Text style={styles.goaltext}>Muscle Gain</Text>
          <Text style={styles.goalsubtext}>
            Build Muscle and get Stronger
          </Text>
        </View>
      </View>
      <View style={styles.goalContainer}>
        <HugeiconsIcon icon={PlusSignSquareIcon} color="#4a90e2" strokeWidth={2}/>
        <View>
          <Text style={styles.goaltext}>Weight Gain</Text>
          <Text style={styles.goalsubtext}>
            Increase healthy body mass
          </Text>
        </View>
      </View>
      <View style={{
        marginTop : 10
      }}>
      <Button title={'Continue'}/>
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
    borderColor: Colors.GREY,
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
