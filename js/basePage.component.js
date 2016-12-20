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