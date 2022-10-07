import styled from "@emotion/styled";
import React from "react";
import ImgShareIcon from "@/assets/icon/share.png";
import ImgThingderLogo from "@/assets/logo/thingder_logo_actionbar.png";

interface Props {
    onClickShare: () => void;
}

const TopBar: React.FC<Props> = ({ onClickShare }) => {
    return (
        <Container>
            <Icon style={{ opacity: 0 }} src={ImgShareIcon} />
            <ThingderLogo src={ImgThingderLogo} />
            <Icon onClick={onClickShare} src={ImgShareIcon} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 56px;

    padding: 6px 24px;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;


const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

export default TopBar;