import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import ImgArrow from "@/assets/icon/arrow_forward.svg";

interface Props {
    icon: React.ReactElement;
    iconColor: string;

    title: string;
    subTitle: string;

    onClick: () => void;
}

const AdminItem: React.FC<Props> = (props) => {
    return (
        <Container onClick={props.onClick}>
            <Wrapper>
                <IconBg style={{ backgroundColor: props.iconColor }}>
                    <IconWrapper>
                        {props.icon}
                    </IconWrapper>
                </IconBg>
                <Spacing.Horizontal width={20} />
                <div>
                    <Title>{props.title}</Title>
                    <Spacing.Vertical height={6} />
                    <SubTitle>{props.subTitle}</SubTitle>
                </div>
            </Wrapper>
            <ArrowIcon src={ImgArrow} />
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background-color: #FBFBFB;
    border-radius: 8px;
    box-sizing: border-box;
    padding: 20px;

    transition: .3s;

    cursor: pointer;

    &:hover {
        background-color: #ececec;
    }

    &:active {
        background-color: #ececec;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const IconWrapper = styled.div`
    position: absolute;
    left: 50%;;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const IconBg = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 28px;

    position: relative;
`;

const Title = styled.span`
    display: block;

    font-weight: bold;
    font-size: 1.125rem;
    line-height: 1.375rem;

    color: #424242;
`;

const SubTitle = styled.span`
    font-size: 0.873rem;
    line-height: 1.063rem;

    color: rgba(66, 66, 66, 0.8);
`;

const ArrowIcon = styled.img`
    width: 24px;
    height: 24px;
`;

export default AdminItem;