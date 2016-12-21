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
        this.listCrtl.saveNewName(this.listName);
        this.editingList = false;
        this.oldName = "";
    };

    this.reset = function() {
        this.listName = this.oldName;
    }
}