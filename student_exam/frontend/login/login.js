angular.module( 'sample.login', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/',
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
})
.controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.login = function() {
    $http({
      url: 'http://localhost:3001/sessions/create',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {

      store.set('jwt', response.data.id_token);

      if(response.data.userInfo[0].userType == 0)
      {
        $state.go('regexam');
      }
      else{
        $state.go('viewexam');

      }
      
    }, function(error) {
      alert(error.data);
    });
  }

});
