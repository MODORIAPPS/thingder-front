import { useAppDispatch } from "@/hooks/redux";
import { fetchMyPage } from "@/store/edit-mypage/edit-mypage.reducer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailFragment from "./fragments/DetailFragment";
import PhotoEditFragment from "./fragments/PhotoEditFragment";

export type PageType = "EDIT" | "PHOTO";

const MyPage: React.FC = () => {

    const navigate = useNavigate();
    const [page, setPage] = useState<PageType>("EDIT");
    const dispatch = useAppDispatch();

    const handleChange = (type: PageType) => setPage(type);

    useEffect(() => {
        dispatch(fetchMyPage())
    }, []);

    return (
        page === "EDIT"
            ?
            <DetailFragment onClickBackButton={() => navigate(-1)} setPage={handleChange} />
            :
            <PhotoEditFragment onClickBackButton={() => setPage("EDIT")} />
    );
};

export default MyPage;