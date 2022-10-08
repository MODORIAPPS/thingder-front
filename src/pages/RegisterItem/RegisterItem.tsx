import styled from "@emotion/styled";
import React, { useState } from "react";
import ActionBar from "../../components/ActionBar";
import Spacing from "../../components/Spacing";
import Typography from "../../components/Typography";
import DetailFragment from "./fragments/DetailFragment";
import PhotoFragment from "./fragments/PhotoFragment";

const RegisterItem: React.FC = () => {

    const [page, setPage] = useState<"photo" | "detail">("photo");

    const handleClickContinue = () => setPage("detail");
    return (
        <Container>
            {
                page === "photo"
                    ?
                    <PhotoFragment onClickContinueButton={handleClickContinue} />
                    :
                    <DetailFragment onClickBackButton={() => setPage("photo")} />
            }
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