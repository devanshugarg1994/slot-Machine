
export class GameModel {
    constructor() {
        this.setBetIndex(0);
        this.setCreditAmt(1000000);
    }


    getBetIndex(): number {
        return this.betIndex;
    }

    setBetIndex(value: number) {
        this.betIndex = value;
    }

    getTotalBet(): number {
        return this.betValues[this.betIndex];
    }


    updateCredit(value: number) {
        this.creditAmt += value;
    }

    getCreditAmt(): number {
        return this.creditAmt;
    }

    setCreditAmt(value: number) {
        this.creditAmt = value;
    }

    setStoppingSymbols(value: number[][]) {
        this.stoppingSymbols = value;
    }

    getStoppingSymbols(): number[][] {
        return this.stoppingSymbols;
    }

    setWinningSymbolsPosition(value: number[]) {
        this.winningSymbolsPosition = value;
    }

    getWinningSymbolsPositions(): number[] {
        return this.winningSymbolsPosition;
    }

    setIsWin(value: boolean) {
        this.isWin = value;
    }

    IsWin(): boolean {
        return this.isWin;
    }

    getBetValues(): number[] {
        return this.betValues;
    }

    getWinAmount() {
        return this.betValues[this.betIndex] * this.payOutForWin;
    }

     setPayOut(value: number) {
        this.payOutForWin = value;
    }

    private betIndex!: number;
    private totalBetAmt: number = 0;
    private creditAmt: number;
    private readonly betValues: number[] = [1, 2, 3, 5, 10];

    private stoppingSymbols: number[][];
    private winningSymbolsPosition: number[] = [];
    private isWin: boolean = false;
    private payOutForWin: number;

}