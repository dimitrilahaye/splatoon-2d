import PowerUpStrategy from "./PowerUpStrategy.js";

export default class ExplodeCrossZone extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const crossedCases = this.player.api.grid.getCrossZoneAroundPlayer(this.player);
        crossedCases.forEach((crossedCase) => {
            this.removeCaseOwnerShip(crossedCase);
        });
    }

}
