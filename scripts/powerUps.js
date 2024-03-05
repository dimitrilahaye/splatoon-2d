const PowerUpNames = Object.freeze({
    GET_1_ZONE: 'get-1-zone',
    GET_ROW_AND_COLUMN: 'get-row-and-column',
    GET_CROSS: 'get-cross',
    GET_LINE: 'get-line',
    EXPLODE_ZONE: 'explode-zone',
    EXPLODE_ROW_AND_COLUMN: 'explode-row-and-column',
    EXPLODE_CROSS: 'explode-cross',
    EXPLODE_LINE: 'explode-line',
});

/** @type {PowerUps} */
const PowerUps = Object.freeze([
    {name: PowerUpNames.GET_1_ZONE, icon: 'bomb'},
    {name: PowerUpNames.GET_ROW_AND_COLUMN, icon: 'rocket'},
    {name: PowerUpNames.GET_CROSS, icon: 'arrows-up-down-left-right'},
    {name: PowerUpNames.GET_LINE, icon: 'hand-sparkles'},
    {name: PowerUpNames.EXPLODE_ZONE, icon: 'explosion'},
    {name: PowerUpNames.EXPLODE_ROW_AND_COLUMN, icon: 'explosion'},
    {name: PowerUpNames.EXPLODE_CROSS, icon: 'explosion'},
    {name: PowerUpNames.EXPLODE_LINE, icon: 'explosion'},
]);

export {PowerUps, PowerUpNames};
