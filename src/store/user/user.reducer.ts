import { User } from "./user.type";
import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import api, { ACCESS_TOKEN_KEY } from "@/api";
import { RootState } from "../store";
import { MemberDTO } from "@/@types/Member";

type UserType = "ADMIN" | "USER";

const USER_SIGN_IN = "USER_SIGN_IN" as const;
const USER_SIGN_IN_SUCCESS = "USER_SIGN_IN_SUCCESS" as const;
const USER_SIGN_IN_ERROR = "USER_SIGN_IN_ERROR" as const;
const USER_INFO_UPDATE = "USER_INFO_UPDATE" as const;

const USER_SIGN_OUT = "USER_SIGN_OUT" as const;

const userSignInAction = () => ({ type: USER_SIGN_IN });
const userSignInSuccessAction = (userType: UserType, uid: string, member: MemberDTO) => ({ type: USER_SIGN_IN_SUCCESS, userType, uid, member });
const userSignInErrorAction = (error: string) => ({ type: USER_SIGN_IN_ERROR, error });
const userSignOutAction = () => ({ type: USER_SIGN_OUT });
const userInfoUpdateAction = (member: MemberDTO) => ({ type: USER_INFO_UPDATE, member });

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

interface MyResponse {
    roles: ("ADMIN" | "USER")[];
    uid: string;
}

export const signInUser = (token?: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_SIGN_IN });
            const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (!accessToken) {
                dispatch({ type: USER_SIGN_IN_ERROR, error: "No user auth info" });
                return
            }
            console.log("token", token ?? accessToken ?? "");
            api.main.defaults.headers.common['Authorization'] = token ?? accessToken ?? "";

            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

            /** 1. 내 정보 불러오기 */
            const { data: my } = await api.main.get<MyResponse>("/auth/my");
            console.log('data mine!', my);

            /** 2. 내 프로필 불러오기 */
            const { data: member } = await api.main.get<MemberDTO>(`/member/${my.uid}`);
            console.log('data mewmber', member);
            dispatch({ type: USER_SIGN_IN_SUCCESS, userType: my.roles[0], uid: my.uid, member });

            console.log("user/reducer token", accessToken);
        } catch (e) {
            console.log("error", e);
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

export const updateMyInfo = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        try {
            const uid = getState().user.data?.uid;
            if (!uid) return;

            /** 내 프로필 불러오기 */
            const { data: member } = await api.main.get<MemberDTO>(`/member/${uid}`);
            dispatch({ type: USER_INFO_UPDATE, member });
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
                error: null,
                data: {
                    type: action.userType,
                    uid: action.uid,
                    member: action.member
                }
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
                    ...state.data!!,
                    member: action.member
                }
            }
        default:
            return state;
    }
};

export default userReducer;
