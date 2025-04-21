// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Platform } from "react-native";
import {getAuth ,getReactNativePersistence,initializeAuth} from "firebase/auth"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-diet-planner-8c6ca.firebaseapp.com",
  projectId: "ai-diet-planner-8c6ca",
  storageBucket: "ai-diet-planner-8c6ca.firebasestorage.app",
  messagingSenderId: "602413074823",
  appId: "1:602413074823:web:c1f56d03ebc2ea07896b22",
  measurementId: "G-FGM0ZNWMLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = Platform.OS =='web'?getAuth(app):initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})