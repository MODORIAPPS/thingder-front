import ActionBar from "@/components/ActionBar";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ChatReportFragment from "../pages/ChatReport";

export interface ChatReportProps {
    chatRoomUid: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    type: "CANCEL" | "BLOCK";
}

const ReportChatModal: React.FC<ChatReportProps> = (
    {
        chatRoomUid,
        open,
        setOpen,
        type
    }
) => {


    const navigate = useNavigate();

    const handleClickReport = () => setPage("REPORT");

    const handleClickReturn = () => {
        setOpen(false);
        navigate(-2);
    };

    return (
        <ChatModalContainer>
            {
                page === "MENU" ?
                    <>
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
                                backgroundColor="#FF5100"
                                textColor="white">신고하기</Button>
                            <Spacing.Horizontal width={24} />
                            <Button
                                onClick={handleClickReturn}
                                backgroundColor="#26C485"
                                textColor="black">돌아가기</Button>
                        </ChatButtonWrapper>
                    </>
                    :
                    <ChatReportFragment handleClickBack={() => setPage("MENU")} />
            }
        </ChatModalContainer>
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