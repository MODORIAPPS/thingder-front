import api from "@/api";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import ItemCard, { ItemCardType } from "@/pages/Home/fragments/Explore/components/ItemCard";
import { ListView } from "@/pages/Home/fragments/Explore/ExploreFragment";
import { showMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import RemainedReviewCount from "../components/RemainedReviewCount";
import AdminItemDetailModal from "../modals/AdminItemDetailModal";

// interface ItemListResponse {
//     members: ItemCardType[];
// }

interface Profile {
    uid: string;
    memberUid: string;
    message: string;
}

const ProfileFragment: React.FC = () => {
    const navigate = useNavigate();

    const handleClickBack = () => navigate("/admin");

    const [open, setOpen] = useState(false);
    const [memberUid, setMemberUid] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useAppDispatch();
    const [list, setList] = useState<Profile[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<{ profiles: Profile[] }>("/admin/report/profile");
        console.log(data.profiles);
        setList(data.profiles);
    };

    const handleClickItem = (uid: string) => {
        setMemberUid(uid);
        setDescription(list.filter(item => item.memberUid === memberUid)[0].message)
    };

    useEffect(() => {
        fetchItemList();
    }, []);

    return (
        <Container>
            <AdminActionBar onClickBackButton={handleClickBack} />
            <RemainedReviewCount>남은 리뷰 건수: {list.length}개</RemainedReviewCount>

            <PullToRefresh onRefresh={() => fetchItemList()}>
                <ListView>
                    {
                        list?.map(item =>
                            <ItemCard
                                onClick={handleClickItem}
                                key={item.uid}
                                uid={item.uid}
                                nickname={""}
                                name={""}
                                thumbnail_src={""}
                                thumbnail_srcSet={""}
                            />
                        )
                    }
                </ListView>
            </PullToRefresh>
            <Spacing.Vertical height={40} />

            {
                list.length > 0
                && <AdminItemDetailModal
                    open={open}
                    close={() => setOpen(false)}
                    memberUid={memberUid}
                    description={list.filter(item => item.memberUid === memberUid)[0].message}
                />
            }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default ProfileFragment;