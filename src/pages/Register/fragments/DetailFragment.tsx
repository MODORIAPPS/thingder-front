import styled from "@emotion/styled";
import React from "react";
import Spacing from "../../../components/Spacing";

const DetailFragment: React.FC = () => {
    return (
        <>
            <Spacing.Vertical height={16} />
            <Container>
                
            </Container>
        </>
    );
};

const Container = styled.div`
    box-sizing: border-box;
    padding: 0 20px;
`;

export default DetailFragment;