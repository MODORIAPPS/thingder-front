import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import "./index.css";
import RootNavigator from "./navigators/root.navigator";
const queryClient = new QueryClient();

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.createRoot(window.document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <RootNavigator />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
        <ToastContainer />
    </React.StrictMode>
);
