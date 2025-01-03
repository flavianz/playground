import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
    const [selected, setSelected] = useState(true);
    const games = [
        {
            url: "/tic-tac-toe",
            text: "Tic Tac Toe",
        },
    ];
    const tools = [
        {
            url: "/random-number",
            text: "Random Number Generator",
        },
    ];

    return (
        <div id={styles.container}>
            <div id={styles.selector}>
                <h1
                    className={
                        styles.title + " " + (selected ? styles.selected : "")
                    }
                    onClick={() => {
                        setSelected(true);
                    }}
                >
                    Games
                </h1>
                <h1
                    className={
                        styles.title + " " + (!selected ? styles.selected : "")
                    }
                    onClick={() => {
                        setSelected(false);
                    }}
                >
                    Tools
                </h1>
            </div>
            <div id={styles.grid}>
                {(selected ? games : tools).map((game, key) => {
                    return (
                        <Link to={game.url} key={key} id={styles.gameContainer}>
                            <div className={styles.iframe}></div>
                            <h2 className={styles.gameName}>{game.text}</h2>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
