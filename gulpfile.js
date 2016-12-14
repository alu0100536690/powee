/*
* Dependencias
*/
var gulp = require('gulp');
var shell = require('gulp-shell');
var install = require('gulp-install');
var path = require('path');
var json = require(path.join(__dirname,'package.json'));
var git = require('simple-git');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var ssh_exec = require('ssh-exec');
var client = require('scp2');
var Curl = require('node-libcurl').Curl;
var curl = new Curl();

//var hero = require("gitbook-start-heroku-merquililycony");

gulp.task('push', function(){

    if (!fs.existsSync(path.join(__dirname, '.git'))){
      git()
        .init()
        .add('./*')
        .commit("first commit")
        .addRemote('origin', json.repository.url)
        .push('origin', 'master');
    }
    else
    {
       git()
        .add('./*')
        .commit("Actualizando Gitbook.")
        .push('origin', 'master');
    }
});

///gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'
    ]))
});
gulp.task('deploy', function () {
  return gulp.src('')
      .pipe(shell(['./generar-permisos']))
      .pipe(shell(['./scripts/losh generate-gitbook']))
      .pipe(shell(['./scripts/losh deploy-gitbook']))

});

gulp.task('default', ['deploy']);


//generar pdf
gulp.task('pdf',shell.task("gitbook pdf ./txt",{ verbose: true }));



gulp.task('deploy-ull-iaas-es',function(){
    var iaas = require ("gitbook-start-iaas-ull-es-merquililycony");
    iaas.deploy();
});

gulp.task('crear-repo', function() {

  var hero = require("gitbook-start-digitalocean-merquililycony");
});

gulp.task('auth', function() {

  var hero = require("gitbook-start-heroku-merquililycony");
});

gulp.task('deploy-heroku', function(){
  var json_heroku = require(path.join(__dirname,'.gitbook-start/config_heroku.json'));
  var name_app = json_heroku.name;
   return gulp.src('').pipe(shell([
       'heroku git:remote -a '+name_app+';'+
       'git add . ;'+
       'git commit -am "Desplegando en Heroku" ;'+
       'git push heroku master'
       ]))
});


gulp.task('deploy-digitalocean',function(){

    client.scp('gh-pages/', 'root:esperanza2016@178.62.30.50:/home/src/sytw/gh-pages', function(err) {});
    client.scp('app.js', 'root:esperanza2016@178.62.30.50:/home/src/sytw/', function(err) {});
  //  client.scp('package.json', 'root:esperanza2016@178.62.30.50:/home/src/sytw/', function(err) {});
    ssh_exec('cd /home/src/sytw/; npm install express; npm install express-ejs-layouts; node app.js', 'root@178.62.30.50').pipe(process.stdout);


});
