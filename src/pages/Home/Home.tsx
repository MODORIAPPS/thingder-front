import styled from "@emotion/styled";
import React from "react";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "./components/BottomNavigationBar";

const Home: React.FC = () => {
    return (
        <Container>
            <Outlet />
            <NavWrapper>
                <BottomNavigationBar />
            </NavWrapper>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 100vh;
`;

const NavWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 56px;
    bottom: 0;
`;

export default Home;