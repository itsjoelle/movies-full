import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  PayloadAction,
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from '../store';

const googleGenAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_AI);

const createSliceWithThunks = buildCreateSlice({
  creators: {
    asyncThunk: asyncThunkCreator,
  },
});

export interface Text {
  text: string;
}

export interface Message {
  role: string;
  parts: Text[];
}
interface GeminiState {
  history: Message[];
}

const initialState: GeminiState = {
  history: [],
};

export const askGemini = createAsyncThunk(
  'gemini/ask',
  async (message: string, api) => {
    try {
      const { gemini } = api.getState() as RootState;

      const currentHistory = gemini.history.map((msg) => ({
        role: msg.role,
        parts: [...msg.parts],
      }));

      const model = googleGenAI.getGenerativeModel({
        model: 'gemini-2.0-flash',
      });

      const chat = model.startChat({
        history: currentHistory,
        generationConfig: {
          maxOutputTokens: 300,
        },
      });

      const result = await chat.sendMessage(message);
      const response = await result.response.text();

      return { role: 'model', parts: [{ text: response }] };
    } catch (error) {
      console.error('Error in askGemini:', error);
      throw error;
    }
  }
);

const geminiSlice = createSliceWithThunks({
  name: 'gemini',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<Message>) => {
      state.history.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(askGemini.fulfilled, (state, action) => {
      state.history.push(action.payload);
    });
    builder.addCase(askGemini.rejected, (state, action) => {
      console.error('askGemini failed:', action.error.message);
    });
  },
});

export const { setHistory } = geminiSlice.actions;
export default geminiSlice.reducer;
