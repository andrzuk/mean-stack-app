## MEAN Stack Application running on OpenShift platform

### MongoDB + Express + Angular + NodeJS

Project directory structure:

	mean-stack-app
	├── openshift
	│   └── templates
	│       ├── nodejs.json
	│       ├── nodejs-mongodb.json
	│       └── nodejs-mongodb-persistent.json
	├── config
	│   └── db.js
	├── controllers
	│   ├── app.js
	│   ├── auth.js
	│   ├── messages.js
	│   ├── pages.js
	│   ├── todos.js
	│   └── users.js
	├── routes
	│   ├── token.js
	│   ├── auth.js
	│   ├── messages.js
	│   ├── pages.js
	│   ├── todos.js
	│   └── users.js
	├── templates
	│   ├── auth.html
	│   ├── home.html
	│   ├── contact.html
	│   ├── manual.html
	│   ├── messages.html
	│   ├── pages.html
	│   ├── todos.html
	│   └── users.html
	├── public
	│   ├── fonts
	│   │   └── (...)
	│   ├── img
	│   │   └── (...)
	│   ├── index.html
	│   ├── angular.min.js
	│   ├── angular-sanitize.js
	│   ├── bootstrap.bundle.min.js
	│   ├── jquery.min.js
	│   ├── custom.js
	│   ├── app.css
	│   ├── bootstrap.min.css
	│   ├── font-awesome.min.css
	│   ├── loader.gif
	│   ├── logo.png
	│   └── favicon.png
	├── package.json
	├── server.js
	└── README.md

Demo: 
    Mirror 1: http://todos-mean-stack-auth-app.193b.starter-ca-central-1.openshiftapps.com
    Mirror 2: http://mean-stack-todo-auth-app.7e14.starter-us-west-2.openshiftapps.com
