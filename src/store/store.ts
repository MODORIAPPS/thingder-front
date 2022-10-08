import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import registerReducer from "./register/register.reducer";
import uiReducer from "./ui/ui.reducer";
import userReducer from "./user/user.reducer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        register: registerReducer,
        ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;