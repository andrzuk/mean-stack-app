var app = angular.module('mainApp', ['authModule', 'pagesModule', 'usersModule', 'messagesModule', 'imagesModule', 'settingsModule', 'visitorsModule', 'backupModule', 'todosModule', 'ngSanitize'])

.controller('mainController', ['$rootScope', '$scope', '$http', '$document', '$sce', function ($rootScope, $scope, $http, $document, $sce) {

    $scope.layout = {
        home: '../templates/home',
        manual: '../templates/manual',
        contact: '../templates/contact',
        auth: '../templates/auth',
        pages: '../templates/pages',
        users: '../templates/users',
        messages: '../templates/messages',
        images: '../templates/images',
        settings: '../templates/settings',
        visitors: '../templates/visitors',
        backup: '../templates/backup',
        todos: '../templates/todos',
    };
    
    $rootScope.currentUser = {};
    $rootScope.currentIp = null;
    $rootScope.settings = {};
    
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
        $scope.getSettings();
        $scope.registerVisitor('init');
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
        $scope.pageData.description = null;
        $http.get('/page/' + index).then(function(response) {
            $scope.pageData = response.data;
            $scope.pageData.description = $sce.trustAsHtml($scope.pageData.description);
            $scope.status = 'ready';
        });
        $scope.registerVisitor('page/' + index);
    };
    
    $scope.getSettings = function () {
        const settingKeys = [
            'header_enabled', 'header_content', 'footer_enabled', 'footer_content', 'general_styles', 'general_scripts', 'messages_timeout'
        ];
        $.each(settingKeys, function(index, settingKey) {
            $http.get('/setting/' + settingKey).then(function(response) {
                $rootScope.settings[settingKey] = response.data;
                $scope.pageData[settingKey] = $sce.trustAsHtml($rootScope.settings[settingKey].value);
                if (settingKey == 'messages_timeout') {
                    $rootScope.settings[settingKey] = $rootScope.settings[settingKey] ? parseInt($rootScope.settings[settingKey].value) : 3000;
                }
            });
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
        $scope.registerVisitor('admin-panel');
    };

    $scope.getAppPages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'pages';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-pages').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('pages');
    };

    $scope.getAppUsers = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'users';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-users').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('users');
    };

    $scope.getAppMessages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'messages';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-messages').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('messages');
    };

    $scope.getAppImages = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'images';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-images').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('images');
    };

    $scope.getAppSettings = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'settings';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-settings').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('settings');
    };

    $scope.getAppVisitors = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'visitors';
                $rootScope.action = 'list';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-visitors').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('visitors');
    };

    $scope.getAppBackup = function() {
        $scope.isUserLoggedIn(function(result) {
            if (result) {
                $rootScope.module = 'backup';
                $rootScope.action = 'view';
                $scope.status = null;
                setTimeout(function() {
                    $('button#get-backup').click();
                }, 500);
            }
            else {
                $scope.getLogin();
            }
        });
        $scope.registerVisitor('backup');
    };

    $scope.getAppTodos = function() {
        $rootScope.module = 'todos';
        $rootScope.action = 'list';
        $scope.status = null;
        $scope.registerVisitor('todos');
    };
    
    $scope.sendMessage = function () {
        /*
        $scope.formData.ip = $rootScope.currentIp;
        $http.post('/messages', $scope.formData).then(function () {
            $scope.formData = {};
            $scope.getContact();
            $scope.message = 'Wiadomość została wysłana pomyślnie.';
            $scope.status = 'info';
            $('div.alert').fadeIn();
            setTimeout(function() {
                $scope.message = null;
                $scope.status = null;
                $('div.alert').fadeOut();
            }, $rootScope.settings['messages_timeout']);
        });
        $scope.registerVisitor('send-message');
        */
        $http.post('/messages', $scope.formData).then(function () {
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
    
    $scope.registerVisitor = function(hash) {
        document.location.hash = '#!#' + hash;
        var details = {
            ip: $rootScope.currentIp,
            referer: $document.getReferer(),
            url: '/' + hash,
        };
        $http.post('/visitor', details, null).then(function() {});
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

app.config(function($provide) {
    $provide.decorator('$document', ['$delegate', function ($delegate) {
        $delegate.getReferer = function() { 
            return document.referrer; 
        };
        return $delegate; 
    }]);
});
