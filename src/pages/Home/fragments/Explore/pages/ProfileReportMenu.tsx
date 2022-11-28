import AdminItem from "@/pages/Admin/components/AdminItem";

/** Images */
import AlarmFill from "@/assets/icon/alarm_fill.png";
import ViewHideFill from "@/assets/icon/view_hide_fill.png";
import styled from "@emotion/styled";
import Spacing from "@/components/Spacing";
import ActionBar from "@/components/ActionBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfileReportMenu: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const handleClickBlock = () => {
        const confirm = window.confirm(`정말 이 사용자를 차단할까요?`);
        if (confirm) {
            navigate("report");
        }
    };

    const handleClickReport = () => {
        navigate("report");
    };

    useEffect(() => {
        if (!id) navigate(-1);
    }, []);

    return (
        <div className="flex flex-col h-full px-2">
            <ActionBar />
            <Spacing.Vertical height={40} />
            <AdminItem
                icon={<Icon src={ViewHideFill} />}
                iconColor={"#DDF45B"}
                title={"차단"}
                subTitle={"상대방에게 알리지 않고 상대를 차단합니다."}
                onClick={handleClickBlock} />
            <Spacing.Vertical height={10} />
            <AdminItem
                icon={<Icon src={AlarmFill} />}
                iconColor={"#FF5100"}
                title={"신고"}
                subTitle={"상대방이 문제가 될 수 있는 행동을 했을 때 저희에게 알려주세요."}
                onClick={handleClickReport} />
        </div>
    );
};

const Icon = styled.img`
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    object-fit: contain;
`;

export default ProfileReportMenu;