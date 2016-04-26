/**
 * Created by hansneil on 21/4/16.
 */
function Application(gallery){
    this.gallery = gallery;
    this.modal = new Modal();
    this.page = 1;
};
Application.prototype.init = function(){
    this.gallery.getPhotos(this.page++);
    window.addEventListener("scroll", this.scroll.bind(this));
    document.addEventListener("click", this.click.bind(this));
    document.addEventListener("mouseover", this.mouseover.bind(this));
    document.addEventListener("mouseout", this.mouseout.bind(this));
};
Application.prototype.click = function(event){
    var target = event.target;
    if (target.className.indexOf("trans") > -1) {
        var source = target.parentNode.parentNode.dataset.large;
        this.modal.show(source, this.gallery.waiting);
    } else if (target.className.indexOf("close") > -1) {
        this.modal.hide(target.parentNode);
    } else if (target.className.indexOf("modal") > -1) {
        this.modal.hide(target);
    }
};
Application.prototype.mouseover = function(event){
    var target = event.target;
    if (target.className.indexOf("trans") > -1) {
        target.parentNode.classList.remove('hidden');
    }
};
Application.prototype.mouseout = function(event){
    var target = event.target;
    if (target.className.indexOf("trans") > -1) {
        target.parentNode.classList.add('hidden');
    }
};
Application.prototype.scroll = function (event){
    if (document.querySelector(".modal")) {
        document.body.className = "forbid";
        return;
    } else {
        if (document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight && !this.gallery.loading) {
            this.gallery.getPhotos(this.page++);
        }
    }
};