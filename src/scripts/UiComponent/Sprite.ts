import { Assets } from "../Engine/Assets";
import { game } from "../main";

export class Sprite extends PIXI.Sprite  {

    constructor(json : any) {
        const texturePath = Assets.getInstance().getRelativePath(json.image);
        if(!texturePath) {
            throw new Error ("Error in getting sprite realtive path from Assets Key"+ json.image);
        }
        super(game._app.loader.resources[texturePath].texture); // We shouldn't be using game instance here Will try to figure out something else later
        json.x && (this.x = json.x);
        json.y && (this.y = json.y);
        json.w && (this.width = json.w);
        json.h && (this.height = json.h);
        json.visible && (this.visible = json.visible);
        json.scale && (this.scale.set(json.scale, json.scale));
        (json.scaleX && json.scaleY) && (this.scale.set(json.scaleX, json.scaleY));
        json.anchor && (this.anchor.set(json.anchor.x, json.anchor.y));
    }

}