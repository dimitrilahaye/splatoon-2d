import PowerUpStrategy from "./PowerUpStrategy.js";

export default class GetCrossZone extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const crossedCases = this.player.api.grid.getCrossZoneAroundPlayer(this.player);
        crossedCases.forEach((crossedCase) => {
            this.ownCase(crossedCase);
        });
    }

}
