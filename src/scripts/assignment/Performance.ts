// import { game } from "../main";
import { game } from "../main";
import { BasicNode } from "../UiComponent/BasicNode";
import { Label } from "../UiComponent/Label";

export class Performance extends BasicNode {
    constructor(json: any) {
        super(json);
        this.FPS = this.getLabelRefrences("fpsText");
        game.scheduleTask("FPS_COUNT", 0, () => {
            this.FPS.text = '' + game.getFPS().toFixed(2) + ' FPS';
        });
       }


    private FPS: Label;

}