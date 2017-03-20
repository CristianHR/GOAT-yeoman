var generators = require('yeoman-generator'),
	  _          = require('lodash'),
    del        = require('del');

module.exports = generators.Base.extend({
  // note: arguments and options should be defined in the constructor.
  constructor: function () {
  	// The root of the yeoman project
  	base = '../../../';

    generators.Base.apply(this, arguments);
    // // This makes `appname` not a required argument.
    this.argument('componentname', { type: String, required: false });
  },
  prompting: function () {
    return this.prompt([{
      type    : 'input',
      name    : 'componentname',
      message : 'Your new component\'s name?',
      default: this.componentname
    }]).then(function (answers) {

      // Delete the existing app.modules for retemplating
      del(['app/app.module.ts']);

      // Process to get naming convention camelcase and capitalized camelcase
      var tmp = _.camelCase(answers.componentname);
      this.componentname = tmp.charAt(0).toUpperCase() + tmp.slice(1);
      this.namelower = _.camelCase(this.componentname);
      this.fname = _.kebabCase(this.componentname);

      // update the yo config file with new component
      var config = this.config.getAll();
      config.newComponents.push(this.componentname + 'Component');
      config.newComponentImports.push(
        "import { "+ this.componentname +"Component } from './components/"+ this.fname +"/"+ this.fname +".component';");

      this.config.set(config);
      this.config.save();

    }.bind(this));
  },
  editModule: function() { 
    // Get the new values for newComponents and newComponentImports
    this.newComponents = this.config.get('newComponents');
    this.newComponentImports = this.config.get('newComponentImports');

    // Get the app.module template and inject newComponents and newComponentImports
    var templatePath = this.templatePath(base + 'templates/demo-app/app/app.module.ts'),
        config = this.config.getAll();
    if(config.apptype === 'starter-app') {
      templatePath = this.templatePath(base + 'templates/starter-app/app/app.module.ts')
    }
      this.fs.copyTpl(
        templatePath,
        this.destinationPath('app/app.module.ts'),
        { 
          fname: this.fname,
          newComponents: this.newComponents,
          newComponentImports: this.newComponentImports
        }
      );
  },
  // Writes the application to the name of the project
  writing: function () {
    // Clone the template component.ts file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.ts'),
      this.destinationPath('app/components/' + this.fname + '/' + this.fname + '.component.ts'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.html file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.html'),
      this.destinationPath('app/components/' + this.fname + '/' + this.fname + '.component.html'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
    // Clone the template component.scss file
    this.fs.copyTpl(
      this.templatePath(base + 'templates/component/template.component.scss'),
      this.destinationPath('app/components/' + this.fname + '/' + this.fname + '.component.scss'),
      { 
        fname: this.fname,
        namelower: this.namelower,
        componentname: this.componentname
      }
    );
  }
});