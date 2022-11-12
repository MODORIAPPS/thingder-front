import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import editMyPageReducer from "./edit-mypage/edit-mypage.reducer";
import registerReducer from "./register/register.reducer";
import uiReducer from "./ui/ui.reducer";
import userReducer from "./user/user.reducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        register: registerReducer,
        ui: uiReducer,
        myPage: editMyPageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;