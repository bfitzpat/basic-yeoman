# Yeoman Generator for wsdl2rest

The wsdl2rest Yeoman Generator demonstrates the use of the wsdl2rest utility in a framework that is cross-ide (VSCode, IntelliJ with plug-in, and Eclipse Che).

NOTE THAT THIS CODE IS SUBJECT TO CHANGE RAPIDLY AND IS VERY MUCH A WORK IN PROGRESS.

## Get the code

The easiest way to get started with the code is to [create your own fork](http://help.github.com/forking/) at github, and then clone your fork:

    git clone git@github.com:<you>/basic-yeoman.git
    cd basic-yeoman/generator-wsdl2rest
    git remote add upstream https://github.com/bfitzpat/basic-yeoman

## Building the Generator

NOTE: Currently the Maven pom.xml isn't doing what we need it to, so we have a workaround to grab the wsdl2rest files we need.

* copy this zip file and unzip locally http://origin-repository.jboss.org/nexus/content/groups/ea/org/jboss/fuse/wsdl2rest/wsdl2rest-dist/0.7.0.fuse-000090/wsdl2rest-dist-0.7.0.fuse-000090.zip 
* copy the lib folder from the unzipped folder into a new folder in the generator structure: generator-wsdl2rest/wsdl2rest/lib

Once the files are there, make sure you are in the generator-wsdl2rest folder:

* type: npm link
* type: yo wsdl2rest
* follow prompts
    for URL to input WSDL - it can be remote or local with a file:/ URL
    for Name of the output directory for generated artifacts - type a folder name - right now it's just added to the folder where you currently are

If all goes well, you should have a generated Camel XML DSL configuration file (Spring DSL) with REST DSL elements and generated wrapper code for the WSDL you pointed to. 
