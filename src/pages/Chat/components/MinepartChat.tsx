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
    align-self: flex-end;
    box-sizing: border-box;
    align-self: "flex-end";

    padding: 8px 16px;

    background: #DDF45B;
    border-radius: 16px 0px 16px 16px;

    margin-bottom: 20px;

    span {
        word-break: break-all;
        font-size: 14px;
        line-height: 24px;
        font-weight: 700;
    }
`;

export default MinepartChat;