'use strict'

app.controller("AdmindashboardCtrl", function($scope,$http,$location,$window) {
  if(localStorage.username == "" || localStorage.username == undefined || localStorage.username == "undefined"){
    $location.path('/login');        
}
  function readableBytes(bytes) {
    var i = Math.floor(Math.log(bytes) / Math.log(1024)),
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + sizes[i];
  }
   
   
   $scope.username=localStorage.username;
   
  /**Logout */
   $scope.logout = function(){
     localStorage.username="";
     $location.path('/login');
   }
  /**Logout */

  /****
   * Delete a File
   */
   $scope.deletefile = function (index) {
    //Find the record using Index from Array.
      var filedetails = {
        filename : $scope.filedata[index].File_Name,
        username : $scope.filedata[index].Email_Id 
      };
       //console.log(filename);
      //Remove the item from Array using Index.
      $scope.filedata.splice(index, 1); 
      $http({
        method  : 'POST',
        url     : '/deletefile',
        data    :  filedetails,
        headers : {'Access-Control-Allow-Origin': true,
                   'Content-Type': 'application/json' },
        }).then (function success(response) {
            console.log(response.data);
                      },function failure(response){
            console.log(response.data);
            
      });
    
    };
  

  /**Delete a File */

   
    
  /**Retrieve File Details**/
   $http({
      method  : 'GET',
      url     : '/getallfiledetails',
      
      headers : {'Access-Control-Allow-Origin': true,
                 'Content-Type': 'application/json' }
      }).then (function success(response) {
          
          console.log(response.data);
          $scope.filedata = response.data;
        },function failure(response){
          console.log(response.data);
         
    });
	
/**Retrieve file details */

/**Download a file */
$scope.downloadfile = function (index) {
  //Find the record using Index from Array.
  var filedetails = {
      filename : $scope.filedata[index].File_Name,
      username  : $scope.filedata[index].Email_Id 
    };
  $http({
  method  : 'GET',
  url     : '/downloadfile',
  headers : {'Access-Control-Allow-Origin': true,
             'Content-Type': 'application/json' }
  }).then (function success(response) {
      
    //console.log(response.data[0].url);
    var url=response.data[0].url + '/' + filedetails.username + '/' + filedetails.filename;
    //console.log(url);
    $window.open ('http://'+url);
    
    },function failure(response){
    console.log(response.data);
  });
};
/**Download File */


});
   