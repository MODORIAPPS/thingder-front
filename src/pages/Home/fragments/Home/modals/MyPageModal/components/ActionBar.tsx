import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImgArrowBack from "@/assets/icon/arrow_back.png";
import ImgThingderLogo from "@/assets/logo/thingder_logo_actionbar.png";
import ImgEditFill from "@/assets/icon/edit_fill.png";

interface Props {
    onClickBackButton?: () => void;
    onClickEditButton: () => void;
}

const ActionBar: React.FC<Props> = ({ onClickBackButton, onClickEditButton }) => {

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
            <Icon onClick={onClickEditButton} src={ImgEditFill} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    padding: 16px 24px;
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