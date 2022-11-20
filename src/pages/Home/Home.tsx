import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import BottomNavigationBar from "./components/BottomNavigationBar";
import Modal from 'react-modal';
import Container from "@/components/Container";

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

export const Body = styled.div`
    height: calc(100vh - ${BOTTOM_NAV_HEIGHT_PIXEL}px);
    overflow-y: scroll;
`;

export const NavWrapper = styled.div`
    height: ${BOTTOM_NAV_HEIGHT_PIXEL}px;
`;

export default Home;