import api from "@/api";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import ItemDetailModal from "@/pageModal/ItemDetail/ItemDetailModal";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import ItemCard, { ItemCardType } from "@/pages/Home/fragments/Explore/components/ItemCard";
import { ListView } from "@/pages/Home/fragments/Explore/ExploreFragment";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";

interface ItemListResponse {
    members: ItemCardType[];
}

const ProfileFragment: React.FC = () => {
    const navigate = useNavigate();

    const handleClickBack = () => navigate("/admin");

    const dispatch = useAppDispatch();
    const [list, setList] = useState<ItemCardType[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<ItemListResponse>("/admin/members");
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
            <AdminActionBar onClickBackButton={handleClickBack} />

            <PullToRefresh onRefresh={() => fetchItemList()}>
                <ListView>
                    {
                        list?.map(item =>
                            <ItemCard
                                onClick={handleClickItem}
                                key={item.uid}
                                uid={item.uid}
                                nickname={item.nickname}
                                name={item.nickname}
                                thumbnail_src={item.image.src}
                                thumbnail_srcSet={item.image.srcSet}
                            />
                        )
                    }
                </ListView>
            </PullToRefresh>
            <Spacing.Vertical height={40} />

            <ItemDetailModal />
        </>
    );
};

export default ProfileFragment;