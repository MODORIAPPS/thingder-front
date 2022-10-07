import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import ItemCard, { ItemCardType, sampleData } from "./components/ItemCard";
import TopBar from "./components/TopBar";

const fetchItemList: Promise<ItemCardType[]> = new Promise<ItemCardType[]>((resolve) => {
    setTimeout(() => {
        resolve(sampleData);
    }, 1000);
})

const ExploreFragment: React.FC = () => {

    const { status, data, error, refetch } = useQuery(["items"], () => fetchItemList);

    if (status === "loading") {
        return <span>Loading...</span>
    }

    if (status === "error") {
        return <span>Error</span>
    }

    return (
        <>
            <TopBar />
            <PullToRefresh onRefresh={() => refetch()}>
                <ListView>
                    {
                        data.map(item =>
                            <ItemCard
                                key={item.uid}
                                uid={item.uid}
                                nickname={item.nickname}
                                name={item.name}
                                thumbnail_src={item.thumbnail_src}
                                thumbnail_srcSet={item.thumbnail_srcSet}
                            />
                        )
                    }
                </ListView>
            </PullToRefresh>
            <Spacing.Vertical height={40} />
        </>
    )
};

const ListView = styled.div`

    padding: 0 22px;
    box-sizing: border-box;

    overflow-y: scroll;
    overflow-x: hidden;
    display: grid;

    grid-template-columns: 1fr;
    grid-gap: 12px;

    @media (min-width: 300px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

export default ExploreFragment;