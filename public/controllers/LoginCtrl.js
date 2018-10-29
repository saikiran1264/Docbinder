
'use strict'

app.controller("LoginCtrl", function($scope,$location,$http,$rootScope,$timeout) {

   
  /**Login Authentication */
  $scope.login = function(){
		
	  var userlogin = {
        uname : $scope.username,
        pswd  : $scope.password,
    };
    
      $http({
      method  : 'POST',
      url     : '/loginauthentication',
      data    :  userlogin,
      headers : {'Access-Control-Allow-Origin': true,
                 'Content-Type': 'application/json' },
      }).then (function success(response) {
          //console.log(response.data.data.Email);
          console.log(response.data.code);
          console.log(response.data);
            localStorage.username = $scope.username;
            localStorage.firstname = $scope.firstName;
          if (response.data.data[0].Email=='admin' && response.data.data[0].Password=='admin')
          {
              $location.path('/admindashboard');
          }
          
          else if (response.data.code==200)
          { 
            $location.path('/dashboard');
            
            //$rootScope.username=$scope.username;
            
          } else if (response.data.code==206)
            {
              console.log("hi");
              $scope.nomail=true;
              $location.path('/login');
            }
           else if (response.data.code==204){
            
              $scope.nomatch=true;
              $timeout(function() {
                $scope.nomatch = false;
              }, 2000);
 
            $location.path('/login');
            }
            
        },function failure(response){
          console.log(response.data);
          if (response.data.code==400){
              alert("Db connection error");
          }
         
    });
		//	  $rootScope.LoggedIn = true;
    //    $location.path('/dashboard');
	};
  /**Login Authentication */   
  
  /**Register */
  $scope.Register = function() {
    $scope.duplicate=false;
    $scope.successregistration=false;
    //console.log($scope.duplicate);
    var registration = {
      fName : $scope.firstName,
      lName : $scope.lastName,
      email : $scope.email,
      password : $scope.password,
    };
    //console.log(registration);
    $http({
    method  : 'POST',
    url     : '/registration',
    data    :  registration,
    headers : {'Access-Control-Allow-Origin': true,
               'Content-Type': 'application/JSON' },
    }).then (function success(response) {
        // $scope.message = response.data;
        console.log(response.data);
        $scope.successregistration = true;
        $timeout(function () {
          $scope.$apply(function() {
          $location.path('/login');});
        }, 1000);
        
        //console.log($scope.duplicate);
        },function failure(response){
        //console.log("hi");
        if (response.data=="ER_DUP_ENTRY"){
        $scope.duplicate=true;
        }
        console.log(response.data);
        //console.log($scope.duplicate);
    });
          
  };  
  
  /**Register */

/**google and facebook */

$scope.onGooglelogin = function(){
  //alert('clicked');
   var params = {
       'clientid': '820020195761-4c774rahuvtqpo10lflbpieth5vlbfut.apps.googleusercontent.com',
       'cookiepolicy': 'single_host_origin',
       'callback': function(result){  
           if(result['status']['signed_in']){
               var request = gapi.client.plus.people.get({
                   userId: 'me'
               });
               //console.log("hello");
               request.execute(function(resp){
                   //console.log("resp", resp);
                   //console.log("reached");
                   $scope.$apply(function() {

                        //$scope.username = resp.displayName;
                        //$scope.password = resp.displayName;
                        //$scope.email = resp.emails[0].value;

                       localStorage.username = resp.displayName;
                       localStorage.firstname =resp.displayName;

                        $location.path('/dashboard'); 
                   
                   }, 1000);
                        
                        
               });
               
           }
       },
       'approvalprompt': 'force',
       'scope':'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profiles.read',
   };    
   gapi.auth.signIn(params);
};   
   
   $scope.onFBlogin = function(){
       
       FB.login(function(response){
           if(response.authResponse){
               FB.api('/me', 'GET', {fields:'email, first_name, name, id'}, function(response){
                   //console.log("resp", response);
                   
                   $scope.$apply(function() {

                        $scope.username = response.name;
                        $scope.password = response.name;
                        $scope.email = response.email;

                       localStorage.username = response.name;
                       localStorage.firstname =response.name;
                        $location.path('/dashboard'); 
                   
                   }, 1000);
               });
           } else {
               //console.log('Login ctrl user not auth');
           }
       },{
           scope: 'email',
           return_scopes: true
       });
   }
/**google and facebook */
 });
