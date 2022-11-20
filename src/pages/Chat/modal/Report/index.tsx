import ActionBar from "@/components/ActionBar";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import AdminItem from "@/pages/Admin/components/AdminItem";
import React from "react";
import { useNavigate } from "react-router-dom";

/** Images */
import AlarmFill from "@/assets/icon/alarm_fill.png";
import CloseRoundFill from "@/assets/icon/close_round_fill.png";
import ViewHideFill from "@/assets/icon/view_hide_fill.png";
import styled from "@emotion/styled";

interface Props {
    subjectUid: string;
    setPage: (type: "CANCEL" | "BLOCK") => void;
}

const Report: React.FC<Props> = ({ subjectUid, setPage }) => {

    const navigate = useNavigate();

    const handleClickButton = (type: "CANCEL" | "BLOCK") => {
        const text = type === "CANCEL" ? "매칭 취소" : "차단";
        const confirm = window.confirm(`정말 이 사용자를 ${text}할까요?`);
        if (confirm) {
            setPage(type);
        }
    }

    const handleClickReport = () => navigate("report" + "?subjectUid=" + subjectUid);

    return (
        <>
            <Container style={{
                padding: '0 20px'
            }}>
                <ActionBar />
                <Spacing.Vertical height={32} />
                <AdminItem
                    icon={<Icon src={CloseRoundFill} />}
                    iconColor={"#DDF45B"}
                    title={"매치 취소"}
                    subTitle={"상대방에게 알리지 않고 매치를 취소합니다."}
                    onClick={() => handleClickButton("CANCEL")} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={ViewHideFill} />}
                    iconColor={"#DDF45B"}
                    title={"차단"}
                    subTitle={"상대방에게 알리지 않고 상대를 차단합니다."}
                    onClick={() => handleClickButton("BLOCK")} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={AlarmFill} />}
                    iconColor={"#FF5100"}
                    title={"신고"}
                    subTitle={"상대방이 문제가 될 수 있는 행동을 했을 때 저희에게 알려주세요."}
                    onClick={handleClickReport} />
            </Container>
        </>
    );
};

const Icon = styled.img`
    width: 20px;
    height: 20px;
    min-width: 20px;
    min-height: 20px;
    object-fit: contain;
`;

export default Report;