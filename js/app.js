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
                    GREETING: "Hi!"
                })
                .translations("jp", {
                    GREETING: "こんにちは"
                })
                .preferredLanguage("en");
        })
        .filter("upperFirst", function() {
            return function(text) {
                return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
            }
        })
})();