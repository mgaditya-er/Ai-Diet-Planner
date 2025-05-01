import { View, Text, Platform, Pressable, FlatList } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import {
  AnalyticsIcon,
  CookBookIcon,
  Login03Icon,
  ServingFoodIcon,
  WalletAdd02Icon,
} from "@hugeicons/core-free-icons";
import { UserContext } from "../../context/UserContext";
import Colors from "../../shared/Colors";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { useRouter } from "expo-router";
import {auth} from '../../service/FirebaseConfig'
import { signOut } from "firebase/auth";
const MenuOptions = [
  {
    title: "My Progress",
    icon: AnalyticsIcon,
    path: "/(tabs)/Progress",
  },
  {
    title: "Explore Recipes",
    icon: CookBookIcon,
    path: "/(tabs)/Meals",
  },
  {
    title: "Ai Recipes",
    icon: ServingFoodIcon,
    path: "/generate-ai-recipe",
  },
  {
    title: "Billing",
    icon: WalletAdd02Icon,
    path: "/billing",
  },
  {
    title: "Logout",
    icon: Login03Icon,
    path: "logout",
  },
];

export default function Profile() {
  const animationRef = useRef(null);
  const { user ,setUser} = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const handlePress = (path) => {
    if (path === "logout") {
      // Add logout logic if needed
      signOut(auth).then(()=>{
        console.log('SIGNOUT');
        setUser(null);
        router.replace('/')

      })
      return;


    
    }
    router.push(path);
  };

  return (
    <View
      style={{
        padding: 20,
        paddingTop: Platform?.OS == "ios" ? 40 : 25,
        flex: 1,
        
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold" }}>Profile</Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <LottieView
          ref={animationRef}
          source={require("./../../assets/images/user.json")}
          autoPlay={false}
          loop={false}
          speed={0.3}
          resizeMode="cover"
          style={{
            width: 100,
            height: 100,
          }}
        />
        <Text style={{ fontSize: 20, marginTop: 5, fontWeight: "bold" }}>
          {user?.name || "Welcome!"}
        </Text>
        <Text
          style={{ fontSize: 16, marginTop: 5, color: Colors.GREY, textAlign: "center" }}
        >
          {user?.email || "Welcome!"}
        </Text>
      </View>

      <FlatList
        data={MenuOptions}
        style={{ marginTop: 30 }}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item.path)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 15,
              marginBottom: 12,
              backgroundColor: Colors.WHITE,
              borderRadius: 12,
              elevation: 2,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,


              
            }}
          >
            <HugeiconsIcon icon={item.icon} size={28} color={Colors.PRIMARY} />
            <Text style={{ marginLeft: 15, fontSize: 20, fontWeight: "500" }}>
              {item.title}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
