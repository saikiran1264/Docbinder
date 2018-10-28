'use strict'
var app = angular.module("DocBinder", ["ngRoute"]); 
//var API_URL = 'http://127.0.0.1:5000';
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      redirectTo: "/login"
    })
    .when("/dashboard", {
	      templateUrl : "views/Dashboard.html",
        controller : "DashboardCtrl"
    })
    .when("/admindashboard", {
      templateUrl : "views/Admindashboard.html",
      controller : "AdmindashboardCtrl"
    })  
    .when("/login", {
      templateUrl : "views/Login.html",
      controller : "LoginCtrl"
    })
    .when("/register", {
      templateUrl : "views/Register.html",
      controller : "LoginCtrl"
    })
    .otherwise({redirectTo: '/login'});
});