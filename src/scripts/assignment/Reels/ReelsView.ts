import { Assets } from "../../Engine/Assets";
import { BasicNode } from "../../UiComponent/BasicNode";
import { game } from "../../main";
import { GameModel } from "../GameModel";
import Reels, { ReelsData, SymbolsData } from "./Reels";

export class ReelsView extends BasicNode {
    constructor(reelsData: any, gameModel: GameModel) {
        super(reelsData);
        this.gameModel = gameModel;
        this.initReels(reelsData);
    }


    private initReels(reelsData: ReelsData) {
        const symbolsData: SymbolsData = game.loader.resources[Assets.getInstance().getRelativePath("symbolsData")]?.data as SymbolsData;
        this.reels = new Reels(symbolsData, reelsData, this.gameModel);
        game._app.stage.addChild(this.reels);
    }


    private reels: Reels;
    private gameModel: GameModel
}