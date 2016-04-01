/**
 * Created by hansneil on 26/3/16.
 */
(function(window, undefined) {
    var START = 1, STOP = 0;
//记录定时器标志
    var clearId = [], stopId = [];
    /**
     * 飞船的超类对象
     * @type {{state: number, speed: number, powerSystem: number, energySystem: number, energy: number, path: number, startOwnCraft: spaceCraft.startOwnCraft, stopOwnCraft: spaceCraft.stopOwnCraft, destoryOwnCraft: spaceCraft.destoryOwnCraft}}
     */
    var spaceCraft = {
        //飞船状态
        state: STOP,
        //飞船运行速度
        speed: 0.5,
        //动力系统
        energyConsume: 0.5,
        //能源系统
        energySystem: 0.2,
        //初始能源
        energy: 100,
        /**
         * 接收到飞行指令后, 执行飞行操作
         * @param order
         * @param id
         */
        startOwnCraft: function (order, id) {
            var speed = this.speed;
            var that = this;
            this.state = START;
            clearInterval(stopId[id]);
            if (clearId[id]) {
                clearInterval(clearId[id]);
            }
            clearId[id] = setInterval(function () {
                var craft = document.querySelector("#craft-" + id);
                var energyText = craft.querySelector(".energy-text");
                var energyBar = craft.querySelector(".energy");
                that.energy += that.energySystem - that.energyConsume;
                energyText.textContent = Math.floor(that.energy);
                energyBar.style.height = that.energy + "%";
                if (that.energy <= 50) {
                    energyBar.style.backgroundColor = "#c83b38";
                }
                if (Math.floor(that.energy) <= 0) {
                    that.stopOwnCraft(order, id);
                }
                var angle = /\d*\.?\d/.exec(craft.style.transform);
                angle = parseFloat(angle) + speed;
                craft.style.transform = "rotate(" + angle + "deg)";
            }, 100);
        },
        /**
         * 接收到停止飞行指令后, 执行停止操作
         * @param order
         * @param id
         */
        stopOwnCraft: function (order, id) {
            var that = this;
            var craft = document.querySelector("#craft-" + id);
            var energyText = craft.querySelector(".energy-text");
            var energyBar = craft.querySelector(".energy");
            var control = document.querySelectorAll(".craft-control")[order - 1];
            var startBtn = control.querySelector(".start");
            var stopBtn = control.querySelector(".stop");
            startBtn.style.display = "block";
            stopBtn.style.display = "none";
            this.state = STOP;
            clearInterval(clearId[id]);
            if (stopId[id]) {
                clearInterval(stopId[id]);
            }
            stopId[id] = setInterval(function () {
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
        /**
         * 接收到摧毁指令后, 执行自行摧毁操作
         * @param order
         * @param id
         */
        destroyOwnCraft: function (order, id) {
            var craft = document.querySelector("#craft-" + id);
            if (clearId[id]) {
                clearInterval(clearId[id]);
            }
            craft.parentNode.removeChild(craft);
        }
    };
    window.spaceCraft = spaceCraft;
})(window);
/**
 * 寄生模式继承飞船对象, 之后增强相关属性
 * @param order
 * @returns {spaceCraft}
 */
function createCraft(order) {
    var craft = Object.create(spaceCraft);
    //增强属性, 记录飞船所在的轨道
    craft.order = order;
    /**
     * 信号处理系统
     * @param command
     * @param i
     */
    craft.signalSystem = function(command, i){
        if (command.id == this.order) {
            switch (command.command) {
                case "start":
                    this.startOwnCraft(this.order, i);
                    break;
                case "stop":
                    this.stopOwnCraft(this.order, i);
                    break;
                case "destroy":
                    this.destroyOwnCraft(this.order, i);
                    break;
            }
        }
    };
    return craft;
}