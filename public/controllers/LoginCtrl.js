
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
 });
