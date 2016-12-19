/**
 * Created by GodaiYuusaku on 12/15/16.
 */
(function () {
    angular
        .module("myApp")
        .component("basePage", {
            templateUrl: "html/basePage.html",
            // service: BasePageService,
            controller: basePageController,
            controllerAs: "vm"
        })
        .service("BasePageService", function ($localStorage) {
            if ($localStorage.lists)
                this.listArray = $localStorage.lists;
            else
                this.listArray = [];
            this.currentList;
            this.newItem;
            this.selected = null;

            this.addList = function (newList) {
                if (newList) {
                    var inList = false;
                    for (var i = 0; i < this.listArray.length; i++) {
                        if (newList === this.listArray[i].name) {
                            inList = true;
                            break;
                        }
                    }
                    if (!inList) {
                        this.listArray.push({name: newList, items: []});
                        this.currentList = this.listArray[this.listArray.length - 1];
                    }
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
                // this.selected = null;
            };

            this.addItem = function (newItem) {
                if (newItem && (this.currentList.items.indexOf(newItem) === -1)) {
                    this.currentList.items.push(newItem);
                }
            };

            this.removeItem = function (item) {
                this.currentList.items.splice(this.currentList.items.indexOf(item), 1);
            };

            this.clearCompleted = function (selected) {
                for (var key in selected) {
                    if (this.currentList.items.indexOf(key) != -1 && selected[key]) {
                        this.currentList.items.splice(this.currentList.items.indexOf(key), 1);
                        delete selected[key];
                    }
                }

                if (Object.keys(selected).length === 0) {
                    selected = null;
                }
                return selected;
            };

            this.setSelected = function(selected)
            {
                this.selected = selected;
            }
        });


    function basePageController(BasePageService, $localStorage) {
        this.listArray = BasePageService.listArray;
        this.currentList = BasePageService.currentList;
        this.selected = BasePageService.selected;
        this.testing = "Good Morning, Dave";
        this.date = new Date();
        this.newList;
        this.newItem;
        this.$storage = $localStorage;

        this.addList = function () {
            BasePageService.addList(this.newList);
            this.currentList = BasePageService.currentList;
            this.newList = "";
        };

        this.getList = function (listName) {
            BasePageService.getList(listName);
            this.currentList = BasePageService.currentList;
        };

        this.clear = function () {
            BasePageService.clear();
            this.selected = null;
        };

        this.addItem = function () {
            BasePageService.addItem(this.newItem);
            this.currentList = BasePageService.currentList;
            this.newItem = "";
        };

        this.removeItem = function (item) {
            BasePageService.removeItem(item);
        };

        this.clearCompleted = function () {
            this.selected = BasePageService.clearCompleted(this.selected);
        };

        this.sendSelected = function () {
            BasePageService.setSelected(this.selected);
        };

        this.deleteLists = function() {
            $localStorage.$reset();
            this.$storage = null;
            this.listArray = [];
            this.currentList = null;
        };

        this.editItem = function () {
            console.log("click!");
        };

        this.editList = function () {
            console.log("edit!");
        };

        this.removeList = function (list) {
            console.log(list);
        }
    }
})();