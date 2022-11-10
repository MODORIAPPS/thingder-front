import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import AdminItem from "@/pages/Admin/components/AdminItem";
import React from "react";
import { useNavigate } from "react-router-dom";

/** Images */
import CloseRoundFill from "@/assets/icon/close_round_fill.png";
import ViewHideFill from "@/assets/icon/view_hide_fill.png";
import AlarmFill from "@/assets/icon/alarm_fill.png";

const Report: React.FC = () => {

    const navigate = useNavigate();
    const handleClickCancel = () => { };
    const handleClickBlock = () => { };
    const handleClickReport = () => { };

    return (
        <Container>
            <ActionBar />
            <Spacing.Vertical height={32} />
            <AdminItem
                icon={CloseRoundFill}
                iconColor={"#DDF45B"}
                title={"매치 취소"}
                subTitle={"상대방에게 알리지 않고 매치를 취소합니다."}
                onClick={handleClickCancel} />
            <AdminItem
                icon={ViewHideFill}
                iconColor={"#DDF45B"}
                title={"매치 취소"}
                subTitle={"상대방에게 알리지 않고 상대를 차단합니다."}
                onClick={handleClickBlock} />
            <AdminItem
                icon={AlarmFill}
                iconColor={"#FF5100"}
                title={"신고"}
                subTitle={"상대방이 문제가 될 수 있는 행동을 했을 때 저희에게 알려주세요."}
                onClick={handleClickReport} />
        </Container>
    );
};

export default Report;