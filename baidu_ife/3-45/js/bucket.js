/**
 * Created by hansneil on 21/4/16.
 */
function Bucket(){
    this.loading = false;
    this.waiting = null;
    this.init();
}
Bucket.prototype.init = function(){
    this.bucketContainer = 0;
    this.bucket = document.createElement("div");
    this.bucket.className = "photo-wrapper";
    this.counter = 0;
    this.root = document.querySelector(".wrapper");
};
Bucket.prototype.getMinColumn = function(){
    var columns = document.querySelectorAll(".outer-column");
    var minCol = columns[0];
    for (var i = 0; i < columns.length; i++) {
        if (columns[i].clientHeight < minCol.clientHeight) {
            minCol = columns[i];
        }
    }
    return minCol;
};
Bucket.prototype.getPhotos = function(page){
    var data;
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
        for (var i = 0; i < data.length; i++) {
            if (that.bucketContainer <= 5 && i != data.length - 1) {
                that.bucketContainer += data[i].width / data[i].height;
                that.counter++;
                that.bucket.innerHTML += "<div class='inner-wrapper' data-large='" +
                    data[i].url.large + "'><div class='mask-wrapper hidden'><div class='mask trans'></div><p class='title trans'>" +
                    data[i].name + "</p><img class='preview' src='" + data[i].url.small +  "' data-order='" + i + "'/></div>";
            } else if (that.bucketContainer > 5 && i != data.length - 1){
                that.bucket.style.height = (1366 - that.counter * 10) / that.bucketContainer + "px";
                that.bucketContainer = data[i].width / data[i].height;
                that.counter = 0;
                that.root.appendChild(that.bucket);
                that.bucket = document.createElement("div");
                that.bucket.className = "photo-wrapper";
                that.bucket.innerHTML += "<div class='inner-wrapper' data-large='" +
                    data[i].url.large + "'><div class='mask-wrapper hidden'><div class='mask trans'></div><p class='title trans'>" +
                    data[i].name + "</p><img class='preview' src='" + data[i].url.small +  "' data-order='" + i + "'/></div>";
            } else if (i == data.length - 1) {
                that.bucketContainer += data[i].width / data[i].height;
                that.counter++;
                that.bucket.innerHTML += "<div class='inner-wrapper' data-large='" +
                    data[i].url.large + "'><div class='mask-wrapper hidden'><div class='mask trans'></div><p class='title trans'>" +
                    data[i].name + "</p><img class='preview' src='" + data[i].url.small +  "' data-order='" + i + "'/></div>";
                that.bucket.style.height = (i == data.length - 1 && that.counter < 3) ? "200px" : (1366 - that.counter * 10) / that.bucketContainer + "px";
                that.root.appendChild(that.bucket);
                if (that.counter >= 3) {
                    that.init();
                }
            }
        }
        that.loading = false;
    }, false);
    xhr.send(null);
};