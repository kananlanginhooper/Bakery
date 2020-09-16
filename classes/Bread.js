export class Bread {
    BreadName;
    BreadImage_Square;
    BreadImage_Round;

    // for the baking cycle
    Selected = false;

    // For ordering
    RoundSelected = false;
    PanSelected = false;

    // Delivery Clean up
    DeliverRound = false;
    DeliverPan = false;

    constructor(BreadName, BreadImage_Square, BreadImage_Round) {
        this.BreadName = BreadName;
        this.BreadImage_Square = BreadImage_Square;
        this.BreadImage_Round = BreadImage_Round;
    }
}

export class SimpleBread {
    BreadName;
    BakingPan = false;

    constructor(BreadName, BakingPan) {
        this.BreadName = BreadName;
        this.BakingPan = BakingPan;
    }
}
