/**
 * Created by GodaiYuusaku on 12/20/16.
 */
(function () {
    angular
        .module("myApp")
        .service("BasePageService", function ($localStorage, $mdToast) {
            this.currentList;
            this.listArray = [];
            this.dupListError = false;
            this.dupItemError = false;
            this.database = firebase.database();

            if ($localStorage.lists) {
                this.listArray = $localStorage.lists;
                this.currentList = this.listArray[0];
            }
            this.selected = null;
            this.oldName = "";

            this.myToast = $mdToast.simple().position("top").hideDelay(2000);

            this.addList = function (newList) {
                this.dupListError = false;
                if (newList) {
                    var inList = false;
                    for (var i = 0; i < this.listArray.length; i++) {
                        if (newList === this.listArray[i].name) {
                            inList = true;
                            this.dupListError = true;
                            break;
                        }
                    }
                    if (!inList) {
                        this.listArray.push({name: newList, items: []});
                        this.currentList = this.listArray[this.listArray.length - 1];
                        $mdToast.show(this.myToast.textContent("You added the " + newList + " list!"));
                        this.updateDB();
                    }
                    else {
                        $mdToast.show(this.myToast.textContent("Duplicate Lists are not allowed"));
                    }
                }
            };

            this.getList = function (listName) {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (listName === this.listArray[i].name) {
                        this.currentList = this.listArray[i];
                        break;
                    }
                }
                $mdToast.show(this.myToast.textContent("Hey you just changed to the " + listName + " list!"));
            };

            this.clear = function () {
                this.currentList.items = [];
                this.updateDB();
                $mdToast.show(this.myToast
                    .textContent("Whelp, you just deleted all the items from your list..."));
            };

            this.addItem = function (newItem) {
                this.dupItemError = true;
                if (newItem && (this.currentList.items.indexOf(newItem) === -1)) {
                    this.currentList.items.push(newItem);
                    this.dupItemError = false;
                    $mdToast.show(this.myToast.textContent("You added the " + newItem + " item!"));
                    this.updateDB();
                }
                else {
                    $mdToast.show(this.myToast.textContent("Duplicate Items are not allowed"))
                }
            };

            this.removeItem = function (item) {
                this.currentList.items.splice(this.currentList.items.indexOf(item), 1);
                this.updateDB();
                $mdToast.show(this.myToast.textContent("Goodbye " + item + "!"));
            };

            this.clearCompleted = function (selected) {
                for (var key in selected) {
                    if (this.currentList.items.indexOf(key) != -1 && selected[key]) {
                        this.currentList.items.splice(this.currentList.items.indexOf(key), 1);
                        delete selected[key];
                    }
                }

                if (Object.keys(selected).length === 0) {
                    selected = null;
                }
                this.updateDB();
                $mdToast.show(this.myToast.textContent("Yay! You accomplished something!"));
                return selected;
            };

            this.setSelected = function (selected) {
                this.selected = selected;
            };

            this.deleteLists = function () {
                this.listArray = [];
                this.currentList = null;
                this.database.ref().remove();
                $mdToast.show(this.myToast.textContent("Congratulations on embracing your inner procrastinator!"));
            };

            this.saveNewItem = function (oldItem, newItem) {
                if (oldItem === newItem) {
                    return true;
                }
                if (this.currentList.items.indexOf(newItem) === -1) {
                    this.currentList.items.splice(this.currentList.items.indexOf(oldItem), 1, newItem);
                    this.updateDB();
                    return true;
                }
                else {
                    return false;
                }

            };

            this.saveNewName = function (newListName) {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === newListName) {
                        return false;
                    }
                }
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === this.oldName) {
                        this.listArray[i].name = newListName;
                        this.updateDB();
                        return true;
                    }
                }
            };

            this.editList = function (oldName) {
                this.oldName = oldName;
            };

            this.removeList = function (list) {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === list) {
                        this.listArray.splice(i, 1);
                        break;
                    }
                }
                this.database.ref(list).set(null);
                $mdToast.show(this.myToast.textContent("I guess you don't have to do " + list + "..."));
            };

            this.updateDB = function () {
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].items.length != 0) {
                        this.database.ref(this.listArray[i].name).set({
                            items: this.listArray[i].items
                        });
                    }
                    else
                        this.database.ref(this.listArray[i].name).set({
                            items: "empty"
                        });
                }
            };
        });
})();