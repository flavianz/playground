import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Home() {
    const games = [
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
    ];

    return (
        <div id={styles.container}>
            <h1 id={styles.title}>Get to choosing!</h1>
            <div id={styles.grid}>
                {games.map((game, key) => {
                    return (
                        <Link to={game.url} key={key} id={styles.gameContainer}>
                            <div className={styles.iframe} />
                            <h2 className={styles.gameName}>{game.text}</h2>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
