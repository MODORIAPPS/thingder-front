import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImgArrowBack from "../assets/icon/arrow_back.png";
import ImgThingderLogo from "../assets/logo/thingder_logo_actionbar.png";

interface Props {
    onClickBackButton?: () => void;
    title?: string;
}

const ActionBar: React.FC<Props> = ({ onClickBackButton, title }) => {

    const navigate = useNavigate();

    const onClickBack = () => {
        if (typeof onClickBackButton !== "function") {
            navigate(-1);
            return;
        }

        onClickBackButton();
    }

    return (
        <Container>
            <Icon onClick={onClickBack} src={ImgArrowBack} />
            <ThingderLogo src={ImgThingderLogo} />
            <Icon onClick={onClickBack} style={{ opacity: 0 }} src={ImgArrowBack} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 56px;

    padding: 6px 24px;
`;

const Icon = styled.img`
    width: 27px;
    height: 25px;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;

export default ActionBar;