import api from "@/api";
import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import ChatRoomAction from "@/utils/db";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TextArea } from "../../About/modal/AskToTalkModal";

const ChatReport: React.FC = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("subjectUid"))
    const [text, setText] = useState("");

    const handleClickReport = async () => {
        const subjectUid = searchParams.get("subjectUid");
        if (!text || !subjectUid || !id) return;
        try {
            await api.main.post("/chat/" + id, {
                message: text,
                subjectUid
            })
            alert("신고가 접수되었습니다.");
            navigate(-2);
            ChatRoomAction.removeChatRoom(id);
        } catch (e) {
            alert("죄송합니다. 문제가 발생했습니다.")
        }
    };

    return (
        <Container>
            <ActionBar />
            <Body>
                <Typography.Body2>
                    상대방이 문제가 될 수 있는 행동을 했다면 <Red>신고</Red>를 통해 저희에게 알려주세요.
                </Typography.Body2>
                <Spacing.Vertical height={20} />
                <TextArea placeholder="신고 내용을 작성해주세요." value={text} onChange={e => setText(e.target.value)} />
                <Spacing.Vertical height={56} />
            </Body>

            <ButtonWrapper>
                <Button onClick={handleClickReport} text="신고접수" />
            </ButtonWrapper>
        </Container>
    );
};

const Body = styled.div`
    padding: 0 38px;
`;

const ButtonWrapper = styled.div`
    padding: 0 26px;
`;

const Red = styled(Typography.Body2)`
color: red;
`;


export default ChatReport;