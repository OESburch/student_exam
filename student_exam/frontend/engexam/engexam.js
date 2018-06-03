angular.module('sample.engexam', [
    'ui.router',
    'angular-storage'
  ])
  .config(function ($stateProvider) {
    $stateProvider.state('engexam', {
      url: '/engexam',
      controller: 'EngExamCtrl',
      templateUrl: 'engexam/engexam.html',
      data: {
        requiresLogin: true
      }
    });
  })
  .controller('EngExamCtrl', function EngExamController($scope, $http, store, $state) {

    $scope.student_exam = [];

    $scope.eng_name = [];


    $http({
      url: 'http://localhost:3001/exams/english',
      method: 'GET'
    }).then(function (response) {

      // console.log(response.data);
      $scope.student_exam = response.data;
      for (var index = 0; index < response.data.length; index++) {
        $scope.eng_name.push({name:"eng" + index + 1});
      }
    }, function (error) {
      alert(error.data);

    });

    $scope.result_exam = function () {

      $scope.marks = 0;

      $http({
        url: 'http://localhost:3001/exams/english',
        method: 'GET'
      }).then(function (response) {

        // console.log(response.data);
        for (var index = 0; index < response.data.length; index++) {
          let answer = $scope.eng_name[index].name;
          // alert(response.data[index].examResult);
          // alert(answer);
          if (answer == response.data[index].examResult)
            $scope.marks += 1;
        }
        store.set('eng_mark', $scope.marks);

        alert("Your mark is " + $scope.marks);
      }, function (error) {
        alert(error.data);

      })
    }


  });
