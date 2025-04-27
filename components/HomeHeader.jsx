import { View, Text, Image } from "react-native";
import React, { useRef, useEffect, useContext } from "react";
import LottieView from "lottie-react-native";
import { UserContext } from "./../context/UserContext"; // import your UserContext

export default function HomeHeader() {
  const { user } = useContext(UserContext); // Access user if you want dynamic behavior

  const animationRef = useRef(null);

  useEffect(() => {
    // Play the animation only once when HomeHeader mounts
    animationRef.current?.play();
  }, []);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <LottieView
        ref={animationRef}
        source={require("./../assets/images/user.json")}
        autoPlay={false}
        loop={false}
        speed={0.3}
        resizeMode="cover"
        style={{
          width: 60,
          height: 60,
        }}
      />
      <Text style={{ fontSize: 23, marginLeft: 10,fontWeight:'bold' , textAlign:"center"}}>
        {user?.name ? ` 👋🏻 Hi, ${user.name}` : "Welcome!"}
      </Text>
    </View>
  );
}
