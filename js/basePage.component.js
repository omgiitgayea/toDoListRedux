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

    function basePageController(BasePageService, $localStorage, $mdToast) {
        this.listArray = BasePageService.listArray;
        this.currentList = BasePageService.currentList;
        this.selected = BasePageService.selected;
        this.greeting = "Good ";
        this.date = new Date();
        this.newList = "";
        this.newItem = "";
        this.$storage = $localStorage;
        this.dupItemError = false;
        this.dupListError = false;

        if(this.date.getHours() < 12)
        {
            this.greeting += "Morning, Dave";
        }
        else if (this.date.getHours() < 18)
        {
            this.greeting += "Afternoon, Dave";
        }
        else
        {
            this.greeting += "Evening, Dave";
        }

        this.addList = function () {
            BasePageService.addList(this.newList);
            this.currentList = BasePageService.currentList;
            this.listArray = BasePageService.listArray;
            this.dupListError = BasePageService.dupListError;
            if (this.$storage.lists === null)
            {
                this.$storage.lists = this.listArray;
            }
            this.newList = "";
            // don't know how toast works yet...
            // $mdToast.show($mdToast.simple().textContent("Boo!"));
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
            this.dupItemError = BasePageService.dupItemError;
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
            this.$storage.lists = null;
            this.listArray = [];
            this.currentList = null;
        };

        // to do
        this.saveNewItem = function (oldName, newName) {
            this.dupItemError = false;
            if (!BasePageService.saveNewItem(oldName, newName)) {
                this.dupItemError = true;
            }
            return BasePageService.saveNewItem(oldName, newName);
        };

        this.editList = function (oldName) {
            BasePageService.editList(oldName);
        };

        this.saveNewName = function (newListName) {
            this.dupListError = false;
            if (!BasePageService.saveNewName(newListName)) {
                this.dupListError = true;
            }
            return BasePageService.saveNewName(newListName);
        };

        this.removeList = function (list) {
            BasePageService.removeList(list);
            if (list === this.currentList.name)
                this.currentList = BasePageService.listArray[0];
        };
    }
})();