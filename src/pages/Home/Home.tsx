import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "./components/BottomNavigationBar";
import Modal from 'react-modal';

export const BOTTOM_NAV_HEIGHT_PIXEL = 70;

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
    height: calc(100vh - ${BOTTOM_NAV_HEIGHT_PIXEL}px);
    overflow-y: scroll;
`;

const NavWrapper = styled.div`
    height: ${BOTTOM_NAV_HEIGHT_PIXEL}px;
`;

export default Home;