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
    this.editingList = false;
    this.oldName = "";

    this.getList = function(name)
    {
        this.listCrtl.getList(name);
    };

    this.removeList = function(name)
    {
        this.listCrtl.removeList(name);
    };

    this.editList = function(name)
    {
        this.editingList = true;
        this.oldName = name;
        this.listCrtl.editList(name);
    };

    this.saveNewName = function() {
        if(this.listName != this.oldName) {
            var isNew = this.listCrtl.saveNewName(this.listName);
            if (!isNew) {
                this.listName = this.oldName
            }
        }
        else {
            this.listCrtl.dupListError = false;
        }
        this.editingList = false;
        this.oldName = "";
    };

    this.reset = function() {
        this.listName = this.oldName;
    }
}