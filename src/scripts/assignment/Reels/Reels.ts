import { Container } from "../../UiComponent/Container";
import { CustomEventConstant } from "../EventConstant";
import { GameModel } from "../GameModel";
import Reel from "./Reel";


export default class Reels extends Container {
    constructor(symbolsData: SymbolsData, reelsData: ReelsData, gameModel: GameModel) {
        super({});
        for (let i = 0; i < reelsData.reelsCount; i++) {
            const reel = new Reel(i, symbolsData, reelsData);
            this.reels.push(reel);
            this.addChild(reel);
        }
        this.gameModel = gameModel;
        this.x = reelsData.reelOffset;
        this.subscribeEvents();
    }


    private subscribeEvents() {
        this.unSubscribeEvents();
        window.addEventListener(CustomEventConstant.SPIN_BUTTON_PRESSED, this.spin.bind(this));
        window.addEventListener(CustomEventConstant.ANIMATE_SYMBOLS, this.animateSymbols.bind(this));
    }

    private unSubscribeEvents() {
        window.removeEventListener(CustomEventConstant.SPIN_BUTTON_PRESSED, this.spin.bind(this));
        window.removeEventListener(CustomEventConstant.ANIMATE_SYMBOLS, this.animateSymbols.bind(this));

    }

    private animateSymbols() {
        const winningPosition: number[] = this.gameModel.getWinningSymbolsPositions();
        for (let i = 0; i < winningPosition.length; i++) {
            this.reels[i].animateWiningSymbol(winningPosition[i])
        }
        window.dispatchEvent(new CustomEvent(CustomEventConstant.NEXT_WIN_PRESENTATION));
    }

    async spin() {
        const reelsToSpin = [...this.reels];
        reelsToSpin.forEach((reel: Reel) => {
            reel.resetSymbol();
        })
        this.infiniteSpinning(reelsToSpin);
    }

    private async infiniteSpinning(reelsToSpin: Array<Reel>) {
        const shiftingDelay = 500;
        const start = Date.now();
        while (true) {
            const spinningPromises = reelsToSpin.map(reel => reel.spinOneTime());
            await Promise.all(spinningPromises);
            const shiftingWaitTime = (this.reels.length - reelsToSpin.length + 1) * shiftingDelay;
            if (Date.now() >= start + shiftingWaitTime) {
                reelsToSpin[0].addStoppingSymbol(this.gameModel.getStoppingSymbols()[this.reels.length - reelsToSpin.length]);
                reelsToSpin[0].removeBlurrEffect();
                reelsToSpin.shift();
            }
            if (!reelsToSpin.length) {
                window.dispatchEvent(new CustomEvent(CustomEventConstant.NEXT_WIN_PRESENTATION));
                break;
            }
        }
    }
    private readonly reels: Reel[] = [];
    private gameModel: GameModel;
}

export declare type SymbolsData  = {[id: string]: SymbolData};
export interface SymbolData {
    name: string,
    type: string,
    id: number,
    winSymbol: string,
    payOut: number[]
}
export interface ReelsData {
    reelOffset: number,
    reelsCount: number,
    shiftingDelayMS: number,
    reelWidth: number,
    numberOfSymbolInReel: number,
    startingSpeed: number
}