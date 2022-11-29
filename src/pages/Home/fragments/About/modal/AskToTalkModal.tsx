import api from "@/api";
import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import { useAppSelector } from "@/hooks/redux";
import ChatRoomAction from "@/utils/db";
import styled from "@emotion/styled";
import { Client, CompatClient, IFrame, Message, Stomp } from '@stomp/stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";

interface Props {
    open: boolean;
    onClickBackButton: () => void;
}

const AskToTalkModal: React.FC<Props> = ({ open, onClickBackButton }) => {

    const { t } = useTranslation();

    const uid = useAppSelector(state => state.user.data?.uid);
    const chatClient = useRef<CompatClient>();
    const [value, setValue] = useState("");
    const navigate = useNavigate();

    const handleClickSend = async () => {
        try {
            const { data: chatRoomUid } = await api.main.post<string>("/chat/admin");

            const sock = new SockJS("https://api.thingder.app/endpoint",);
            const stomp_client = Stomp.over(sock);

            stomp_client.connect({
                roomUid: chatRoomUid,
            }, (frame: IFrame) => {
                chatClient.current = stomp_client
                stomp_client.send("/app/message", {}, JSON.stringify(value));

                ChatRoomAction.createNewChatRoom(
                    uid ?? "",
                    chatRoomUid,
                    "관리자",
                    "",
                    ""
                );
    
                navigate("/home/chat/" + chatRoomUid + "?nickname=" + "관리자");
            });


        } catch (e) {
            alert("죄송합니다. 문제가 발생했어요. 잠시 뒤 다시 시도해주세요.")
        }
    };

    return (
        <Modal
            isOpen={open}
            style={modalStyles}>
            <Container>
                <ActionBar onClickBackButton={onClickBackButton} />
                <Spacing.Vertical height={12} />
                <Body>
                    <Description>{t("about.placeholder")}</Description>
                    <Spacing.Vertical height={16} />
                    <TextArea value={value} onChange={e => setValue(e.target.value)} />
                    <Spacing.Vertical height={36} />
                    <Button onClick={handleClickSend}>
                        {t("about.send")}
                    </Button>
                </Body>
            </Container>
        </Modal>
    );
};

export const modalStyles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
};

const Body = styled.div`
    padding: 0 30px;
    box-sizing: border-box;
`;

export const TextArea = styled.textarea`
    border: none;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    background: rgba(233, 233, 233, 0.5);
    border-radius: 20px;
    min-height: 400px;

    padding: 14px 20px;

    font-weight: 400;
    white-space: pre-wrap;

    max-height: 500px;

    overflow-y: scroll;

    color: grey;

    &:active {
        border: none;
        outline: none;
    }
`;

const Description = styled.p`
    text-align: center;
    color: #424242;
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 700;
`;

const Button = styled.div`
    background-color: #DDF45B;
    border-radius: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 53px;

    font-weight: 700;
    color: #404040;
    text-align: center;
`;

export default AskToTalkModal;