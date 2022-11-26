import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import React from "react";

interface Props {
    thumbnail_src: string;
    thumbnail_srcSet: string;

    text: string
}

const CounterpartChat: React.FC<Props> = (props) => {
    return (
        <Container>
            <Thumbnail src={props.thumbnail_src} srcSet={props.thumbnail_srcSet} />
            <Chat>
                <span>
                    {props.text}
                </span>
            </Chat>
        </Container>
    );
};

const Container = styled.div`
    align-self: flex-start;

    /* display: flex;
    flex-direction: row; */

    margin-bottom: 20px;
`;

const Thumbnail = styled.img`
    width: 56px;
    height: 56px;

    display: inline-block;
    
    object-fit: cover;
    float: left;

    border-radius: 28px;
    background-color: gray;
`;

const Chat = styled.div`
    display: inline;
    box-sizing: border-box;
    padding: 6px 20px;

    background: rgba(157, 157, 157, 0.2);
    border-radius: 0px 16px 16px 16px;

    margin-left: 20px;
    float: left;

    span {
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        word-break: break-all;
    }
`;

export default CounterpartChat;
