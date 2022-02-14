export class FeelingFutureStatisticModel {
    constructor(
        public nbUser?: number,
        public nbPrediction?: number,
        public nbPredictionSuccess?: number,
        public nbLeft?: number,
        public nbLeftSuccess?: number,
        public nbRight?: number,
        public nbRightSuccess?: number,
        public nbErotic?: number,
        public nbEroticSuccess?: number,
        public nbNonErotic?: number,
        public nbNonEroticSuccess?: number
    ) {
    }
}
