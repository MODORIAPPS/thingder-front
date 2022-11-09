import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "./index.css";
import RootNavigator from "./navigators/root.navigator";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, onMessage } from "firebase/messaging";
import { registerSW } from "virtual:pwa-register";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import firebaseConfig from "./firebase";
import { ModalProvider } from 'react-hooks-async-modal'

const queryClient = new QueryClient();


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

if ("serviceWorker" in navigator) {
    // && !/localhost/.test(window.location)) {
    registerSW();
}

onMessage(messaging, (payload) => {
    console.log(payload);
});

ReactDOM.createRoot(window.document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ModalProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <RootNavigator />
                    </BrowserRouter>
                </QueryClientProvider>
            </ModalProvider>
        </Provider>
        <ToastContainer />
    </React.StrictMode>
);
