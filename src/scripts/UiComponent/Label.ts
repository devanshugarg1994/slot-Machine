
/* 
* We have used  PIXI.Text to extend this class.
* To set basic property of `PIXI.Text` Object from json we have done it.
* Also  implemented Localization fitText functionality 
*/
export class Label extends PIXI.Text {
    private json: any;
    constructor(json: any) {
        super(json.text, json.style);
        this.json = json;
        json.x && (this.x = json.x);
        json.y && (this.y = json.y);
        json.visible && (this.visible = json.visible);
        if(json.alpha !== undefined) {
            this.alpha = json.alpha;
        }
        this.setAnchor();
        this.fitText();
    }

    private setAnchor(): void {
        this.anchor.set(0.5, 0.5);
    }

    /* If text size become very big then it will scale down the fontsize and 
    *  will not let go out of specified boud mentioned in JSON
    */
    protected fitText(): void {
        if(this.width > this.json.w) {
            var scale = this.json.w / this.width;
            if (scale < 1) {
                this.style.fontSize = (this.style.fontSize * scale);
            }
        }
    }

}