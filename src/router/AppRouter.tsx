import {createBrowserRouter} from "react-router-dom";
import {LandingPage} from "../pages/LandingPage";
import {APIPage} from "../pages/APIPage";

export const router = createBrowserRouter([
    {
        path: process.env.PUBLIC_URL,
        element: <LandingPage />
    },
    {
        path: process.env.PUBLIC_URL + '/api/:api',
        element: <APIPage />
    }
]);
