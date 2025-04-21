import { Dimensions, Image, Text, View } from "react-native";
import Colors from "../shared/Colors";
import Button from "../components/shared/Button";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../context/UserContext";
import { api } from "../convex/_generated/api";

import { auth } from "../service/FirebaseConfig";
import { useContext, useEffect } from "react";
import { useConvex } from "convex/react";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();
  useEffect(()=>{
    const unsubscribe=  onAuthStateChanged(auth, async (userInfo) => {
      console.log(userInfo?.email);
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });
      
      console.log(userData);
      setUser(userData)
    });
    return ()=>unsubscribe();
  },[])

 
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
          padding: 20,
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

        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            fontSize: 20,
            color: Colors.WHITE,
            marginTop: 15,
            opacity: 0.8,
          }}
        >
          Craft delicious , Healthy ,mean plans tailored just for you.Achieve
          your goal with ease!
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 25,
          padding: 20,
        }}
      >
        <Button
          title={"Get Started"}
          onPress={() => router.push("/auth/SignIn")}
        />
      </View>
    </View>
  );
}
