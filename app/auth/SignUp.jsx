import { View, Text, Image, Alert } from "react-native";
import React, { useContext } from "react";
import Colors from "../../shared/Colors";
import Custom from "../../components/shared/Custom";
import Button from "../../components/shared/Button";
import { Link } from "expo-router";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/FirebaseConfig";
import {api} from '../../convex/_generated/api'
import {UserContext} from '../../context/UserContext'
import {useMutation} from 'convex/react'
export default function SignUp() {

  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const createNewUser = useMutation(api.Users.CreateNewUser)
  const {user,setUser} = useContext(UserContext)
const onSignUp=()=>{
  if(!name || !email || !password)
  {
    Alert.alert('Missing Fields','Enter all field values')
    return;
  }


createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user)
    if(user)
    {
      const result = await createNewUser({
        name:name,
        email:email
      });

      console.log(result);
      setUser(result);
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
    // ..
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
          fontSize: 30,
          fontWeight: "bold",
        }}
      >Create New Account
      </Text>
      <View
        style={{
          marginTop: 20,
          width: "100%",
        }}
      >
        <Custom placeholder="Full Name" onChangeText={setName}/>
        <Custom placeholder="Email" onChangeText={setEmail}/>

        <Custom placeholder="Password" password={true} onChangeText={setPassword}/>
      </View>

      <View
        style={{
          marginTop: 15,
          width: "100%",
        }}
      >
        <Button title={"Create Account"} onPress={()=> onSignUp()}/>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Text
            style={{
              fontSize: 14, 
            }}
          >
            Already have an account ?  
          </Text>
          <Link href={"/auth/SignIn"}>
            <Text
              style={{
                fontSize: 16,
                marginTop: 15,
                marginLeft: 5,
                fontWeight: "bold",
                color: Colors.BLUE,
              }}
            >
                Sign In here
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

