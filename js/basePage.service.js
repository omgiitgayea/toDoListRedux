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

            if ($localStorage.lists) {
                this.listArray = $localStorage.lists;
                this.currentList = this.listArray[0];
            }
            this.selected = null;
            this.oldName = "";

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
                        $mdToast.show($mdToast.simple()
                            .textContent("You added the " + newList + " list!")
                            .hideDelay(1000));
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
                $mdToast.show($mdToast.simple()
                    .textContent("Hey you just changed to the " + listName + " list!")
                    .hideDelay(1000));
            };

            this.clear = function () {
                this.currentList.items = [];
                $mdToast.show($mdToast.simple()
                    .textContent("Whelp, you just deleted all the items from your list...")
                    .hideDelay(1000));
            };

            this.addItem = function (newItem) {
                this.dupItemError = true;
                if (newItem && (this.currentList.items.indexOf(newItem) === -1)) {
                    this.currentList.items.push(newItem);
                    this.dupItemError = false;
                    $mdToast.show($mdToast.simple()
                        .textContent("You added the " + newItem + " item!")
                        .hideDelay(1000));
                }
            };

            this.removeItem = function (item) {
                this.currentList.items.splice(this.currentList.items.indexOf(item), 1);
                $mdToast.show($mdToast.simple()
                    .textContent("Goodbye " + item + "!")
                    .hideDelay(1000));
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

                $mdToast.show($mdToast.simple()
                    .textContent("Yay! You accomplished something!")
                    .hideDelay(1000));
                return selected;
            };

            this.setSelected = function (selected) {
                this.selected = selected;
            };

            this.deleteLists = function () {
                this.listArray = [];
                this.currentList = null;
                $mdToast.show($mdToast.simple()
                    .textContent("Congratulations on embracing your inner procrastinator!")
                    .hideDelay(1000));
            };

            this.saveNewItem = function (oldItem, newItem) {
                if (oldItem === newItem) {
                    return true;
                }
                if (this.currentList.items.indexOf(newItem) === -1) {
                    this.currentList.items.splice(this.currentList.items.indexOf(oldItem), 1, newItem);
                    return true;
                }
                else {
                    return false;
                }

            };

            this.saveNewName = function (newListName) {
                for (var i = 0; i < this.listArray.length; i++)
                {
                    if (this.listArray[i].name === newListName)
                    {
                        return false;
                    }
                }
                for (var i = 0; i < this.listArray.length; i++) {
                    if (this.listArray[i].name === this.oldName) {
                        this.listArray[i].name = newListName;
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
                $mdToast.show($mdToast.simple()
                    .textContent("I guess you don't have to do " + list + "...")
                    .hideDelay(1000));
            }
        });
})();