angular.module('visitorsModule', [])

.controller('visitorsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.visitors = [];
    
    $scope.getVisitors = function () {
        $scope.action = 'list';
        $http.get('/setting/visitors_excluded').then(function (response) {
            $scope.excludes = response.data;
            $http.get('/setting/visitors_limit').then(function (response) {
                $scope.limit = response.data;
                $http.get('/visitors/' + $scope.excludes.value + '/' + $scope.limit.value, $rootScope.urlConfig).then(function (response) {
                    $scope.visitors = response.data;
                });
            });
        });
    };

    $scope.viewVisitor = function (id) {
        $scope.action = 'view';
        $http.get('/visitors/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.visitor = response.data;
        });
    };

    $scope.deleteVisitor = function (id) {
        $scope.action = 'list';
        $http.delete('/visitors/' + id, $rootScope.urlConfig).then(function () {
            $scope.getVisitors();
        });
    };

    $scope.cancelVisitor = function () {
        $scope.action = 'list';
    };

}]);
