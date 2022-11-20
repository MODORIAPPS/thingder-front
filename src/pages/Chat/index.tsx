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

export interface ChatItem {
    sender: {
        uid: string;
        
        images: {
            src: string;
            srcSet: string;
        }[]
    }
    message: string;
    sendAt: string;
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
    const [subjectUid, setSubjectUid] = useState("");

    const mineChat = chatList.filter(chat => chat.sender.uid === uid);

    const [text, setText] = useState("");
    const handleClickSend = () => {
        if (!text || text.replace(/^\s+|\s+$/g, "") === "") return;
        const chat = {
            roomUid: id,
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

    const [reportModal, setReportModal] = useState(false);

    const onlyEmoji = mineChat.length <= 5;

    const handleClickClose = () => navigate(-1);
    const handleClickGuard = () => {
        setReportModal(true);
    }


    const fetchChatHistory = async () => {
        const { data } = await api.main.get<{ messages: ChatItem[] }>("/chat/" + id);
        setChatList(sortDate1(data.messages));
    };

    const handleChangeText = (text: string) => {
        let description = text;
        if (onlyEmoji) {
            description = text.match(regex)?.join("") ?? "";
            if (!description) return;
        }

        setText(description);
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
                chatClient.current = stomp_client
                stomp_client.subscribe(id ?? "", message => {
                    console.log(message);
                });
            });
        })();

        return () => {
            client?.deactivate();
        }
    }, [id]);

    useEffect(() => {
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (chatClient.current) {
            chatClient.current.subscribe("/chat/room/" + id, (message) => {
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


    useEffect(() => {
        if (chatList.length > 0) {
            const image = chatList[0].sender.images;
            setThumbnail({
                src: image[0]?.src ?? "",
                srcSet: image[0]?.srcSet ?? ""
            });
            setSubjectUid(chatList[0].sender.uid)
        }
    }, [chatList]);

    return (
        <>
            <Container>
                <TopBar onClickBack={handleClickClose} onClickGuard={handleClickGuard} title={nickname as string ?? ""} />

                <ChatBody>
                    <Limit5TextView>첫 5개의 메시지는 이모지만 쓸 수 있어요.</Limit5TextView>
                    {
                        chatList.map((chat, i) => {
                            if (chat.sender.uid === uid) {
                                return <MinepartChat key={i} text={chat.message} />
                            }

                            return <CounterpartChat
                                key={i}
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
                subjectUid={subjectUid}
                open={reportModal}
                close={() => setReportModal(false)} />
        </>
    );
};
export function sortDate1(list: ChatItem[]) {
    const sorted_list = list.sort(function (a, b) {
        return new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime();
    });
    return sorted_list;
}
const Limit5TextView = styled.p`
    position: fixed;
    left: 0;
    right: 0;
    color: rgba(66, 66, 66, 0.5);
    text-align: center;
    font-size: 13px;
    line-height: 17px;
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

export default Chat;