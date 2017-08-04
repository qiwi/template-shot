const {TemplateShot} =require( '../build/index');
var fs = require('fs');


const templatePath = __dirname+'/templates';
console.log('looking for templates in:\n' + templatePath);

const ts = new TemplateShot(templatePath);


console.log('rendering template index.html\
 with "paragraph_text" parameter value set as "Test text"\
 with custom screen size\
 to string and then saving the string to example3.png');

 ts.renderString(
    'index.html',
    {'paragraph_text' : 'String rendered'},
    {   
        screenSize: {
            width: 540,
            height: 900
        },
        shotSize: {
            width: 540,
            height: 'all'
        }
    }).then((res)=>{
        fs.writeFile(__dirname+'/example3.png', res, 'binary', function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
    });
