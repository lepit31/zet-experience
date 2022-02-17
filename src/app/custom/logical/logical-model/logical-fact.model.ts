export class LogicalFactModel {
    // can be 'A->X' 'Non A-> Non X' 'X->A' 'Non X -> Non A'
    public id: string;
    public head: string;
    public headTooltip: string;
    public tail: string;
    public tailTooltip: string;
    // can be CONFIRM REFUTE NONE
    public rule: string;
    public verified: boolean;


    constructor() {
    }
}
