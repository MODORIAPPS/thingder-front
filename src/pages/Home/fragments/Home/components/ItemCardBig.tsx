import styled from "@emotion/styled";
import dayjs from "dayjs";
import React from "react";
import Spacing from "../../../../../components/Spacing";
import Stack from "../../../../../components/Stack";
import Typography from "../../../../../components/Typography";

export const image = "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg";

interface Props {
    uid: string;

    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    madeAt: string;

    thumbnail_src: string;
    thubmnail_srcSet: string;
}

const ItemCardBig: React.FC<Props> = (props) => {
    return (
        <Container>
            <ItemImage src={image} />

            <BlackGradient>
                <Stack.Horizontal>
                    <Typography.Header1>{props.nickname}</Typography.Header1>
                    <div>
                        <Property>{dayjs(props.madeAt).format("YYYY년 MM월 제조")}</Property>
                        <Property>{props.name}</Property>
                    </div>
                </Stack.Horizontal>
                <Spacing.Vertical height={4} />
                <BottomWrapper>
                    <BottomProperty>제조국: {props.madeIn}</BottomProperty>
                    <BottomPropertyDivider />
                    <BottomProperty>브랜드: {props.brand}</BottomProperty>
                </BottomWrapper>
            </BlackGradient>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 520px;
    border-radius: 20px;

    overflow: hidden;

    color: white;

    filter: drop-shadow(0px 13px 19px rgba(0, 0, 0, 0.0701213));
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