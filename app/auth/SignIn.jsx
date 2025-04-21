import { View, Text, Image ,Alert} from "react-native";
import React, { useContext } from "react";
import Colors from "../../shared/Colors";
import Custom from "../../components/shared/Custom";
import Button from "../../components/shared/Button";
import { Link } from "expo-router";
import { useState } from "react";
import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../../service/FirebaseConfig";
import {useConvex} from 'convex/react'
import {api} from '../../convex/_generated/api'
import { UserContext } from "../../context/UserContext";

export default function SignIn() {



  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const convex=useConvex();
  const {user,setUser} = useContext(UserContext)

const onSignIn=()=>{
  if(!email || !password)
  {
    Alert.alert('Missing Fields','Enter all field values')
    return;
  }


  signInWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userData=await convex.query(api.Users.GetUser,{
        email:email
    })
    console.log(userData);
    setUser(userData);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    Alert.alert('Incorrect Email and password','Please enter Valid email and passwords')
  });
}

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Image
        source={require("../../assets/images/logo1.png")}
        style={{
          width: 150,
          height: 150,
          marginTop: 60,
        }}
      />
      <Text
        style={{
          fontSize: 35,
          fontWeight: "bold",
        }}
      >
        Welcome Back
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Custom placeholder="Email" onChangeText={setEmail}/>
        <Custom placeholder="Password" password={true} onChangeText={setPassword}/>
      </View>

      <View
        style={{
          marginTop: 15,
          width: "100%",
        }}
      >
        <Button title={"Sign In"} onPress={()=> onSignIn()}/>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 14, 
            }}
          >
            Don't have an account ?
          </Text>
          <Link href={"/auth/SignUp"}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 15,
                fontWeight: "bold",
                color: Colors.BLUE,
              }}
            >
              Create New Account
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
