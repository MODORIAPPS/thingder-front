import styled from "@emotion/styled";
import React from "react";
import Modal from "react-modal";
import Spacing from "./Spacing";

interface Props {
    open: boolean;
    handleClickLeft: () => void;
    handleClickRight: () => void;
}

const PolicyErrorDialog: React.FC<Props> = ({
    open,
    handleClickLeft,
    handleClickRight
}) => {
    return (
        <Modal isOpen={open} style={styles}>
            <Body>
                <Spacing.Vertical height={24} />
                <Title>
                    업로드한 사진이 이용약관에<br />
                    위배되어 삭제되었습니다.
                </Title>
                <Spacing.Vertical height={30} />
                <Content>새로운 사진을 올려주세요!</Content>
                <Spacing.Vertical height={25} />
            </Body>
            <Divider />
            <ButtonWrapper>
                <Button onClick={handleClickLeft}>
                    프로필 수정
                </Button>
                <ButtonDivider />
                <Button onClick={handleClickRight}>
                    계속하기
                </Button>
            </ButtonWrapper>
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        width: 310,
        borderRadius: '20px',
        background: 'rgba(233, 233, 233, 0.85)',
    }
};

const Title = styled.span`
    text-align: center;
    color: #404040;
    font-size: 18px;
    line-height: 30px;
`;

const Content = styled.span`
    text-align: center;
    font-size: 14px;
    line-height: 18px;
`;

const Divider = styled.div`
    height: 0.25px;
    background: rgba(0, 0, 0, 0.25);
`;

const Dialog = styled.div`
    width: 310px;
    border-radius: 20px;
    background: rgba(233, 233, 233, 0.85);
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Button = styled.div`
    flex: 1;
    font-size: 18px;
    line-height: 30px;
    color: #404040;
    text-align: center;
    cursor: pointer;
`;

const ButtonDivider = styled.div`
    height: 50px;
    width: 0.25px;
    background-color: rgba(0,0,0,0.25);
`;

export default PolicyErrorDialog;