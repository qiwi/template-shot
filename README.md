# template-shot
![](https://travis-ci.org/qiwi/template-shot.svg?branch=master)


A simple library which can render the html template to a png image.

## Installation

This module is installed via npm:

```
npm install --save template-shot
```

## Notice
renderOptions (where needed) are the same as [webshot](https://www.npmjs.com/package/webshot)'s

## Available methods
* constructor
`TemplateShot(templateDir: string = './', useCache: boolean = false)`Constructor of the base class.
    * `templateDir: string` is the path to your templates
    * `useCache: boolean` if set to true, the loaded templates are being cached
* TemplateShot.renderFile
    ```typescript
        TemplateShot.renderFile(
            template: string,
            templateValues: ITemplateValues = {},
            fname: string,
            options: any = PictureGenerator.DEFAULT_OPTIONS 
        ): Promise<void>
    ```
    Renders the template to a file.
    * `template: string` path to your template
    * `templateValues: ITemplateValues` object, wich properties will be pasted to the template
    * `fname: string` path to save the rendered image
    * `options: any` renderOptions (where needed) are the same as [webshot](https://www.npmjs.com/package/webshot)'s
* TemplateShot.renderStream
    ```typescript
    TemplateShot.renderStream(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Stream
    ```
    Renders the template to a stream.
    * `template: string` path to your template
    * `templateValues: ITemplateValues` object, wich properties will be pasted to the template
    * `options: any` renderOptions (where needed) are the same as [webshot](https://www.npmjs.com/package/webshot)'s
* TemplateShot.renderString
    ```typescript
    TemplateShotrenderString(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Promise<string>
    ```
    Renders the template to a string.
    * `template: string` path to your template
    * `templateValues: ITemplateValues` object, wich properties will be pasted to the template
    * `options: any` renderOptions (where needed) are the same as [webshot](https://www.npmjs.com/package/webshot)'s

## Examples

This example renders the sample template [index.html](examples/templates/index.html) into [example1.png](examples/example1.png). Notice, that {paragraph_text} is replaced with `Test text` in the rendered image.
```javascript
const {TemplateShot} = require( 'template-shot');

const templatePath = 'path/to/your/template/folder';
console.log('looking for templates in:\n' + templatePath);

const ts = new TemplateShot(templatePath);
const templateName = 'index.html';
const renderOptions = {   // these are webshot options
            screenSize: {
                width: 540,
                height: 900
            },
            shotSize: {
                width: 'all',
                height: 'all'
            }
        };

console.log('rendering template ' + templateName + ' from ' + templatePath + ' to example1.png');
ts.renderFile(templateName, {'paragraph_text' : 'Test text'}, 'example1.png', renderOptions);
```
### Rendered image
![rendered image](examples/example1.png)

See [examples](examples) folder for more examples.

TODO: add template examples

## Contributing

### To set up your development environment:

1. Clone the repo to your desktop,
2. In the shell `cd` to the main folder,
3. Hit `npm install`

### To build the project (including the tests):
    npm run build
### To watch the files for changes and rebuild if necessary:
    npm run watch
### To run tests:
    npm run test
### To run linter:
    npm run lint