var gulp = require('gulp');
var serve=require('gulp-serve');
var nbServer=require('nb-json-db');

//Setting up directory where json files to be saved 
nbServer.rootPath = __dirname;
 
//folder name under the rootPath where json files saved 
nbServer.dBFolderName = "data";
 
//provide allowOrigin to allow requests from specific domain. 
nbServer.allowOrigin = "http://localhost:3000";
 
//server runs on mentioned port 
nbServer.dBPort = 5654;

//table 'users' is meant for providing authentication to application 
nbServer.ModelHash["users"] = function (obj, isNew, isUpdate, options) {
    this.Id = obj["Id"] || nbServer.guid();
    this.Username = obj["Username"];
    this.Password = obj["Password"];
   	this.Dob =obj["Dob"];
   	this.Location=obj["Location"];

    if(isNew){
        this._createdTime = new Date().getTime();
    }else{
        this._createdTime = obj["_createdTime"];
    }
 
    if(isUpdate){
        this._updatedTime = new Date().getTime();
    }else{
        this._updatedTime = obj["_updatedTime"];
    }
};

nbServer.IsDevelopment = true;
//Root username and passowrd for DB 
//details will not save under application data. 
nbServer.RootUserName = "nipuna";
nbServer.RootPassword = "nipuna";

gulp.task('api',function(){
	// Will start server on '5654' port as mentioned earlier and create json files if it running on first time 
nbServer.init();
})
gulp.task('default',function(){
	console.log('socialmedia working');
});
gulp.task('serve',serve('app'));

