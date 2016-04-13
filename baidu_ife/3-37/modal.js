/**
 * Created by hansneil on 12/4/16.
 */
(function(window, undefined){
    var Modal = function(element){
        this.element = element;
        this.isShown = false;
    };
    Modal.prototype.show = function(){
        if (this.isShown) {
            return;
        }
        this.isShown = true;
        this.element.classList.remove("hidden");
        this.element.className += " show";
    };
    Modal.prototype.hide = function(){
        if (!this.isShown) {
            return;
        }
        this.isShown = false;
        this.element.classList.remove("show");
        this.element.className += " hidden";
    };
    Modal.prototype.init = function(){
        var that = this;
        document.addEventListener("click", function(event){
            var target = event.target;
            switch (target.nodeName.toLowerCase()) {
                case "section":
                case "button":
                    that.hide();
                    break;
            }
        })
    };
    window.modal = function(){
        var data = this.getAttribute("data-modal");
        if (!data) {
            this.setAttribute("data-modal", (data = new Modal(this)));
        }
        data.show();
        return this;
    };

    document.addEventListener("click", function(event){
        var element = event.target;
        var target = document.querySelector(element.getAttribute("data-target"));
        modal.call(target);

    })
})(window);