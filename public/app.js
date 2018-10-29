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

//Google Login
function onLoadFunction(){
  gapi.client.setApiKey('AIzaSyAcdiLuzqZ9oEvEYNypT4rpsvFAgwV2g_Q');
  gapi.client.load('plus', 'v1', function(){  
      //console.log('plus loaded!');
  });
}

//Facebook Login
window.fbAsyncInit = function() {
  FB.init({
    appId            : '540226736427641',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.2',
    status           : true    
  });
    
FB.getLoginStatus(function(response){
        if(response.status === 'connected'){
          // console.log('User connected to FB');
        } else if(response.status ==='not_authorized'){
            console.log('User not auth');
        } else {
            console.log('User not logged in to FB');
        }
    });
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));