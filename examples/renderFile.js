const {TemplateShot} = require( '../build/index');

const templatePath = __dirname + '/templates';
console.log('looking for templates in:\n' + templatePath);

const ts = new TemplateShot(templatePath);

console.log('rendering template index.html to example1.png');
ts.renderFile('index.html', {'paragraph_text' : 'Test text'}, 'example1.png');


console.log('rendering template index.html\
 with "paragraph_text" parameter value set as "Test text"\
 with custom screen size\
 to example2.png');

 ts.renderFile(
    'index.html',
    {},// if you do not pass anything as a templateValue, nothing will be rendered
    'example2.png',
    {   
        screenSize: {
            width: 540,
            height: 900
        },
        shotSize: {
            width: 540,
            height: 'all'
        }
    });
