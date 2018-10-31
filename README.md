# Docbinder  
 

### Introduction  


**Project     :** Docbinder  
**University  :** https://www.sjsu.edu  
**Course      :** Cloud Technologies  
**Professor   :** [Sanjay Garje](https://www.linkedin.com/in/sanjaygarje/)  
**ISA         :** [Anushri Srinath Aithal](https://www.linkedin.com/in/anushri-aithal/)  
**Student     :** Saikiran Pothana 
  
  
### About Docbinder  

Docbinder is a 3-tier webapplication which uses various AWS services to develop and host it on cloud for users to access.Docbinder is mainly used to store , retrieve and delete files for registered users into the application. This application provides two roles, User role and Admin role. Users who got authenticated to this application can perform Upload,Download,Edit and Delete their files.Additionally Docbinder provides SSO authentication for users who can login to application using their google and facebook accounts. Admin role can downlaod and delete the files that are uploaded by users.  
  
Docbinder uses AWS services such as `S3` which is used to stored files,`Elastic Bean Stalk` for environment creation for development,staging,testing and production and to deploy application onto `EC2` instances, `RDS` as database for data storing and retrieving, `Code Pipeline` for CI/CD. `Cloud Watch` is used to monitor EC2 instances,RDS and capture the logs.`Lambda` function is used to monitor about the files that got deleted from S3 bucket and with the help of `SNS`, it will notifies to admin about it.  
  
  
### Functional Components 
  
**1) Registration:** Users can register into application to gain access into this application.  
**2) Login:** Users can authenticate and login after successful registration.  
**3) Login using Google and Facebook:** Users can login into this application using their google and facebook accounts.  
**4) File upload:** Users can upload files upto 10MB maximum into their account.  
**5) File delete:** Users can delete their files if they don't need to store.  
**6) File Edit:** Users can edit if they need to change their file details provided that they need to upload again with same file name. **7) Logout:** Users can logout from application once their activity is completed.  
 
    
### Flow Diagram  
##### User Flow  
![docbinder-user](https://user-images.githubusercontent.com/42726386/47758225-4b6d5a00-dc67-11e8-95b2-ae889272b2c0.png)  
##### Admin Flow  
![image](https://user-images.githubusercontent.com/42726386/47758547-b53a3380-dc68-11e8-85fa-c45971167a86.png)
  


  
### AWS services leveraged in application 
  
*1) S3 :* i) It is used to store and maintain files using S3 versioning policy. ii) S3 Transfer Acceleration is used to enable fast and secure transfer of files to and from bucket.iii) Enabled Cross region replication for Disaster Recovery of S3 bucket.iv) Configured life cycle policy for s3 bucket so that after 75 days, objects will be moved from S3 to S3 standard IA and after 365 days, objects will be moved to Glacier and after 730 days, objects will be deleted.  
*2) CloudFront :* CloudFront is configured on S3 bucket so that content will be delivered with low latency and high data transfer rates  by serving requests using a network of edge locations particularly downloading files from application for the users that are accessing from other regions.  
*3) Elastic Bean Stalk :* Created Development and Production environments to deploy application on EC2 instances and enabled classic load balancers which will create EC2 instances and configured environmental variables that are used in application.  
*4) EC2 :* Launched EC2 instances automatically which is configured by EBS load balancers. Acts as a webserver for application. Configured build tool on one of my EC2 instance.  
*5) Elastic Load Balancer :* Distributed loads on EC2 instances during high volume of users launching application and interlinks with auto scaling groups to enable or disable EC2 instance.Enabled cloud watch alarm on CPU utilization of EC2 instances.  
*6) Auto Scaling Groups :* It is configured in ELB to a minimum of 2 and maximum of 3 EC2 instances to withhold server capacity during high peak hours of application usage. It is enabled to achieve for high availability and scalability of application.  
*7) Cloud Watch:* It is used to monitor logs and activities that was configured on S3 whenever file gets deleted and on EC2 instances whenever health is degraded.  
*8) CLoud Watch Alarms:* It is used to send SNS to admin whenever EC2,RDS instances CPU utilization is greater than 75%.  
*9) SNS :* Configured on RDS instance to send notications to admin through mail when CPU utilization is greater than 75%.  
*10) R53 :* Domain Name Server which is used to resolve IP address of my application.  
*11) RDS:* Database which is used to store user details and file details.  
*12) Lambda:* Lambda function is created on S3 bucket to send SNS when there is deletion of all uploaded files. Cloud watch will log these activities when activity got triggered.  
*13) Iam:* Iam User has created with Iam roles to get full access to S3,Cloud Watch and Lambda to a particular admin group for secure accessing of application details.  
*14) Codepipeline:* It is configured for Continuous Integration and Continuous Deployement of my application considering source from Github, generating build from Jenkins configured in EC2 instance and deployed on Elastic Bean Stalk.  

### Architectural Diagram using AWS Components  
![image](https://user-images.githubusercontent.com/42726386/47775730-c194af80-dcad-11e8-8224-910b8af25721.png)  

### Application Screenprints  
##### Login Page  
![image](https://user-images.githubusercontent.com/42726386/47756135-27594b00-dc5e-11e8-8f99-7a2014ce15b7.png)  
##### Register Page  
![image](https://user-images.githubusercontent.com/42726386/47756510-9f744080-dc5f-11e8-94ba-5487dfa0167c.png)
##### Dashboard Page  
![image](https://user-images.githubusercontent.com/42726386/47756264-a189cf80-dc5e-11e8-9d87-cf20b0b74f8d.png)  
##### Admin Page  
![image](https://user-images.githubusercontent.com/42726386/47756393-1c52ea80-dc5f-11e8-94a5-ede67763da71.png)  




