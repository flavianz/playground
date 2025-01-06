import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./sites/Home/Home.tsx";
import TicTacToe from "./sites/TicTacToe/TicTacToe.tsx";
import RandomNumberGenerator from "./sites/RandomNumberGenerator/RandomNumberGenerator.tsx";
import UnitConverter from "./sites/UnitConverter/UnitConverter.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    { path: "/tic-tac-toe", element: <TicTacToe /> },
    { path: "/random-number", element: <RandomNumberGenerator /> },
    { path: "/unit-converter", element: <UnitConverter /> },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
