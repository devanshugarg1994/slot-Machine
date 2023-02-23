/* 
* To create meter class we are extending Label class hence get basic propety of Label
* i.e..  `PIXI.Text`
* We have just added two function for now.
* `startTickUp` is used to star the tick
* `stopTickUp` use stop the tick
*/


import GSAP from "gsap";
import { Label } from "./Label";

export class Meter extends Label {
    constructor(json: any) {
        super(json);
    }

    /* 
    * We use `GASP` library for tweening and updating the text value and on every update
    * we check 2 decimal places of meter value and check if he meter value do not 
    * go out of bounds.
    * 
    */
    public startTickUp(value: string, callback?: Function, callbackScope?: Object): void {
        GSAP.to(this, { duration: 2, text: value, yoyo: false, repeat: 0 })
            .eventCallback("onUpdate", () => {
                this.text = String(Number((this.text)).toFixed(2));
                this.fitText(); // Check meter value do not go out of Bounds
            }, undefined, this)
            .eventCallback("onComplete", () => {
                callback?.call(callbackScope);
            }, undefined, this);

    }
    
    public stopTickUp(finalValue: string): void {
        GSAP.killTweensOf(this);
        this.text = finalValue;
    }
}