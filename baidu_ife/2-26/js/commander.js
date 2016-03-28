/**
 * Created by hansneil on 26/3/16.
 */
var commander = {
    spaceCraft: [createCraft(1), createCraft(2)],
    mediator: mediator(),
    addCraft: function(){
        var len = this.spaceCraft.length;
        var craft;
        if (len < 4) {
            var controlButton = document.querySelectorAll(".craft-control");
            for (var i = 0; i < 4; i++) {
                var arr = this.spaceCraft.filter(function(item) {
                    return item.order == i+1;
                });
                if (!arr.length) {
                    break;
                }
            }
            console.log(i);
            controlButton[i].className = "craft-control";
            controlButton[i].querySelector(".start").style.display = "block";
            controlButton[i].querySelector(".stop").style.display = "block";
            craft = createCraft(i+1);
            this.spaceCraft.push(craft);
            this.mediator.addOneCraft(craft);
            var html = "[指挥官]:添加飞船的指令已发送";
            this.mediator.renderConsole(html, true);
        } else {
            var html = "[指挥官]:轨道已满,请先销毁飞船!!!";
            this.mediator.renderConsole(html);
        }
    },
    performCommand: function(command) {
        if (command.command == "destory") {
            var html = "[指挥官]:飞船摧毁指令已发送";
            this.mediator.renderConsole(html, true);
            this.removeCraft(command.id);
        } else if (command.command == "start") {
            var html = "[指挥官]:飞船飞行指令已发送";
            this.mediator.renderConsole(html, true);
        } else {
            var html = "[指挥官]:飞船停止指令已发送";
            this.mediator.renderConsole(html, true);
        }
        this.mediator.performOneCommander(command);
    },
    removeCraft: function(craft){
        var crafts = this.spaceCraft;
        for (var i = 0, len = crafts.length; i < len; i++) {
            if (crafts[i].order == craft) {
                break;
            }
        }
        var controlButton = document.querySelectorAll(".craft-control");
        controlButton[craft-1].className += " hidden";
        crafts.splice(i, 1);
    },
    init: function(){
        this.mediator.init();
    }
};
