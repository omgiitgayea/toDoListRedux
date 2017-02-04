/**
 * Created by GodaiYuusaku on 12/20/16.
 */
angular.module('myApp').component('listItems', {
    templateUrl: 'html/listItems.html',
    controller: ListItemsController,
    controllerAs: "lic",
    bindings: {
        itemName: "@"
    },
    require: {
        itemCrtl: "^basePage"
    }
});

function ListItemsController() {
    var vm = this
    vm.editingList = false;
    vm.oldName = "";

    vm.removeItem = function (name) {
        vm.itemCrtl.removeItem(name);
    };

    vm.editItem = function (name) {
        vm.editingList = true;
        vm.oldName = name;
    };

    vm.saveNewItem = function () {
        var isNew = vm.itemCrtl.saveNewItem(vm.oldName, vm.itemName);
        if (!isNew) {
            vm.itemName = vm.oldName;
        }
        vm.editingList = false;
        vm.oldName = "";
    };

    vm.reset = function () {

        vm.itemName = vm.oldName;
    }
}