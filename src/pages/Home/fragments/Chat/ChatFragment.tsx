import Spacing from "@/components/Spacing";
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
                    [1, 1, 1, 1, 1, 1, 1, 1].map(() =>
                        <ChatRoomItem
                            onClick={handleClickChatRoom}
                            uid={"ewafaew"}
                            isRead={true}
                            thumbnail_src={"http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg"}
                            thumbnail_srcSet={"http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg"}
                            itemNickname={"전자정보통신공학과머그컵"}
                            lastChat={"응애 나 아기 전정통"} />)
                }

            </List>

            {/* <WhiteGradient /> */}
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