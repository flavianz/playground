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
            unreleased: false,
        },
        {
            url: "/sudoku",
            text: "SUDOKU",
            color: "#ddbf49",
            unreleased: true,
        },
        {
            url: "/2048",
            text: "2048",
            color: "#b349dd",
            unreleased: true,
        },
        {
            url: "/2048",
            text: "2048",
            color: "#4962dd",
            unreleased: true,
        },
        {
            url: "/2048",
            text: "2048",
            color: "#7fdd49",
            unreleased: true,
        },
        {
            url: "/2048",
            text: "2048",
            color: "#49b1dd",
            unreleased: true,
        },
        {
            url: "/sudoku",
            text: "SUDOKU",
            color: "#4993dd",
            unreleased: true,
        },
        {
            url: "/sliding-8",
            text: "SLIDING 8",
            color: "#ddae49",
            unreleased: true,
        },
        {
            url: "/2048",
            text: "2048",
            color: "#69dd49",
            unreleased: true,
        },
    ];
    const tools = [
        {
            url: "/random-number",
            text: "RANDOM NUMBER",
            color: "#49dd67",
            unreleased: false,
        },
        {
            url: "/unit-converter",
            text: "UNIT CONVERTER",
            color: "#49badd",
            unreleased: false,
        },

        {
            url: "/counter",
            text: "COUNTER",
            color: "#dd49b3",
            unreleased: false,
        },
        {
            url: "/number-converter",
            text: "NUMBER CONVERTER",
            color: "#495ddd",
            unreleased: true,
        },
        {
            url: "/unit-converter",
            text: "STOPWATCH",
            color: "#dd4949",
            unreleased: true,
        },
        {
            url: "/color-picker",
            text: "COLOR PICKER",
            color: "#dda949",
            unreleased: true,
        },
        {
            url: "/uuid-generator",
            text: "UUID GENERATOR",
            color: "#dd49b3",
            unreleased: true,
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
                    return game.unreleased ? undefined : (
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
