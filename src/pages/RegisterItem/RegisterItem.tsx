import styled from "@emotion/styled";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionBar from "../../components/ActionBar";
import Spacing from "../../components/Spacing";
import Typography from "../../components/Typography";
import DetailFragment from "./fragments/DetailFragment";
import PhotoFragment from "./fragments/PhotoFragment";

const RegisterItem: React.FC = () => {

    const navigate = useNavigate();

    const handleClickBackButton = () => {
        const confirm = window.confirm("회원가입을 취소하시겠어요?");
        if (confirm) {
            navigate(-1);
        }
    };

    return (
        <Container>
            <DetailFragment onClickBackButton={handleClickBackButton} />
        </Container>
    );
};

const Container = styled.div`

`;

const Icon = styled.img`
    width: 28px;
    height: 28px;
`;

export default RegisterItem;