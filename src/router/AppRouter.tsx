import {createBrowserRouter, Navigate} from "react-router-dom";
import {LandingPage} from "../pages/LandingPage";
import {APIPage} from "../pages/APIPage";
import {pages} from "@apidocs/common";

export const router = createBrowserRouter([
    {
        path: pages.getLandingPage(),
        element: <LandingPage />,
        index: true
    },
    {
        path: pages.getApiPage(':api'),
        element: <APIPage />
    },
    {
        path: '*',
        element: <Navigate to={pages.getLandingPage()} replace />
    }
], {
    basename: process.env.PUBLIC_URL
});
