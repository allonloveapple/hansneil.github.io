/**
 * Created by hansneil on 22/3/16.
 */
(function () {
    var queueData = function() {
        this.data = [10, 3, 7, 12, 11, 30];
        this.action = ["unshift", "push", "shift", "pop"];
    };

    /**
     * renderQueue方法
     * 在输入发生变化时,或按钮触发时重新渲染视图
     */
    queueData.prototype.renderQueue = function () {
        var queueWrapper = document.getElementById("queue-wrapper"),
            innerHTML = "<ul class='queue'>";
        for (var i = 0; i < this.data.length; i++) {
            innerHTML += "<li class='queue-item'>" + this.data[i] + "</li>"
        }
        innerHTML += "</ul>";
        queueWrapper.innerHTML = innerHTML;
    };

    /**
     * leftUnshift/leftShift/rightPush/rightPop方法
     * 根据按钮的触发,选择不同的处理函数
     */
    queueData.prototype.leftUnshift = function (number) {
        this.data.unshift(number);
        this.renderQueue();
    };
    queueData.prototype.leftShift = function () {
        this.data.shift();
        this.renderQueue();
    };
    queueData.prototype.rightPush = function (number) {
        this.data.push(number);
        this.renderQueue();
    };
    queueData.prototype.rightPop = function () {
        this.data.pop();
        this.renderQueue();
    };

    /**
     * addEventHandler方法
     * 跨浏览器实现事件绑定
     */
    function addEventHandler(ele, event, hanlder) {
        if (ele.addEventListener) {
            ele.addEventListener(event, hanlder, false);
        } else if (ele.attachEvent) {
            ele.attachEvent("on"+event, hanlder);
        } else  {
            ele["on" + event] = hanlder;
        }
    }

    /**
     * getInputVal方法
     * 获得input的输入值
     * 返回一个表示数字的字符串
     */
    function getInputVal() {
        var val = document.getElementById("queue-value");
        return val.value;
    }

    /**
     * queueOperation方法
     * 为不同的button绑定不同的事情处理程序
     */
    function queueOperation(action) {
        var input = getInputVal();
        switch (action) {
            case "unshift":
                queue.leftUnshift(input);
                break;
            case "push":
                queue.rightPush(input);
                break;
            case "shift":
                queue.leftShift();
                break;
            case "pop":
                queue.rightPop();
                break;
        }
    }

    /**
     * initListners方法
     * 初始化事件监听函数
     */
    function initListners() {
        var buttonGroup = document.querySelectorAll("button");
        for (var i = 0; i < buttonGroup.length; i++) {
            (function(m){
                addEventHandler(buttonGroup[m], 'click', function(){
                    queueOperation(queue.action[m]);
                })
            })(i);
        }
    }

    function init() {
        queue.renderQueue();
        initListners();
    }

    var queue = new queueData();
    init();
})();
