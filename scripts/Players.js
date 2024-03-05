import Player from "./Player.js";

/**
 * Initialize all the players
 * @param {number} rows - number of rows and columns for the game grid, used to manage player moves
 * @param {PlayerApi} api - the available api in order to let players interact with the game
 * @returns {Player[]}
 */
function initPlayers({rows, api}) {
    const playerOne = new Player({
        rows,
        api,
        color: 'rose',
        number: 'one',
        keys: {
            up: "ArrowUp",
            down: "ArrowDown",
            left: "ArrowLeft",
            right: "ArrowRight",
        },
        startCoordinates: {x: rows - 1, y: rows - 1},
    });

    const playerTwo = new Player({
        rows,
        api,
        color: 'vert',
        number: 'two',
        keys: {
            up: "KeyW",
            down: "KeyS",
            left: "KeyA",
            right: "KeyD",
        },
        startCoordinates: {x: 0, y: 0},
    });

    playerOne.setOpponents([playerTwo]);
    playerTwo.setOpponents([playerOne]);

    return [playerOne, playerTwo];
}

export default initPlayers;
