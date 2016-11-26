const inquirer = require('inquirer-directory');

function required(name) {

  return (value) => {
    if (!value) {
      return `${name} is required`;
    }

    return true;
  }
}

module.exports = (plop) => {

  plop.addPrompt('directory', inquirer);

  plop.setGenerator('component', {
    description: 'Create a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is name of new component?',
        validate: required('name'),
      },
      {
        type: 'confirm',
        name: 'needPath',
        message: 'Should I place new component in components directory, or it should be placed somewhere else?',
        default: false,
      },
      {
        type: 'directory',
        name: 'path',
        message: 'Where to put new component?',
        basePath: './client/app',
        default: '',
        when: (answers) => answers.needPath,
      }
    ],
    actions: () => {
      plop.addPartial('path', '{{#if path}}{{ path }}/{{else}}components/{{/if}}{{ dashCase name }}');
      plop.addPartial('fullPath', './client/app/{{> path}}');

      return [
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.js',
          templateFile: './templates/component/component.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.component.js',
          templateFile: './templates/component/component.component.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.html',
          templateFile: './templates/component/component.html',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.controller.js',
          templateFile: './templates/component/component.controller.js',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.scss',
          templateFile: './templates/component/component.scss',
          abortOnFail: true,
        },
        {
          type: 'add',
          path: '{{> fullPath}}/{{dashCase name}}.spec.js',
          templateFile: './templates/component/component.spec.js',
          abortOnFail: true,
        },
      ]
    }
  });
};
