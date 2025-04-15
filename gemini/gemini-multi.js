import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

// for testing purposes
const googleGenAI = new GoogleGenerativeAI(process.env.API_KEY_AI);

export async function run() {
  const model = googleGenAI.getGenerativeModel({
    model: 'gemini-2.0-pro',
  });

  const chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 100,
    },
  });

  async function askAndResponse() {
    const msg = 'Say 3 words';
    const result = await chat.sendMessage(msg);
    const response = result.response.text();
    console.log(response);
  }

  askAndResponse();
}

run();
