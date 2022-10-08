import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";
import Typography from "../../components/Typography";

const PasswordReset: React.FC = () => {

    const handleClickContinue = () => {

    };

    return (
        <>
            <ActionBar />
            <Spacing.Vertical height={16} />
            <Container>
                <Typography.Header1>비밀번호 재설정</Typography.Header1>

                <Spacing.Vertical height={36} />

                <Button text="계속" onClick={handleClickContinue} />
            </Container>
        </>
    );
};

const Container = styled.div`
    padding: 0 20px;
    box-sizing: border-box;
`;

const ConfirmCodeButton = styled.span`
    display: inline-block;
    font-size: 14px;
    box-sizing: border-box;
    padding: 4px 8px;
    background-color: grey;
    border-radius: 16px;
    margin-top: 4px;
    color: white;
`;

export default PasswordReset;