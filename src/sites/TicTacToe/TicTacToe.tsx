import styles from "./TicTacToe.module.css";
import { useEffect, useState } from "react";

const EMPTY_BOARD = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
];
type Difficulty = "easy" | "medium" | "impossible" | "friend";
export default function TicTacToe() {
    const [turn, setTurn] = useState(true); // true = X, false = O
    const [userSide, setUserSide] = useState(true);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [board, setBoard] = useState<(boolean | undefined)[]>(EMPTY_BOARD);

    function calculateWinner(localBoard: (boolean | undefined)[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                typeof localBoard[a] === "boolean" &&
                localBoard[a] === localBoard[b] &&
                localBoard[a] === localBoard[c]
            ) {
                return localBoard[a];
            }
        }
        if (!board.includes(undefined)) {
            return null;
        }
        return undefined;
    }

    function getBestResult(
        localBoard: (boolean | undefined)[],
        turn: boolean,
        isMaximizing: boolean,
    ): -1 | 0 | 1 {
        let winner = calculateWinner(localBoard);
        if (winner !== undefined) {
            switch (winner) {
                case true:
                    return 1;
                case false:
                    return -1;
                case null:
                    return 0;
            }
        }
        let bestResult: -1 | 0 | 1 = isMaximizing ? -1 : 1;
        for (let i = 0; i < 9; i++) {
            if (localBoard[i] !== undefined) {
                continue;
            }
            localBoard[i] = turn;
            let result = getBestResult(localBoard, !turn, !isMaximizing);
            if (isMaximizing) {
                bestResult = Math.max(bestResult, result) as -1 | 0 | 1;
            } else {
                bestResult = Math.min(bestResult, result) as -1 | 0 | 1;
            }
            localBoard[i] = undefined;
        }
        return bestResult;
    }

    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    useEffect(() => {
        if (
            turn != userSide &&
            difficulty !== "friend" &&
            calculateWinner(board) === undefined
        ) {
            let winners: number[] = [],
                draws: number[] = [],
                losers: number[] = [];
            for (let i = 0; i < 9; i++) {
                if (board[i] === undefined) {
                    board[i] = turn;
                    let result = getBestResult(board, !turn, userSide);
                    if (userSide) {
                        if (result === -1) {
                            winners.push(i);
                        } else if (result === 0) {
                            draws.push(i);
                        } else {
                            losers.push(i);
                        }
                    } else {
                        if (result === -1) {
                            losers.push(i);
                        } else if (result === 0) {
                            draws.push(i);
                        } else {
                            winners.push(i);
                        }
                    }
                    board[i] = undefined;
                }
            }
            if (difficulty === "impossible") {
                if (winners.length > 0) {
                    board[winners[getRandomInt(0, winners.length)]] = turn;
                } else if (draws.length > 0) {
                    board[draws[getRandomInt(0, draws.length)]] = turn;
                } else {
                    board[losers[getRandomInt(0, losers.length)]] = turn;
                }
            } else if (difficulty === "easy") {
                if (losers.length > 0 && draws.length > 0) {
                    if (Math.random() > 0.5) {
                        board[draws[getRandomInt(0, draws.length)]] = turn;
                    } else {
                        board[losers[getRandomInt(0, losers.length)]] = turn;
                    }
                } else if (losers.length > 0) {
                    board[losers[getRandomInt(0, losers.length)]] = turn;
                } else if (draws.length > 0) {
                    board[draws[getRandomInt(0, draws.length)]] = turn;
                } else {
                    board[winners[getRandomInt(0, winners.length)]] = turn;
                }
            } else {
                let arr;
                if (
                    losers.length > 0 &&
                    draws.length > 0 &&
                    winners.length > 0
                ) {
                    let val = Math.random();
                    if (val < 0.5) {
                        arr = winners;
                    } else if (val < 0.8) {
                        arr = draws;
                    } else {
                        arr = losers;
                    }
                } else if (losers.length > 0 && draws.length > 0) {
                    if (Math.random() < 0.8) {
                        arr = draws;
                    } else {
                        arr = losers;
                    }
                } else if (winners.length > 0 && draws.length > 0) {
                    if (Math.random() < 0.8) {
                        arr = winners;
                    } else {
                        arr = draws;
                    }
                } else if (losers.length > 0 && winners.length > 0) {
                    if (Math.random() < 0.8) {
                        arr = winners;
                    } else {
                        arr = losers;
                    }
                } else if (losers.length > 0) {
                    arr = losers;
                } else if (draws.length > 0) {
                    arr = draws;
                } else {
                    arr = winners;
                }
                board[arr[getRandomInt(0, arr.length)]] = turn;
            }
            setTurn(!turn);
        }
    }, [turn, userSide]);

    function Player({ side }: { side: boolean }) {
        return (
            <div
                className={
                    styles.playerContainer +
                    " " +
                    styles.clickable +
                    " " +
                    (calculateWinner(board) === side ? styles.winner : "") +
                    " " +
                    (calculateWinner(board) === null ? styles.draw : "") +
                    " " +
                    (turn === side ? styles.turn : "")
                }
                onClick={() => {
                    setUserSide(side);
                }}
            >
                <h1>{side ? "X" : "O"}</h1>
            </div>
        );
    }

    return (
        <div id={styles.container}>
            <div className={styles.sideContainer}>
                <Player side={true} />
                <Player side={false} />
            </div>

            <div id={styles.boardContainer}>
                {Array.from({ length: 9 }, (_, key) => {
                    return (
                        <div
                            className={
                                styles.field +
                                " " +
                                (board[key] === undefined &&
                                    calculateWinner(board) === undefined &&
                                    styles.clickable)
                            }
                            key={key}
                            onClick={() => {
                                if (
                                    board[key] === undefined &&
                                    calculateWinner(board) === undefined
                                ) {
                                    board[key] = turn;
                                    setTurn(!turn);
                                }
                            }}
                        >
                            <p>
                                {board[key] !== undefined &&
                                    (board[key] ? "X" : "O")}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className={styles.sideContainer}>
                <select
                    name="difficulty"
                    className={styles.difficulty}
                    onChange={(e) =>
                        setDifficulty(e.target.value as Difficulty)
                    }
                    disabled={
                        (board.includes(true) || board.includes(false)) &&
                        calculateWinner(board) === undefined
                    }
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="impossible">Impossible</option>
                    <option value="friend">Against a friend</option>
                </select>
                <button
                    className={styles.difficulty}
                    onClick={() => {
                        setBoard(Array(9));
                        setTurn(true);
                    }}
                >
                    New Round
                </button>
            </div>
        </div>
    );
}
