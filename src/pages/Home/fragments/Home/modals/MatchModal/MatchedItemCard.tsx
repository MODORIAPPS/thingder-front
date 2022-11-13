import Spacing from "@/components/Spacing";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import styled from "@emotion/styled";
import React from "react";

interface Props {
    nickname: string;
    name: string;
    madeIn: string;
    brand: string;

    genYear: number;
    genMonth: number;

    thumbnail_src: string;
    thubmnail_srcSet: string;
}

const MatchedItemCard: React.FC<Props> = (
    {
        nickname,
        name,
        madeIn,
        brand,
        genYear,
        genMonth,
        thumbnail_src,
        thubmnail_srcSet
    }
) => {
    return (
        <Container>
            <ItemImage
                src={thumbnail_src}
                // srcSet={thubmnail_srcSet}
            />
            <BlackGradient>
                <Stack.Horizontal>
                    <Typography.Header1>{nickname}</Typography.Header1>
                    <div>
                        <Property>{genYear}년 {genMonth}월 제조</Property>
                        <Property>{name}</Property>
                    </div>
                </Stack.Horizontal>
                <Spacing.Vertical height={4} />
                <Stack.Horizontal>
                    <BottomWrapper>
                        <BottomProperty>제조국: {madeIn}</BottomProperty>
                        <BottomPropertyDivider />
                        <BottomProperty>브랜드: {brand}</BottomProperty>
                    </BottomWrapper>
                </Stack.Horizontal>
            </BlackGradient>
        </Container>
    );
};

const Container = styled.div`
 position: relative;
 width: 100%;
 height: 340px;
 border-radius: 20px;

 overflow: hidden;

 background-color: #273a49;
 color: white;

 filter: drop-shadow(0px 13px 19px rgba(0, 0, 0, 0.0701213));
`;

const ItemImage = styled.img`
 width: 100%;
 height: 340px;
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

export default MatchedItemCard;