import ActionBar from "@/components/ActionBar";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import Button from "@/pages/Home/fragments/Chat/components/Button";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Report from "./Report";
import Modal from 'react-modal';
import { modalStyles } from "@/pages/Home/fragments/About/modal/AskToTalkModal";

export interface ChatReportProps {
    chatRoomUid: string;
    subjectUid: string;
    open: boolean;
    close: () => void;
}

const ReportChatModal: React.FC<ChatReportProps> = (
    {
        chatRoomUid,
        subjectUid,
        open,
        close,
    }
) => {

    const [page, setPage] = useState<"MENU" | "REPORT">("MENU");
    const [type, setType] = useState<"CANCEL" | "BLOCK">("CANCEL");
    const navigate = useNavigate();
    console.log(subjectUid);
    const handleClickReport = () => navigate("report/" + chatRoomUid + "?subjectUid=" + subjectUid);

    const handleClickReturn = () => {
        close();
    };

    return (
        <Modal isOpen={open} style={modalStyles}>
            {
                page === "MENU" ?
                    <Report
                        subjectUid={subjectUid}
                        setPage={(type) => {
                            setPage("REPORT")
                            setType(type)
                        }} />
                    :

                    <ChatModalContainer>
                        <ActionBar />

                        <div>
                            <Typography.Header2>
                                {type === "CANCEL" ? "매치가 취소되었습니다!" : "상대방이 차단되었습니다!"}
                            </Typography.Header2>
                            <Spacing.Vertical height={60} />
                            <Typography.Body2>
                                상대방이 문제가 될 수 있는 행동을 했다면<br /><Red>신고</Red>를 통해 저희에게 알려주세요.
                                <br /><br />
                                돌아가기를 누른 후에는 더 이상 이 프로필을<br />신고할 수 없어요.
                            </Typography.Body2>
                        </div>

                        <ChatButtonWrapper>
                            <Button
                                onClick={handleClickReport}
                                backgroundColor="#FF5100"
                                textColor="white">신고하기</Button>
                            <Spacing.Horizontal width={24} />
                            <Button
                                onClick={handleClickReturn}
                                backgroundColor="#26C485"
                                textColor="black">돌아가기</Button>
                        </ChatButtonWrapper>
                    </ChatModalContainer>}
        </Modal>
    );
};

export const ChatModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

export const ChatModalBody = styled.div`
    align-items: center;
`;

export const ChatButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
`;

export const Red = styled(Typography.Body2)`
    color: red;
`;

export default ReportChatModal;