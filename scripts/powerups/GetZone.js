import PowerUpStrategy from "./PowerUpStrategy.js";

export default class GetZone extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const neighbours = this.player.api.grid.getCasesAllAroundPlayer(this.player);
        neighbours.forEach((neighbour) => {
            this.ownCase(neighbour);
        });
    }
}
