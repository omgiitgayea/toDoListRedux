/**
 * Created by Godai Yuusaku on 12/14/2016.
 */
(function () {
    angular.module("myApp", ["ui.router", "ngStorage", "ngAnimate", "ngMaterial", "pascalprecht.translate", "ngSanitize", "ui.bootstrap"])
        .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
            $urlRouterProvider.otherwise("/lists");

            $stateProvider
                .state("lists", {
                    url: "/lists",
                    template: "<base-page></base-page>"
                })
                .state("about", {
                    url: "/about",
                    templateUrl: "html/aboutPage.html"
                });

            $translateProvider
                .translations("en", {
                    TITLE: "Choose Your Own To Do List!",
                    GREETING: "Hi, {{name}}",
                    LIST: "List",
                    ABOUT: "About",
                    SPONSOR_TITLE: "Choose Your Own To Do List!",
                    SPONSOR: "is brought to you by:",
                    DELETE_LIST: "Delete List",
                    CLEAR_COMPLETE: "Clear Completed Items",
                    CLEAR_LIST: "Clear List",
                    CREATE_LIST: "Create List",
                    ADD_ITEM: "Add Item",
                    ADD_ITEM_PROMPT: "Add an item to your list:",
                    LIST_NAME_DISPLAY: "Here is your {{listName}} list for today"
                })
                .translations("jp", {
                    TITLE: "自分のやるべきことのリストを選ぶ！",
                    GREETING: "こんにちは、{{name}}",
                    LIST: "リスト",
                    ABOUT: "情報",
                    SPONSOR_TITLE: "自分のやるべきことのリストを選ぶ！は",
                    SPONSOR: "ご覧のスポンサーの提供でお送りします",
                    DELETE_LIST: "リストを削除する",
                    CLEAR_COMPLETE: "完成品をクリア",
                    CLEAR_LIST: "アイテムを削除する",
                    CREATE_LIST: "リストを作成する",
                    ADD_ITEM: "アイテムを追加する",
                    ADD_ITEM_PROMPT: "リストにアイテムを加する：",
                    LIST_NAME_DISPLAY: "これは今日の{{listName}}リスト"
                })
                .preferredLanguage("en")
                .fallbackLanguage("en")
                .useSanitizeValueStrategy("sanitize");
        })
        .filter("upperFirst", function() {
            return function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            }
        })
        .controller("langController", function ($translate) {
            var lc = this;

            lc.changeLanguage = function (langKey) {
                $translate.use(langKey);
            }

        })
})();