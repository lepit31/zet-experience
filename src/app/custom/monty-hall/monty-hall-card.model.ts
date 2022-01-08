export class MontyHallCardModel {
    public displayedImg: string;
    public behindCurtain: string;
    public selection: string;

    constructor() {
        this.displayedImg = 'assets/img/theme/curtain-200.jpg';
        this.behindCurtain = 'assets/img/monty-hall/goat.png';
        this.selection = 'monty-hall-no-selection';
    }
}
