import ActionBar from "@/components/ActionBar";
import Button from "@/components/Button";
import Spacing from "@/components/Spacing";
import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { Checkbox } from "react-input-checkbox";
import { useNavigate } from "react-router-dom";
import { StickToBottom } from "../Welcome/fragments/StartFragment";
import { registerPolicyText } from "./text";

const RegisterPolicy: React.FC = () => {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);

    const handleClickContinue = () => {
        if (checked) {
            navigate("/auth/register/item")
        }
    }

    return (
        <>
            <ActionBar />
            <Spacing.Vertical height={42} />
            <Container>
                <Typography.Header1>이용약관</Typography.Header1>
                <Spacing.Vertical height={26} />
                <PolicyBox>
                    {registerPolicyText}
                </PolicyBox>
                <Spacing.Vertical height={16} />

                {/* 이용약관 동의 체크박스 */}
                <CheckboxWrapper onClick={() => setChecked(!checked)}>
                    <Checkbox
                        theme="fancy-checkbox"
                        value={checked}
                        onChange={(e) => setChecked(!checked)}>
                    </Checkbox>
                    <Spacing.Horizontal width={8} />
                    <Typography.Subtitle4>본인은 19세 이상이며 이용약관에 동의합니다.</Typography.Subtitle4>
                </CheckboxWrapper>
            </Container>
            <StickToBottom>
                <Button onClick={handleClickContinue} text="계속" />
            </StickToBottom>
        </>
    );
};

const Container = styled.div`
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;

    bottom: 35px;
`;

const PolicyBox = styled.div`
    background: rgba(233, 233, 233, 0.5);
    border-radius: 20px;

    padding: 14px 20px;

    font-weight: 400;
    white-space: pre-wrap;

    max-height: 500px;

    overflow-y: scroll;

    color: grey;
`;

const CheckboxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin: 0 8px;
`;

export default RegisterPolicy;