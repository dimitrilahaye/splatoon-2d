import PowerUpPolicy from "./powerups/PowerUpPolicy.js";

export default class Player {
    /**
     * This player's score
     * @type {number}
     */
    score = 1;
    /**
     * Color for the display of this player on the grid
     * @type {string}
     */
    color;
    /**
     * Currently used to display where the player is at the moment "one" for player 1, "two" for player 2.
     * @type {string}
     * Will be refactored later.
     */
    number;
    /**
     * Keys map used to decide which key code is used for directions
     * @type {KeysMap}
     */
    keys;
    /**
     * Player start coordinates on the grid
     * @type {Coordinates}
     */
    coordinates;
    /**
     * All this player's opponent
     * @type {Player []}
     */
    opponents = [];
    /**
     * The dom element corresponding to the score for this player
     * @type {HTMLElement}
     */
    #score$ = null;
    /**
     * Number of rows and columns for the game grid, used to manage the player movements
     * @type {number}
     */
    rows;
    /**
     * The available api in order to let player interacts with the game
     * @type {PlayerApi}
     */
    api;
    /**
     * Current direction taken by the player (next movement done)
     * @type {'up'| 'down' | 'left' | 'right'}
     */
    currentDirection;
    /**
     * The class which return the right instance of power up
     * @type {PowerUpPolicy}
     */
    #powerUpPolicy;

    /**
     * Player instance constructor
     * @param {string} color - color for the display of this player on the grid
     * @param {string} number - currently used to display where the player is at the moment "one" for player 1, "two" for player 2.
     * Will be refactored later.
     * @param {KeysMap} keys - keys map used to decide which key code is used for directions
     * @param {Coordinates} startCoordinates - player start coordinates on the grid
     * @param {number} rows - number of rows and columns for the game grid, used to manage the player movements
     * @param {PlayerApi} api - the available api in order to let players interact with the game
     */
    constructor({color, number, keys, startCoordinates, rows, api}) {
        this.color = color;
        this.number = number;
        this.api = api;
        this.keys = keys;
        this.coordinates = startCoordinates;
        this.rows = rows;

        this.#powerUpPolicy = new PowerUpPolicy(this);

        this.#score$ = document.querySelector(`.score.${this.number} span.score`);
        this.#score$.innerText = this.score.toString();

        this.#updatePlayerPosition(startCoordinates);
    }

    /**
     * Add all opponents for this player
     * @param {Player[]} opponents
     */
    setOpponents(opponents) {
        this.opponents.push(...opponents);
    }

    /**
     * According to given direction code, it allows player to move.
     * @param {string} code
     */
    move(code) {
        if (![this.keys.up, this.keys.down, this.keys.left, this.keys.right].includes(code)) {
            return;
        }

        let {x, y} = this.coordinates;
        let direction;

        if (code === this.keys.up) {
            if (x === 0) {
                return;
            }
            direction = 'up';
            x--;
        } else if (code === this.keys.down) {
            if ((x + 1) % this.rows === 0) {
                return;
            }
            direction = 'down';
            x++;
        } else if (code === this.keys.left) {
            if (y === 0) {
                return;
            }
            direction = 'left';
            y--;
        } else if (code === this.keys.right) {
            if ((y + 1) % this.rows === 0) {
                return;
            }
            direction = 'right';
            y++;
        }

        const onTheSameCaseThanAnOpponent = this.opponents.some(({coordinates}) => {
            const {x: opponentX, y: opponentY} = coordinates;
            return x === opponentX && y === opponentY;
        });
        if (onTheSameCaseThanAnOpponent) {
            return;
        }

        this.currentDirection = direction;
        this.#updatePlayerPosition({x, y});

        this.increaseScore();
    }

    /**
     * Decrease the player's score by one point
     */
    decreaseScore() {
        if (this.score === 0) {
            return;
        }

        this.score -= 1;
        this.#score$.innerText = this.score.toString();
    }

    /**
     * Increase the player's score by one point
     */
    increaseScore() {
        this.score += 1;
        this.#score$.innerText = this.score.toString();
    }

    /**
     * Update the position of this player after he moved.
     * If the new case got a power up, its effect is unleashed.
     * @param {Coordinates} coordinates
     */
    #updatePlayerPosition(coordinates) {
        const obtainedPowerUp = this.api.grid.playerMoveTo(this, coordinates);
        if (obtainedPowerUp === null) {
            return;
        }

        const powerUpLauncher = this.#powerUpPolicy.getPowerUp(obtainedPowerUp);
        powerUpLauncher.handle();
    }
}
