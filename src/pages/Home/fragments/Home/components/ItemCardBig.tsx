import styled from "@emotion/styled";
import React from "react";
import Spacing from "../../../../../components/Spacing";
import Stack from "../../../../../components/Stack";
import Typography from "../../../../../components/Typography";

const image = "http://geojeseaworld.cafe24.com/wp-content/uploads/2018/03/bel6000.jpg";

interface Props {
    uid: string;

    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    madeAt: string;
}

const ItemCardBig: React.FC<Props> = ({ nickname }) => {
    return (
        <Container>
            <ItemImage src={image} />

            <BlackGradient>
                <Stack.Horizontal>
                    <Typography.Header1>{nickname}</Typography.Header1>
                    <div>
                        <Property>2013년 2월 제조</Property>
                        <Property>마약 배게</Property>
                    </div>
                </Stack.Horizontal>
                <Spacing.Vertical height={4} />
                <Stack.Horizontal>

                </Stack.Horizontal>
            </BlackGradient>
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 90%;
    height: 520px;
    border-radius: 20px;

    color: white;
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
    bottom: 0;
    min-height: 110px;
    width: 100%;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, #000000 100%);
    border-radius: 0px 0px 20px 20px;

    padding: 13px;
`;

const Property = styled.span`
    font-size: 12px;
    display: block;
`;

export default ItemCardBig;