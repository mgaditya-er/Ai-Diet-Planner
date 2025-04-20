import { Dimensions, Image, Text, View } from "react-native";
import Colors from "../shared/Colors";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Image
        source={require("../assets/images/landing.jpg")}
        style={{
          width: "100%",
          height: Dimensions.get("screen").height,
        }}
      />

      <View
        style={{
          position: "absolute",
          height: Dimensions.get("screen").height,
          backgroundColor: "#0707075e",
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/images/logo1.png")}
          style={{
            width: 150,
            height: 150,
            marginTop: 100,
          }}
        />
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: Colors.WHITE,
          }}
        >
          Ai Diet Planner
        </Text>

        <Text style={{
          textAlign :'center',
          marginHorizontal : 20,
          fontSize : 20,
          color : Colors.WHITE,
          marginTop : 15,
          opacity :0.8
        }}>Craft delicious , Healthy ,mean plans tailored just for you.Achieve your goal with ease!
</Text>
      </View>
    </View>
  );
}
