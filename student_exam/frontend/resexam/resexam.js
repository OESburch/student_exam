angular.module('sample.resexam', [
    'ui.router',
    'angular-storage'
  ])
  .config(function ($stateProvider) {
    $stateProvider.state('resexam', {
      url: '/resexam',
      controller: 'ResExamCtrl',
      templateUrl: 'resexam/resexam.html',
      data: {
        requiresLogin: true
      }
    });
  })
  .controller('ResExamCtrl', function ResExamController($scope, $http, store, $state) {
    // $scope.math_mark = 5;
    // $scope.english_mark = 3;
    $scope.math_mark = store.get('math_mark');
    $scope.english_mark = store.get('eng_mark');

    if ($scope.math_mark == null)
      $scope.math_mark = "You didn't Math exam yet.";

    if ($scope.english_mark == null)
      $scope.english_mark = "You didn't English exam yet.";




  });
