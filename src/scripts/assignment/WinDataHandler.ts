import { shuffleArray } from "../ArrayUtlis";
import { CustomEventConstant } from "./EventConstant";
import { GameModel } from "./GameModel";
import { ReelsData, SymbolsData } from "./Reels/Reels";

// Create DUmmy spin spin position for stopping.
export class WinDataHandler {
    constructor(gameModel: GameModel, reelsData: ReelsData, symbolsData: SymbolsData) {
        this.gameModel = gameModel;
        this.reelsData = reelsData;
        this.symbolsData = symbolsData;

        for (let i = 0; i < this.reelsData.reelsCount; i++) {
            const reel: number[] = [];
            this.finalSymbol.push(reel);
        }
        this.subscribeEvents();
    }


    private subscribeEvents() {
        this.unSubscribeEvents();
        window.addEventListener(CustomEventConstant.SPIN_BUTTON_PRESSED, this.checkForWin.bind(this));
    }

    private unSubscribeEvents() {
        window.removeEventListener(CustomEventConstant.SPIN_BUTTON_PRESSED, this.checkForWin.bind(this));
    }


    private checkForWin() {
        this.updateFinalSymbols();
        const allowWinCombination = Math.floor(Math.random() * 3); // Probability of win is one in three spin.
        if (allowWinCombination === 0) {
            this.gameModel.setIsWin(true);
            const symbols: number[] = [];

            for (let i = 0; i < 17; i++) {
                symbols[i] = i;
            }
            const symboldID = Math.floor(Math.random() * 17);
            symbols.splice(symboldID, 1);
            shuffleArray(symbols);
            const maxSymbol = Math.floor(Math.random() * 3 + 3)
            for (let i = 0; i < maxSymbol; i++) {
                const index: number = Math.floor(Math.random() * (this.reelsData.numberOfSymbolInReel - 1));
                this.finalSymbol[i][index] = symboldID;
                this.winningPosition.push(index);

            }

            for (let i = 0; i < this.reelsData.reelsCount; i++) {
                for (let j = 0; j < this.reelsData.numberOfSymbolInReel; j++) {
                    if (this.finalSymbol[i][j] === symboldID && this.winningPosition[i] !== j) {
                        this.finalSymbol[i][j] = symbols[0];
                        symbols.splice(0, 1);
                    }
                }
            }
            const payOut: number[] = this.symbolsData[symboldID].payOut;
            this.gameModel.setPayOut(payOut[this.winningPosition.length - 3]);
        }
        this.gameModel.setWinningSymbolsPosition(this.winningPosition);
        this.gameModel.setStoppingSymbols(this.finalSymbol)
    }

    private updateFinalSymbols() {
        this.gameModel.setIsWin(false);
        this.winningPosition = [];
        this.gameModel.setPayOut(0);
        const symbols: number[] = [];
        for (let i = 0; i < 17; i++) {
            symbols[i] = i;
        }

        shuffleArray(symbols);
        for (let i = 0; i < this.reelsData.reelsCount; i++) {
            for (let j = 0; j < this.reelsData.numberOfSymbolInReel; j++) {
                if (i === 0) {
                    this.finalSymbol[i][j] = symbols[0];
                    symbols.splice(0, 1);
                } else if (i === 1) {
                    shuffleArray(symbols);
                    this.finalSymbol[i][j] = symbols[j];
                } else {
                    this.finalSymbol[i][j] = (Math.floor(Math.random() * 17));

                }
            }
        }
    }


    private finalSymbol: number[][] = [];
    private winningPosition: number[] = [];
    private gameModel: GameModel;
    private reelsData: ReelsData;
    private symbolsData: SymbolsData;
}