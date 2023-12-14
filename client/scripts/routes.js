/**
 * Copyright (c) 2016
 * Company: Aya Jo
 * Created by Prince Hernandez, Yazeed Samamah.
 */
angular.module("Ayamobile").config(config);

function config(
  $stateProvider,
  $urlRouterProvider,
  $ionicConfigProvider,
  $translateProvider,
  $locationProvider
) {
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.views.transition("platform");
  $ionicConfigProvider.spinner.icon("lines");
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

  /*   uiGmapGoogleMapApiProvider.configure({
           key: 'AIzaSyAbl8ERZhvHgnh6CXFVe3s_U3D6YHGx0Ao',
           libraries: 'weather,geometry,visualization'
       });*/

  $stateProvider.state("enter", {
    url: "/enter",
    templateUrl: "client/templates/enter.html",
    controller: "EnterCtrl as enter",
    fastRender: true,
  });

  $urlRouterProvider.otherwise("enter");
  //Lets Config the translations

  $translateProvider.useSanitizeValueStrategy("escapeParameters");
  $translateProvider.useStaticFilesLoader({
    prefix: "Languages/",
    suffix: ".json",
  });
  $translateProvider.preferredLanguage("ar");
  $translateProvider.use("en");
}
