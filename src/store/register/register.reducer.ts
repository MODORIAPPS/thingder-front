import { ThunkAction } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { RegisterState } from "./register.type";

const CHANGE_REGISTER_PROPERTY = "CHANGE_REGISTER_PROPERTY" as const;
const RESET_REGISTER_STATE = "RESET_REGISTER_STATE" as const;

const changeRegisterPropertyAction = (object: Partial<RegisterState>) => ({ type: CHANGE_REGISTER_PROPERTY, object });
export const resetRegisterStateAction = () => ({ type: RESET_REGISTER_STATE });

type RegisterAction =
    | ReturnType<typeof changeRegisterPropertyAction>
    | ReturnType<typeof resetRegisterStateAction>;

export const changeRegisterProperty = (object: Partial<RegisterState>): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        dispatch({ type: CHANGE_REGISTER_PROPERTY, object });
    }
};

const initState: RegisterState = {
    email: "",
    brand: "",
    description: "",
    genCountry: "",
    genMonth: "",
    genYear: "",
    images: [],
    nickname: "",
    password: "",
    passwordConfirm: "",
    story: "",
    tag: "",
    type: "",
    pinToken: ""
}

const registerReducer = (state = initState, action: RegisterAction): RegisterState => {
    switch (action.type) {
        case CHANGE_REGISTER_PROPERTY:
            return Object.assign({}, state, action.object);
        case RESET_REGISTER_STATE:
            return initState;
        default: {
            return state;
        }
    }
};

export default registerReducer;
