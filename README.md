## Library Web App

This project allow to easily manage a library. 

## Installation
####1. Clone this project or Download that ZIP file

```sh
$ git clone https://github.com/frazzaglia/palocsWebApp.git
```

####2.  Make sure you have [bower](http://bower.io/), [grunt-cli](https://www.npmjs.com/package/grunt-cli) and  [npm](https://www.npmjs.org/) installed globally
 
 
```sh
$ sudo apt-get install npm
$ sudo npm install -g grunt-cli
$ sudo npm install -g bower
```
####3. On the command prompt run the following commands

```sh
$ cd `project-directory`
```
- bower install is ran from the postinstall
```sh
$ npm install 
```
- a shortcut for `grunt serve`
```sh
$ npm start
```
- a shortcut for `grunt serve:dist` to minify the files for deployment
```sh
$ npm run dist 
```

### Automation tools

- [Grunt](http://gruntjs.com/)
