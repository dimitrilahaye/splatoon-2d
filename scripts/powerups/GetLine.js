import PowerUpStrategy from "./PowerUpStrategy.js";

export default class GetLine extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const toDirection = this.player.api.grid.getCasesInOneDirectionFromPlayer(this.player);
        toDirection.forEach((c) => {
            this.ownCase(c);
        });
    }
}
