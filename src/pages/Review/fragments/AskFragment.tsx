import api from "@/api";
import { Container } from "@/components/Container";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import ChatRoomItem from "@/pages/Home/fragments/Chat/components/ChatRoomItem";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AskChatRoomItem from "../components/AskChatRoomItem";
import AskChatModal from "../modals/AskChatModal";

interface Chat {
    uid: string;
    memberUid: string;
}

const AskFragment: React.FC = () => {

    const navigate = useNavigate();
    const handleClickBack = () => navigate("/admin");

    const [modal, setModal] = useState(false);
    const [chatRoomUid, setChatRoomUid] = useState("");
    const [nickname, setNickname] = useState("");

    const handleClickChatRoom = (uid: string, nickname: string) => {
        setChatRoomUid(uid);
        setNickname(nickname);
        setModal(true);
    };

    const [list, setList] = useState<Chat[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<{ chats: Chat[] }>("/admin/chat");
        setList(data.chats);
    };


    useEffect(() => {
        fetchItemList();
    }, []);

    return (
        <>
            <Container>
                <AdminActionBar onClickBackButton={handleClickBack} />
                {/* <RemainedReviewCount>남은 리뷰 건수: {list.length}개</RemainedReviewCount> */}
                <List>
                    {
                        list.map(room =>
                            <AskChatRoomItem
                                uid={room.uid}
                                memberUid={room.memberUid}
                                onClick={handleClickChatRoom}
                            />)
                    }
                </List>
            </Container>

            <AskChatModal
                chatRoomUid={chatRoomUid}
                nickname={nickname}
                open={modal}
                setOpen={setModal} />
        </>
    );
};

const List = styled.div`
    padding: 0 20px;
`;


export default AskFragment;