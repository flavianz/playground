import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
    const [selected, setSelected] = useState(true);
    const games = [
        {
            url: "/tic-tac-toe",
            text: "TIC TAC TOE",
            color: "#dd4949",
        },
        {
            url: "/sudoku",
            text: "SUDOKU",
            color: "#9149dd",
        },
        {
            url: "/2048",
            text: "SLIDING 8",
            color: "#ddae49",
        },
    ];
    const tools = [
        {
            url: "/random-number",
            text: "RANDOM NUMBER",
            color: "#49dd67",
        },
        {
            url: "/unit-converter",
            text: "UNIT CONVERTER",
            color: "#49badd",
        },
        {
            url: "/number-converter",
            text: "NUMBER CONVERTER",
            color: "#495ddd",
        },
        {
            url: "/unit-converter",
            text: "STOPWATCH",
            color: "#dd4949",
        },
        {
            url: "/color-picker",
            text: "COLOR PICKER",
            color: "#dda949",
        },
        {
            url: "/uuid-generator",
            text: "UUID GENERATOR",
            color: "#dd49b3",
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
                            <div
                                className={styles.iframe}
                                style={{ background: game.color }}
                            >
                                <h2 className={styles.gameName}>{game.text}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
