/**
 * Created by hansneil on 26/3/16.
 */
var commander = function() {
    var clearId = [], path = [0, 0, 0, 0];
    function getCraft(crafts, id){
        return crafts.filter(function(item) {
            return item.order == id;
        })
    }
    function startCraft(craft){
        console.log(craft.order + "号飞船成功启动");
        var orbite = document.querySelector("#orbite" + craft.order);
        var index = craft.order - 1;
        var speed = craft.speed;
        clearId[index] = setInterval(function(){
            path[index] += speed;
            orbite.style.transform = "rotate(" + path[index] +"deg)";
        }, 100);
    }
    function stopCraft(craft){
        console.log(craft.order + "号飞船成功停止");
        clearInterval(clearId[craft.order - 1])
    }
    function destoryCraft(craft){
        console.log(craft.order + "号飞船成功销毁");
        var index = craft.order - 1;
        var orbite = document.querySelector("#orbite" + craft.order);
        orbite.style.transform = "rotate(0deg)";
        path[index] = 0;
        if (clearId[index]) {
            clearInterval(clearId[index]);
        }
    }
    function renderCrafts(crafts){
        var craftsGroup = document.querySelectorAll("[class ^= craft-model]");
        for (var i = 0; i < craftsGroup.length; i++) {
           craftsGroup[i].className = craftsGroup[i].className.replace(/visible/, "");
        }
        for (var i = 0; i < crafts.length; i++) {
            craftsGroup[crafts[i].order - 1].className += " visible";
        }
    }
    return {
        spaceCraft: [createCraft(1), createCraft(2)],
        commanders: {
            start: startCraft,
            stop: stopCraft,
            destory: destoryCraft
        },
        addCraft: function(){
            var len = this.spaceCraft.length;
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
                this.spaceCraft.push(createCraft(i+1));
                renderCrafts(this.spaceCraft);
            } else {
                alert("轨道已满,请先销毁")
            }
        },
        performCommand: function(command) {
            var craft = getCraft(this.spaceCraft, command.id)[0];
            switch (command.command) {
                case "start":
                    this.commanders.start(craft);
                    break;
                case "stop":
                    this.commanders.stop(craft);
                    break;
                case "destory":
                    this.commanders.destory(craft);
                    this.removeCraft(craft.order);
                    break;
            }
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
            renderCrafts(crafts);
        },
        init: function(){
            renderCrafts(this.spaceCraft);
        }
    }
};
