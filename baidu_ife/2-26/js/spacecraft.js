/**
 * Created by hansneil on 26/3/16.
 */
var START = 1, STOP = 0;
var spaceCraft = {
    state: START,
    speed: 0.5,
    powerSystem: 0.05,
    energySystem: 0.02,
};

function createCraft(order) {
    var craft = Object.create(spaceCraft);
    craft.order = order;
    return craft;
}