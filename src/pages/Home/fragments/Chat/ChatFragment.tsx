import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import Typography from "../../../../components/Typography";
import ChatRoomItem from "./components/ChatRoomItem";
import TopBar from "./components/TopBar";

const ChatFragment: React.FC = () => {
    return (
        <Container>
            <TopBar />
            <List>

                {
                    [1, 1, 1, 1, 1, 1, 1, 1].map(() =>
                        <ChatRoomItem
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