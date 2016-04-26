/**
 * Created by hansneil on 21/4/16.
 */
function Bucket(min, max){
    this.loading = false;
    this.waiting = null;
    this.data = null;
    this.root = document.querySelector(".wrapper");
    this.wrapperWidth = document.body.clientWidth - 30;
    this.maxRatio = this.wrapperWidth / 250;
    this.max = max || 6;
    this.min = min || 3;
    document.body.style.minWidth = document.body.clientWidth + "px";
    this.init();
}
Bucket.prototype.init = function(container, counter){
    this.bucketContainer = container || 0;
    this.bucket = document.createElement("div");
    this.bucket.className = "photo-wrapper";
    this.counter = counter || 0;
};
Bucket.prototype.loadingAnimation = function(){
    this.waiting = document.createElement("section");
    this.waiting.className = "waiting-wrapper";
    this.waiting.innerHTML = "<span class='waiting red'></span><span class='waiting blue'></span>";
    document.body.appendChild(this.waiting);
};
Bucket.prototype.parseData = function(xhr){
    document.body.removeChild(this.waiting);
    this.data = JSON.parse(xhr.responseText);
};
Bucket.prototype.renderTemplate = function(largeUrl, photoName, previewUrl){
    return "<div class='inner-wrapper' data-large='" +
        largeUrl + "'><div class='mask-wrapper hidden'><div class='mask trans'></div><p class='title trans'>" +
        photoName + "</p><img class='preview' src='" + previewUrl +  "' /></div>";
};
Bucket.prototype.calcHeight = function(fixed){
    if (fixed) {
        return "200px";
    } else {
        return (this.wrapperWidth - this.counter * 10) / this.bucketContainer + "px";
    }
};
Bucket.prototype.renderBucket = function(){
    var data = this.data;
    for (var i = 0; i < data.length; i++) {
        if (i != data.length - 1) {
            if (this.bucketContainer <= this.maxRatio && ++this.counter <= this.max) {
                this.bucketContainer += data[i].width / data[i].height;
                this.bucket.innerHTML += this.renderTemplate(data[i].url.large, data[i].name, data[i].url.small);
            } else {
                this.bucket.style.height = this.calcHeight(0);
                this.root.appendChild(this.bucket);
                this.init(data[i].width / data[i].height, 1);
                this.bucket.innerHTML += this.renderTemplate(data[i].url.large, data[i].name, data[i].url.small);
            }
        } else {
            this.bucketContainer += data[i].width / data[i].height;
            this.counter++;
            this.bucket.innerHTML += this.renderTemplate(data[i].url.large, data[i].name, data[i].url.small);
            this.bucket.style.height = this.calcHeight(this.counter < this.min);
            this.root.appendChild(this.bucket);
            if (this.counter >= this.min) {
                this.init();
            }
        }
    }
    this.loading = false;
};
Bucket.prototype.getPhotos = function(page){
    var url = "http://www.hansneil.com/gallery?page=" + (page || 0);
    var xhr = new XMLHttpRequest();
    this.loading = true;
    xhr.open('get', url, true);
    xhr.addEventListener("loadstart", this.loadingAnimation.bind(this));
    xhr.addEventListener("load", this.parseData.bind(this, xhr));
    xhr.addEventListener("loadend", this.renderBucket.bind(this));
    xhr.send(null);
};