// import {OpenAI} from "openai"

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
 
// })


//  export const CalculateCaloriesAI=async(PROMPT)=> await openai.chat.completions.create({
//     model: "google/gemini-2.0-flash-lite-001",
//     messages: [
//       { role: "user", content:PROMPT }
//     ],
//   })

// // //   console.log(CalculateCaloriesAI.choices[0].message)
// service/AiModel.jsx
import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;
const AIMODELNAME ="google/gemini-2.0-flash-lite-001"
export const CalculateCaloriesAI = async (PROMPT) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: AIMODELNAME,
        messages: [{ role: 'user', content: PROMPT }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const GenerateRecipeOptionsAiModel = async (PROMPT) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: AIMODELNAME,
        messages: [{ role: 'user', content: PROMPT }],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    throw error;
  }
};

const BASE_URL='https://aigurulab.tech';

export const GenerateRecipeImage =async(prompt)=> await axios.post(BASE_URL+'/api/generate-image',
        {
            width: 1024,
            height: 1024,
            input:prompt,
            model: 'sdxl',//'flux'
            aspectRatio:"1:1"//Applicable to Flux model only
        },
        {
            headers: {
                'x-api-key': process.env.EXPO_PUBLIC_AIGURU_LAB_API_KEY, // Your API Key
                'Content-Type': 'application/json', // Content Type
            },
        })
// console.log(result.data.image) //Output Result: Base 64 Image