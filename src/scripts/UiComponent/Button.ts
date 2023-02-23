
import { Sprite } from "./Sprite";

export class Button extends Sprite {

    constructor(json: any) {
        super(json);
        this.buttonMode = true;
        this.interactive = true;

        (json.defaultTint) && (this.tint = json.defaultTint);

    }

}