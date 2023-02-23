import { CustomEventConstant } from "./EventConstant";
import { GameModel } from "./GameModel";

export class WinPresentation {
    constructor(gameModel: GameModel) {
        this.gameModel = gameModel;
        // Win Sequece can be rearrange in Any order and it run without breaking the Application
        // Every win sequecne is independent to each other and can be played in any order.
        this.winSequence = ["animateSymbol", "updateMeters", "winSequenceCompleted"] 
        this.subscribeEvents();
    }

    private subscribeEvents() {
        this.unSubscribeEvents();
        window.addEventListener(CustomEventConstant.NEXT_WIN_PRESENTATION, this.checkForWin.bind(this));
    }

    private unSubscribeEvents() {
        window.removeEventListener(CustomEventConstant.NEXT_WIN_PRESENTATION, this.checkForWin.bind(this));

    }

    private checkForWin() {
        if(!this.gameModel.IsWin()) {
            window.dispatchEvent(new CustomEvent(CustomEventConstant.ENABLE_SPIN_BUTTON));
            window.dispatchEvent(new CustomEvent(CustomEventConstant.UPDATE_METERS));
            return;
        } else {

            const sequence = this.winSequence[this.index];
            this.index++;
            switch (sequence) {
                case "animateSymbol":
                    this.animateWinSymbol();
                    break;
                case "updateMeters":
                    this.updateMeters();
                    break;
                case "winSequenceCompleted":
                    this.sequenceCompleted();
                    break;
            }

        } 
    
    }


    private animateWinSymbol() {
        window.dispatchEvent(new CustomEvent(CustomEventConstant.ANIMATE_SYMBOLS));
    }

    private updateMeters() {
        window.dispatchEvent(new CustomEvent(CustomEventConstant.UPDATE_METERS))
    }

    private sequenceCompleted()  {
        this.index = 0;
        this.gameModel.setPayOut(0);
        window.dispatchEvent(new CustomEvent(CustomEventConstant.ENABLE_SPIN_BUTTON));

    }

    private gameModel: GameModel;
    private index: number = 0;
    private winSequence: string []= [];
}