/**
 * Created by hansneil on 23/3/16.
 */
var orderArr = [], index = 0, queryVal, clearSign;
var message = document.querySelector('span');

/**
 * 清除当前正在执行的动画循环
 * @param arr
 * 当单击按钮时,如果已经有某个遍历动画在执行,则先清除正在执行的动画
 */
function clearPrevLoop(arr){
    //清除当前正在遍历的数组的样式
    arr.forEach(function(item){
        item.style.backgroundColor = "#fff";
    });
    //重置遍历索引
    index = 0;
    //清除timeout标志
    clearTimeout(clearSign);
    //清除查询信息
    message.innerHTML = "";
}

/**
 * 动画函数, 用setTimeout来模拟setInterval
 * @param arr
 */
function gameLoop(arr, query) {
    if (index <= arr.length) {
        //清除上一个遍历节点的背景
        if (index != 0) {
            arr[index - 1].style.backgroundColor = "#fff";
        }
        //设置当前遍历节点的背景
        if (index != arr.length) {
            arr[index].style.backgroundColor = "#9da5bc";
        }

        //如果有查询参数, 则进行查询
        if (query && index != arr.length
            && arr[index].firstChild.nodeValue.trim().toLowerCase() == query.toLocaleLowerCase()) {
            arr[index].style.backgroundColor = "#efaca6";
            message.innerHTML = "所查询的字符在红色标记处";
        } else if (query && index == arr.length){
            message.innerHTML = "未找到, 请尝试其他字符串";
        } else {
            index++;
            //设置回调,模拟setInterval
            clearSign = setTimeout(function () {
                gameLoop(arr, query);
            }, 1000);
        }
    } else {
        //遍历完成后重置索引
        index = 0;
    }
}

/**
 * 前序遍历, 获得遍历节点数组
 * @param node
 */
function preOrderTraverseNode(node) {
    if (node !== null) {
        var childNodes = node.children;
        orderArr.push(node);
        for (var i = 0; i < childNodes.length; i++) {
            preOrderTraverseNode(childNodes[i]);
        }
    }
}

/**
 * 初始化函数
 */
function init(){
    var root = document.querySelector('.wrapper');
    var btnGroup = document.querySelectorAll('button');
    var input = document.querySelector('input');
    preOrderTraverseNode(root);
    Util.addEventHandler(input, 'change', function() {
        queryVal = this.value;
    });
    Util.addEventHandler(btnGroup[0], 'click', function(){
        clearPrevLoop(orderArr);
        message.innerHTML = "查询结果";
        gameLoop(orderArr);
    });
    Util.addEventHandler(btnGroup[1], 'click', function(){
        if (queryVal) {
            clearPrevLoop(orderArr);
            message.innerHTML = "查询中...请等待";
            gameLoop(orderArr, queryVal);
        } else {
            alert("请输入查询字符");
        }
    });
}

init();