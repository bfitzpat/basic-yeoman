var yeoman = require('yeoman-generator');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');


module.exports = class extends yeoman {
    initializing() {
        files : {
            this.folders = glob.sync('**/*/', {cwd: path.join(__dirname, 'templates')});
            this.files = glob.sync('**/*', {cwd: path.join(__dirname, 'templates'), nodir: true});
        }
    }

    prompting() {
        this.log('      _                             _');
        this.log('     / \\     _ __     __ _    ___  | |__     ___');
        this.log('    / _ \\   | \'_ \\   / _` |  / __| | \'_ \\   / _ \\');
        this.log('   / ___ \\  | |_) | | (_| | | (__  | | | | |  __/');
        this.log('  /_/   \\_\\ | .__/   \\__,_|  \\___| |_| |_|  \\___|');
        this.log('            |_|');
    
        this.log('                           ____                              _');
        this.log('                          / ___|   __ _   _ __ ___     ___  | |');
        this.log('                         | |      / _` | | \'_ ` _ \\   / _ \\ | |');
        this.log('                         | |___  | (_| | | | | | | | |  __/ | |');
        this.log('                          \\____|  \\__,_| |_| |_| |_|  \\___| |_|');
        this.log('');
        var prompts = [{
                type    : 'input',
                name    : 'name',
                message : 'Your Camel project name',
                default : this.appname
            }, 
            {
                type    : 'input',
                name    : 'camelVersion',
                message : 'Your Camel version',
                default : '2.18.1.redhat-000021',
                store   : true
            },
            {
                type    : 'input',
                name    : 'camelDSL',
                message : 'DSL type',
                choices : ['blueprint', 'spring'],
                default : 'spring',
                store   : true
            }, {
                type: 'input',
                name: 'package',
                message: 'Package name: ',
                default: 'com.' + this.appname
            }];
            return this.prompt(prompts).then(function (props) {
                this.props = props;
                this.log('camel project name', props.name);
                this.log('camel version', props.camelVersion);
                this.log('camel DSL', props.camelDSL);
                this.log('package name', props.package);
            }.bind(this));
        }
        
        //writing logic here
        writing() {
            app: {
                var userProps = this.props;
                //userProps.options = this.options;
            
                var packageFolder = userProps.package.replace(/\./g, '/');
            
                var src = 'src/main/java';
            
                this.log('Creating folders');
            
                this.folders.forEach(function (folder) {
                    mkdirp.sync(folder.replace(/src\/main\/java/g, path.join(src, packageFolder)));
                });
            
                this.log('Copying files');
            
                for (var i = 0; i < this.files.length; i++) {
                    this.fs.copyTpl(
                        this.templatePath(this.files[i]),
                        this.destinationPath(this.files[i].replace(/src\/main\/java/g, path.join(src, packageFolder))),
                        {userProps: userProps}
                    );
                }
            
                this.log('Copying dot files');
                this.fs.copy(
                this.templatePath('.*'),
                this.destinationRoot()
            );
        }
    }

    //Install Dependencies
//    install: function() {
//        this.installDependencies();
//    }
     
};
