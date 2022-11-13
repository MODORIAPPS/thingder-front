import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChatInput from "./components/ChatInput";
import CounterpartChat from "./components/CounterpartChat";
import MinepartChat from "./components/MinepartChat";
import TopBar from "./components/TopBar";
import { Client, CompatClient, IFrame, Message, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import ReportChatModal from "./modal/ReportChatModal";
import { useAppSelector } from "@/hooks/redux";
import api from "@/api";
import emojiRegex from "emoji-regex";
import queryString from 'query-string'

const regex = emojiRegex();

interface ChatItem {
    sender: {
        uid: string;
        images: {
            src: string;
            srcSet: string;
        }[]
    }
    message: string;
}

interface Photo {
    src: string;
    srcSet: string
}

const Chat: React.FC = () => {

    const { id } = useParams();

    const { search } = location;
    const queryObj = queryString.parse(search);
    const { nickname } = queryObj;

    /** 상대방 썸네일 */
    const [thumbnail, setThumbnail] = useState<Photo>();

    const navigate = useNavigate();

    const uid = useAppSelector(state => state.user.data?.uid);
    const chatClient = useRef<CompatClient>();

    const [chatList, setChatList] = useState<ChatItem[]>([]);

    const [text, setText] = useState("");
    const handleClickSend = () => {
        console.log('uewfawef');
        const chat = {
            roomUid: id,
            userUid: uid,
            message: text
        }
        chatClient?.current?.send("/app/message", {}, JSON.stringify(chat));
        const item: ChatItem = {
            sender: {
                uid: uid ?? "",
                images: []
            },
            message: text
        };
        setChatList([...chatList, item]);
        setText("");
    };

    const [reportModal, setReportModal] = useState(false);

    const onlyEmoji = chatList.length <= 5;

    const handleClickClose = () => navigate(-1);
    const handleClickGuard = () => {
        setReportModal(true);
    }


    const fetchChatHistory = async () => {
        const { data } = await api.main.get<{ messages: ChatItem[] }>("/chat/" + id);
        setChatList(data.messages);
    };

    const handleChangeText = (text: string) => {
        if (onlyEmoji) {
            const description = text.match(regex)?.join("");
            if (!description) return;
        }

        setText(text);
    };

    useEffect(() => {
        let client: Client;
        (async () => {
            // STOMP
            const sock = new SockJS("https://api.thingder.app/endpoint",);
            const stomp_client = Stomp.over(sock);

            stomp_client.connect({
                roomUid: id,
            }, (frame: IFrame) => {
                console.log('connect');
                chatClient.current = stomp_client
                stomp_client.subscribe(id ?? "", message => {
                    console.log('message', message);
                });
            });
        })();

        return () => {
            client?.deactivate();
        }
    }, []);

    useEffect(() => {
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (chatClient.current) {
            console.log('subs')
            chatClient.current.subscribe("/chat/room/" + id, (message) => {
                console.log(message);
                const body = JSON.parse(message.body);
                const item: ChatItem = {
                    sender: {
                        uid: body.userUid,
                        images: []
                    },
                    message: body.message
                }
                setChatList([...chatList, item]);
            })
        }

        // return () => chatClient.current?.unsubscribe();
    }, [chatClient]);


    useEffect(() => {
        if (chatList.length > 0) {
            const image = chatList[0].sender.images;
            console.log('image', image);
            setThumbnail({
                src: image[0].src,
                srcSet: image[0].srcSet
            })
        }
    }, [chatList]);

    return (
        <>
            <Container>
                <TopBar onClickBack={handleClickClose} onClickGuard={handleClickGuard} title={nickname as string ?? ""} />

                <ChatBody>
                    {
                        chatList.map(chat => {
                            if (chat.sender.uid === uid) {
                                return <MinepartChat text={chat.message} />
                            }

                            return <CounterpartChat
                                thumbnail_src={thumbnail?.src ?? ""}
                                thumbnail_srcSet={thumbnail?.srcSet ?? ""}
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

export default Chat;