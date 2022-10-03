import styled from "@emotion/styled";
import React from "react";
import Spacing from "../../../components/Spacing";
import { Checkbox } from 'react-input-checkbox';
import Typography from "../../../components/Typography";

interface Props {
    checked: boolean;
    onChanged: (boolean: string) => void;
}

const RememberCheckbox: React.FC<Props> = ({ checked, onChanged }) => {
    return (
        <Container>
            {/* <Checkbox
                theme="fancy-checkbox"
                value={checked}
                onChange={(e) => onChanged(e.target.checked)}>
            </Checkbox> */}
            <Spacing.Horizontal width={8} />
            <Typography.Subtitle4>이메일 기억하기</Typography.Subtitle4>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export default RememberCheckbox;

