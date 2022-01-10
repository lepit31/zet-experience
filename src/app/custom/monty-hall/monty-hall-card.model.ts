export class MontyHallCardModel {
    public displayedImg: string;
    // possible values : red-car , goat
    public behindCurtain: string;
    public selection: string;
    public enabled: boolean;

    constructor() {
        this.displayedImg = 'assets/img/theme/curtain-200.jpg';
        this.behindCurtain = 'goat';
        this.selection = 'monty-hall-no-selection';
        this.enabled = true;
    }
}
