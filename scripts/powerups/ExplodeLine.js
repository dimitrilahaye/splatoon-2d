import PowerUpStrategy from "./PowerUpStrategy.js";

export default class ExplodeLine extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const toDirection = this.player.api.grid.getCasesInOneDirectionFromPlayer(this.player);
        toDirection.forEach((c) => {
            this.removeCaseOwnerShip(c);
        });
    }
}
