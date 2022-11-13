import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImgThingderLogo from "../../../../../assets/logo/thingder_logo_actionbar.png"
import ImgRedCutLogo from "../../../../../assets/logo/redcut_logo.png";

interface Props {
    handleClickRedCut: () => void;
}

const HomeFragTopBar: React.FC<Props> = ({ handleClickRedCut }) => {

    const navigate = useNavigate();

    const onClickRedCut = () => handleClickRedCut();

    return (
        <Container>
            <Icon onClick={onClickRedCut} src={ImgRedCutLogo} />
            <ThingderLogo src={ImgThingderLogo} />
            <Icon style={{ opacity: 0 }} src={ImgRedCutLogo} />
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
    width: 40px;
    height: 40px;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;

export default HomeFragTopBar;