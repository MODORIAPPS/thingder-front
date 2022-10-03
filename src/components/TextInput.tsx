import styled from "@emotion/styled";
import React from "react";
import Spacing from "./Spacing";

interface Props {
    label: string;
    leadingIcon: React.ReactElement;

    value: string;
    onChange: (value: string) => void;

    error?: string;
}

const TextInput: React.FC<Props> = ({ label, leadingIcon, value, onChange, error }) => {
    return (
        <Container>
            <Label>{label}</Label>
            <Spacing.Vertical height={14} />
            <InputWrapper>
                {leadingIcon}
                <Spacing.Horizontal width={8} />
                <Input value={value} onChange={(e) => onChange(e.target.value)} />
            </InputWrapper>
            <Spacing.Vertical height={4} />
            <Divider />

            {
                error &&
                <>
                    <Spacing.Vertical height={6} />
                    <ErrorMessage>{error}</ErrorMessage>
                </>
            }
        </Container>
    );
};

const Container = styled.div`

`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Input = styled.input`
    overflow: hidden;

    width: 100%;

    font-size: 0.875rem;
    font-weight: 1.25rem;

    border: none;

    &:focus{
        outline: none;
    }

    ::placeholder {
        color: #00000040
    }
`;

const ErrorMessage = styled.span`
    color: #FF0000;
    font-size: 0.625rem;
    line-height: 0.938rem;
    margin-left: 4px;
`;

const Label = styled.span`
    font-size: 0.813rem;
    color: #999999;
`;

const Divider = styled.div`
    background: rgba(0, 0, 0, 0.25);
    height: 2px;
`;

export default TextInput;