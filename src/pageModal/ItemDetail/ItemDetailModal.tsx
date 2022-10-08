import api from "@/api";
import ActionBar from "@/components/ActionBar";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { closeMemberDetailAction } from "@/store/ui/ui.reducer";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Modal from 'react-modal';

/**
 * Member Detail
 */
const ItemDetailModal: React.FC = () => {

    const dispatch = useAppDispatch();
    const uid = useAppSelector(state => state.ui.memberDetailUid);
    const open = useAppSelector(state => state.ui.memberDetailModalVisible);

    const [data, setData] = useState<MemberDetail>();

    const fetchData = async () => {
        const { data } = await api.main.get<MemberDetail>("/member/" + uid);
        setData(data);
    };

    const handleClickBackButton = () => dispatch(closeMemberDetailAction());

    useEffect(() => {
        if (uid) {
            fetchData();
        }
    }, [uid]);

    if (!data) return <span>로딩중</span>

    return (
        <Modal isOpen={open} style={styles}>
            <ActionBar onClickBackButton={handleClickBackButton} />

            {/* 슬라이드 가능하게 */}
            <PresentImage src={data.images[0].src} />
        </Modal>
    );
};

const styles = {
    overlay: {

    },
    content: {
        padding: 0,
        margin: 0,
        inset: 0,
        width: '100%',
        height: 'calc(100%-70px)',
    }
}

interface MemberDetail {
    uid: string;
    images: { uid: string; src: string; srcSet: string }[];
    nickname: string;
    type: string;
    genYear: number;
    genCountry: number;
    brand: string;
    tag: string;
    description: string;
    story: string;
}

const PresentImage = styled.img`
    width: 100%;
    max-height: 400px;

    object-fit: contain;
`;


export default ItemDetailModal;