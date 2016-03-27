/**
 * Created by hansneil on 27/3/16.
 */
function extend(obj, extension){
    for (var key in obj) {
        extension[key] = obj[key];
    }
}
var controlButton = document.querySelectorAll(".craft-control");
for (var i = 0; i < controlButton.length; i++) {
    controlButton[i].addEventListener("click", function (event) {
        var target = event.currentTarget;
        for (var j = 0; j < controlButton.length; j++) {
            controlButton[j].className = controlButton[j].className.replace(/selected/, "");
        }
        target.className += " selected";
    }, false);
}

var addButton = document.querySelector(".craft-add");
addButton.addEventListener("click", function(event) {
    var target = event.target;
    extend(mediator, target);
    target.addOneCraft();
})

var stopButton = document.querySelectorAll(".stop");
for (var i = 0; i < stopButton.length; i++) {
    (function(i) {
        stopButton[i].addEventListener("click", function (event) {
            var target = event.currentTarget;
            var command = {
                id: i+1,
                command: 'stop'
            };
            extend(mediator, target);
            if (target.performOneCommander(command)) {
                target.style.display = "none";
                var start = target.parentNode.parentNode.querySelector(".start");
                start.style.display = "block";
            }

        })
    })(i);
}

var stopButton = document.querySelectorAll(".start");
for (var i = 0; i < stopButton.length; i++) {
    (function(i) {
        stopButton[i].addEventListener("click", function (event) {
            var target = event.currentTarget;
            var command = {
                id: i+1,
                command: 'start'
            };
            extend(mediator, target);
            if (target.performOneCommander(command)) {
                target.style.display = "none";
                var stop = target.parentNode.parentNode.querySelector(".stop");
                stop.style.display = "block";
            }
        })
    })(i);
}

var stopButton = document.querySelectorAll(".destory");
for (var i = 0; i < stopButton.length; i++) {
    (function(i) {
        stopButton[i].addEventListener("click", function (event) {
            var target = event.currentTarget;
            var command = {
                id: i+1,
                command: 'destory'
            };
            extend(mediator, target);
            target.performOneCommander(command);
        })
    })(i);
}

mediator.init();