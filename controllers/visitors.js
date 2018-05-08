angular.module('visitorsModule', [])

.controller('visitorsController', ['$rootScope', '$scope', '$http', function ($rootScope, $scope, $http) {

    $scope.visitors = [];
    
    $scope.getVisitors = function () {
        $scope.action = 'list';
        $http.get('/visitors', $rootScope.urlConfig).then(function (response) {
            $scope.visitors = response.data;
        });
    };

    $scope.viewVisitor = function (id) {
        $scope.action = 'view';
        $http.get('/visitors/' + id, $rootScope.urlConfig).then(function (response) {
            $scope.visitor = response.data;
        });
    };

    $scope.cancelVisitor = function () {
        $scope.action = 'list';
    };

}]);
