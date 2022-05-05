import React, {FC} from "react";
import {MainRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import config from "src/config";

const AppRoute: FC = () => {
    return (
            <Router basename={config.baseURL}>
                <MainRoutes />
            </Router>
    );
};

export default AppRoute;
