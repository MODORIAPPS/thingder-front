import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImgThingderLogo from "../../../../../assets/logo/thingder_logo_actionbar.png"
import ImgRedCutLogo from "../../../../../assets/logo/redcut_logo.png";
import { useAppSelector } from "@/hooks/redux";

interface Props {
    handleClickRedCut: () => void;
}

const HomeFragTopBar: React.FC<Props> = ({ handleClickRedCut }) => {

    const images = useAppSelector(state => state.user.data?.member.images);

    const navigate = useNavigate();

    const onClickRedCut = () => handleClickRedCut();

    const renderLeftIcon = () => {
        if (!images || images.length < 1) return <Icon onClick={onClickRedCut} src={ImgRedCutLogo} />;

        const presentImage = images[0];
        return <Icon onClick={onClickRedCut} src={presentImage.src} srcSet={presentImage.srcSet} />
    };

    return (
        <Container>
            {renderLeftIcon()}
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
    border-radius: 20px;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;

export default HomeFragTopBar;