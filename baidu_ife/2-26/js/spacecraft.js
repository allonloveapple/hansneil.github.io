/**
 * Created by hansneil on 26/3/16.
 */
var START = 1, STOP = 0;
var spaceCraft = {
    state: START,
    powerSystem: 0.05,
    energySystem: 0.02,
    signalSystem: "",
    selfDestructionSystem: function (){}
};

function createCraft() {
    var craft = Object.create(spaceCraft);
}