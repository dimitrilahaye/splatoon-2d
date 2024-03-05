export default class Timer {
    /**
     * HTMLElement for the timer
     * @type {Element}
     */
    timer$ = document.querySelector("#timer");
    /**
     * Initial start value of the timer
     * @type {number}
     */
    time = 0;
    /**
     * Interval id
     * @type {number}
     */
    #interval;
    /**
     * Event dispatched by the Timer when time is over
     * @type {CustomEvent}
     */
    #event;

    /**
     * Time instance constructor
     * @param {number} timer - the initial start value of the timer
     */
    constructor({timer}) {
        this.time = timer;
        this.timer$.innerText = this.time;
        this.#event = new CustomEvent('finish');
    }

    /**
     * Start the timer
     */
    start() {
        this.#interval = setInterval(this.#countdown.bind(this), 1000);
    }

    /**
     * Countdown handler
     */
    #countdown() {
        this.timer$.innerText = this.time;
        if (this.time === 0) {
            clearInterval(this.#interval);

            this.timer$.dispatchEvent(this.#event);
        }
        this.time--;
    }
}
