const SHOW_MEMBER_DETAIL = "SHOW_MEMBER_DETAIL" as const;
const CLOSE_MEMBER_DETAIL = "CLOSE_MEMBER_DETAIL" as const;

/**
 * Member Detail
 */
export const showMemberDetailAction = (uid: string) => ({ type: SHOW_MEMBER_DETAIL, uid });
export const closeMemberDetailAction = () => ({ type: CLOSE_MEMBER_DETAIL });

type UIAction =
    | ReturnType<typeof showMemberDetailAction>
    | ReturnType<typeof closeMemberDetailAction>;

interface UIState {
    memberDetailUid: string;
    memberDetailModalVisible: boolean;
}

const initState: UIState = {
    memberDetailUid: "",
    memberDetailModalVisible: false
}

const uiReducer = (state = initState, action: UIAction): UIState => {
    switch (action.type) {
        case SHOW_MEMBER_DETAIL:
            return {
                memberDetailUid: action.uid,
                memberDetailModalVisible: true
            }
        case CLOSE_MEMBER_DETAIL:
            return {
                memberDetailUid: "",
                memberDetailModalVisible: false
            }
        default: {
            return state;
        }
    }
};

export default uiReducer;