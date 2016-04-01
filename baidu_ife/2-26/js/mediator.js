/**
 * Created by hansneil on 27/3/16.
 */
/**
 * mediator对象, 用于传播指挥官的命令,有一定的丢包率[模块模式]
  * @returns {{msgArr: Array, spaceCraft: *[], renderConsole: renderConsole, addOneCraft: addOneCraft, removeOneCraft: removeOneCraft, performOneCommander: performOneCommander, init: init}}
 */
var mediator = (function() {
    //记录飞船的ID号
    var globalId = 3,
    //msgArr 存储控制台信息,最多为9条消息, 超过时删除最早添加的消息
    msgArr = [],
    //spaceCraft 存储添加到轨道的飞船, 飞船对象{craft: createCraft(), id: number}
    spaceCraft = [{craft: createCraft(1), id: 1}, {craft:createCraft(2), id:2}];

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
                craft.style.transform = "rotate(0deg)";
                craft.id = "craft-" + crafts[i].id;
                orbite.appendChild(craft);
            }
        }
    }
    return {
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
            if (msgArr.length < 9) {
                msgArr.push(msg);
            } else {
                msgArr.shift();
                msgArr.push(msg);
            }
            for (var i = 0; i < msgArr.length; i++) {
                frag.appendChild(msgArr[i]);
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
            spaceCraft.push({craft: createCraft(craft+1), id: globalId++});
            renderCrafts(spaceCraft);
            var innerHTML = "[消息]:" + (craft + 1) +"号轨道添加飞船成功";
            this.renderConsole(innerHTML, true);
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
                var crafts = spaceCraft;
                switch (command.command) {
                    case "start":
                        html = "[消息]:" + command.id + "号飞船启动成功";
                        break;
                    case "stop":
                        html = "[消息]:" + command.id + "号飞船停止成功";
                        break;
                    case "destroy":
                        html = "[消息]:" + command.id + "号飞船摧毁成功";
                        break;
                }
                setTimeout(function () {
                    var index = [];
                    for (var i =0; i < crafts.length; i++) {
                        crafts[i].craft.signalSystem(command, crafts[i].id);
                        if (command.command == 'destroy' && crafts[i].craft.order == command.id) {
                            index.push(i);
                        }
                    }
                    //删除已经摧毁的飞船实例,注意splice的特殊之处,去掉一项后所有后面的索引都要减1
                    //bug
                    index.forEach(function(item, index){
                        crafts.splice(item-index, 1);
                    });
                    that.renderConsole(html, true);
                }, 1000);
            } else {
                var html, that = this;
                switch (command.command) {
                    case "start":
                        html = "[注意]:" + command.id + "号飞船的启动命令丢包了!!!!";
                        break;
                    case "stop":
                        html = "[注意]:" + command.id + "号飞船的停止命令丢包了!!!!";
                        break;
                    case "destroy":
                        html = "[注意]:" + command.id + "号飞船的摧毁命令丢包了!!!!";
                        break;
                }
                setTimeout(function() {
                    that.renderConsole(html);
                }, 1000);
            }
        },
        /**
         * init() 初始化函数
         */
        init: function () {
            renderCrafts(spaceCraft);
            var innerHTML = "准备就绪! 请操作";
            this.renderConsole(innerHTML);
        }
    }
})();
