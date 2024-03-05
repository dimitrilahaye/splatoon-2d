/**
 * Class representing a case into the game grid.
 * Manage the ownership logics.
 */
export default class Case {
    /** @type {Player|null} */
    #owner = null;
    /** @type {PowerUp|null} */
    #powerUp = null;
    /** @type {Element} */
    #element$;

    /**
     * Constructor of the class Case
     * It draws the case on screen.
     * @param {Element} appContainer$
     * @param {Coordinates} coordinates
     */
    constructor({appContainer$, coordinates}) {
        this.coordinates = coordinates;

        appContainer$.insertAdjacentHTML('beforeend', `<div data-x="${this.coordinates.x}" data-y="${this.coordinates.y}" class="case"></div>`);
        this.#element$ = appContainer$.querySelector(`[data-x="${this.coordinates.x}"][data-y="${this.coordinates.y}"]`);
    }

    /**
     * Returns `true` if the case is currently occupied by a player
     * @return {boolean}
     */
    get isOccupied() {
        return this.#element$.classList.contains('player');
    }

    /**
     * Add the given power up to this case
     * @param {PowerUp} powerUp
     */
    addPowerUp(powerUp) {
        this.#powerUp = powerUp;
        this.#element$.insertAdjacentHTML('beforeend', `<i class="fa-solid fa-${powerUp.icon}"></i>`);
        this.#element$.classList.add('power-up', powerUp.name);
    }

    /**
     * Returns `true` if the case is currently occupied by a power up
     * @return {boolean}
     */
    hasPowerUp() {
        return this.#powerUp !== null;
    }

    /**
     * Used when a player have just moved into a case then occupy it.
     * If this case had a power up, it returns its name.
     * If this case already has an owner, it will replace if by given player.
     * @param {Player} player
     * @return {PowerUp|null} the power up if found on this case. `null` if not.
     */
    occupiedBy(player) {
        this.ownedBy(player);

        this.#occupy();
        player.coordinates = this.coordinates;

        if (!this.hasPowerUp()) {
            return null;
        }

        const powerUp = this.#powerUp;
        this.removePowerUp();
        return powerUp;
    }

    /**
     * Set this case to be free from players.
     * If this case has an owner, it will keep it.
     */
    free() {
        this.#element$.classList.remove('player');
    }

    /**
     * Used when a case belongs to a player.
     * If this case already has an owner, it will replace if by given player.
     * Typically, this arrives when a player used a power up which gave this case to him.
     * If this case already has an owner, it first removes the ownership, then gives it to the given player.
     * @param {Player} player
     */
    ownedBy(player) {
        const currentOwner = this.getOwner();
        if (currentOwner !== null) {
            this.free();
            this.#element$.classList.remove(this.#owner.color);
            currentOwner.decreaseScore();
        }

        this.#owner = player;
        this.#element$.classList.add(this.#owner.color);
    }

    /**
     * Remove the ownership of this case
     */
    ownedByNobody() {
        const currentOwner = this.getOwner();
        if (currentOwner === null) {
            return;
        }

        this.#element$.classList.remove(this.#owner.color);
        currentOwner.decreaseScore();
        this.#owner = null;
    }

    /**
     * Remove a power up from this case.
     */
    removePowerUp() {
        this.#element$.classList.remove('power-up', this.#powerUp.name);
        this.#element$.innerText = '';
        this.#powerUp = null;
    }

    /**
     * Returns this case's owner
     * @return {Player|null}
     */
    getOwner() {
        return this.#owner;
    }

    /**
     * Set this case to be occupied by a player
     */
    #occupy() {
        this.#element$.classList.add(this.#owner.color);
        this.#element$.classList.add('player');
    }
}
