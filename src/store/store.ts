import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authSlice, calendarSlice, uiSlice } from ".";



export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})


export const useAppDispatch:()=>typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store['dispatch']