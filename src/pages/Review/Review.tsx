import styled from "@emotion/styled";
import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Modal from 'react-modal';
import { Body, Container, NavWrapper } from "../Home/Home";
import BottomNavigationBar from "./components/BottomNavigationBar";

const Review: React.FC = () => {
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

export default Review;