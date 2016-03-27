/**
 * Created by hansneil on 27/3/16.
 */
var mediator = {
    commander: commander(),
    msgArr: [],
    renderConsole: function(newMessage, success) {
        var msg = document.createElement("p");
        var consoles = document.querySelector(".console");
        var frag = document.createDocumentFragment();
        msg.innerHTML = newMessage;
        if (success) {
            msg.className = "success"
        }
        if (this.msgArr.length < 12) {
            this.msgArr.push(msg);
        } else {
            this.msgArr.shift();
            this.msgArr.push(msg);
        }
        console.log(this.msgArr.length);
        for (var i = 0; i < this.msgArr.length; i++) {
            frag.appendChild(this.msgArr[i]);
        }
        consoles.innerHTML = "";
        consoles.appendChild(frag);
    },
    addOneCraft: function(){
        //模拟丢包率
        if (Math.floor(Math.random()*10) > 3) {
            var that = this;
            setTimeout(function(){
                that.commander.addCraft();
            }, 1000);
            var innerHTML = "消息:添加飞船成功";
            this.renderConsole(innerHTML, true);
            return true;
        } else {
            var innerHTML = "注意:增加飞船的命令丢包了!!!!";
            this.renderConsole(innerHTML);
            return false;
        }
    },
    removeOneCraft: function(craft) {
        //模拟丢包
        if (Math.floor(Math.random()*10) > 3) {
            var that = this;
            setTimeout(function(){
                that.commander.removeCraft(craft);
            }, 1000);
            var innerHTML = "消息:摧毁飞船成功";
            this.renderConsole(innerHTML, true);
            return true;
        } else {
            var innerHTML = "注意:摧毁飞船的命令丢包了!!!!";
            this.renderConsole(innerHTML);
            return false;
        }
    },
    performOneCommander: function(command) {
        //模拟丢包
        if (Math.floor(Math.random()*10) > 3) {
            var that = this, html;
            setTimeout(function(){
                that.commander.performCommand(command);
            }, 1000);
            switch (command.command) {
                case "start":
                    html = "消息:" + command.id + "号飞船启动成功";
                    break;
                case "stop":
                    html = "消息:" + command.id + "号飞船停止成功";
                    break;
                case "destory":
                    html = "消息:" + command.id + "号飞船摧毁成功";
                    break;
            }
            this.renderConsole(html, true);
            return true;
        } else {
            var html;
            switch (command.command) {
                case "start":
                    html = "注意:" + command.id + "号飞船的启动命令丢包了!!!!";
                    break;
                case "stop":
                    html = "注意:" + command.id + "号飞船的停止命令丢包了!!!!";
                    break;
                case "destory":
                    html = "注意:" + command.id + "号飞船的摧毁命令丢包了!!!!";
                    break;
            }
            this.renderConsole(html);
            return false;
        }
    },
    init: function(){
        this.commander.init();
    }
};
