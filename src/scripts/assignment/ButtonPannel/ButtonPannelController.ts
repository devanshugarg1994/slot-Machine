import { Button } from "../../UiComponent/Button";
import { Meter } from "../../UiComponent/Meter";
import { ShapeButton } from "../../UiComponent/ShapeButton";
import { CustomEventConstant, EventConstant } from "../EventConstant";
import { GameModel } from "../GameModel";
import { ButtonPannelView } from "./ButtonPannelView";
import GSAP from "gsap";


export class ButtonPannelController {
    constructor(buttonView: ButtonPannelView, gameModel: GameModel) {
        this.gameModel = gameModel;
        this.buttonView = buttonView;
        this.initComponents();
        this.subscribeEvents();

        this.currentBetValue.text = this.gameModel.getBetValues()[this.currentBetIndex].toString();
        this.creditMeter.text = (this.gameModel.getCreditAmt() - this.gameModel.getTotalBet()).toString();

    }

    private initComponents() {
        this.spinButton = this.buttonView.getShapeButtonRefrences("spinButton") as ShapeButton;
        this.lastBetCoinBtn = this.buttonView.getButtonRefrences("lastBetCoinBtn") as Button;
        this.nextBetCoinBtn = this.buttonView.getButtonRefrences("nextBetCoinBtn") as Button;
        this.creditMeter = this.buttonView.getMeterRefrences("creditAmtMeter");
        this.currentBetValue = this.buttonView.getMeterRefrences("currentBetValue");
        this.winAmtMeter = this.buttonView.getMeterRefrences("WinAmtMeter");

    }

    private subscribeEvents() {
        this.unSubscibeEvents();
        this.spinButton.on(EventConstant.POINTER_DOWN, this.onSpinButtonPressed.bind(this));
        this.lastBetCoinBtn.on(EventConstant.POINTER_UP, this.lastBetCoin.bind(this));
        this.nextBetCoinBtn.on(EventConstant.POINTER_UP, this.nextBetCoin.bind(this));
        window.addEventListener(CustomEventConstant.ENABLE_SPIN_BUTTON, this.enableSpinButton.bind(this));
        window.addEventListener(CustomEventConstant.UPDATE_METERS, this.updateMeters.bind(this));

    }

    private unSubscibeEvents() {
        this.spinButton.off(EventConstant.POINTER_UP, this.onSpinButtonPressed.bind(this));
        this.lastBetCoinBtn.off(EventConstant.POINTER_UP, this.lastBetCoin.bind(this));
        this.nextBetCoinBtn.off(EventConstant.POINTER_UP, this.nextBetCoin.bind(this));
        window.removeEventListener(CustomEventConstant.ENABLE_SPIN_BUTTON, this.enableSpinButton.bind(this));
        window.removeEventListener(CustomEventConstant.UPDATE_METERS, this.updateMeters.bind(this));


    }

    private onSpinButtonPressed() {
        this.spinButton.interactive = false;
        this.spinButton.buttonMode = false;
        this.spinButton.alpha = 0.7;
        window.dispatchEvent(new CustomEvent(CustomEventConstant.SPIN_BUTTON_PRESSED));
    }

    private lastBetCoin() {
        if (this.currentBetIndex - 1 >= 0) {
            this.currentBetValue.text = this.gameModel.getBetValues()[this.currentBetIndex - 1].toString();
            this.currentBetIndex--;
            this.gameModel.setBetIndex(this.currentBetIndex);
            this.creditMeter.text = (this.gameModel.getCreditAmt() - this.gameModel.getTotalBet()).toString();

        }
    }
    private nextBetCoin() {
        if (this.currentBetIndex + 1 < this.gameModel.getBetValues().length) {
            this.currentBetValue.text = this.gameModel.getBetValues()[this.currentBetIndex + 1].toString();
            this.currentBetIndex++;
            this.gameModel.setBetIndex(this.currentBetIndex);
            this.creditMeter.text = (this.gameModel.getCreditAmt() - this.gameModel.getTotalBet()).toString();


        }
    }

    private enableSpinButton() {
        this.spinButton.alpha = 1;
        this.spinButton.interactive = true;
        this.spinButton.buttonMode = true;
    }

    private updateMeters() {
        // const winAmt = this.gameModel.getWinAmt();
        const winAmt = this.gameModel.getWinAmount();
        if (winAmt > 0) {
            this.gameModel.updateCredit(winAmt);
            this.winAmtMeter.startTickUp(winAmt.toString(), () => {
                GSAP.delayedCall(1, () => {
                    this.creditMeter.text = this.gameModel.getCreditAmt().toString();
                    GSAP.delayedCall(1, () => {
                        this.creditMeter.text = (this.gameModel.getCreditAmt() - this.gameModel.getTotalBet()).toString();
                        this.winAmtMeter.text = "0";
                        window.dispatchEvent(new CustomEvent(CustomEventConstant.NEXT_WIN_PRESENTATION));
                    })

                });
            }, this);
        } else {
            if (winAmt === 0) {
                this.gameModel.updateCredit(-this.gameModel.getTotalBet());
            }
            this.creditMeter.text = (this.gameModel.getCreditAmt() - this.gameModel.getTotalBet()).toString();

        }

    }

    private spinButton: ShapeButton;
    private buttonView: ButtonPannelView;
    private lastBetCoinBtn: Button;
    private nextBetCoinBtn: Button;
    private gameModel: GameModel;
    private currentBetIndex: number = 0;

    private currentBetValue: Meter;
    private creditMeter: Meter;
    private winAmtMeter: Meter;

}