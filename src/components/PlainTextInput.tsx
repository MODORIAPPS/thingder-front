import styled from "@emotion/styled";
import React, { InputHTMLAttributes } from "react";
import Spacing from "./Spacing";
import Typography from "./Typography";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    handleChange: (value: string) => void;
    onEnter?: () => void;
}

const PlainTextInput: React.FC<Props> = ({
    label,
    value,
    placeholder,
    handleChange,
    onEnter,
    ...rest
}) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log("dd");
            if(typeof onEnter === "function") onEnter();
        }
    };

    return (
        <>
            <Typography.Body2 style={{ color: "rgba(0, 0, 0, 0.75)" }}>{label}</Typography.Body2>
            <Spacing.Vertical height={11} />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={e => handleChange(e.currentTarget.value)}
                onKeyDown={handleKeyDown}
                {...rest} />
            <Spacing.Vertical height={2} />
            <Divider />
        </>
    );
};

export const Input = styled.input`
    overflow: hidden;

    width: 100%;

    font-size: 0.875rem;
    font-weight: 1.25rem;

    border: none;

    &:focus{
        outline: none;
    }

    ::placeholder {
        color: #00000040;
    }
`;

export const Divider = styled.div`
    background-color: #00000040;
    height: 2px;
`;

export default PlainTextInput;