import {PowerUpNames} from "../powerUps.js";
import GetZone from "./GetZone.js";
import GetRowAndColumn from "./GetRowAndColumn.js";
import GetCrossZone from "./GetCrossZone.js";
import GetLine from "./GetLine.js";
import ExplodeZone from "./ExplodeZone.js";
import ExplodeRowAndColumn from "./ExplodeRowAndColumn.js";
import ExplodeCrossZone from "./ExplodeCrossZone.js";
import ExplodeLine from "./ExplodeLine.js";

/**
 * Compute strategy to return the {PowerUpStrategy} class instance.
 */
export default class PowerUpPolicy {
    /** @param {Player} player */
    constructor(player) {
        this.player = player;
    }

    /**
     * @param {PowerUp} powerUp
     * @returns {PowerUpStrategy}
     */
    getPowerUp(powerUp) {
        const {name} = powerUp;
        if (name === PowerUpNames.GET_1_ZONE) {
            return new GetZone(this.player);
        }
        if (name === PowerUpNames.GET_ROW_AND_COLUMN) {
            return new GetRowAndColumn(this.player);
        }
        if (name === PowerUpNames.GET_CROSS) {
            return new GetCrossZone(this.player);
        }
        if (name === PowerUpNames.GET_LINE) {
            return new GetLine(this.player);
        }
        if (name === PowerUpNames.EXPLODE_ZONE) {
            return new ExplodeZone(this.player);
        }
        if (name === PowerUpNames.EXPLODE_ROW_AND_COLUMN) {
            return new ExplodeRowAndColumn(this.player);
        }
        if (name === PowerUpNames.EXPLODE_CROSS) {
            return new ExplodeCrossZone(this.player);
        }
        if (name === PowerUpNames.EXPLODE_LINE) {
            return new ExplodeLine(this.player);
        }
    }
}
