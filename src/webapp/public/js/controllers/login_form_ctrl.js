var homePage = angular.module('loginCtrl', [])

homePage.controller('loginFormController', function($rootScope, $scope, $location,$http){
  $scope.title = "Login";

  if($rootScope.savedLocation)
    $scope.userMessage = "You must login to access "+$rootScope.savedLocation;
  else
    $scope.userMessage = "";

  $scope.submit = function () {
    if(!$scope.email) return $scope.httpMessage = 'Make sure the email address in valid';

    var user = {
      email: $scope.email,
      password: $scope.pwd,
    };

    $http.post('/api/auth/login', user).then(function(res) {
      $scope.httpMessage = res.data.message+res.data.username;
      $location.path($rootScope.savedLocation);
    }, function(err) {
      $scope.httpMessage = err.data.message;
    });
  };

});
