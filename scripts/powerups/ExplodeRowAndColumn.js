import PowerUpStrategy from "./PowerUpStrategy.js";

export default class ExplodeRowAndColumn extends PowerUpStrategy {
    constructor(player) {
        super(player);
    }

    handle() {
        const newPlayerCases = this.player.api.grid.getCasesInRowAndColumnFromPlayer(this.player);
        newPlayerCases.forEach((c) => {
            this.removeCaseOwnerShip(c);
        });
    }
}
