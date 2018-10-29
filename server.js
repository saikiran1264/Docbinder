'use strict'
/*require modules*/
var express = require('express');
var mysql   = require('mysql');
var cors    = require('cors');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var fs =  require('fs');
var fileUpload = require('express-fileupload');
var formidable = require('formidable');
var config = require('./config/database');

/*Express Framework*/
var app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

/*Global Variables*/
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
    region: process.env.AWS_REGION || ''
});
var myBucket = 'docbinder';
var s3 = new AWS.S3();
var port= process.env.PORT || 8080;
var db = config.database;
//console.log(db);
var connection = mysql.createConnection({
	host		: db.host,
	database	: db.name,
	user		: db.user,
	password	: db.password,
	});
connection.connect(function(error) {
    if (error) {
        console.error('Error connecting: ' + error.stack);
        //throw error;
    }

});

/** File Download*/
app.get('/downloadfile',function(request,response){
   
    var sql = 'select * from test';
    connection.query(sql, function (error, results,fields) {
    if (error)
    {
        response.status(400).send('Error in database operation');
        console.log(error);
        
    }  else 
        response.send(results);    
        console.log(results);
  });
 
}); 

/** File Download*/

/**Data into bucket */


 /* File Details */

 app.get('/getfiledetails',function(request,response){
   
    
    var username= request.query.username;
    //console.log(username);
    var sql = 'select * from File_Details where Email_Id = ?';
    connection.query(sql,[username], function (error, results,fields) {
    if (error)
    {
        response.status(400).send('Error in database operation');
        console.log(error);
        
    }  else 
        response.send(results);    
        //console.log(results);
  });
 
}); 

/**File Details */

/**Get All File Details - Admin */
app.get('/getallfiledetails',function(request,response){
   
    var sql = 'select * from File_Details';
    connection.query(sql, function (error, results,fields) {
    if (error)
    {
        response.status(400).send('Error in database operation');
        console.log(error);
        
    }  else 
        response.send(results);    
        //console.log(results);
  });
 
}); 

/**Get All File Details - Admin */

/**Registration */

app.post('/registration',function(request,response){
        console.log(request.body);
      
        var lastname = request.body.lName;
        var firstname = request.body.fName;
        var email = request.body.email;
        var password = request.body.password;

    var sql = 'Insert into Customers_Register (Last_Name,First_Name,Email,Password) values (?,?,?,?)';
    connection.query(sql, [lastname , firstname, email, password], function (error, results) {
    if (error)
    {
        response.status(400).send(error.code);
        console.log(error.code);
       
    }  else 
        response.send({"code":200,"success":"User registration successfully"});    
        console.log(results);
    });
});

/**Login Authentication */

app.post('/loginauthentication',function(request,response){
    response.header("Access-Control-Allow-Origin", "*");
    console.log(request.body.uname);
    var username = request.body.uname;
    var password = request.body.pswd;
    var sql = 'select * from Customers_Register where Email = ?';
    connection.query(sql, [username], function (error, results,fields) {
    if (error)
    {
        response.send({"code" :400 ,"failed":"DB connection error"});
        console.log(error);
        
    }  else 
        //response.send(results);
        //console.log(hello);  
        console.log(results);
        if(results.length>0)
        { 
            if (results[0].Password==password){
            response.send({"code" :200 ,"Success":"Logged in successfully","data":results});    
          } else { response.send({"code" :204 ,"Success":"Email and Password doesnot match","data":results}); }
        } else {response.send({"code" :206 ,"Success":"Email doesn't exist","data":results});}
        
   });
});

/**Login Authentication */

/**File Upload */
app.post('/fileupload',function(request,response){
    
        var filename = request.files.fileName.name;
        var filedesc = request.body.Desc;
        var filesize = request.body.FileSize;
        var filecreatedtime = request.body.FCreatedDate;
        var fileupdatedtime = request.body.FUpdatedDate;
        var username = request.body.UserName;
        var data = request.files.fileName.data;
        var editsql = 'select * from File_Details test where Email_Id = ? and File_Name = ?';
        connection.query(editsql,[username,filename], function (error, results,fields) {
            if (error)
            {
                response.send(error);
                console.log(error);
     
            }  
            else 
            {
                if(results.length>0)
                {
                    if (results[0].File_Name==filename)
                    {
                        var updatesql = 'update File_Details set File_Description=?,File_Size=?,File_Updated_Time=? where Email_Id =? and File_Name=?';
                        connection.query(updatesql,[filedesc,filesize,fileupdatedtime,username,filename], function (error, results,rows,fields) {
                            if (error){response.send(error)}
                            else 
                            {
                                
                            //bucketinsert();
                                var myKey = username + '/' + filename;
                
                                var params = {
                                    Bucket: myBucket,
                                    Key: myKey, 
                                    Body: data,
                                };
                                s3.putObject(params, function(error, data){    
                                    if (error) 
                                    {
                                    console.log(error.message)
                                    } else 
                                    {
                                    console.log("Successfully updated data to myBucket/myKey");
                                    }
                                });
                            //bucket insert

                                var sql1 = 'select * from File_Details where Email_Id = ?';
                                connection.query(sql1,[username], function (error, results,fields) {
                                    if (error)
                                    {
                                        response.send(error);
                                        console.log(error);
                                    }       
                                    else 
                                    {
                                        response.send(results);
                                    //bucketinsert();
                                        
                                    //bucket insert    
                                    }
                                });
                            }
                        });
                    }
                }
                else
                {
                    var sql = 'Insert into File_Details (File_Name,File_Description,File_Size,File_Created_Time,File_Updated_Time,Email_Id) values (?,?,?,?,?,?)';
                    connection.query(sql, [filename , filedesc, filesize, filecreatedtime, fileupdatedtime, username], function (error, results) {
                        if (error)
                        {
                            response.send(error);
                            console.log(error);
               
                        }  
                        else 
                        {
                            var sql1 = 'select * from File_Details where Email_Id = ?';
                            connection.query(sql1,[username], function (error, results,fields) {
                                if (error)
                                {
                                    response.send(error);
                                    console.log(error);
                                }       
                                else 
                                {
                                    response.send(results);
                                //bucketinsert();
                                    var myKey = username + '/' + filename;
                
                                    var params = {
                                        Bucket: myBucket,
                                        Key: myKey, 
                                        Body: data,
                                    };
                                    s3.putObject(params, function(error, data){    
                                        if (error) 
                                        {
                                        console.log(error.message)
                                        } else 
                                        {
                                        console.log("Successfully inserted data to myBucket/myKey");
                                        }
                                    });
                                //bucket insert    
                                }
                            });
                        } 
                    }); 
                }          
            }
        }); 
});
 /**FIle Upload */

 /**File Delete */
app.post('/deletefile',function(request,response){
    console.log(request.body);
          
    var filename = request.body.filename;
    var username = request.body.username;
    var sql = 'DELETE FROM File_Details WHERE File_Name = ? and Email_Id = ?';
    connection.query(sql, [filename,username], function (error, results) {
        if (error)
        {
            response.status(400).send(error.code);
            console.log(error.code);
        }  
        else 
            response.send({"code":200,"success":"Deleted Successfully"});    
            console.log(results);
        
             /**Deletion in Bucket */
            var myKey = username + '/' + filename;
                
            var params = {
                Bucket: myBucket,
                Key: myKey, 
                };
            s3.deleteObject(params, function(error, data) {    
                if (error) 
                {
                    console.log(error.message)
                } 
                else 
                {   
                    console.log("Successfully Deleted data from myBucket/myKey");
                }
            });

/**Deletion in Bucket */
    });
            
});   
               
  /**File Delete */      


var server=app.listen(port,function(){
 
    console.log('Express server is listening on port '+ port);
    //console.log(process.env);
});

