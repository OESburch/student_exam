angular.module( 'sample.regexam', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('regexam', {
    url: '/regexam',
    controller: 'RegExamCtrl',
    templateUrl: 'regexam/regexam.html',
    data: {
      requiresLogin: true
    }
  });
})
.controller( 'RegExamCtrl', function RegExamController( $scope, $http, store, $state) {

  $scope.exam = {};

  $scope.exam_register = function() {

    $http({
      url: 'http://localhost:3001/exam',
      method: 'POST',
      data: $scope.exam
    }).then(function(response) {

            alert(response.data);

    }, function(error) {
      alert(error.data);
    });

  }


});
