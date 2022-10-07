import styled from "@emotion/styled";
import React from "react";
import ImgNotifeeDot from "@/assets/notifee_dot.png";
import Spacing from "@/components/Spacing";

interface Props {
    uid: string;

    isRead: boolean;

    thumbnail_src: string;
    thumbnail_srcSet: string;

    itemNickname: string;
    lastChat: string;
}

const ChatRoomItem: React.FC<Props> = (props) => {
    return (
        <Container>
            <ImageWrapper>
                <Image src={props.thumbnail_src} srcSet={props.thumbnail_srcSet} />
                {
                    props.isRead &&
                    <NotifeeDot src={ImgNotifeeDot} />
                }
            </ImageWrapper>
            <Spacing.Horizontal width={12} />
            <div>
                <ItemNickname>{props.itemNickname}</ItemNickname>
                <LastChat>{props.lastChat}</LastChat>
            </div>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 16px 22px;

    border-bottom: 1px solid rgba(0, 0, 0, 0.15);

    &:focus{
        opacity: .8;
    }

    &:active{
        opacity: .8;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
`;

const Image = styled.img`
    width: 65px;
    height: 65px;

    object-fit: cover;
    border-radius: 65px;
`;

const NotifeeDot = styled.img`
    position: absolute;
    right: -7px;

    width: 15px;
    height: 15px;

    top: 50%;
    transform: translate(0, -50%);
`;

const ItemNickname = styled.h3`
    margin-top: 0;
    margin-bottom: 6px;
    font-size: 18px;
    line-height: 22px;
    font-weight: bold;
    color: #424242;
`;

const LastChat = styled.span`
    font-size: 14px;
    color: #424242;
`;

export default ChatRoomItem;