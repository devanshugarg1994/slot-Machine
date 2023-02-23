import { Assets } from "../Engine/Assets";
import { game } from "../main";
import { ButtonPannelController } from "./ButtonPannel/ButtonPannelController";
import { ButtonPannelView } from "./ButtonPannel/ButtonPannelView";
import { GameModel } from "./GameModel";
import { LoadingUI } from "./LoadingUI";
import { Performance } from "./Performance";
import { ReelsData, SymbolsData } from "./Reels/Reels";
import { ReelsController } from "./Reels/ReelsController";
import { ReelsView } from "./Reels/ReelsView";
import { WinDataHandler } from "./WinDataHandler";
import { WinPresentation } from "./WinPresentation";


export class GamePlayController {
    constructor() {
        this.init();
    }

    private init() {
        this.loadingUI = new LoadingUI(game.loader.resources[Assets.LoadingUiPath]?.data.loading);
        game._app.stage.addChild(this.loadingUI);
        game.scheduleTaskOnce(1, () => {
            game._app.stage.removeChild(this.loadingUI);

            this.gameModel = new GameModel();
            const reelsData: ReelsData = game.loader.resources[Assets.getInstance().getRelativePath("reelsData")]?.data.reelsData;
            const symbolsData: SymbolsData = game.loader.resources[Assets.getInstance().getRelativePath("symbolsData")]?.data as SymbolsData;


            new WinDataHandler(this.gameModel, reelsData, symbolsData);
            new WinPresentation(this.gameModel);

            this.reelsView = new ReelsView(reelsData, this.gameModel);
            game._app.stage.addChild(this.reelsView);
            this.reelsController = new ReelsController(this.reelsView);

            this.buttonView = new ButtonPannelView(game.loader.resources[Assets.getInstance().getRelativePath("button")]?.data.button);
            this.buttonController = new ButtonPannelController(this.buttonView, this.gameModel);
            game._app.stage.addChild(this.buttonView);


        });

        this.performance = new Performance(game.loader.resources[Assets.getInstance().getRelativePath("performance")]?.data.performance);
        game._app.stage.addChild(this.performance);
    }


    private reelsController: ReelsController;
    private reelsView: ReelsView;
    private buttonController: ButtonPannelController;
    private buttonView: ButtonPannelView;
    private loadingUI: LoadingUI;
    private gameModel: GameModel;

    private performance: Performance;


}