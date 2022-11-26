import api from "@/api";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import ItemCard, { ItemCardType } from "./components/ItemCard";
import TopBar from "./components/TopBar";

interface ItemListResponse {
    members: ItemCardType[];
}

const ExploreFragment: React.FC = () => {

    const dispatch = useAppDispatch();
    const [list, setList] = useState<ItemCardType[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<ItemListResponse>("/matching/");
        setList(data.members);
    };

    const handleClickItem = (uid: string) => {
        dispatch(showMemberDetailAction(uid));
    };

    useEffect(() => {
        fetchItemList();
    }, []);

    return (
        <>
            <TopBar />
            <PullToRefresh onRefresh={() => fetchItemList()}>
                <ListView>
                    {/* 어드민 계정 안보이게 하기 위해 처리 .filter(item => item.nickname) */}
                    {
                        list?.filter(item => item.nickname).map(item =>
                            <ItemCard
                                onClick={handleClickItem}
                                key={item.uid}
                                uid={item.uid}
                                nickname={item.nickname}
                                name={item.nickname}
                                thumbnail_src={item.image?.src ?? ""}
                                thumbnail_srcSet={item.image?.srcSet ?? ""}
                            />
                        )
                    }
                </ListView>
            </PullToRefresh>
            <Spacing.Vertical height={40} />

            <ItemDetailModal />
        </>
    )
};

export const ListView = styled.div`

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