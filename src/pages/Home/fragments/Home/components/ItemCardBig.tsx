import styled from "@emotion/styled";
import dayjs from "dayjs";
import React from "react";
import Spacing from "../../../../../components/Spacing";
import Stack from "../../../../../components/Stack";
import Typography from "../../../../../components/Typography";
import ImgInfo from "@/assets/icon/info.png";
import { formatRelativeToAbsoluteURL } from "@/utils/formatter";
import { Direction } from "../types";

// image
import LikeImg from "@/assets/like_text.png";
import DislikeImg from "@/assets/dislike_text.png";

interface Props {
    onClickInfo: (uid: string) => void;

    isCursor: boolean;

    uid: string;

    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    genYear: number;
    genMonth: number;

    thumbnail_src: string;
    thubmnail_srcSet: string;

    currentDirection: Direction | undefined;
}

const ItemCardBig: React.FC<Props> = (props) => {

    const renderLikeImageView = () => {
        console.log(props.currentDirection)
        if (props.currentDirection !== "right" && props.currentDirection !== "left") return;
        const isLike = props.currentDirection === "right";
        const image = isLike ? LikeImg : DislikeImg;


        return (
            props.isCursor && <LikeImageView left={isLike} src={image} />
        );
    };

    return (
        <Container>
            <ItemImage src={props.thumbnail_src} srcSet={formatRelativeToAbsoluteURL(props.thubmnail_srcSet)} />
            {renderLikeImageView()}
            <BlackGradient>
                <Stack.Horizontal>
                    <Typography.Header1>{props.nickname}</Typography.Header1>
                    <div>
                        <Property>{props.genYear}년 {props.genMonth}월 제조</Property>
                        <Property>{props.name}</Property>
                    </div>
                </Stack.Horizontal>
                <Spacing.Vertical height={4} />
                <Stack.Horizontal>
                    <BottomWrapper>
                        <BottomProperty>제조국: {props.madeIn}</BottomProperty>
                        <BottomPropertyDivider />
                        <BottomProperty>브랜드: {props.brand}</BottomProperty>
                    </BottomWrapper>

                    <InfoButton src={ImgInfo} onClick={() => props.onClickInfo(props.uid)} />
                </Stack.Horizontal>
            </BlackGradient>
        </Container>
    );
};

/**
 * ItemCardBig
 */
const LikeImageView = styled.img<{ left: boolean }>`
    width: 158px;
    height: 53px;
    object-fit: cover;

    position: absolute;
    top: 16px;
    ${({ left }) => left ? 'left: 16px' : 'right: 16px'};
`;

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 520px;
    border-radius: 20px;

    overflow: hidden;

    background-color: #273a49;
    color: white;

    filter: drop-shadow(0px 13px 19px rgba(0, 0, 0, 0.0701213));

    @media (min-height: 500px) {
        height: 300px;
    }

    @media (min-height: 600px) {
        height: 400px;
    }
`;

const ItemImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
`;

const BottomBlackGradient = styled.div`

`;

/**
 * Properties
 */

const Nickname = styled.h2`

`;


const InfoButton = styled.img`
    width: 18px;
    height: 18px;
`;

const BlackGradient = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    min-height: 70px;
    width: 100%;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, #000000 100%);
    border-radius: 0px 0px 20px 20px;

    box-sizing: border-box;
    padding: 13px;
`;

const Property = styled.span`
    font-size: 0.75rem;
    display: block;
`;

const BottomWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BottomPropertyDivider = styled.div`
    width: 2px;
    height: 16px;
    background-color: #26C485;
    margin: 0 10px;
`;

const BottomProperty = styled.span`
    font-size: 0.875rem;
    line-height: 1.125;
`;

export default ItemCardBig;