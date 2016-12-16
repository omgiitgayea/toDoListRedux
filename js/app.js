/**
 * Created by Godai Yuusaku on 12/14/2016.
 */
(function () {
    angular.module("myApp", ["ui.router"])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/lists");

            $stateProvider
                .state("lists", {
                    url: "/lists",
                    template: "<base-page></base-page>"
                })
                .state("about", {
                    url: "/about",
                    templateUrl: "html/aboutPage.html"
                })
        });
})();