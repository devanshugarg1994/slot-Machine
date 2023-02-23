/* 
* Create a wrapper Class around `PIXI.Graphics` so we set basic property of Graphics 
* using JSON.
* We have extended it from Our Conatiner which allowed to use JSON and treat 
* it like other Objects of PIXI
*
*/

import { Container } from "./Container";
export class Shape extends Container {

    constructor(json: any) {
        super(json)
    } 

    public createShape(json: any): void {
        const graphicsObj: PIXI.Graphics = new PIXI.Graphics(); 
        graphicsObj.beginFill(json.fillColor, json.alpha);
        graphicsObj.drawRect(json.x, json.y, json.w, json.h);
        graphicsObj.endFill();
        json.pivot && (graphicsObj.pivot.set(json.pivot, json.pivot));
        (json.pivotX && json.pivotY) && (graphicsObj.pivot.set(json.pivotX, json.pivotY));
        json.rotation && (graphicsObj.rotation = json.rotation);
        this.addChild(graphicsObj);

        
    }
}