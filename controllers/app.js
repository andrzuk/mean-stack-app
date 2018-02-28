var app = angular.module('mainApp', ['authModule', 'pagesModule', 'usersModule', 'messagesModule', 'imagesModule', 'todosModule', 'ngSanitize'])

.controller('mainController', ['$rootScope', '$scope', '$http', '$sce', function ($rootScope, $scope, $http, $sce) {

    $scope.layout = {
        home: '../templates/home',
        manual: '../templates/manual',
        contact: '../templates/contact',
        auth: '../templates/auth',
        pages: '../templates/pages',
        users: '../templates/users',
        messages: '../templates/messages',
        images: '../templates/images',
        todos: '../templates/todos',
    };
    
    $rootScope.currentUser = {};
    $rootScope.currentIp = null;
    
    $rootScope.urlConfig = { 
        headers: { 
            'user-id': window.localStorage.getItem('userId'),
            'x-access-token': window.localStorage.getItem('authToken') 
        } 
    };

    $http.get('http://ipv4.myexternalip.com/json').then(function (response) {
        $rootScope.currentIp = response.data.ip;
    });
    
    $scope.formData = {};
    $scope.pageData = {};
    $rootScope.module = null;
    $rootScope.action = null;
    $scope.status = null;
    
    $scope.initApp = function() {
        $http.get('/auth/init').then(function(response) {
            if (response.data.status) {
                $scope.formData = {};
                $scope.formData.ip = $rootScope.currentIp;
                $rootScope.module = 'auth';
                $rootScope.action = 'register';
                $scope.status = null;
                setTimeout(function() {
                    $('input#register-name').focus();
                }, 500);
            }
            else {
                $scope.getHome();
                $scope.getUserData(function(user) {
                    $rootScope.currentUser = user;
                });
            }
        });
    };

    $scope.getHome = function() {
        $rootScope.module = 'index';
        $rootScope.action = 'home';
        $scope.status = null;
        $scope.getSubpage('index');
    };
    
    $scope.getContact = function () {
        $rootScope.module = 'contact';
        $rootScope.action = 'contact';
        $scope.status = null;
        $scope.getSubpage('contact');
    };

    $scope.getManual = function () {
        $rootScope.module = 'manual';
        $rootScope.action = 'manual';
        $scope.status = null;
        $scope.getSubpage('manual');
    };

    $scope.getSubpage = function (index) {
        $scope.status = 'loading';
        $http.get('/page/' + index).then(function(response) {
            $scope.pageData = response.data;
            console.log($scope.pageData);
            $scope.pageData.description = $sce.trustAsHtml($scope.pageData.description);
            $scope.status = 'ready';
        });
    };
    
    $scope.getLogin = function() {
        $rootScope.module = 'auth';
        $rootScope.action = 'login';
        $scope.status = null;
        setTimeout(function() {
            $('input#login-name').focus();
        }, 500);
    };

    $scope.getPanel = function() {
        $rootScope.module = 'auth';
        $rootScope.action = 'panel';
        $scope.status = null;
    };

    $scope.getAppPages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'pages';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $scope.getPages();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
    };

    $scope.getAppUsers = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'users';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $scope.getUsers();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
    };

    $scope.getAppMessages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'messages';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $scope.getMessages();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
    };

    $scope.getAppImages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'images';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $scope.getImages();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
    };

    $scope.getAppTodos = function() {
        $rootScope.module = 'todos';
        $rootScope.action = 'list';
        $scope.status = null;
    };
    
    $scope.sendMessage = function () {
        $scope.formData.ip = $rootScope.currentIp;
        $http.post('/messages', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getContact();
        });
    };

    $scope.isUserLoggedIn = function(callback) {
        var userId = window.localStorage.getItem('userId');
        var authToken = window.localStorage.getItem('authToken');
        if (userId != undefined && authToken != undefined) {
            $http.get('/auth/' + userId).then(function (response) {
                var user = response.data;
                if (user.id == userId && user.token == authToken) {
                    return callback(true);
                }
                else {
                    return callback(false);
                }
            });
        }
        else {
            return callback(false);
        }
    };
    
    $scope.getUserData = function(callback) {
        var userId = window.localStorage.getItem('userId');
        var authToken = window.localStorage.getItem('authToken');
        if (userId != undefined && authToken != undefined) {
            $http.get('/auth/' + userId).then(function (response) {
                var user = response.data;
                if (user.id == userId && user.token == authToken) {
                    user.isLogged = true;
                    return callback(user);
                }
                else {
                    return callback({});
                }
            });
        }
        else {
            return callback({});
        }
    };
    
    $scope.initApp();

}]);

app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			var model = $parse(attributes.fileModel);
			var modelSetter = model.assign;
			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

app.filter('bytes', function() {
	return function(bytes, precision) {
		if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
		if (typeof precision === 'undefined') precision = 1;
		var units = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'],
		number = Math.floor(Math.log(bytes) / Math.log(1024));
		return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) + ' ' + units[number];
	}
});
