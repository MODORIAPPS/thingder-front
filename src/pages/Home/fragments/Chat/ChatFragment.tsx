import Spacing from "@/components/Spacing";
import ChatRoomAction from "@/utils/db";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typography from "../../../../components/Typography";
import ChatRoomItem from "./components/ChatRoomItem";
import TopBar from "./components/TopBar";

const ChatFragment: React.FC = () => {

    const navigate = useNavigate();

    const handleClickChatRoom = (chatRoomUid: string) => {
        navigate(chatRoomUid)
    };

    useEffect(() => {
        requestPushNotification();
    }, []);

    return (
        <Container>
            <TopBar />
            <List>
                {
                    ChatRoomAction.getChatRoomList().map((room) =>
                        <ChatRoomItem
                            onClick={handleClickChatRoom}
                            uid={room.chatRoomUid}
                            isRead={room.isRead}
                            thumbnail_src={room.thumbnail_src}
                            thumbnail_srcSet={room.thumbnail_srcSet}
                            itemNickname={room.nickname}
                            lastChat={room.lastChat ?? ""} />)
                }
            </List>
        </Container>
    )
};

const requestPushNotification = () => {
    console.log(Notification.permission);
    if (Notification.permission === "default") {
        Notification.requestPermission().then(result => {
            if (result === "granted") {
                new Notification("이렇게 알려드릴게요!");
            }
        });
        return;
    }
};

const Container = styled.div`
    position: relative;
`;

const WhiteGradient = styled.div`
    position: absolute;
    bottom: 0;
    z-index: 99;

    width: 100%;
    height: 100px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 91.84%);
`;

const List = styled.div`
    padding: 0 20px;
`;

export default ChatFragment;