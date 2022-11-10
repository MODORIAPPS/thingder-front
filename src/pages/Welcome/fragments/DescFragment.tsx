import styled from "@emotion/styled";
import React from "react";
import ImgShareIcon from "../../../assets/icon/share.png";
import PlainTextInput from "../../../components/PlainTextInput";
import Spacing from "../../../components/Spacing";
import { useTranslation, Trans } from "react-i18next";
import Introduction from "@/pages/Home/fragments/About/components/Introduction";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import Container from "@/components/Container";

interface Props {
    handleClickStartService: () => void;
    handleClickShare: () => void;
}

const DescFragment: React.FC<Props> = ({ handleClickStartService, handleClickShare }) => {

    return (
        <Container>
            <ActionBar>
                <Icon style={{ opacity: 0 }} />
                <Icon onClick={handleClickShare} src={ImgShareIcon} />
            </ActionBar>
            <Spacing.Vertical height={24} />

            <Body>
                <Typography.Header2>어서오세요 ❣️</Typography.Header2>
                <Spacing.Vertical height={32} />
                <Introduction />
                <Spacing.Vertical height={100} />
            </Body>

            <StickToBottom>
                <Button onClick={handleClickStartService} text="안녕!" />
            </StickToBottom>
        </Container>
    );
};

const Body = styled.div`
    padding: 0 30px;
    color: #404040;
    overflow-y: scroll;
`;

const ActionBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 7px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
    margin: 10px;
`;

const StickToBottom = styled.div`
    position: absolute;
    width: 100%;
    height: 50px;
    background-color: white;
    bottom: 35px;
    box-sizing: border-box;
    padding: 0 30px;
`;

export default DescFragment;