import { ReelsView } from "./ReelsView";

export class ReelsController {
    constructor(reelsView: ReelsView) {
        this.reelsView = reelsView;
    }

    protected reelsView: ReelsView;
}