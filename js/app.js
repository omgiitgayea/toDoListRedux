/**
 * Created by Godai Yuusaku on 12/14/2016.
 */
(function () {
    angular.module("myApp", ["ui.router", "ngStorage", "ngAnimate", "ngMaterial", "pascalprecht.translate"])
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
                    PARTICLE: ""
                })
                .translations("jp", {
                    TITLE: "自分のやるべきことのリストを選ぶ！",
                    GREETING: "こんにちは、{{name}}",
                    LIST: "リスト",
                    ABOUT: "情報",
                    SPONSOR_TITLE: "自分のやるべきことのリストを選ぶ！は",
                    SPONSOR: "ご覧のスポンサーの提供でお送りします",
                    PARTICLE: "は"
                })
                .preferredLanguage("en");
        })
        .filter("upperFirst", function() {
            return function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            }
        })
})();