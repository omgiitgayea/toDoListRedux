/**
 * Created by Godai Yuusaku on 12/14/2016.
 */
(function (){
    var myApp = angular.module("myApp", ["ui.router"]);

    myApp.config(function($stateProvider, $urlRouterProvider) {

    });

    myApp.component("basePage", {
        // template: "<h2>{{vm.testing}}</h2>",
        templateUrl: "html/basePage.html",
        controller: basePageController,
        controllerAs: "vm"
    });

    function basePageController() {
        this.testing = "Boo! From Controller!";
        this.listArray = [];
        this.currentList;
        this.newList;
        this.newItem;

        this.addList = function () {
            if (this.newList) {
                this.listArray.push({name: this.newList, items: []});
                this.newList = "";
                if (this.listArray.length === 1)
                {
                    this.currentList = this.listArray[0];
                }
            }
        };

        this.getList = function(listName) {
            for (var i = 0; i < this.listArray.length; i++)
            {
                if (listName === this.listArray[i].name)
                {
                    this.currentList = this.listArray[i];
                }
            }
        };

        this.addItem = function () {
            if (this.newItem && (this.currentList.items.indexOf(this.newItem) === -1))
            {
                this.currentList.items.push(this.newItem);
                this.newItem = "";
            }
        }
    }
})();