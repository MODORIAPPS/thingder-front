import api from "@/api";
import Spacing from "@/components/Spacing";
import { useAppDispatch } from "@/hooks/redux";
import AdminActionBar from "@/pages/Admin/components/AdminActionBar";
import ItemCard from "@/pages/Home/fragments/Explore/components/ItemCard";
import { ListView } from "@/pages/Home/fragments/Explore/ExploreFragment";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import ProfileItemCard from "../components/ProfileItemCard";
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

    const [targetUid, setTargetUid] = useState("");
    const [memberUid, setMemberUid] = useState("");
    const [description, setDescription] = useState("");

    const [list, setList] = useState<Profile[]>([]);

    const fetchItemList = async () => {
        const { data } = await api.main.get<{ profiles: Profile[] }>("/admin/report/profile");
        console.log(data.profiles);
        setList(data.profiles);
    };

    const handleClickItem = (uid: string) => {
        setTargetUid(uid);
        const item = list.find(item => item.uid === uid);
        if(!item) return;
        setMemberUid(item?.memberUid);
        setDescription(item.message);
        setOpen(true);
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
                            <ProfileItemCard
                                key={item.uid}
                                uid={item.uid}
                                memberUid={item.memberUid}
                                onClick={handleClickItem}
                                message={item.message} />
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
                    targetUid={targetUid}
                    memberUid={memberUid}
                    description={description}
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