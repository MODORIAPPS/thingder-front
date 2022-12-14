import api from "@/api";
import { MemberDetail } from "@/pageModal/ItemDetail/ItemDetailModal";
import { AnyAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { EditMyPageState } from "./edit-mypage.type";

const GET_MY_PAGE = "GET_MY_PAGE" as const;
const UPDATE_MY_PAGE = "UPDATE_MY_PAGE" as const;

const getMyPageAction = (data: EditMyPageState) => ({ type: GET_MY_PAGE, data });
const updateMyPageAction = (data: Partial<EditMyPageState>) => ({ type: UPDATE_MY_PAGE, data });

type EditMyPageAction =
    | ReturnType<typeof getMyPageAction>
    | ReturnType<typeof updateMyPageAction>;

export const fetchMyPage = (): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch, getState) => {
        const data = getState().user.data?.member!!;
        const madeAt = data.genYear + "-" + data.genMonth;
        const state: EditMyPageState = {
            ...data,
            madeAt,
        };

        dispatch({ type: GET_MY_PAGE, data: state });
    }
};

export const updageMyPage = (data: Partial<EditMyPageState>): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        console.log('change', data);
        dispatch({ type: UPDATE_MY_PAGE, data });
    }
};

const initState: EditMyPageState = {
    brand: "",
    description: "",
    genCountry: "",
    madeAt: dayjs(new Date()).format("YYYY-MM"),
    images: [],
    nickname: "",
    tag: "",
    type: "",
    story: ""
};

const editMyPageReducer = (state = initState, action: AnyAction): EditMyPageState => {
    switch (action.type) {
        case GET_MY_PAGE:
            return action.data;
        case UPDATE_MY_PAGE:
            return {
                ...state,
                ...action.data
            }
        default: {
            return state;
        }
    }
};

export default editMyPageReducer;

