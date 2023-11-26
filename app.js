'use strict';

var app = angular.module("myApp", []);

app.controller('todoCtrl', function($scope) {
    $scope.todoList = [{todoText:'Clean House', done:false}];

    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, done:false});
        $scope.todoInput = "";
    };


    $scope.getTotalTodos = function () {
        var unselectedItems = $scope.todoList.filter(function(x) {
          return !x.done;
        });
        return unselectedItems.length;
      };

    $scope.remove = function() {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.done) $scope.todoList.push(x);
        });
    };

    $scope.removeTask= function (i) {
        $scope.todoList.splice(i, 1);
    };

    $scope.filter = { status: 'all'};

$scope.showAll = function() {
    $scope.filter.status = 'all';
};

$scope.showActive = function() {
    $scope.filter.status = 'active';
};

$scope.showDone = function() {
    $scope.filter.status = 'done';
};
    
$scope.filterByStatus = function(item) {
    switch ($scope.filter.status) {
        case 'all':
            return true;
            break;
        case 'active':
            return !item.done
            break;
            case 'done':
                return item.done;
                break;
            default:
                return true;
        }
    };
    
    $scope.checkAll = function() {
        $scope.todoList.forEach(function(x) {
            x.done = $scope.master;
        });
    };

    $scope.$watch('todoList', function(newValue, oldValue) {
        if (newValue) {
            var allChecked = true;
            for (var i = 0; i < newValue.length; i++) {
                if (!newValue[i].done) {
                    allChecked = false;
                    break;
                }
            }
            $scope.master = allChecked;
        }
    }, true);

    $scope.uncheckMaster = function() {
        $scope.master = false;
    };
    
    $scope.TotalTodos = function () {
        var total = $scope.todos.length;
        var foot = document.getElementById('footer');
        if(total == 0){
            foot.style.display = 'none';
        }
        else{
            foot.style.display = 'block';
        }
      };
    


});