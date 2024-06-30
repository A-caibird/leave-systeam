import { configureStore, createSlice } from '@reduxjs/toolkit';

// 创建一个slice
const uniqueIdSlice = createSlice({
    name: 'uniqueId',
    initialState: 0,
    reducers: {
        generateUniqueId: state => state + 1
    }
});

export const { generateUniqueId } = uniqueIdSlice.actions;

// 配置store
const store = configureStore({
    reducer: {
        uniqueId: uniqueIdSlice.reducer
    }
});

export default store;
