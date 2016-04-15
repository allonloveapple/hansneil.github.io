/**
 * Created by hansneil on 14/4/16.
 */
(function(window, undefined){
    var data = {
        head: ['name', 'chinese', 'math', 'english', 'physical', 'all'],
        body:[
            {name:'张梓晨', chinese: 88, math: 99, english: 100, physical: 100, all: 387},
            {name:'郭瀚宇', chinese: 45, math: 60, english: 66, physical: 90, all: 261},
            {name:'何昊天', chinese: 99, math: 5, english: 86, physical: 60, all: 250},
            {name:'宋奕霆', chinese: 86, math: 80, english: 77, physical: 80, all: 323},
            {name:'李梓豪', chinese: 70, math: 11, english: 26, physical: 10, all: 117},
            {name:'陈禹欢', chinese: 80, math: 76, english: 86, physical: 25, all: 261}
        ]
    };

    var _ = {
        getId: function(id){
            return document.getElementById(id);
        },
        getClass: function(className, node) {
            var node = node || document;
            return node.getElementsByClassName(className);
        },
        getTag: function(tagName, node) {
            var node = node || document;
            return node.getElementsByTagName(tagName);
        },
        attr: function(ele, type){
            return ele.getAttribute('data-' + type);
        },
        createEle: function(tagname) {
            return tagname && document.createElement(tagname);
        },
        up: function(type) {
            return function(item1, item2) {
                return item1[type] - item2[type];
            }
        },
        down: function(type) {
            return function(item1, item2) {
                return item2[type] - item1[type];
            }
        },
        on: function(ele, attr, type, ev){
            ele.addEventListener(type, handler, false);

            function handler(event){
                var ele = event.target;

                if (ele.className != attr) return;

                ev.call(ele);
            }
        },
        renderHead: function(data) {
            var html = "";
            data.forEach(function(item){
                html += "<th data-type='" + item + "'>" + item + "<b class='up'></b><b class='down'></b></th>";
            });
            return "<tr>" + html + "</tr>";
        },
        renderBody: function(data) {
            var html = "";
            data.forEach(function(item){
                var inner = "";
                for (var key in item) {
                    inner += "<td>" + item[key] + "</td>";
                }
                html += "<tr>" + inner + "</tr>";
            });
            return html;
        }
    };

    window.sort = function(options) {
        if (!options.data) return;

        var data = options.data;

        var table = _.createEle("table"),
            thead = _.createEle("thead"),
            tbody = _.createEle("tbody");
        var initData = data.body.sort(_.down(options.type || "all"));
        thead.innerHTML = _.renderHead(data.head);
        tbody.innerHTML = _.renderBody(initData);

        table.appendChild(thead);
        table.appendChild(tbody);

        _.getTag("body")[0].appendChild(table);

        _.on(table, 'up', 'click', function(){handler.call(this, 'up')});
        _.on(table, 'down', 'click', function(){handler.call(this, 'down')});

        function handler(dir){
            var sortType = _.attr(this.parentNode, 'type');
            var sorted = data.body.sort(_[dir](sortType));

            tbody.innerHTML = _.renderBody(sorted);
        }
    };
    sort({
        data: data,
        type: "all"
    });
})(window);