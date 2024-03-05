export default class PowerUpStrategy {
    /** @param {Player} player */
    constructor(player) {
        this.player = player;
    }

    handle() {
        throw new Error('PowerUp.handle not implemented');
    }

    /**
     * Make this player the owner of the given case
     * It happens when a player won this case by using a power up like the bomb, then the case belongs to him
     * @param {Case} targetedCase
     */
    ownCase(targetedCase) {
        if (targetedCase === undefined) {
            return;
        }
        if (targetedCase.getOwner() === this.player) {
            return;
        }
        if (targetedCase.isOccupied) {
            return;
        }

        targetedCase.ownedBy(this.player);

        if (targetedCase.hasPowerUp()) {
            targetedCase.removePowerUp();
        }

        this.player.increaseScore();
    }

    /**
     * Remove the ownership of the given case.
     * It happens when a player made this case to explode, then it belongs to nobody
     * @param targetedCase
     */
    removeCaseOwnerShip(targetedCase) {
        if (targetedCase === undefined) {
            return;
        }
        if (targetedCase.isOccupied) {
            return;
        }

        targetedCase.ownedByNobody();

        if (targetedCase.hasPowerUp()) {
            targetedCase.removePowerUp();
        }
    }
}
