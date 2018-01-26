var myTodo = angular.module('myTodo', []);

function mainController($scope, $http) {
  $scope.formData = {};
  //todo 모두얻기
  $http.get('/todos')
    .success(function(data){
      $scope.todos = data;
    })
    .error(function(err) {
      console.log('err=' + err );
    });
  //todo 저장
    $scope.createTodo = function(){
      $http.post('/todos', $scope.formData)
      .success(function (data) {
          $scope.formData = {};
          $scope.todos = data;
          console.log(data);
      })
    }
  //todo 삭제
    $scope.deleteTodo = function (id) {
      $http.delete('/todos/' + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(err) {
      console.log('err=' + err );
      });
    }
}