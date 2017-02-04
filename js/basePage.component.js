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

    function basePageController(BasePageService, $localStorage, $translate) {
        var vm = this;
        vm.listArray = BasePageService.listArray;
        vm.currentList = BasePageService.currentList;
        vm.selected = BasePageService.selected;
        vm.greeting = "Good ";
        vm.date = new Date();
        vm.newList = "";
        vm.newItem = "";
        vm.$storage = $localStorage;
        vm.dupItemError = false;
        vm.dupListError = false;

        if(vm.date.getHours() < 12)
        {
            vm.greeting += "Morning, Dave";
        }
        else if (vm.date.getHours() < 18)
        {
            vm.greeting += "Afternoon, Dave";
        }
        else
        {
            vm.greeting += "Evening, Dave";
        }

        vm.addList = function () {
            BasePageService.addList(vm.newList);
            vm.currentList = BasePageService.currentList;
            vm.listArray = BasePageService.listArray;
            vm.dupListError = BasePageService.dupListError;
            if (vm.$storage.lists === null)
            {
                vm.$storage.lists = vm.listArray;
            }
            vm.newList = "";
        };

        vm.getList = function (listName) {
            BasePageService.getList(listName);
            vm.currentList = BasePageService.currentList;
        };

        vm.clear = function () {
            BasePageService.clear();
            vm.selected = null;
        };

        vm.addItem = function () {
            BasePageService.addItem(vm.newItem);
            vm.currentList = BasePageService.currentList;
            vm.dupItemError = BasePageService.dupItemError;
            vm.newItem = "";
        };

        vm.removeItem = function (item) {
            BasePageService.removeItem(item);
        };

        vm.clearCompleted = function () {
            vm.selected = BasePageService.clearCompleted(vm.selected);
        };

        vm.sendSelected = function () {
            BasePageService.setSelected(vm.selected);
        };

        vm.deleteLists = function() {
            $localStorage.$reset();
            BasePageService.deleteLists();
            vm.$storage.lists = null;
            vm.listArray = [];
            vm.currentList = null;
        };

        // to do
        vm.saveNewItem = function (oldName, newName) {
            vm.dupItemError = false;
            if (!BasePageService.saveNewItem(oldName, newName)) {
                vm.dupItemError = true;
            }
            return BasePageService.saveNewItem(oldName, newName);
        };

        vm.editList = function (oldName) {
            BasePageService.editList(oldName);
        };

        vm.saveNewName = function (newListName) {
            vm.dupListError = false;
            if (!BasePageService.saveNewName(newListName)) {
                vm.dupListError = true;
            }
            return BasePageService.saveNewName(newListName);
        };

        vm.removeList = function (list) {
            BasePageService.removeList(list);
            if (list === vm.currentList.name)
                vm.currentList = BasePageService.listArray[0];
        };
    }
})();