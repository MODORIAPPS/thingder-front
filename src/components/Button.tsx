import styled from "@emotion/styled";
import React from "react";
import Typography from "./Typography";
import Colors from "../styles/color";

interface Props {
    text: string;
    onClick: () => void;

    disable?: boolean;
}

const Button: React.FC<Props> = (props) => {

    const handleClick = () => {
        if (props.disable) return;

        props.onClick();
    }

    return (
        <Container style={{ backgroundColor: Colors.Primary }} onClick={handleClick}>
            <Typography.Subtitle2 style={{ color: "#ffffff" }}>{props.text}</Typography.Subtitle2>
        </Container>
    );
};

const Container = styled.div`
    background-color: ${Colors.Primary};
    min-height: 53px;
    display: flex;
    /* width: 100%; */
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    transition: 0.1s;

    &:hover{
        cursor: pointer;
        /* opacity: .8; */
    }

    &:active{
        opacity: .9;
    }
`;

export default Button;