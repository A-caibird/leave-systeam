import {configureStore, createSlice} from '@reduxjs/toolkit';

// 创建一个slice
const uniqueIdSlice = createSlice({
    name: 'uniqueId',
    initialState: 0,
    reducers: {
        generateUniqueId: state => state + 1
    }
});
const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: null,
    reducers: {
        getUserInfo: ()=>(sessionStorage.getItem("UserInfo") ? JSON.parse(sessionStorage.getItem("UserInfo") as string) : null)
    }
})
export const {getUserInfo} = userInfoSlice.actions;
export const {generateUniqueId} = uniqueIdSlice.actions;

// 配置store
const store = configureStore({
    reducer: {
        uniqueId: uniqueIdSlice.reducer,
        userInfo: userInfoSlice.reducer,
    }
});

export default store;
