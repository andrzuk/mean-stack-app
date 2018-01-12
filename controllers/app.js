angular.module('mainApp', ['pagesModule', 'todosModule', 'ngSanitize'])

.controller('mainController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {

    $scope.layout = {
        home: '../templates/home',
        plist: '../templates/plist',
        pform: '../templates/pform',
        list: '../templates/list',
        form: '../templates/form',
        manual: '../templates/manual',
        contact: '../templates/contact'
    };
    $scope.formData = {};
    $scope.pageData = {};
    $scope.action = null;
    $scope.status = null;    
    
    $scope.getHome = function() {
        $scope.action = 'home';
        $scope.getSubpage('index');
    };
    
    $scope.getContact = function () {
        $scope.action = 'contact';
        $scope.getSubpage('contact');
    };

    $scope.getSubpage = function (index) {
        $scope.status = 'loading';
        $http.get('/api/subpage/' + index).then(function(response) {
            $scope.pageData = response.data;
            $scope.pageData.description = $sce.trustAsHtml($scope.pageData.description);
            $scope.status = 'ready';
        });
    };

    $scope.getManual = function () {
        $scope.action = 'manual';
    };

    $scope.getHome();

}]);
