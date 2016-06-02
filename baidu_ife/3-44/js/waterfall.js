/**
 * Created by hansneil on 21/4/16.
 */
function Waterfall(columns){
    this.columns = columns || 4;
    this.loading = false;
    this.waiting = null;
}
Waterfall.prototype.init = function(){
    var root = document.querySelector('wrapper');
    var innerHTML = '';
    for (var i = 0; i < this.columns; i++) {
        innerHTML += "<div class='col-" + i + " outer-column'></div>"
    }
    root.innerHTML = innerHTML;
};
Waterfall.prototype.getMinColumn = function(){
    var columns = document.querySelectorAll(".outer-column");
    var minCol = columns[0];
    for (var i = 0; i < columns.length; i++) {
        if (columns[i].clientHeight < minCol.clientHeight) {
            minCol = columns[i];
        }
    }
    return minCol;
};
Waterfall.prototype.getPhotos = function(page){
    var data, col;
    var url = "http://www.hansneil.com/gallery?page=" + (page || 0);
    var xhr = new XMLHttpRequest();
    var that = this;
    var img = "";
    that.loading = true;
    xhr.open('get', url, true);
    xhr.addEventListener("loadstart", function(event){
        that.waiting = document.createElement("section");
        that.waiting.className = "waiting-wrapper";
        that.waiting.innerHTML = "<span class='waiting red'></span><span class='waiting blue'></span>";
        document.body.appendChild(that.waiting);
    });
    xhr.addEventListener("load", function (event) {
        document.body.removeChild(that.waiting);
        data = JSON.parse(xhr.responseText);
        console.log(data);
    }, false);
    xhr.addEventListener("loadend", function (event) {
        data.forEach(function (item) {
            col = that.getMinColumn();
            col.innerHTML += "<div class='photo-wrapper' data-large='" +
                item.url.large + "'><div class='mask-wrapper hidden'><div class='mask trans'></div><p class='title trans'>" +
                item.name + "</p><img class='preview' src='" +
                item.url.small + "'></div></div>";
        });
        that.loading = false;
    }, false);
    xhr.send(null);
};