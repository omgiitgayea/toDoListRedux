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
            this.currentList;
            this.listArray = [];
            if ($localStorage.lists) {
                this.listArray = $localStorage.lists;
                this.currentList = this.listArray[0];
            }
            // this.newItem;
            this.selected = null;
            this.oldName = "";

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
            };

            this.deleteLists = function () {
                this.listArray = [];
                this.currentList = null;
            };

            // to do
            this.editItem = function () {
                console.log("click!");
            };

            this.saveNewName = function (newListName) {
                for (var i = 0; i < this.listArray.length; i++)
                {
                    if (this.listArray[i].name === this.oldName)
                    {
                        this.listArray[i].name = newListName;
                        break;
                    }
                }
            };

            // to do
            this.editList = function (oldName) {
                this.oldName = oldName;
            };

            this.removeList = function (list) {
                for (var i = 0; i < this.listArray.length; i++)
                {
                    if (this.listArray[i].name === list)
                    {
                        this.listArray.splice(i, 1);
                        break;
                    }
                }
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
        this.editingList = false;
        this.oldName = "";

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
            BasePageService.deleteLists();
            this.$storage = null;
            this.listArray = [];
            this.currentList = null;
        };

        // to do
        this.editItem = function () {

            BasePageService.editItem();
        };

        this.editList = function (oldName) {
            this.editingList = true;
            this.oldName = oldName;
            BasePageService.editList(this.oldName);
        };

        this.reset = function () {
            this.newListName = this.oldName;
        };

        this.saveNewName = function (newListName) {
            BasePageService.saveNewName(newListName);
            this.newListName = "";
            this.oldName = "";
            this.editingList = false;
        };

        this.removeList = function (list) {
            BasePageService.removeList(list);
            if (list === this.currentList.name)
                this.currentList = BasePageService.listArray[0];
        }
    }
})();