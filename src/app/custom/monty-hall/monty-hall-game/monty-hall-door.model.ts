export class MontyHallDoorModel {
    public displayedImg: string;
    // possible values : red-car , goat
    public behindDoor: string;
    public selection: string;
    public enabled: boolean;

    constructor() {
        this.displayedImg = 'assets/img/monty-hall/door.png';
        this.behindDoor = 'goat';
        this.selection = 'monty-hall-no-selection';
        this.enabled = true;
    }
}
