import ActionBar from "@/components/ActionBar";
import styled from "@emotion/styled";
import React from "react";
import AdminItem from "./components/AdminItem";
import { useNavigate } from "react-router-dom";
import Spacing from "@/components/Spacing";
import Redcut from "@/assets/logo/redcut_logo.png";

// Images
import ImgReview from "@/assets/icon/admin/review.svg";
import ImgViewHide from "@/assets/icon/admin/view_hide.svg";
import AlarmFill from "@/assets/icon/admin/alarm_fill.svg";
import Message from "@/assets/icon/admin/message.svg";

const Admin: React.FC = () => {

    const navigate = useNavigate();

    const handleClickReview = () => { };
    const handleClickChatReport = () => { };
    const handleClickProfileReport = () => { };
    const handleClickAsk = () => { };
    const handleClickResult = () => { };

    return (
        <>
            <ActionBar />
            <Container>
                <Spacing.Vertical height={16} />
                <AdminHeader>
                    <AdminImage src={Redcut} />
                    <Spacing.Horizontal width={16} />
                    <Text>Admin</Text>
                </AdminHeader>
                <Spacing.Vertical height={34} />
                <AdminItem
                    icon={<Icon src={ImgReview} />}
                    iconColor={"#DDF45B"}
                    title={"사진 리뷰"}
                    subTitle={"프로필 사진에 물건만 있는지 확인"}
                    onClick={handleClickReview} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={ImgViewHide} />}
                    iconColor={"#FF5100"}
                    title={"채팅 신고"}
                    subTitle={"채팅 신고 내역 확인"}
                    onClick={handleClickChatReport} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={AlarmFill} />}
                    iconColor={"#FF5100"}
                    title={"프로필 신고"}
                    subTitle={"프로필 신고 내역 확인"}
                    onClick={handleClickProfileReport} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={ImgReview} />}
                    iconColor={"#DDF45B"}
                    title={"할 말 있어요"}
                    subTitle={"물건들의 할 말 확인"}
                    onClick={handleClickAsk} />
                <Spacing.Vertical height={10} />
                <AdminItem
                    icon={<Icon src={Message} />}
                    iconColor={"#DDF45B"}
                    title={"처리 내역"}
                    subTitle={"차단 처리 내역"}
                    onClick={handleClickResult} />
            </Container>
        </>
    );
};

const Container = styled.div`
    padding: 0 20px;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    object-fit: contain;
`;

const AdminHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 20px;
`;

const AdminImage = styled.img`
    width: 56px;
    height: 56px;
`;

const Text = styled.span`
    font-size: 1.5rem;
    line-height: 1.938rem;
    color: #424242;
`;

export default Admin;