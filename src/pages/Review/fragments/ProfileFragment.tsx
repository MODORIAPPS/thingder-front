import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileFragment: React.FC = () => {
    const navigate = useNavigate();

    const handleClickBack = () => navigate("/admin");
    return (
        <>
            <AdminActionBar onClickBackButton={handleClickBack} />
        </>
    );
};

export default ProfileFragment;