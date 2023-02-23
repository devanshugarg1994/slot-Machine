// A map binding asset name with there realtive path.
// It is hepful to get any assest refrence loaded by pixi loader with the help of name asset.
export class Assets {

    private constructor() {

    }


    static getInstance(): Assets {
        if (!Assets.instance) {
            Assets.instance = new Assets()
        } 

        return Assets.instance;
    }

    add(json: { [key: string]: string }) {
        for (const key in json) {
            if (this.assetsPath.get(key)) {
                throw new Error("Multiple copy of same assets in mainManifest: " + key);
            } else {
                this.assetsPath.set(key, json[key]);
            }
        }
    }

    getAssetsMap(): Map<string, string> {
        return this.assetsPath
    }

    getRelativePath(key: string): string {
        if (!this.assetsPath.get(key)) {
            throw new Error("Asset not found: " + key);
        }

        return this.assetsPath.get(key) as string;
    }


    private assetsPath: Map<string, string> = new Map();

    // Below file need to loaded before anything .
    public static readonly MainManifsetPath: string = "../jsonfile/mainManifset.json";
    public static readonly LoadingUiPath: string = "../jsonfile/loading.json";

    private static instance: Assets;
}