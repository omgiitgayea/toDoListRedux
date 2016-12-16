/**
 * Created by GodaiYuusaku on 12/15/16.
 */
(function () {
    angular
        .module("myApp")
        .component("basePage", {
            templateUrl: "html/basePage.html",
            controller: basePageController,
            controllerAs: "vm"
        });

    function basePageController() {
        this.testing = "Boo! From Controller!";
        this.listArray = [];
        this.currentList;
        this.newList;
        this.newItem;

        this.addList = function () {
            if (this.newList) {
                var inList = false;
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.newList === this.listArray[i].name) {
                        inList = true;
                        break;
                    }
                }
                if (!inList) {
                    this.listArray.push({name: this.newList, items: []});
                    this.currentList = this.listArray[this.listArray.length - 1];
                }
                this.newList = "";
            }
        };

        this.getList = function (listName) {
            for (var i = 0; i < this.listArray.length; i++) {
                if (listName === this.listArray[i].name) {
                    this.currentList = this.listArray[i];
                    break;
                }
            }
        };

        this.clear = function () {
            this.currentList.items = [];
            this.selected = null;
        };

        this.addItem = function () {
            if (this.newItem && (this.currentList.items.indexOf(this.newItem) === -1)) {
                this.currentList.items.push(this.newItem);
                this.newItem = "";
            }
        };

        this.removeItem = function (item) {
            this.currentList.items.splice(this.currentList.items.indexOf(item), 1);
        };

        this.clearCompleted = function () {
            for (var key in this.selected) {
                if (this.currentList.items.indexOf(key) != -1 && this.selected[key]) {
                    this.currentList.items.splice(this.currentList.items.indexOf(key), 1);
                    delete this.selected[key];
                }
            }
            // if (Object.keys(this.selected).length === 0)
            // {
            //     this.selected = null;
            // }
        };
    }
})();