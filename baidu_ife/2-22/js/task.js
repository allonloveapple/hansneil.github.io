/**
 * Created by hansneil on 23/3/16.
 */
/**
 * 定义全局变量
 *
 */
var traversalObj = {
    //三种遍历顺序的数组
    threeTypeArr: [],
    //前序遍历节点的数组
    preOrderArr: [],
    //中序遍历节点的数组
    inOrderArr: [],
    //后序遍历节点的数组
    postOrderArr: [],
    //数组的索引号
    index: 0,
    //setTimeout返回的清除标志
    clearSign: ""
};

/**
 * 前序遍历函数, 获得前序遍历的节点数组
 * @param node
 * 接收一个参数, DOM节点
 */
function preOrderTraverseNode(node) {
    if (node !== null) {
        traversalObj.preOrderArr.push(node);
        preOrderTraverseNode(node.firstElementChild);
        preOrderTraverseNode(node.lastElementChild);
    }
}

/**
 * 中序遍历函数, 获得中序遍历的节点数组
 * @param node
 * 接收一个参数, DOM节点
 */
function inOrderTraverseNode(node) {
    if (node !== null) {
        inOrderTraverseNode(node.firstElementChild);
        traversalObj.inOrderArr.push(node);
        inOrderTraverseNode(node.lastElementChild);
    }
}

/**
 * 后序遍历函数, 获得后序遍历的节点数组
 * @param node
 * 接收一个参数, DOM节点
 */
function postOrderTraverseNode(node) {
    if (node !== null) {
        postOrderTraverseNode(node.firstElementChild);
        postOrderTraverseNode(node.lastElementChild);
        traversalObj.postOrderArr.push(node);
    }
}

/**
 * 执行三种类型的遍历函数, 获得三个数组
 */
function threeTypeOrder(){
    //获取遍历的根节点
    var root = document.querySelector('.level0');
    //执行遍历函数
    preOrderTraverseNode(root);
    inOrderTraverseNode(root);
    postOrderTraverseNode(root);
}

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
    traversalObj.index = 0;
    //清除timeout标志
    clearTimeout(traversalObj.clearSign);
}

/**
 * 动画函数, 用setTimeout来模拟setInterval
 * @param arr
 */
function gameLoop(arr) {
    if (traversalObj.index <= arr.length) {
        //清除上一个遍历节点的背景
        if (traversalObj.index != 0) {
            arr[traversalObj.index - 1].style.backgroundColor = "#fff";
        }
        //设置当前遍历节点的背景
        if (traversalObj.index != arr.length) {
            arr[traversalObj.index].style.backgroundColor = "#9da5bc";
        }
        traversalObj.index++;
        //设置回调,模拟setInterval
        traversalObj.clearSign = setTimeout(function () {
            gameLoop(arr);
        }, 1000);
    } else {
        //遍历完成后重置索引
        traversalObj.index = 0;
    }
}

/**
 * 初始化函数, 获得三个遍历顺序的数组
 * 为三个按钮绑定事件处理程序
 */
function init() {
    threeTypeOrder();
    traversalObj.threeTypeArr.push(traversalObj.preOrderArr, traversalObj.inOrderArr, traversalObj.postOrderArr);
    var btnGroup = document.querySelectorAll('button');
    //利用闭包为按钮组绑定事件处理程序
    for (var i = 0; i < btnGroup.length; i++) {
        (function(m){
            Util.addEventHandler(btnGroup[m], 'click', function(){
                //按钮单击事件被触发时, 确保当前没有正在执行的动画
                clearPrevLoop(traversalObj.threeTypeArr[m]);
                //执行新的遍历动画
                gameLoop(traversalObj.threeTypeArr[m]);
            });
        })(i);
    }
}

/**
 * 执行初始化函数
 */
init();