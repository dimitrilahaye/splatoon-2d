import Case from "./Case.js";

/**
 * Class which manage the grid and the cases inside
 */
export default class Grid {
    /**
     * All the cases contained into the grid
     * @type {Case[]}
     */
    #list = [];

    /**
     * Constructor of the class Grid
     * It draws the grid on screen.
     * @param {Element} container$
     * @param {number} rows
     * @param {number} size
     */
    constructor({container$, rows, size}) {
        container$.querySelectorAll('div').forEach((case$) => {
            case$.remove();
        });
        this.#drawGrid(rows, container$);
        this.#updateStyle(container$, rows, size);
    }

    /**
     * Return a case at the given coordinates
     * @param {number} x
     * @param {number} y
     * @returns {Case|undefined}
     */
    getCaseAt(x, y) {
        return this.#list.find((c) => c.coordinates.x === x && c.coordinates.y === y);
    }

    /**
     * Get all the cases, starting from given player coordinates, and to each direction
     * @param {Player} player
     */
    getCasesInRowAndColumnFromPlayer(player) {
        const {x, y} = player.coordinates;
        const toTheTop = Array(x).fill().map((_, idx) => this.getCaseAt(idx, y));
        const toTheBottom = Array(player.rows - x + 1).fill().map((_, idx) => this.getCaseAt(x + idx, y));
        const toTheLeft = Array(y).fill().map((_, idx) => this.getCaseAt(x, idx));
        const toTheRight = Array(player.rows - y + 1).fill().map((_, idx) => this.getCaseAt(x, y + idx));

        return [...toTheTop, ...toTheBottom, ...toTheLeft, ...toTheRight];
    }

    /**
     * Get all the cases, starting from given player coordinates, connected to it on the top, bottom, left and right
     * @param {Player} player
     * @return {Case[]}
     */
    getCrossZoneAroundPlayer(player) {
        const {x, y} = player.coordinates;
        return [
            this.getCaseAt(x - 1, y),
            this.getCaseAt(x + 1, y),
            this.getCaseAt(x, y - 1),
            this.getCaseAt(x, y + 1),
        ];
    }

    /**
     * Get all the cases inline, according to the next player direction, starting from given player coordinates.
     * @param {Player} player
     * @return {Case[]}
     */
    getCasesInOneDirectionFromPlayer(player) {
        const {x, y} = player.coordinates;
        switch (player.currentDirection) {
            case "up":
                return Array(x).fill().map((_, idx) => this.getCaseAt(idx, y));
            case "down":
                return Array(player.rows - x + 1).fill().map((_, idx) => this.getCaseAt(x + idx, y));
            case "left":
                return Array(y).fill().map((_, idx) => this.getCaseAt(x, idx));
            case "right":
                return Array(player.rows - y + 1).fill().map((_, idx) => this.getCaseAt(x, y + idx));
        }
    }

    /**
     * Get all the cases around the given player
     * @param {Player} player
     * @return {Case[]}
     */
    getCasesAllAroundPlayer(player) {
        const {x, y} = player.coordinates;
        return Array.from({length: 8},
            (_, i) => this.getCaseAt(x + Math.round(Math.cos(Math.PI * i / 4)), y + Math.round(Math.sin(Math.PI * i / 4))),
        );
    }

    /**
     * Called when providing player moves to providing coordinates.
     * @param {Player} player
     * @param {Coordinates} coordinates
     * @return {PowerUp|null} the power up if found on new player's case. {null} if not.
     */
    playerMoveTo(player, coordinates) {
        const playerCurrentCase = this.#getCurrentCaseOf(player);
        if (playerCurrentCase !== undefined) {
            this.#playerLeaveFrom(playerCurrentCase.coordinates);
        }

        const c = this.getCaseAt(coordinates.x, coordinates.y);
        return c.occupiedBy(player);
    }

    /**
     * Add the given power up on a random free case.
     * @param {PowerUp} powerUp
     */
    addPowerUp(powerUp) {
        const caseForPowerUp = this.#getRandomCaseFreeForPowerUps();
        if (caseForPowerUp === null) {
            return;
        }

        caseForPowerUp.addPowerUp(powerUp);
    }

    /**
     * Returns the cases no occupied by a player nor by power up
     * @return {Case[]}
     */
    #getFreeCasesForPowerUps() {
        return this.#list.filter((c) => !c.isOccupied && !c.hasPowerUp());
    }

    /**
     * Returns a random case free for power up
     * @return {Case}
     */
    #getRandomCaseFreeForPowerUps() {
        const freeCases = this.#getFreeCasesForPowerUps();
        if (freeCases.length === 0) {
            return null;
        }
        return freeCases[Math.floor(Math.random() * freeCases.length)];
    }

    /**
     * Used when a player leaves a case which he owns
     * @param {Coordinates} coordinates
     */
    #playerLeaveFrom(coordinates) {
        const c = this.getCaseAt(coordinates.x, coordinates.y);
        c.free();
    }

    /**
     * Returns the case currently occupied by the given player.
     * @param {Player} player
     */
    #getCurrentCaseOf(player) {
        return this.#list.find((c) => c.getOwner() === player && c.isOccupied);
    }

    /**
     * Adapts the css style to the grid configuration
     * @param {Element} container$
     * @param {number} rows
     * @param {number} size
     */
    #updateStyle(container$, rows, size) {
        container$.setAttribute("style", `
            width: ${rows * size}px;
            grid-template-columns: repeat(${rows}, ${size}px);
            height: ${rows * size}px;
        `);
    }

    /**
     * According to given number of rows, builds the cases
     * @param {number} rows
     * @param {Element} container$
     */
    #drawGrid(rows, container$) {
        let x = 0;
        let y = 0;
        const maxCases = (rows * rows) - 1;
        for (let i = 0; i <= maxCases; i++) {
            this.#list.push(new Case({appContainer$: container$, coordinates: {x, y}}));
            y++;
            if (y % rows === 0) {
                x++;
                y = 0;
            }
        }
    }
}
