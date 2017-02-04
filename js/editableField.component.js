/**
 * Created by GodaiYuusaku on 12/20/16.
 */
angular.module('myApp').component('editableField', {
    templateUrl: 'html/editableField.html',
    controller: EditableFieldController,
    controllerAs: "ef",
    bindings: {
        listName: "@"
    },
    require: {
        listCrtl: "^basePage"
    }
});

function EditableFieldController() {
    var vm = this;
    vm.editingList = false;
    vm.oldName = "";

    vm.getList = function(name)
    {
        vm.listCrtl.getList(name);
    };

    vm.removeList = function(name)
    {
        vm.listCrtl.removeList(name);
    };

    vm.editList = function(name)
    {
        vm.editingList = true;
        vm.oldName = name;
        vm.listCrtl.editList(name);
    };

    vm.saveNewName = function() {
        if(vm.listName != vm.oldName) {
            var isNew = vm.listCrtl.saveNewName(vm.listName);
            if (!isNew) {
                vm.listName = vm.oldName
            }
        }
        else {
            vm.listCrtl.dupListError = false;
        }
        vm.editingList = false;
        vm.oldName = "";
    };

    vm.reset = function() {
        vm.listName = vm.oldName;
    }
}