import { ListenChatRoom, PushListenState } from "./push-listen.type";

const initState: PushListenState = [];

const LISTEN_CHATROOM = "LISTEN_CHATROOM" as const;
const UNLISTEN_CHATROOM = "UNLISTEN_CHATROOM" as const;

const listenChatRoomAction = (roomUid: string) => ({ type: LISTEN_CHATROOM, roomUid });
const unlistenChatRoomAction = (roomUid: string) => ({ type: UNLISTEN_CHATROOM, roomUid });

type PushListenAction =
    | ReturnType<typeof listenChatRoomAction>
    | ReturnType<typeof unlistenChatRoomAction>;


export const isListenThisChatRoom = (roomList: ListenChatRoom[], uid: string): boolean => {
    const idx = roomList.findIndex(room => room.roomUid === uid);
    if (idx < 0) return false;

    return roomList[idx].listen;
};

const pushListenReducer = (state = initState, action: PushListenAction): PushListenState => {

    const getNewState = (uid: string, isListen: boolean) => {
        const idx = state.findIndex(room => room.roomUid === uid);
        if (idx < 0) return state;

        const target = state[idx];
        target.listen = isListen
        return [...state].splice(idx, 1, target);
    };

    switch (action.type) {
        case LISTEN_CHATROOM:
            return getNewState(action.roomUid, true);

        case UNLISTEN_CHATROOM:
            return getNewState(action.roomUid, false);

        default: {
            return state;
        }
    }
};

export default pushListenReducer;