import ActionBar from "@/components/ActionBar";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import React from "react";
import Button from "../components/Button";
import { ChatButtonWrapper, ChatModalContainer, Red } from "./CancelMatchModal";

const CancelMatchModal: React.FC = () => {
    return (
        <ChatModalContainer>
            <ActionBar />

            <div>
                <Typography.Header2>상대방이 차단되었습니다!</Typography.Header2>
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
                    backgroundColor="#26C485"
                    textColor="black">신고하기</Button>
            </ChatButtonWrapper>
        </ChatModalContainer>
    );
};


export default CancelMatchModal;