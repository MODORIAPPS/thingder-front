import api from "@/api";
import Spacing from "@/components/Spacing";
import { BottomChat, ChatBody, ChatItem, WhiteGradient } from "@/pages/Chat";
import CounterpartChat from "@/pages/Chat/components/CounterpartChat";
import MinepartChat from "@/pages/Chat/components/MinepartChat";
import TopBar from "@/pages/Chat/components/TopBar";
import Button from "@/pages/Home/fragments/Chat/components/Button";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { ReportReasonView } from "./AdminItemDetailModal";

interface Props {
    reportUid: string;
    chatRoomUid: string;
    subjectUid: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    description: string;
}

const AdminChatModal: React.FC<Props> = ({
    reportUid,
    chatRoomUid,
    subjectUid,
    open,
    setOpen,
    description,
}) => {
    const [chatList, setChatList] = useState<ChatItem[]>([]);

    const handleClickClose = () => setOpen(false);

    const handleClickNegativeButton = async () => {
        await api.main.post(`/admin/report/chat/${reportUid}`, {
            status: "BAN"
        });
        alert("계정이 비공개처리되었습니다.");
        setOpen(false);
    };

    /** 상대방 썸네일 */
    const [thumbnail, setThumbnail] = useState<{ src: string, srcSet: string }>();

    const handleClickPositiveButton = async () => {
        await api.main.post(`/admin/report/chat/${reportUid}`, {
            status: "DISMISS"
        });
        setOpen(false);
    }

    const fetchChatHistory = async () => {
        const { data } = await api.main.get<{ messages: ChatItem[] }>("/chat/" + chatRoomUid);
        setChatList(data.messages);
    };

    useEffect(() => {
        fetchChatHistory();
    }, [chatRoomUid]);

    useEffect(() => {
        if (chatList.length > 0) {
            const image = chatList[0].sender.images;
            setThumbnail({
                src: image[0]?.src ?? "",
                srcSet: image[0]?.srcSet ?? ""
            });
        }
    }, [chatList]);

    return (
        <Modal isOpen={open} style={styles}>
            <TopBar onClickBack={handleClickClose} title={"미야오옹"} />

            {
                description &&
                <ReportReasonView>
                    {description}
                </ReportReasonView>
            }

            <ChatBody>
                {
                    chatList.map(chat => {
                        if (chat.sender.uid === subjectUid) {
                            return <CounterpartChat
                                thumbnail_src={thumbnail?.src ?? ""}
                                thumbnail_srcSet={thumbnail?.srcSet ?? ""}
                                text={chat.message} />
                        }
                        return <MinepartChat text={chat.message} />
                    })
                }
            </ChatBody>

            <BottomChat>
                <WhiteGradient />
                <InputWrapper>
                    <ButtonWrapper>
                        <Button
                            onClick={handleClickNegativeButton}
                            backgroundColor="#FF5100"
                            textColor="white">BAN!</Button>
                        <Spacing.Horizontal width={24} />
                        <Button
                            onClick={handleClickPositiveButton}
                            backgroundColor="#26C485"
                            textColor="black">DISMISS!</Button>
                    </ButtonWrapper>
                </InputWrapper>
            </BottomChat>
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
};

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    padding-bottom: 24px;
`;

const ButtonWrapper = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

export default AdminChatModal