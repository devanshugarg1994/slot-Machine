/* 
* This Class is responsible for loading all media for us.
* All media is mentioned in `manifest.json`, hence fist load it later load media 
* mentioned in the json file.
*  
*/

import { Assets } from "./Assets";
import { game } from "../main";
import { getAssetKey } from "../utils";

export class Loader {
    constructor() {
    }


    static loadDynamic(list: string[], callback: Function) {
        if (game.loader.resources[list[0]]) {
            console.log("Already Loaded");
            callback && callback(game.loader, game.loader.resources);
        } else {
            list.forEach((path: string) => {
                game.loader.add(path);
                const assestKey = getAssetKey(path);
                Assets.getInstance().add({ [assestKey]: path });
            });
            console.log(Assets.getInstance().getAssetsMap());
            game.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => callback(loader, resources));
        }
    }


    /*  Loading Manifest.json */
    public loadMainManifest(loadingAssestArray: string[]): void {
        loadingAssestArray.forEach((path: string) => {
            game.loader.add(path);
        });
        game.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onManifestLoaded(loader, resources));
    }


    /*  Callback of Manifest.json */
    private onManifestLoaded(_loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {
        const assetsPaths = resources[Assets.MainManifsetPath]?.data.preLoadresources;
        this.preLoad(assetsPaths);
    }

    /*  Call function necessary to start preLoading */
    private preLoad(assetsPaths: string []): void {
        this.addFileNeededToLoad(assetsPaths);
        this.loadAddedFile();
    }

    /*  Traverse the `manifest.json` and add all preload media needed to load */
    private addFileNeededToLoad(assetsPaths:string []): void {
        for (let path of assetsPaths) {
            game.loader.add(path);
            const assestKey = getAssetKey(path);
            Assets.getInstance().add({ [assestKey]:path });
        }
    }

    /* Function that actually send reuest and load the file
    * We are using PIXI.loader for loading , hence all asynchronous call are handle by PIXI */
    private loadAddedFile(): void {
        game.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onLoadComplete(loader, resources));
    }

    /* 
    * When we load the function we start our Game
    * Note: Below code should move to `init()` function of Application class and an 
    * event should fire from here to achieve that we need either use CustomEvent of window or
    * or create our own Event-Dispatch system (For now not implementing it)
    */
    private onLoadComplete(_loader: PIXI.Loader, _resources: Partial<Record<string, PIXI.LoaderResource>>) {
        console.log(Assets.getInstance().getAssetsMap());
        game.init();
    }

}

