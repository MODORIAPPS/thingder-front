import CounterpartChat from "@/pages/Chat/components/CounterpartChat";
import MinepartChat from "@/pages/Chat/components/MinepartChat";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import SockJS from "sockjs-client/dist/sockjs";
import { Client, CompatClient, IFrame, Stomp } from '@stomp/stompjs';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import { ChatItem } from "@/pages/Chat";
import api from "@/api";
import TopBar from "@/pages/Chat/components/TopBar";
import ChatInput from "@/pages/Chat/components/ChatInput";
import { modalStyles } from "@/pages/Home/fragments/About/modal/AskToTalkModal";

interface Props {
    chatRoomUid: string;
    nickname: string;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const AskChatModal: React.FC<Props> = ({
    chatRoomUid,
    nickname,
    open,
    setOpen
}) => {

    const navigate = useNavigate();

    const uid = useAppSelector(state => state.user.data?.uid);
    console.log('userUid', uid);
    const chatClient = useRef<CompatClient>();

    const [chatList, setChatList] = useState<ChatItem[]>([]);

    const [text, setText] = useState("");
    const handleClickSend = () => {
        if (!text || text.replace(/^\s+|\s+$/g, "") === "") return;
        const chat = {
            roomUid: chatRoomUid,
            userUid: uid,
            message: text
        }
        chatClient?.current?.send("/app/message", {}, JSON.stringify(chat));
        const item: ChatItem = {
            sendAt: "",
            sender: {
                uid: uid ?? "",
                images: []
            },
            message: text
        };
        console.log('commit');
        setChatList(prevState => [...prevState, item]);
        setText("");
    };

    const handleClickClose = () => setOpen(false);

    const fetchChatHistory = async () => {
        const { data } = await api.main.get<{ messages: ChatItem[] }>("/chat/" + chatRoomUid);
        setChatList(sortDate1(data.messages));
    };

    const handleChangeText = (text: string) => {
        setText(text);
    };

    useEffect(() => {
        let client: Client;
        (async () => {
            // STOMP
            const sock = new SockJS("https://api.thingder.app/endpoint",);
            const stomp_client = Stomp.over(sock);

            stomp_client.connect({
                roomUid: chatRoomUid,
            }, (frame: IFrame) => {
                chatClient.current = stomp_client
                stomp_client.subscribe(chatRoomUid ?? "", message => {
                    console.log('subscribed!!');
                });
            });
        })();

        return () => {
            client?.deactivate();
        }
    }, [chatRoomUid]);

    useEffect(() => {
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (chatClient.current) {
            chatClient.current.subscribe("/chat/room/" + chatRoomUid, (message) => {
                console.log('hello')
                const body = JSON.parse(message.body);
                const item = {
                    sendAt: "",
                    sender: {
                        uid: body.userUid,
                        images: [],
                    },
                    message: body.message
                }
                setChatList((prevState) => [...prevState, item]);
            })
        }
    }, [chatClient]);


    return (
        <Modal isOpen={open} style={modalStyles}>
            <Container>
                <TopBar onClickBack={handleClickClose} title={nickname as string ?? ""} />

                <ChatBody>
                    {
                        chatList.map((chat, i) => {
                            console.log('hitomi', uid);
                            if (chat.sender.uid === uid) {
                                return <MinepartChat key={i} text={chat.message} />
                            }

                            return <CounterpartChat
                                key={i}
                                thumbnail_src={chat.sender.images[0]?.src ?? ""}
                                thumbnail_srcSet={chat.sender.images[0]?.srcSet ?? ""}
                                text={chat.message} />
                        })
                    }
                </ChatBody>

                <BottomChat>
                    <WhiteGradient />
                    <InputWrapper>
                        <ChatInput
                            text={text}
                            onChangeText={handleChangeText}
                            onClickSend={handleClickSend}
                        />
                    </InputWrapper>
                </BottomChat>
            </Container>
        </Modal>

    );
};

export function sortDate1(list: ChatItem[]) {
    const sorted_list = list.sort(function (a, b) {
        return new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime();
    });
    return sorted_list;
}
const Limit5TextView = styled.p`
    color: rgba(66, 66, 66, 0.5);
    text-align: center;
    font-size: 13px;
    line-height: 17px;
    margin-top: 5px;
    margin-bottom: 8px;
`;

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

    position: relative;
`;

export const BottomChat = styled.div`
    position: fixed;
    width: 100%;
    max-width: 400px;
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


export default AskChatModal;