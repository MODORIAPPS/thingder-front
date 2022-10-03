import styled from "@emotion/styled";
import React from "react";
import Spacing from "./Spacing";
import Typography from "./Typography";

interface Props {
    label: string;
    value: string;
    placeholder?: string
    onChange: (value: string) => void;
}

const PlainTextInput: React.FC<Props> = ({ label, value, placeholder, onChange }) => {
    return (
        <>
            <Typography.Body2 style={{ color: "#000000bf" }}>{label}</Typography.Body2>
            <Spacing.Vertical height={11} />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.currentTarget.value)} />
            <Spacing.Vertical height={2} />
            <Divider />
        </>
    );
};

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

const Divider = styled.div`
    background-color: #00000040;
    height: 2px;
`;

export default PlainTextInput;