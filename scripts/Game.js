import Timer from "./Timer.js";
import initPlayers from "./Players.js";
import {PowerUps} from "./powerUps.js";
import Grid from "./Grid.js";

export default class Game {
    /**
     * The dom element for the app div
     * @type {HTMLElement}
     */
    #app$;
    /**
     * The Timer class instance, manage the timer
     * @type {Timer}
     */
    #timer;
    /**
     * The array of all the players
     * @type {Player[]}
     */
    #allPlayers = [];
    /**
     * The number of rows and columns in order to draw the game grid
     * @type {number}
     */
    #rows;
    /**
     * The initial start value for the timer
     * @type {number}
     */
    #timerStartValue;
    /**
     * The player control handler for the keys press
     * @type {EventListener}
     */
    #keysHandler;
    /**
     * The start button's handler
     * @type {EventListener}
     */
    #startHandler;
    /**
     * The restart button's handler
     * @type {EventListener}
     */
    #restartHandler;
    /**
     * Interval id for power ups
     * @type {number}
     */
    #powerUpInterval;
    /**
     * The list of available power ups
     * @type {PowerUps}
     */
    #powerUpsList;
    /**
     * All the cases of the game
     * @type {Grid}
     */
    #grid;
    /**
     * The button used for start and restart
     * @type {Element}
     */
    #startButton$;
    /**
     * The size of each case in pixels
     * @type {number}
     */
    #size;

    /**
     * Game instance constructor
     * @param {number} timer - the timer initial start value
     * @param {number} rows - the number of rows and columns in order to draw the game grid
     * @param {number} size - the size of each case in pixels
     */
    constructor({timer = 30, rows = 10, size = 50}) {
        this.#rows = rows;
        this.#size = size;
        this.#timerStartValue = timer;
        this.#app$ = document.querySelector('#app');
        this.#powerUpsList = PowerUps;
        this.#initialize();
        this.#startButton$ = document.querySelector('#start button');
        this.#startButton$.innerText = 'Start';
        this.#startButton$.addEventListener('click', this.#startHandler);
    }

    /**
     * Launch timer and start the game
     */
    #start() {
        document.addEventListener('keydown', this.#keysHandler);
        this.#timer.start();
        this.#startPowerUpsInterval();
        this.#startButton$.classList.add('hidden');
        this.#timer.timer$.addEventListener('finish', () => {
            document.removeEventListener('keydown', this.#keysHandler);
            this.#app$.insertAdjacentHTML('beforeend', `<div class="gameover">${this.#getWinner()}</div>`);
            clearInterval(this.#powerUpInterval);
            this.#startButton$.innerText = 'Restart';
            this.#startButton$.removeEventListener('click', this.#startHandler);
            this.#startButton$.addEventListener('click', this.#restartHandler);
            this.#startButton$.classList.remove('hidden');
        });
    }

    /**
     * Restart the game
     */
    #restart() {
        this.#initialize();
        this.#start();
    }

    /**
     * Start the time interval between each power up apparition
     */
    #startPowerUpsInterval() {
        this.#powerUpInterval = setInterval(this.#addPowerUp.bind(this), 5000);
    }

    /**
     * Add a power up in the grid
     */
    #addPowerUp() {
        const powerUp = this.#getRandomPowerUp();
        this.#grid.addPowerUp(powerUp);
    }

    /**
     * Pick a random power up in order to display it into the grid
     * @return {PowerUp}
     */
    #getRandomPowerUp() {
        return this.#powerUpsList[Math.floor(Math.random() * this.#powerUpsList.length)];
    }

    /**
     * Draws the grid, adapts the css and create all players
     */
    #initialize() {
        this.#timer = new Timer({timer: this.#timerStartValue});

        this.#stylizeBlocks(this.#size);
        this.#grid = new Grid({container$: this.#app$, rows: this.#rows, size: this.#size});

        this.#allPlayers = initPlayers({
            rows: this.#rows,
            api: {grid: this.#grid}
        });

        this.#keysHandler = (e) => {
            this.#allPlayers.forEach((player) => {
                player.move(e.code);
            });
        }

        this.#startHandler = (e) => {
            this.#start();
        }

        this.#restartHandler = (e) => {
            this.#restart();
        }
     }

    /**
     * Adapts the css style of the blocks HUD according to the number of rows of the grid and the size of each case into
     */
    #stylizeBlocks() {
        const blocks = document.querySelectorAll('.block');
        for (const block of blocks) {
            block.setAttribute("style", `width: ${this.#rows * this.#size}px;`);
        }
    }

    /**
     * Fin whom player is the winner and build the victory message
     * @return {string}
     */
    #getWinner() {
        let winner;
        const hasPar = this.#allPlayers.every((player) => player.score === this.#allPlayers[0].score);
        if (hasPar) {
            winner = 'Égalité !';
        }
        if (!hasPar) {
            const [winnerPlayer] = this.#allPlayers.sort((a, b) => b.score - a.score);
            winner = `Le joueur ${winnerPlayer.color} a gagné !`;
        }

        return winner;
    }
}
