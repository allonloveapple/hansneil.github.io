/**
 * Created by hansneil on 27/3/16.
 */
/**
 * mediator对象, 用于传播指挥官的命令,有一定的丢包率
  * @returns {{msgArr: Array, spaceCraft: *[], renderConsole: renderConsole, addOneCraft: addOneCraft, removeOneCraft: removeOneCraft, performOneCommander: performOneCommander, init: init}}
 */
var mediator = function() {
    //记录飞船的ID号
    var globalId = 3;

    /**
     * renderCrafts()函数, 根据spaceCraft中存放的飞船来渲染界面
     * @param crafts
     */
    function renderCrafts(crafts){
        for (var i = 0; i < crafts.length; i++){
            var orbite = document.querySelector(".orbite" + crafts[i].craft.order);
            var craft = document.createElement("div");
            //oldCraft 获得已经渲染完成的飞船
            var oldCraft = orbite.querySelectorAll(".craft-model-" + crafts[i].craft.order);
            for (var j = 0; j < oldCraft.length; j++) {
                if (oldCraft[j].id.replace(/[^\d]+/, "") == crafts[i].id) {
                    break;
                }
            }
            //排除已经渲染完成的飞船
            if (oldCraft.length == 0 || j == oldCraft.length && oldCraft[j-1].id.slice(-1) != crafts[i].id) {
                craft.innerHTML = "<div class='craft-inner'><div class='craft-inner'><span class='energy-text'>100</span><div class='energy'></div></div></div>";
                craft.className = "craft-model-" + crafts[i].craft.order + " visible";
                craft.style.transform = "rotate(" + crafts[i].craft.path + "deg)";
                craft.id = "craft-" + crafts[i].id;
                orbite.appendChild(craft);
            }
        }
    }
    return {
        //msgArr 存储控制台信息,最多为9条消息, 超过时删除最早添加的消息
        msgArr: [],
        //spaceCraft 存储添加到轨道的飞船, 飞船对象{craft: createCraft(), id: number}
        spaceCraft: [{craft: createCraft(1), id: 1}, {craft:createCraft(2), id:2}],
        /**
         * renderConsole() 渲染控制台函数, newMessage表示传入需要添加到控制台的消息, success表示是否为警告信息
         * @param newMessage
         * @param success
         */
        renderConsole: function (newMessage, success) {
            var msg = document.createElement("p");
            var consoles = document.querySelector(".console");
            var frag = document.createDocumentFragment();
            msg.innerHTML = newMessage;
            if (success) {
                msg.className = "success"
            }
            if (this.msgArr.length < 9) {
                this.msgArr.push(msg);
            } else {
                this.msgArr.shift();
                this.msgArr.push(msg);
            }
            for (var i = 0; i < this.msgArr.length; i++) {
                frag.appendChild(this.msgArr[i]);
            }
            consoles.innerHTML = "";
            consoles.appendChild(frag);
        },
        /**
         * addOneCraft()函数, 用于向轨道添加飞船, craft接收自指挥官Commander
         * @param craft
         * @returns {boolean}
         */
        addOneCraft: function (craft) {
            console.log("aaa");
            //模拟丢包率
            if (Math.floor(Math.random() * 10) > 3) {
                var that = this;
                var crafts = this.spaceCraft;
                var renderCraft = renderCrafts;
                crafts.push({craft: craft, id: globalId++});
                setTimeout(function () {
                    renderCraft(crafts);
                    var innerHTML = "[消息]: 添加飞船成功";
                    that.renderConsole(innerHTML, true);
                }, 1000);
                return true;
            } else {
                var innerHTML = "[注意]:增加飞船的命令丢包了!!!!", that = this;
                setTimeout(function() {
                    that.renderConsole(innerHTML);
                }, 1000);
                return false;
            }
        },
        /**
         * removeOneCraft()函数, 已废弃, 没有用到
         * @param craft
         * @returns {boolean}
         */
        removeOneCraft: function (craft) {
            //模拟丢包
            if (Math.floor(Math.random() * 10) > 3) {
                var that = this;
                setTimeout(function () {
                    that.commander.removeCraft(craft);
                    var innerHTML = "[消息]:摧毁飞船成功";
                    that.renderConsole(innerHTML, true);
                }, 1000);
                return true;
            } else {
                var innerHTML = "[注意]:摧毁飞船的命令丢包了!!!!", that = this;
                this.renderConsole(innerHTML);
                return false;
            }
        },
        /**
         * performOneCommander() 接收指挥官的指令, 将指令广播给轨道上的飞船
         * @param command
         * @returns {boolean}
         */
        performOneCommander: function (command) {
            //模拟丢包
            if (Math.floor(Math.random() * 10) > 3) {
                var that = this, html;
                var crafts = this.spaceCraft;
                switch (command.command) {
                    case "start":
                        html = "[消息]:" + command.id + "号飞船启动成功";
                        setTimeout(function () {
                            for (var i =0; i < crafts.length; i++) {
                                crafts[i].craft.startCraft(command, crafts[i].id);
                            }
                            that.renderConsole(html, true);
                        }, 1000);
                        break;
                    case "stop":
                        html = "[消息]:" + command.id + "号飞船停止成功";
                        setTimeout(function () {
                            for (var i =0; i < crafts.length; i++) {
                                crafts[i].craft.stopCraft(command, crafts[i].id);
                            }
                            that.renderConsole(html, true);
                        }, 1000);
                        break;
                    case "destory":
                        html = "[消息]:" + command.id + "号飞船摧毁成功";
                        setTimeout(function () {
                            var index = [];
                            for (var i =0; i < crafts.length; i++) {
                                crafts[i].craft.destoryCraft(command, crafts[i].id);
                                if (crafts[i].craft.order == command.id) {
                                    index.push(i);
                                }
                            }
                            index.forEach(function(item){
                                crafts.splice(item, 1);
                            });
                            that.renderConsole(html, true);
                        }, 1000);
                        break;
                }
                return true;
            } else {
                var html, that = this;
                switch (command.command) {
                    case "start":
                        html = "[注意]:" + command.id + "号飞船的启动命令丢包了!!!!";
                        break;
                    case "stop":
                        html = "[注意]:" + command.id + "号飞船的停止命令丢包了!!!!";
                        break;
                    case "destory":
                        html = "[注意]:" + command.id + "号飞船的摧毁命令丢包了!!!!";
                        break;
                }
                setTimeout(function() {
                    that.renderConsole(html);
                }, 1000);
                return false;
            }
        },
        /**
         * init() 初始化函数
         */
        init: function () {
            renderCrafts(this.spaceCraft);
            var innerHTML = "准备就绪! 请操作";
            this.renderConsole(innerHTML);
        }
    }
};
