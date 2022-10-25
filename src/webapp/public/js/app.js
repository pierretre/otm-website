var app = angular.module ('otm_app',
[
  'ngRoute',
  'homeCtrl',
  'aboutCtrl',
  'quilltestCtrl',
  'loginCtrl',
  'photouploaderCtrl',
  'adminCtrl',
  'userPageCtrl'
]);

// Define the routes for the app
app.config (function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider
  .when ('/', {
      templateUrl : 'views/home.html',
      controller : 'homePageController',
      requireLogin: false
  })
  .when ('/quilltest', {
      templateUrl : 'views/quilltest.html',
      controller : 'quilltestPageController',
      requireLogin: true
  })
  .when ('/photouploader', {
      templateUrl : 'views/photo_upload.html',
      controller : 'photouploaderPageController',
      requireLogin: true
  })

  .when ('/about', {
      templateUrl : 'views/about.html',
      controller : 'aboutPageController',
      requireLogin: false
  })
  .when ('/login', {
      templateUrl : 'views/login_form.html',
      controller : 'loginFormController',
      requireLogin: false
  })
  .when ('/adminspace', {
      templateUrl : 'views/admin_page.html',
      controller : 'adminSpaceController',
      requireLogin: true
  })
  .when ('/userpage/:username', {
      templateUrl : 'views/user.html',
      controller : 'userPageController',
      requireLogin: false
  })
  .when ('/error404', {
      templateUrl : 'views/error404.html'
  })
  // .when ('/***', {
  //     templateUrl : PATH_TO_OTM+'/views/***.html',
  //     controller : '***Controller'
  // })
  .otherwise ({
      redirectTo : '/error404'
  });

});

app.run(function($rootScope, $http, $location){
  $rootScope.$on('$routeChangeStart', function (event, next) {
    console.log('change');
    if(next.requireLogin){
      $http.get('/api/auth/isauth').catch(function(){
          $rootScope.savedLocation = $location.url();
          $location.path('/login');
      });
    }
  });
})
