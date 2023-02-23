/* 
* It is the Basic View of our Game
* When we need to create our Own View we should exted from this class.
* This Class is extended from `PIXI.Container` not from `Conatiner` class we created
* because we do not want to set View basic property from JSON but we will create all 
* compoent (like : Animation, Text Shape aur Conatiner) used in the View using JSOn only.
* It use `FactoryUI` class to create diffrent Ui Component
* This class is also responsible for handling resize of  game when window get Resized
*/



import { Container } from "./Container";
import { Label } from "./Label";
import { FactoryUI } from "./FactoryUI";
import { Shape } from "./Shape";
import { ShapeButton } from "./ShapeButton";
import { Sprite } from "./Sprite";
import { Button } from "./Button";
import { Meter } from "./Meter";

export class BasicNode extends PIXI.Container {
    private containerReferences: { [key: string]: Container } = {};
    private labelReferences: { [key: string]: Label } = {};
    private shapeReferences: { [key: string]: Shape } = {};
    private shapeButtonReferences: { [key: string]: ShapeButton } = {};
    private spriteRefrences: { [key: string]: Sprite } = {};
    private buttonRefrences: { [key: string]: Button } = {};
    private meterRefrences: { [key: string]: Meter } = {};
    
    constructor(json: any) {
        super()
        FactoryUI.createUI(json, this);
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }


    // /* 
    // * Set pivot and position of the View 
    // */
    protected resize(_evt?: Event): void {
        //
    }

    public showView(): void {
        this.visible = true;
    }

    public hideView(): void {
        this.visible = false;
    }

    public registerEvent(key: string, callback: Function) {
        this.unRegister(key, callback);
        this.on(key, () => {
            callback && callback();
        });
    }

    public unRegister(key: string, callback: Function) {
        this.off(key, () => {
            callback && callback();
        });
    }

    public setLabelRefrences(id: string, label: Label) {
        this.labelReferences[id] = label;
    }
    public getLabelRefrences(id: string): Label {
        return this.labelReferences[id];
    }


    public setContainerRefrences(id: string, container: Container) {
        this.containerReferences[id] = container;
    }
    public getContainerRefrences(id: string): Container {
        return this.containerReferences[id];
    }

    public setSpriteRefrences(id: string, sprite: Sprite) {
        this.spriteRefrences[id] = sprite;
    }
    public getSpriteRefrences(id: string): Sprite {
        return this.spriteRefrences[id];
    }

    public setButtonRefrences(id: string, button: Button) {
        this.buttonRefrences[id] = button;
    }
    public getButtonRefrences(id: string): Button {
        return this.buttonRefrences[id];
    } 
    
    public setMeterRefrences(id: string, button: Meter) {
        this.meterRefrences[id] = button;
    }
    public getMeterRefrences(id: string): Meter {
        return this.meterRefrences[id];
    }



    public setShapeRefrences(id: string, shape: Shape) {
        this.shapeReferences[id] = shape;
    }
    public getShapeRefrences(id: string): Shape {
        return this.shapeReferences[id];
    }

    public setShapeButtonRefrences(id: string, shapeButton: ShapeButton) {
        this.shapeButtonReferences[id] = shapeButton;
    }
    public getShapeButtonRefrences(id: string): ShapeButton {
        return this.shapeButtonReferences[id];
    }




}