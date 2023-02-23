import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { CustomEventConstant } from "./EventConstant";

export class LoadingUI extends BasicNode {
    constructor(json: any) {
        super(json);
        this.subscribeEvents()
    }

    private subscribeEvents() {
        this.unSubscribeEvents();
        window.addEventListener(CustomEventConstant.SHOW_LOADING_SCREEN, this.showLoadingUI.bind(this));
        window.addEventListener(CustomEventConstant.HIDE_LOADING_SCREEN, this.hideLoadingUI.bind(this));
    }

    private unSubscribeEvents() {
        window.removeEventListener(CustomEventConstant.SHOW_LOADING_SCREEN, this.showLoadingUI.bind(this));
        window.removeEventListener(CustomEventConstant.HIDE_LOADING_SCREEN, this.hideLoadingUI.bind(this));

    }

    protected resize(_event?: Event): void {
        const txt = this.getLabelRefrences("loadingText");
        txt.x = innerWidth / 2;
        txt.y = innerHeight /2;
    }

    showLoadingUI() {
        this.visible = true;
        game.stage.addChild(this);
    }

    hideLoadingUI() {
        this.visible = false;
        game.stage.removeChild(this);
    }

    
}