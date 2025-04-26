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

export const CalculateCaloriesAI = async (PROMPT) => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.0-flash-lite-001',
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
