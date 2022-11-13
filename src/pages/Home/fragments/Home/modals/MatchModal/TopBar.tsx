import styled from "@emotion/styled";
import React from "react";

/** Images */
import CloseIcon from "@/assets/icon/close.svg";
import ThingderLogoImg from "@/assets/logo/thingder_logo_matched.png"

interface Props {
    onClickClose: () => void;
}

const TopBar: React.FC<Props> = ({ onClickClose }) => {
    return (
        <Container>
            <Icon style={{opacity: 0}} src={CloseIcon} />
            <ThingderLogo src={ThingderLogoImg} />
            <Icon onClick={onClickClose} src={CloseIcon} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 56px;
`;

const ThingderLogo = styled.img`
    height: 25px;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

export default TopBar;