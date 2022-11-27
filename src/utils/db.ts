
const CHATROOM_KEY = "CHATROOM_KEY";

interface ChatRoomDB {
    userUid?: string;

    thumbnail_src: string;
    thumbnail_srcSet: string;

    chatRoomUid: string;
    nickname: string;
    lastChat: string | undefined;
    isRead: boolean;
}

const createNewChatRoom = (
    userUid: string,
    chatRoomUid: string,
    nickname: string,
    thumbnail_src: string,
    thumbnail_srcSet: string,
) => {
    let list: ChatRoomDB[] = [];
    const storageData = window.localStorage.getItem(CHATROOM_KEY);
    if (storageData !== "" && storageData !== null) {
        list = JSON.parse(storageData);
        console.log(list);
        
        if(list.findIndex(item => item.chatRoomUid === chatRoomUid) > -1){
            return;
        }
    }

    const room: ChatRoomDB = {
        userUid,
        thumbnail_src,
        thumbnail_srcSet,
        chatRoomUid,
        nickname,
        lastChat: undefined,
        isRead: true
    };

    window.localStorage.setItem(CHATROOM_KEY, JSON.stringify([...list, room]));
};

const removeChatRoom = (chatRoomUid: string) => {
    const storageData = window.localStorage.getItem(CHATROOM_KEY) ?? "";
    const list: ChatRoomDB[] = JSON.parse(storageData);
    window.localStorage.setItem(CHATROOM_KEY, JSON.stringify(list.filter(item => item.chatRoomUid !== chatRoomUid)));
};

const getChatRoomList = (userUid?: string): ChatRoomDB[] => {
    const storageData = window.localStorage.getItem(CHATROOM_KEY) ?? "";
    if (storageData === "") return [];
    const list: ChatRoomDB[] = JSON.parse(storageData);

    if(userUid){
        console.log(list)
        return list.filter(item => item.userUid === userUid);
    }

    return list;
};

const updateLastChat = (chatRoomUid: string, lastChat: string) => {
    const storageData = window.localStorage.getItem(CHATROOM_KEY) ?? "";
    const list: ChatRoomDB[] = JSON.parse(storageData);

    const index = list.findIndex(item => item.chatRoomUid === chatRoomUid);
    if (index < 0) return;

    const item = list[index];
    item.lastChat = lastChat;

    const newArray = list.splice(index, 1, item);
    window.localStorage.setItem(CHATROOM_KEY, JSON.stringify(newArray))
};

const ChatRoomAction = {
    createNewChatRoom,
    removeChatRoom,
    getChatRoomList,
    updateLastChat
}

export default ChatRoomAction