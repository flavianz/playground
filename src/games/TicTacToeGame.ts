export class TicTacToeGame {
    turn: boolean;
    board: (boolean | undefined)[] = [
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
    readonly opponent: "easy" | "difficult" | "impossible" | "friend";
    public;

    constructor(
        turn: boolean,
        opponent: "easy" | "difficult" | "impossible" | "friend",
    ) {
        this.turn = turn;
        this.opponent = opponent;
    }

    public isRowEqual(row: number): boolean {
        return (
            (this.board[row * 3] === this.board[row * 3 + 1]) ===
            this.board[row * 3 + 2]
        );
    }

    public isRowO(row: number): boolean {
        return this.isRowEqual(row) && this.board[0] === false;
    }

    public isRowX(row: number): boolean {
        return this.isRowEqual(row) && this.board[0] === true;
    }

    public isColumnEqual(column: number): boolean {
        return (
            (this.board[column] === this.board[column + 3]) ===
            this.board[column + 6]
        );
    }

    public isColumnO(column: number): boolean {
        return this.isColumnEqual(column) && this.board[column] === false;
    }

    public isColumnX(column: number): boolean {
        return this.isColumnEqual(column) && this.board[column] === true;
    }

    public isVertEqual(): boolean {
        return (
            (this.board[0] === this.board[4]) === this.board[8] ||
            (this.board[6] === this.board[4]) === this.board[2]
        );
    }

    public isVertO(): boolean {
        return this.isVertEqual() && this.board[4] === false;
    }

    // public getBestOutcome(board: (boolean | undefined)[]): number {
    //     if (!board.includes(undefined)) {
    //         if (board) {
    //
    //         }
    //     }
    //     let bestOutcome = -1;
    //     for (let i = 0; i < 9; i++) {
    //         if (board[i] !== undefined) {
    //             continue;
    //         }
    //         board[i] = this.turn;
    //         let outcome = this.getBestOutcome(board);
    //     }
    //     return bestOutcome;
    // }

    public isVertX(): boolean {
        return this.isVertEqual() && this.board[4] === true;
    }

    public hasOWon() {
        return (
            this.isRowO(0) ||
            this.isRowO(1) ||
            this.isRowO(2) ||
            this.isColumnO(0) ||
            this.isColumnO(1) ||
            this.isColumnO(2) ||
            this.isVertO()
        );
    }

    public hasXWon() {
        return (
            this.isRowX(0) ||
            this.isRowX(1) ||
            this.isRowX(2) ||
            this.isColumnX(0) ||
            this.isColumnX(1) ||
            this.isColumnX(2) ||
            this.isVertX()
        );
    }

    public isDraw() {
        return (
            !this.board.includes(undefined) &&
            !this.hasXWon() &&
            !this.hasXWon()
        );
    }

    public userMakeMove(field: number) {
        this.board[field] = this.turn;
        // if (this.opponent !== "friend") {
        //     let [best, draw, lose] = this.getMoveOutcomes();
        // }
    }
}
