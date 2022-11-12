import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router-dom";
import ImgArrowBack from "@/assets/icon/arrow_back.png";
import ImgThingderLogo from "@/assets/logo/thingder_logo_actionbar.png";

interface Props {
    onClickBackButton?: () => void;

    /**
     * 처리 완료 버튼
     */
    isComplete?: boolean | undefined;
}

/**
 * Admin 및 Review 페이지에서 사용됨
 */
const AdminActionBar: React.FC<Props> = ({ onClickBackButton, isComplete }) => {

    const navigate = useNavigate();

    const onClickBack = () => {
        if (typeof onClickBackButton !== "function") {
            navigate(-1);
            return;
        }

        onClickBackButton();
    };

    const renderRightAction = () => {
        if (isComplete !== undefined) {
            return <CompleteText isComplete={isComplete}>처리 완료</CompleteText>
        }

        return <Icon onClick={onClickBack} style={{ opacity: 0 }} src={ImgArrowBack} />
    };

    return (
        <Container>
            <Icon onClick={onClickBack} src={ImgArrowBack} />
            <LogoWrapper>
                <ThingderLogo src={ImgThingderLogo} />
                <AdminLogoText>admin</AdminLogoText>
            </LogoWrapper>
            {renderRightAction()}
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

const LogoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ThingderLogo = styled.img`
    width: 78px;
    height: 25px;
    object-fit: contain;
`;

const AdminLogoText = styled.span`
    display: inline-block;
    margin-left: 4px;
    color: #424242;
    font-size: 19px;
    line-height: 25px;
    font-weight: bold;
`;

const CompleteText = styled.span<{ isComplete: boolean }>`
    color: ${({ isComplete }) => isComplete ? "#31313185" : "#858585"};
    font-size: 12px;
    line-height: 16px;
`;

/** 처리 완료 */
const Complete = styled.span`
    color: #858585;
    font-size: 12px;
    line-height: 16px;
`;

export default AdminActionBar;