/**
 * Created by hansneil on 21/3/16.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

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

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var inputCity = document.getElementById("aqi-city-input"),
        inputAQI = document.getElementById("aqi-value-input");
    var trimmedCity = inputCity.value.trim(),
        trimmedAQI = inputAQI.value.trim();

    if (trimmedCity.length == 0) {
        alert("请输入城市名");
    } else if (! /^[\u4e00-\u9fa5a-zA-Z]+$/.test(trimmedCity)) {
        alert("城市名只能为中英文字符");
    } else if (trimmedAQI.length == 0) {
        alert("请输入空气质量")
    } else if (! /^[0-9]+$/.test(trimmedAQI)){
        alert("空气质量只能为整数")
    }else {
        aqiData[trimmedCity] = trimmedAQI;
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var innerHTML = "";
    var table = document.getElementById("aqi-table");
    innerHTML += "<tr><th>城市</th><th>空气质量</th><th>操作</th></tr>"
    for (var key in aqiData) {
        innerHTML += "<tr><td>"+ key + "</td><td>" + aqiData[key] + "</td><td><button onclick='delBtnHandle(\"" + key +"\")'>删除</button></td></tr>";
    }
    table.innerHTML = innerHTML;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(key) {
    // do sth.
    delete aqiData[key];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    window.onload = function() {
        var btn = document.getElementById("add-btn");
        addEventHandler(btn, 'click', addBtnHandle);
    };

    String.prototype.trim = function(){
        return this.replace(/\s+/g, "");
    }
}

init();