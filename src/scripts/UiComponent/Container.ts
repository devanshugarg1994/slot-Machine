/* 
* We have used  PIXI.Container to extend this class.
* To set basic property of `PIXI.Container` Object from json we have done it.
*/
export class Container extends PIXI.Container {
    constructor(json: any) {
        super();
        json.x && (this.x = json.x);
        json.y && (this.y = json.y);
        json.w && (this.width = json.w);
        json.h && (this.height = json.h);
        json.visible && (this.visible = json.visible);
        json.scale && (this.scale.set(json.scale, json.scale));
        (json.scaleX && json.scaleY) && (this.scale.set(json.scaleX, json.scaleY));
        json.anchor && (this.pivot.set(json.anchor.x, json.anchor.y))
    }
    
}
