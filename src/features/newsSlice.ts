import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "0de31c3ba49745ff908f6ef47633510d";
const NEWS_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

interface NewsState {
    articles: any[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: NewsState = {
    articles: [],
    status: "idle",
    error: null,
};

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
    try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        await AsyncStorage.setItem("news", JSON.stringify(data.articles)); // Збереження новин у AsyncStorage
        return data.articles;
    } catch (error) {
        throw Error("Не вдалося завантажити новини");
    }
});

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        loadStoredNews: (state, action) => {
            state.articles = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articles = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message || "Помилка";
            });
    },
});

export const { loadStoredNews } = newsSlice.actions;
export default newsSlice.reducer;
