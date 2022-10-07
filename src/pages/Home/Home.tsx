import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "./components/BottomNavigationBar";
import Modal from 'react-modal';

const Home: React.FC = () => {

    useEffect(() => {
        Modal.setAppElement("#body")
    }, []);

    return (
        <Container>
            <Body id="body">
                <Outlet />
            </Body>
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

const Body = styled.div`
    overflow-y: scroll;
    height: calc(100% - 70px);
`;

const NavWrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
`;

export default Home;