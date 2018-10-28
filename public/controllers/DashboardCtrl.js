'use strict'

app.controller("DashboardCtrl", function($scope,$http,$location,$window) {
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
        username  : localStorage.username 
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
      url     : '/getfiledetails',
      params  : {username:localStorage.username},
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
      username  : localStorage.username 
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

/**Editing a File */
$scope.editfile = function (index) {
  //Find the record using Index from Array.
  var filedetails = {
      filename : $scope.filedata[index].File_Name,
      username  : localStorage.username 
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

/**Editing a File */


/**File Upload */

  $scope.upload=function(){

    var x = document.getElementById("myFile");
    var file = x.files[0];
    //console.log(file);
    var description = $scope.desc;
    var filesize= readableBytes(file.size);
     
    var filecreateddate = new Date().toJSON().slice(0, 19).replace('T', ' ');
    var fileupdateddate = new Date().toJSON().slice(0, 19).replace('T', ' ');
    var username = localStorage.username;
    var formData = new FormData(); 
    formData.append("fileName", file);
    formData.append("Desc",description);
    formData.append("FCreatedDate",filecreateddate);
    formData.append("FUpdatedDate",fileupdateddate);
    formData.append("FileSize",filesize);
    formData.append("UserName",username);
    
   // console.log(filecreateddate);
   
   // console.log(username);
   // console.log(formData);
   $http({
    method  : 'POST',
    url     : '/fileupload',
    data    :  formData,
    headers : {'Access-Control-Allow-Origin': true,
               'Content-Type': undefined },
    }).then (function success(response) {
        console.log(response.data);
        
        $scope.filedata = response.data;
          console.log($scope.filedata); 
      
        },function failure(response){
          console.log(response.data); 
        
          
          
    });
         
  };
/**File Upload */

});
   