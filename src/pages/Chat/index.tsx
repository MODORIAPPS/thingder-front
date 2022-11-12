import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChatInput from "./components/ChatInput";
import CounterpartChat from "./components/CounterpartChat";
import MinepartChat from "./components/MinepartChat";
import TopBar from "./components/TopBar";
import { Client, IFrame, Message, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import ReportChatModal from "./modal/ReportChatModal";

const Chat: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [reportModal, setReportModal] = useState(false);

    const handleClickClose = () => navigate(-1);
    const handleClickGuard = () => {
        setReportModal(true);
    }


    useEffect(() => {
        let client: Client;
        (async () => {
            // STOMP
            const sock = new SockJS("https://api.thingder.app/chat/message");
            const ws = Stomp.over(sock);

            ws.connect({}, (frame: IFrame) => {
                console.log('connect');
                ws.subscribe(id ?? "", message => {
                    console.log('message', message);
                });
            });
        })();

        return () => {
            client?.deactivate();
        }
    });

    return (
        <>
            <Container>
                <TopBar onClickBack={handleClickClose} onClickGuard={handleClickGuard} title={"미야오옹"} />

                <ChatBody>
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihddd fdsfwefewfewfewfewfe ddddddddddddwfwefwefwefewfewa"} />

                    <MinepartChat text={"sdfs"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />

                    <MinepartChat text={"YO what animal do you want to meet tonight? YO what animal do you."} />

                    <MinepartChat text={"sdfs"} />
                    <MinepartChat text={"sdfs"} />
                    <MinepartChat text={"sdfs"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />
                    <CounterpartChat
                        thumbnail_src={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        thumbnail_srcSet={"https://mblogthumb-phinf.pstatic.net/20120515_230/sm72351_1337060427810Gv8Ib_JPEG/1.jpg?type=w2"}
                        text={"HEllo ihdd ddfdsfwefewfewfewfewfewfwefwefwefewfewa"} />

                </ChatBody>

                <BottomChat>
                    <WhiteGradient />
                    <InputWrapper>
                        <ChatInput text={"dd"} onChangeText={function (text: string): void {
                            throw new Error("Function not implemented.");
                        }} onClickSend={function (): void {
                            throw new Error("Function not implemented.");
                        }} />
                    </InputWrapper>
                </BottomChat>
            </Container>

            {/* 신고 모달 */}
            <ReportChatModal
                chatRoomUid={id ?? ""}
                open={reportModal}
                close={() => setReportModal(false)} />
        </>
    );
};

export const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const ChatBody = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 20px 18px 80px 18px;

    overflow-y: scroll;
`;

export const BottomChat = styled.div`
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
`;

export const InputWrapper = styled.div`
    padding: 0  18px 24px 18px;
    background: white;
`;

export const WhiteGradient = styled.div`
    width: 100%;
    height: 51px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 91.84%);
`;

export default Chat;