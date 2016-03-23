/**
 * Created by hansneil on 22/3/16.
 */
var tagManager = {
    tag: [],
    hobby: []
}
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

function getCharCode(event){
    if (typeof event.charCode == "number") {
        return event.charCode;
    } else {
        return event.keyCode;
    }
}

function getTarget(event) {
    return event.target || event.srcElement;
}

function renderTags (selector){
    var targetArr = (selector == "tag") ? tagManager.tag : tagManager.hobby;
    var tags = document.querySelector(".list." + selector);
    var innerHTML = "";

    for (var i = 0; i < targetArr.length; i++) {
        innerHTML += "<li onclick='removeTag(\"" + selector + "\",\"" + targetArr[i] +"\")'>"+ targetArr[i] + "</li>";
    }
    tags.innerHTML = innerHTML;
};

function addTag(newTag, selector){
    var targetArr = (selector == "tag") ? tagManager.tag : tagManager.hobby;
    for (var i = 0; i < newTag.length; i++) {
        if (newTag[i]) {
            var isNotExist = targetArr.every(function (item) {
                return item !== newTag[i];
            });

            if (isNotExist) {
                if (targetArr.length < 10) {
                    targetArr.push(newTag[i]);
                } else {
                    targetArr.shift();
                    targetArr.push(newTag[i]);
                }
                renderTags(selector);
            }
        }
    }
};

function removeTag(selector, key) {
    var retArr = tagManager[selector].filter(function(item){
        return item !== key;
    });
    tagManager[selector] = retArr;
    renderTags(selector);
}

function tagHandler(event){
    var charCode = getCharCode(event);
    var target = getTarget(event).value.trim();
    var arr = [];
    if (charCode == 32 || charCode == 44 || charCode == 13) {
        if (target) {
            arr = target.split(/[\ \,]+/);
            addTag(arr, "tag");
        }
    }
}

function hobbyHandler() {
    var textarea = document.getElementById("hobby-input");
    var value = textarea.value.trim();
    var arr = [];
    if (value) {
        arr = value.split(/[\uff0c\u3001\t\n\ \,]+/);
        addTag(arr, "hobby")
    } else {
        alert("请至少输入一项爱好");
        textarea.value = "";
        tagManager.hobby = [];
        renderTags("hobby");
    }
}

function init() {
    var tagInput = document.getElementById("tag-input");
    var hobbyBtn = document.querySelector("button");
    addEventHandler(tagInput, "keypress", tagHandler);
    addEventHandler(hobbyBtn, "click", hobbyHandler);
}

init();