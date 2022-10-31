import styled from "@emotion/styled";
import React from "react";

interface Props {
    text: string;
}

const MinepartChat: React.FC<Props> = ({ text }) => {
    return (
        <Chat>
            <span>{text}</span>
        </Chat>
    );
};

const Chat = styled.div`
    box-sizing: border-box;
    align-self: "flex-end";

    padding: 8px 16px;

    background: #DDF45B;
    border-radius: 0px 16px 16px 16px;
`;

export default MinepartChat;