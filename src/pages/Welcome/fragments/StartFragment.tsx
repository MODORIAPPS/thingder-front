import styled from "@emotion/styled";
import React from "react";
import ImgThingderLogoStart from "@/assets/logo/thingder_logo_start.png";
import Button from "../../../components/Button";
import Spacing from "../../../components/Spacing";
import Typography from "../../../components/Typography";

interface Props {
    handleClickHello: () => void;
}

const StartFragment: React.FC<Props> = ({ handleClickHello }) => {
    return (
        <Container>
            <VerticalStack>
                <LogoImg alt="thingder_logo_start" src={ImgThingderLogoStart} />
                <Spacing.Vertical height={42} />
                <Typography.Body1 style={{ color: "#B6B6B6" }}>언어를 선택해주세요</Typography.Body1>
            </VerticalStack>
            <StickToBottom>
                <Button onClick={handleClickHello} text="시작" />
            </StickToBottom>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
`;

const VerticalStack = styled.div`
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StickToBottom = styled.div`
    width: 100%;
    position: absolute;
    bottom: 35px;
    box-sizing: border-box;
    padding: 0 30px;
`;

const LogoImg = styled.img`
    width: 133px;
`;

export default StartFragment;