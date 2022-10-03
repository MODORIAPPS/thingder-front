import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AuthNavigator from "./navigators/auth.navigator";
import "./index.css";
import RootNavigator from "./navigators/root.navigator";


ReactDOM.createRoot(window.document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <RootNavigator />
        </BrowserRouter>
    </React.StrictMode>
);
