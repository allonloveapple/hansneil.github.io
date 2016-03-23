/**
 * Created by hansneil on 23/3/16.
 */
var Util = {
    addEventHandler:
        function(ele, event, hanlder) {
            if (ele.addEventListener) {
                ele.addEventListener(event, hanlder, false);
            } else if (ele.attachEvent) {
                ele.attachEvent("on"+event, hanlder);
            } else  {
                ele["on" + event] = hanlder;
            }
        },
    getCharCode:
        function (event){
            if (typeof event.charCode == "number") {
                return event.charCode;
            } else {
                return event.keyCode;
            }
        },

    getTarget:
        function (event) {
            return event.target || event.srcElement;
        }
}