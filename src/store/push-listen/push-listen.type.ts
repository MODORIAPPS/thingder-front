export interface ListenChatRoom {
    roomUid: string;
    listen: boolean;
}

export type PushListenState = ListenChatRoom[];