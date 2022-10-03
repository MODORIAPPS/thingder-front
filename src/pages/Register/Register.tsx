import styled from "@emotion/styled";
import React, { useState } from "react";
import ActionBar from "../../components/ActionBar";
import Spacing from "../../components/Spacing";
import Typography from "../../components/Typography";
import DetailFragment from "./fragments/DetailFragment";
import PhotoFragment from "./fragments/PhotoFragment";

const Register: React.FC = () => {

    const [page, setPage] = useState<"photo" | "detail">("photo");

    return (
        <Container>
            <ActionBar />
            <Spacing.Vertical height={16} />
            <Typography.Header1>회원가입</Typography.Header1>
            {
                page === "photo"
                    ?
                    <PhotoFragment />
                    :
                    <DetailFragment />
            }
        </Container>
    );
};

const Container = styled.div`

`;

export default Register;