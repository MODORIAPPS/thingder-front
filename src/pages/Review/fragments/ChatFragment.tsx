import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatFragment: React.FC = () => {
    const navigate = useNavigate();

    const handleClickBack = () => navigate("/admin");
    return (
        <>
            <AdminActionBar onClickBackButton={handleClickBack} />
        </>
    );
};

export default ChatFragment;