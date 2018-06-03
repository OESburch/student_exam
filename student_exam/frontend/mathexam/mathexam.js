angular.module( 'sample.mathexam', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('mathexam', {
    url: '/mathexam',
    controller: 'MathExamCtrl',
    templateUrl: 'mathexam/mathexam.html',
    data: {
      requiresLogin: true
    }
  });
})
.controller( 'MathExamCtrl', function MathExamController( $scope, $http, store, $state) {
  $scope.student_exam = [];

  $scope.math_name = [];


  $http({
    url: 'http://localhost:3001/exams/math',
    method: 'GET'
  }).then(function(response) {
    $scope.student_exam = response.data;
    for (var index = 0; index < response.data.length; index++) {
      $scope.math_name.push({name:"math" + index + 1});
    }
}, function(error) {
    alert(error.data);

  });


  $scope.result_exam = function () {

    $scope.marks = 0;

    $http({
      url: 'http://localhost:3001/exams/math',
      method: 'GET'
    }).then(function (response) {

      // console.log(response.data);
      for (var index = 0; index < response.data.length; index++) {
        let answer = $scope.math_name[index].name;
        // alert(response.data[index].examResult);
        // alert(answer);
        if (answer == response.data[index].examResult)
          $scope.marks += 1;
      }
      store.set('math_mark', $scope.marks);
      alert("Your mark is " + $scope.marks);
    }, function (error) {
      alert(error.data);

    })
  }


});
