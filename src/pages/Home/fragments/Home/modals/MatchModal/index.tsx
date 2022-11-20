import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import MatchedEffect from "./MatchedEffect";
import MatchedItemCard from "./MatchedItemCard";
import SendMessageInput from "./SendMessageInput";
import TopBar from "./TopBar";
import Modal from 'react-modal';
import { Client, CompatClient, IFrame, Message, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import { useAppSelector } from "@/hooks/redux";
import { ChatItem } from "@/pages/Chat";
import { useNavigate } from "react-router-dom";
import emojiRegex from "emoji-regex";

interface Props {
    open: boolean;
    chatRoomUid: string;

    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    genYear: number;
    genMonth: number;

    thumbnail_src: string;
    thubmnail_srcSet: string;

    handleClickClose: () => void;
}

const regex = emojiRegex();

const MatchModal: React.FC<Props> = ({
    open,
    chatRoomUid,
    nickname,
    name,
    madeIn,
    brand,
    genYear,
    genMonth,
    thumbnail_src,
    thubmnail_srcSet,
    handleClickClose
}) => {

    const navigate = useNavigate();
    const chatClient = useRef<CompatClient>();
    const [text, setText] = useState("");

    const uid = useAppSelector(state => state.user.data?.uid);

    const handleClickSend = () => {
        if (!text || text.replace(/^\s+|\s+$/g, "") === "") return;
        const chat = {
            roomUid: chatRoomUid,
            userUid: uid,
            message: text
        }
        chatClient?.current?.send("/app/message", {}, JSON.stringify(chat));
        navigate("chat/" + chatRoomUid + "?nickname=" + nickname)
    };

    const handleChangeText = (text: string) => {
        let description = text;
        description = text.match(regex)?.join("") ?? "";
        if (!description) return;

        setText(description);
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
            });
        })();

        return () => {
            client?.deactivate();
        }
    }, [chatRoomUid]);


    return (
        <Modal isOpen={open} style={styles}>
            <Container>
                <TopBar onClickClose={handleClickClose} />
                <Spacing.Vertical height={24} />
                <MatchedEffect />
                <Spacing.Vertical height={24} />
                <MatchedItemCard
                    nickname={nickname}
                    name={name}
                    madeIn={madeIn}
                    brand={brand}
                    genYear={genYear}
                    genMonth={genMonth}
                    thumbnail_src={thumbnail_src}
                    thubmnail_srcSet={thubmnail_srcSet}
                />
                <Spacing.Vertical height={16} />
                <SendMessageInput
                    onChangeText={handleChangeText}
                    text={text}
                    onClickSend={handleClickSend}
                />
            </Container>
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
}

const Container = styled.div`
    background-color: #FF5100;
    height: 100vh;
    box-sizing: border-box;
    padding: 0 18px;
`;

export default MatchModal;