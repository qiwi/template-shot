# template-shot
A simple library which can render the html template

## Installation

This module is installed via npm (comming soon):

```
npm install --save template-shot
```

## Examples

This example renders the sample template [index.html](examples/templates/index.html) into [example1.png](examples/example1.png)
```
const {TemplateShot} = require( '../build/index');

const templatePath = __dirname + '/examples/templates';
console.log('looking for templates in:\n' + templatePath);

const ts = new TemplateShot(templatePath);

console.log('rendering template index.html to example1.png');
ts.renderFile('index.html', {}, 'example1.png');
```
run this script from the root folder of the project

See [examples](examples) folder for more examples

## Contributing

### To set up your development environment:

1. clone the repo to your desktop,
2. in the shell `cd` to the main folder,
3. hit `npm install`

### To build the project (including the tests):
    `npm run build`
### To watch the files for changes and rebuild if necessary:
    `npm run wath`
### To run tests:
    `npm run test`
### To run linter:
    `npm run lint`