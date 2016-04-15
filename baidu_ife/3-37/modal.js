/**
 * Created by hansneil on 12/4/16.
 */
(function(window, undefined){
    function extend(obj, extension) {
        for (var key in obj) {
            extension[key] = obj[key];
        }
    }
    var Modal = function(element){
        this.element = element;
        this.isShown = false;
    };
    Modal.prototype.show = function(){
        var that = this;
        if (this.isShown) {
            return;
        }
        this.isShown = true;
        this.element.classList.remove("hidden");
        this.element.className += " show";
        document.addEventListener("click", function(event){
            var element = event.target;
            if (element.hasAttribute("data-dimiss")){
                that.hide();
            }
        })
    };
    Modal.prototype.hide = function(){
        console.log(this.isShown);
        if (!this.isShown) {
            return;
        }
        this.isShown = false;
        this.element.classList.remove("show");
        this.element.className += " hidden";
    };

    window.modal = function(option){
        var data = this["data-modal"];
        if (!data) {
            this["data-modal"] = (data = new Modal(this));
            extend(data, this);
        }
        if (typeof option == "string") {
            this[option]();
        } else {
            this.show();
        }
    };

    document.addEventListener("click", function(event){
        var element = event.target, target;
        if (element.hasAttribute("data-target")) {
            target = document.querySelector(element.getAttribute("data-target"));
            modal.call(target);
        }
    })
})(window);