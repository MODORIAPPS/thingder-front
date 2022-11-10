import api from "@/api";
import { useAppDispatch } from "@/hooks/redux";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatReport {
    uid: string;
    chatRoomUid: string;
    message: string;
    subjectUid: string;
}

const ChatFragment: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClickBack = () => navigate("/admin");

    const [list, setList] = useState<ChatReport[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<{chats: ChatReport[]}>("/admin/report/chat");
        setList(data.chats);
    };

    const handleClickChatroom = (chatRoomUid: string) => {
        
    };

    useEffect(() => {
        fetchItemList();
    }, []);
    
    return (
        <>
            <AdminActionBar onClickBackButton={handleClickBack} />
        </>
    );
};

export default ChatFragment;