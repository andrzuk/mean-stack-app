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
	│   ├── app.css
	│   ├── bootstrap.min.css
	│   ├── font-awesome.min.css
	│   ├── loader.gif
	│   ├── logo.png
	│   └── favicon.png
	├── package.json
	├── server.js
	└── README.md

Demo: http://todos-my-mean-stack.193b.starter-ca-central-1.openshiftapps.com
