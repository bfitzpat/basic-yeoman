'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var basicProps = {};

describe('generator-camel:app', function () {

  before(function () {
    basicProps.name = 'MyAppMock';
    basicProps.package = 'com.generator.mock';
    basicProps.camelVersion = '2.18.2'
    basicProps.camelDSL = 'spring'
  });

  describe('Should properly scaffold with default config', function () {

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .withPrompts({ name: basicProps.name })
        .withPrompts({ camelVersion: basicProps.camelVersion })
        .withPrompts({ release: basicProps.camelDSL })
        .withPrompts({ package: basicProps.package })
        .toPromise();
    });

    it('Should create the basic structure', function () {
      assert.file([
        '.gitignore',
        'pom.xml',
        'README.md',
        'src/main/resources/META-INF/spring/camel-context.xml',
      ]);
    });

    it('Should create pom.xml with default content', function () {
      assert.fileContent('pom.xml', new RegExp('<groupId>' + basicProps.package + '</groupId>') );
      assert.fileContent('pom.xml', new RegExp('<artifactId>' + basicProps.name + '</artifactId>') );
    });
  });
});