import styled from "@emotion/styled";
import React from "react";

/** Images */
import ArrowBackImg from "@/assets/icon/arrow_back.png";
import SettingFillImg from "@/assets/icon/setting_fill.png";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";

interface Props {
    onClickBack: () => void;
    onClickGuard: () => void;
    title: string;
}

const TopBar: React.FC<Props> = (
    {
        onClickBack,
        onClickGuard,
        title
    }
) => {
    return (
        <Container>
            <LeftWrapper>
                <ArrowBack onClick={onClickBack} src={ArrowBackImg} />
                <Spacing.Horizontal width={54} />
                <Typography.Header2>{title}</Typography.Header2>
            </LeftWrapper>
            <Guard onClick={onClickGuard} src={SettingFillImg} />
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
`;

const LeftWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ArrowBack = styled.img`
    width: 24px;
    height: 24px;
`;

const Guard = styled.img`
    width: 24px;
    height: 24px;
`;

export default TopBar;