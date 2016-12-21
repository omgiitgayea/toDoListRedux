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

    this.removeItem = function(name)
    {
        this.itemCrtl.removeItem(name);
    };

    // to finish
    this.editItem = function(name)
    {
        console.log(name);
        this.editingList = true;
        this.oldName = name;
        // this.listCrtl.editList(name);
    };

    // to finish
    this.saveNewItem = function() {
        // this.listCrtl.saveNewName(this.listName);
        this.editingList = false;
        this.oldName = "";
    };

    this.reset = function() {

        this.itemName = this.oldName;
    }
}