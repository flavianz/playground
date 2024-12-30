import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./sites/Home/Home.tsx";
import TicTacToe from "./sites/TicTacToe/TicTacToe.tsx";

const router = createHashRouter([
    {
        path: "/",
        element: <Home />,
    },
    { path: "/tic-tac-toe", element: <TicTacToe /> },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
