/**
 * Created by hansneil on 26/3/16.
 */
var START = 1, STOP = 0;
var clearId = [], stopId = [];
var spaceCraft = {
    state: STOP,
    speed: 0.5,
    powerSystem: 0.5,
    energySystem: 0.2,
    energy: 100,
    path: 0,
    startOwnCraft: function(order, id) {
        var craft = document.querySelector("#craft-" + id);
        var energyText = craft.querySelector(".energy-text");
        var energyBar = craft.querySelector(".energy");
        var speed = this.speed;
        var that = this;
        this.state = START;
        clearInterval(stopId[id]);
        if (clearId[id]) {
            clearInterval(clearId[id]);
        }
        clearId[id] = setInterval(function(){
            that.path += speed;
            that.energy += that.energySystem - that.powerSystem;
            energyText.textContent = Math.floor(that.energy);
            energyBar.style.height = that.energy + "%";
            if (that.energy <= 50) {
                energyBar.style.backgroundColor = "#c83b38";
            }
            if (Math.floor(that.energy) <= 0) {
                that.stopOwnCraft(order, id);
            }
            craft.style.transform = "rotate(" + that.path + "deg)";
        }, 100);
    },
    stopOwnCraft: function(order, id){
        var that = this;
        var craft = document.querySelector("#craft-" + id);
        var energyText = craft.querySelector(".energy-text");
        var energyBar = craft.querySelector(".energy");
        var control = document.querySelectorAll(".craft-control")[order-1];
        var startBtn = control.querySelector(".start");
        var stopBtn = control.querySelector(".stop");
        startBtn.style.display = "block";
        stopBtn.style.display = "none";
        this.state = STOP;
        clearInterval(clearId[id]);
        if (stopId[id]) {
            clearInterval(stopId[id]);
        }
        stopId[id] = setInterval(function(){
            if (that.energy < 100) {
                that.energy += that.energySystem;
                energyText.textContent = Math.floor(that.energy);
                energyBar.style.height = that.energy + "%";
                if (that.energy >= 50) {
                    energyBar.style.backgroundColor = "#2fa06c";
                }
            }
        }, 100);
    },
    destoryOwnCraft: function(order, id){
        var craft = document.querySelector("#craft-" + id);
        if (clearId[id]) {
            clearInterval(clearId[id]);
        }
        craft.parentNode.removeChild(craft);
    }
};
function createCraft(order) {
    var craft = Object.create(spaceCraft);
    craft.order = order;
    craft.startCraft = function(command, i) {
        if (command.id == this.order) {
            this.startOwnCraft(this.order, i);
        }
    };
    craft.stopCraft = function(command, i) {
        if (command.id == this.order) {
            this.stopOwnCraft(this.order, i);
        }
    };
    craft.destoryCraft = function(command, i) {
        if (command.id == this.order) {
            this.path = 0;
            this.destoryOwnCraft(this.order, i);
        }
    };
    return craft;
}