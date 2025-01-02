import styles from "./TicTacToe.module.css";
import { useState } from "react";
type Difficulty = "easy" | "difficult" | "impossible" | "friend";
export default function TicTacToe() {
    const [turn, setTurn] = useState(true); // true = X, false = O
    const [userSide, setUserSide] = useState(true);
    const [difficulty, setDifficulty] = useState<Difficulty>("easy");
    const [winner, setWinner] = useState<boolean | undefined | null>(undefined);
    const [board, setBoard] = useState<(boolean | undefined)[]>(
        Array(9).map(() => undefined),
    );

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
                typeof board[a] === "boolean" &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                return board[a];
            }
        }
        if (!board.includes(undefined)) {
            return null;
        }
        return undefined;
    }

    function getBestResult(localBoard: (boolean | undefined)[], turn: boolean) {
        let winner = calculateWinner(localBoard);
        if (winner !== undefined) {
            return winner;
        }
        let bestResult = false;
        for (let i = 0; i < 9; i++) {
            if (localBoard[i] !== undefined) {
                localBoard[i] = turn;
                let result = getBestResult();
                if (result === true) {
                }
            }
        }
    }

    function makeBotMove() {}

    function Player({ side }: { side: boolean }) {
        return (
            <div className={styles.playerContainer}>
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
                                    setWinner(calculateWinner(board));
                                    if (difficulty !== "friend") {
                                        for (let i = 0; i < 9; i++) {
                                            if (board[i] === undefined) {
                                                board[i] = !turn;
                                                break;
                                            }
                                        }
                                    }
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
                    id="difficulty"
                    onChange={(e) =>
                        setDifficulty(e.target.value as Difficulty)
                    }
                    disabled={
                        (board.includes(true) || board.includes(false)) &&
                        calculateWinner(board) === undefined
                    }
                >
                    <option value="easy">Easy</option>
                    <option value="difficult">Difficult</option>
                    <option value="impossible">Impossible</option>
                    <option value="friend">Against a friend</option>
                </select>
            </div>
        </div>
    );
}
