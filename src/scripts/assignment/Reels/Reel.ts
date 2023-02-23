import * as PIXI from 'pixi.js';
import { Assets } from '../../Engine/Assets';
import { ReelsData, SymbolData, SymbolsData } from './Reels';
import { game } from '../../main';
import { Container } from '../../UiComponent/Container';

export default class Reel extends Container {
    constructor(reelIndex: number, symbolsData: SymbolsData, reelsData: ReelsData) {
        super({});
        this.appHeight = game._app.screen.height;
        for (const key in symbolsData) {
            const symbolData: SymbolData = symbolsData[key];
            const symbol = game._app.loader.resources[Assets.getInstance().getRelativePath(symbolData.name)];
            this.textures.push(symbol.texture);
            const winSymbol = game._app.loader.resources[Assets.getInstance().getRelativePath(symbolData.winSymbol)];
            this.winTextures.push(winSymbol.texture);
        }
        this.startingSpeed = reelsData.startingSpeed;
        this.reelIndex = reelIndex
        this.generate(reelsData);
    }

    private generate(reelsData: ReelsData) {
        this.x = this.reelIndex * reelsData.reelWidth;
        for (let i = 0; i < reelsData.numberOfSymbolInReel + 1; i++) {
            const id = Math.floor(Math.random() * this.textures.length);
            const symbolSprite = new PIXI.Sprite(this.textures[id]);
            symbolSprite.scale.set(0.7);
            symbolSprite.x = 0;
            const yOffset = (this.appHeight - symbolSprite.height * 3) / 3;
            const cellHeight = symbolSprite.height + yOffset;
            const paddingTop = yOffset / 2;
            symbolSprite.y = (i - 1) * cellHeight + paddingTop;
            this.symbols.push({
                symbolSprite: symbolSprite,
                id: id,
                partOfWin: false
            });
            this.addChild(symbolSprite);
        }
    }

    addBlurring(symbol: PIXI.DisplayObject) {
        const blur = new PIXI.filters.BlurFilter(4, 2);
        symbol.filters = [blur]
    }

    removeBlurrEffect() {
        this.symbols.forEach((symbol: Symbol) => {
            symbol.symbolSprite.filters = []
        }, this);
    }

    resetSymbol() {
        this.symbols.forEach((symbol: Symbol) => {
            symbol.symbolSprite.texture = this.textures[symbol.id];
            symbol.symbolSprite.visible = true;
        }, this);
        game.removeScheduledTask("BlinkEffect" + this.reelIndex);
    }

    addStoppingSymbol(stoppingSymbols: number[]) {
        for(let i = 1; i< 4; i++) {
            this.symbols[i].symbolSprite.texture = this.textures[stoppingSymbols[i-1]];
            this.symbols[i].id = stoppingSymbols[i - 1];
        }
    }

    animateWiningSymbol(position: number) {
        const id = this.symbols[position + 1].id;
        this.symbols[position + 1].symbolSprite.texture = this.winTextures[id];
        this.blinkSymbols(position);

    }

    private blinkSymbols(position: number) {
        game.scheduleTask("BlinkEffect" + this.reelIndex, 0.5, () => {
            game.removeScheduledTask("BlinkEffect" + this.reelIndex);
            this.symbols[position + 1].symbolSprite.visible = !this.symbols[position + 1].symbolSprite.visible;
            this.blinkSymbols(position);
        });
    }

    spinOneTime() {
        let currentSpeed = this.startingSpeed
        let doneRunning = false;
        let yOffset = (this.appHeight - this.symbols[0].symbolSprite.height * 3) / 3 / 2;
        return new Promise<void>(resolve => {
            const tick = () => {
                for (let i = this.symbols.length - 1; i >= 0; i--) {
                    const symbol = this.symbols[i];
                    if (symbol.symbolSprite.y + currentSpeed > this.appHeight + yOffset) {
                        doneRunning = true;
                        currentSpeed = this.appHeight - symbol.symbolSprite.y + yOffset;
                        symbol.symbolSprite.y = -(symbol.symbolSprite.height + yOffset);
                    } else {
                        this.addBlurring(symbol.symbolSprite);
                        symbol.symbolSprite.y += currentSpeed;
                    }
                    if (i === 0 && doneRunning) {
                        let t: Symbol = this.symbols.pop() as Symbol;
                        const id = Math.floor(Math.random() * this.textures.length);
                        t.symbolSprite.texture = this.textures[id];
                        t.id = id;
                        if (t) this.symbols.unshift(t);
                        game._app.ticker.remove(tick);
                        resolve();
                    }
                }
            }
            game._app.ticker.add(tick);
        });
    }

    private readonly textures: PIXI.Texture [] = [];
    private readonly winTextures: PIXI.Texture[] = [];
    private readonly appHeight: number;
    private readonly symbols: Symbol [] = [];

    private startingSpeed: number;
    private reelIndex: number = 0;
}

export interface Symbol {
   symbolSprite: PIXI.Sprite;
   id: number;
   partOfWin: boolean;
}
