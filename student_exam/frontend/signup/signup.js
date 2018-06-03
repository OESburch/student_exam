angular.module( 'sample.signup', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('signup', {
    url: '/signup',
    controller: 'SignupCtrl',
    templateUrl: 'signup/signup.html'
  });
})
.controller( 'SignupCtrl', function SignupController( $scope, $http, store, $state) {

  $scope.user = {};

  $scope.createUser = function() {


    $http({
      url: 'http://localhost:3001/user',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      store.set('jwt', response.data.id_token);

      if($scope.user.extra == "1")
      {
        $state.go('viewexam');
      }
      else{
        $state.go('regexam');
      }

    }, function(error) {
      alert(error.data);
    });




  }

});
