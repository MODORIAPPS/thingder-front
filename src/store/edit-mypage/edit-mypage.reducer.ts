import { EditMyPageState } from "./edit-mypage.type";
import dayjs from "dayjs";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "@/api";
import { MemberDetail } from "@/pageModal/ItemDetail/ItemDetailModal";

const GET_MY_PAGE = "GET_MY_PAGE" as const;
const UPDATE_MY_PAGE = "UPDATE_MY_PAGE" as const;

const getMyPageAction = (data: EditMyPageState) => ({ type: GET_MY_PAGE, data });
const updateMyPageAction = (object: Partial<EditMyPageState>) => ({ type: UPDATE_MY_PAGE, object });

type EditMyPageAction =
    | ReturnType<typeof getMyPageAction>
    | ReturnType<typeof updateMyPageAction>;

export const fetchMyPage = (uid: string): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        const { data } = await api.main.get<MemberDetail>(`/member/${uid}`);
        const madeAt = data.genYear + "-" + data.genMonth;
        const state: EditMyPageState = {
            ...data,
            madeAt,
        };

        dispatch({ type: GET_MY_PAGE, data: state });
    }
};

export const updageMyPageAction = (object: Partial<MemberDetail>): ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        dispatch({ type: UPDATE_MY_PAGE, object });
    }
};

const initState: EditMyPageState = {
    brand: "",
    description: "",
    genCountry: "",
    madeAt: dayjs(new Date()).format("YYYY-MM"),
    images: [],
    nickname: "",
    story: "",
    tag: "",
    type: ""
};

const editMyPageReducer = (state = initState, action: EditMyPageAction): EditMyPageState => {
    switch (action.type) {
        case GET_MY_PAGE:
            return action.data;
        case UPDATE_MY_PAGE:
            return {
                ...state,
                ...action.object
            }
        default: {
            return state;
        }
    }
};

export default editMyPageReducer;

