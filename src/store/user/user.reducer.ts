import { User } from "./user.type";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import api, { ACCESS_TOKEN_KEY } from "@/api";
import { RootState } from "../store";

const USER_SIGN_IN = "USER_SIGN_IN" as const;
const USER_SIGN_IN_SUCCESS = "USER_SIGN_IN_SUCCESS" as const;
const USER_SIGN_IN_ERROR = "USER_SIGN_IN_ERROR" as const;
const USER_INFO_UPDATE = "USER_INFO_UPDATE" as const;

const USER_SIGN_OUT = "USER_SIGN_OUT" as const;

const userSignInAction = () => ({ type: USER_SIGN_IN });
const userSignInSuccessAction = (user: User) => ({ type: USER_SIGN_IN_SUCCESS, user });
const userSignInErrorAction = (error: string) => ({ type: USER_SIGN_IN_ERROR, error });
const userSignOutAction = () => ({ type: USER_SIGN_OUT });
const userInfoUpdateAction = (data: User) => ({ type: USER_INFO_UPDATE, data });

type actions =
    | ReturnType<typeof userSignInAction>
    | ReturnType<typeof userSignInSuccessAction>
    | ReturnType<typeof userSignInErrorAction>
    | ReturnType<typeof userSignOutAction>
    | ReturnType<typeof userInfoUpdateAction>;

interface UserState {
    loading: boolean;
    data: User | null;
    error: string | null;
}

const initState: UserState = {
    loading: false,
    data: null,
    error: null,
}

export const signInUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_SIGN_IN });
            const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
            api.main.defaults.headers.common['Authorization'] = accessToken ?? "";

            console.log('accessToken', accessToken);

            // console.log('token', accessToken);

            if (!accessToken) {
                dispatch({ type: USER_SIGN_IN_ERROR, error: "No user auth info" });
                return
            }
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

            const { data } = await api.main.get<User>("/auth/my");
            dispatch({ type: USER_SIGN_IN_SUCCESS, user: data });

            console.log("user/reducer token", accessToken);
        } catch (e) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            dispatch({ type: USER_SIGN_IN_ERROR, error: "error" });
        }
    }
};

export const signOutUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            api.main.defaults.headers.common['Authorization'] = "";
            dispatch({ type: USER_SIGN_OUT });
        } catch (e) {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            dispatch({ type: USER_SIGN_IN_ERROR, error: "error" });
        }
    }
};

const userReducer = (
    state = initState,
    action: actions
): UserState => {
    switch (action.type) {
        case USER_SIGN_IN:
            return {
                loading: true,
                data: null,
                error: null,
            }
        case USER_SIGN_IN_SUCCESS:
            return {
                loading: false,
                data: action.user,
                error: null,
            }
        case USER_SIGN_IN_ERROR:
            return {
                loading: false,
                data: null,
                error: action.error,
            }
        case USER_SIGN_OUT:
            return {
                loading: false,
                data: null,
                error: null,
            }
        case USER_INFO_UPDATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.data
                }
            }
        default:
            return state;
    }
};

export default userReducer;
