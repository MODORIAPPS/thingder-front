import api from "@/api";
import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../../About/modal/AskToTalkModal";

const ReportProfile: React.FC = () => {

    const navigate = useNavigate();

    const { id: memberUid } = useParams();
    const [text, setText] = useState("");

    const handleClickReport = async () => {
        if (!text || !memberUid) return;
        try {
            await api.main.post("/member/" + memberUid + "/report", {
                message: text,
            })
            alert("감사합니다. 신고가 접수되었습니다.");
            navigate(-2);
        } catch (e) {
            alert("죄송합니다. 문제가 발생했습니다. 잠시 뒤 다시 시도해주세요.")
        }
    };

    return (
        <Container>
            <ActionBar />

            <Spacing.Vertical height={16} />
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


export default ReportProfile;