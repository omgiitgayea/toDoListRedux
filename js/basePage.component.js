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

    function basePageController(BasePageService, $localStorage, $translate, $timeout) {
        var vm = this;
        vm.currentList = BasePageService.currentList;
        vm.selected = BasePageService.selected;
        vm.greeting = "Good ";
        vm.date = new Date();
        vm.newList = "";
        vm.newItem = "";
        // vm.$storage = $localStorage;
        vm.dupItemError = false;
        vm.dupListError = false;

        // firebase set up
        vm.database = firebase.database();
        vm.database.ref().on("value", function (snapshot) {
            var testArray = [];
            if (snapshot.val()) {
                for (var item in snapshot.val().list) {
                    testArray.push({
                        name: item,
                        items: snapshot.val().list[item].items === "empty" ? [] : snapshot.val().list[item].items
                    })
                }
                $timeout(function () {
                    vm.listArray = testArray;
                    vm.currentList = vm.listArray[0];
                    BasePageService.listArray = testArray;
                    BasePageService.currentList = testArray[0];
                });
            }
            else
                vm.listArray = [];
        });

        // makes the greeting time of day specific
        if (vm.date.getHours() < 12) {
            vm.greeting += "Morning, Dave";
        }
        else if (vm.date.getHours() < 18) {
            vm.greeting += "Afternoon, Dave";
        }
        else {
            vm.greeting += "Evening, Dave";
        }

        vm.addList = function () {
            BasePageService.addList(vm.newList);
            vm.currentList = BasePageService.currentList;
            vm.listArray = BasePageService.listArray;
            vm.dupListError = BasePageService.dupListError;
            // if (vm.$storage.lists === null)
            // {
            //     vm.$storage.lists = vm.listArray;
            // }
            vm.newList = "";
            vm.updateDB();
        };

        vm.getList = function (listName) {
            BasePageService.getList(listName);
            vm.currentList = BasePageService.currentList;
        };

        vm.clear = function () {
            BasePageService.clear();
            vm.updateDB();
            vm.selected = null;
        };

        vm.addItem = function () {
            BasePageService.addItem(vm.newItem);
            vm.currentList = BasePageService.currentList;
            vm.dupItemError = BasePageService.dupItemError;
            vm.newItem = "";
            vm.updateDB();
        };

        vm.removeItem = function (item) {
            BasePageService.removeItem(item);
            vm.updateDB();
        };

        vm.clearCompleted = function () {
            vm.selected = BasePageService.clearCompleted(vm.selected);
            vm.updateDB();
        };

        vm.sendSelected = function () {
            BasePageService.setSelected(vm.selected);
        };

        vm.deleteLists = function () {
            // $localStorage.$reset();
            BasePageService.deleteLists();
            vm.database.ref().remove();
            // vm.$storage.lists = null;
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
            vm.database.ref(list).set(null);
            if (list === vm.currentList.name)
                vm.currentList = BasePageService.listArray[0];
        };

        vm.updateDB = function () {
            if (vm.listArray.length === 0) {
                console.log("Empty listArray")
            }
            for (var i = 0; i < vm.listArray.length; i++) {
                if (vm.listArray[i].items.length != 0) {
                    vm.database.ref("list/" + vm.listArray[i].name).set({
                        items: vm.listArray[i].items
                    });
                }
                else {
                    console.log("empty!");
                    vm.database.ref("list/" + vm.listArray[i].name).set({
                        items: "empty"
                    });
                }
            }
        };
    }
})();