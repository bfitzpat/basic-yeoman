var Generator = require('yeoman-generator');
var exec = require('child_process').exec;
var path = require('path')

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);
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
      this.log('-------------------------------------------------------------------');
      this.log('                Camel WSDL to REST DSL Generator')
      this.log('-------------------------------------------------------------------');
    }
    
    prompting() {
        return this.prompt([{
          type    : 'input',
          name    : 'wsdl',
          message : 'URL to the input WSDL',
          store   : true
        }, {
          type    : 'input',
          name    : 'outdirectory',
          message : 'Name of the output directory for generated artifacts',
          default : 'output',
          store   : true
        }]).then((answers) => {
          this.log('wsdl url', answers.wsdl);
          
//          var cmdString = 'java -jar ./wsdl2rest/lib/wsdl2rest-impl.jar';
          var cmdString = 'java -jar ./wsdl2rest/lib/wsdl2rest-impl-0.7.0.fuse-000090.jar';
          cmdString = cmdString + ' --wsdl ' + answers.wsdl;

          var outPath = path.join(process.cwd(), answers.outdirectory);
          this.log('output path', outPath);
          cmdString = cmdString + ' --out ' + outPath ;

          this.log('calling: ' + cmdString);

          const wsdl2rest = exec(cmdString);
          wsdl2rest.stdout.on('data', function(data){
            console.log(`stdout: ${data}`);
          });
          wsdl2rest.stderr.on('data', function(data){
            console.log(`stderr: ${data}`);
          });
          wsdl2rest.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          });
        });
    }
  };
  