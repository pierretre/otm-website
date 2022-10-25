var homePage = angular.module('homeCtrl', [])

homePage.controller('homePageController', function($scope, $http){
  $scope.title = "Home";
  $scope.message = "Home page of the website"
});
