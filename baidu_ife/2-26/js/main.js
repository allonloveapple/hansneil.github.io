/**
 * Created by hansneil on 27/3/16.
 */
/**
 * extend函数,用obj的对象属性扩展extension对象
 * @param obj
 * @param extension
 */
function extend(obj, extension){
    for (var key in obj) {
        extension[key] = obj[key];
    }
}

/**
 * initControlButton
 * 初始化控制台按钮
 */
function initControlButton() {
    var controlButton = document.querySelectorAll(".craft-control");

    /**
     * 飞船指令发送按钮事件处理程序
     * @param event
     */
    function controlHandler(event){
        var target = event.currentTarget;
        for (var j = 0; j < controlButton.length; j++) {
            controlButton[j].className = controlButton[j].className.replace(/selected/, "");
        }
        target.className += " selected";
    }

    for (var i = 0; i < controlButton.length; i++) {
        EventHandler.addEventHandler(controlButton[i], "click", controlHandler);
    }
}

/**
 * initAddButton
 * 初始化添加飞船的按钮
 */
function initAddButton() {
    var addButton = document.querySelector(".craft-add");

    /**
     * 飞船添加按钮
     * @param event
     */
    function addHanlder(event){
        var target = EventHandler.getTarget(event);
        extend(commander, target);
        target.addCraft();
    }

    EventHandler.addEventHandler(addButton, "click", addHanlder);
}

/**
 * initStopButton
 * 初始化飞船停止按钮
 */
function initStopButton() {
    var stopButton = document.querySelectorAll(".stop");

    for (var i = 0; i < stopButton.length; i++) {
        (function (i) {
            EventHandler.addEventHandler(stopButton[i], "click", function (event){
                var target = event.currentTarget;
                var command = {
                    id: i + 1,
                    command: 'stop'
                };
                extend(commander, target);
                target.performCommand(command);
                target.style.display = "none";
                var start = target.parentNode.parentNode.querySelector(".start");
                start.style.display = "block";

            });
        })(i);
    }
}

/**
 * initStartButton
 * 初始化飞船飞行的按钮
 */
function initStartButton() {
    var startButton = document.querySelectorAll(".start");

    for (var i = 0; i < startButton.length; i++) {
        (function (i) {
            EventHandler.addEventHandler(startButton[i], "click", function (event) {
                var target = event.currentTarget;
                var command = {
                    id: i + 1,
                    command: 'start'
                };
                extend(commander, target);
                target.performCommand(command);
                target.style.display = "none";
                var stop = target.parentNode.parentNode.querySelector(".stop");
                stop.style.display = "block";
            });
        })(i);
    }
}

/**
 * initDestoryButton
 * 初始化飞船摧毁的按钮
 */
function initDestoryButton() {
    var destoryButton = document.querySelectorAll(".destory");

    for (var i = 0; i < destoryButton.length; i++) {
        (function (i) {
            EventHandler.addEventHandler(destoryButton[i], "click", function(event) {
                var target = event.currentTarget;
                var command = {
                    id: i + 1,
                    command: 'destroy'
                };
                extend(commander, target);
                target.performCommand(command);
            });
        })(i);
    }
}

/**
 * 初始化界面
 */
function init(){
    commander.init();
    initControlButton();
    initAddButton();
    initStartButton();
    initStopButton();
    initDestoryButton();
}

init();