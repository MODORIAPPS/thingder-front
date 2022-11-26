import api from "@/api";
import Container from "@/components/Container";
import { useAppDispatch } from "@/hooks/redux";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import ChatRoomItem from "@/pages/Home/fragments/Chat/components/ChatRoomItem";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RemainedReviewCount from "../components/RemainedReviewCount";
import AdminChatModal from "../modals/AdminChatModal";

interface ChatReport {
    uid: string;
    chatRoomUid: string;
    message: string;
    subject: {
        uid: string;
        nickname: string;
        image: {
            src: string;
            srcSet: string;
        }
    }
}

const ChatFragment: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /** 채팅 신고 모달 */
    const [chatRoomUid, setChatRoomUid] = useState("");
    const [chatModal, setChatModal] = useState(false);

    /** 처리 완료 유무 */
    const [complete, setComplete] = useState(false);

    const handleClickBack = () => navigate("/admin");

    const [list, setList] = useState<ChatReport[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<{ chats: ChatReport[] }>("/admin/report/chat");
        setList(data.chats);
    };

    const handleClickChatRoom = (chatRoomUid: string) => {
        setChatRoomUid(chatRoomUid);
        setChatModal(true);
    };

    useEffect(() => {
        fetchItemList();
    }, []);
    
    return (
        <>
            <Container>
                <AdminActionBar
                    onClickBackButton={handleClickBack}
                    isComplete={complete}
                />
                {/* <RemainedReviewCount>남은 리뷰 건수: {list.length}개</RemainedReviewCount> */}
                <List>
                    {
                        list.map(room =>
                            <ChatRoomItem
                                onClick={handleClickChatRoom}
                                uid={room.chatRoomUid}
                                isRead={false}
                                thumbnail_src={room.subject.image.src}
                                thumbnail_srcSet={room.subject.image.srcSet}
                                itemNickname={room.subject.nickname}
                                lastChat={room.message} />)
                    }
                </List>
            </Container>

            {
                list.length > 0 &&
                <AdminChatModal
                    reportUid={list.filter(chat => chat.chatRoomUid === chatRoomUid)[0]?.uid}
                    chatRoomUid={chatRoomUid}
                    subjectUid={list.filter(chat => chat.chatRoomUid === chatRoomUid)[0]?.subject.uid}
                    open={chatModal}
                    setOpen={setChatModal}
                    description={list.filter(chat => chat.chatRoomUid === chatRoomUid)[0]?.message}
                />
            }
        </>
    );
};

const List = styled.div`
    padding: 0 20px;
`;

export default ChatFragment;