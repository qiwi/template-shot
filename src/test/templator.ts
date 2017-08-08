import * as fs from 'fs';
import {HTMLTemplator} from '../HTMLTemplator';
import {expect} from 'chai';
import * as sinon from 'sinon';
import * as imageType from 'image-type';

const templator = new HTMLTemplator();

const template = '<html>\
    <head>\
        <link rel="stylesheet" href="{templateDir}/css/main.css" type="text/css" charset="utf-8" />\
    </head>\
    <body>\
        <div class=\'my-class\'>\
            <h1>My sample template</h1>\
            <p>{paragraph_text}</p>\
            <div class=webkit-test>\
                this text looks like it\'s in a textarea\
            </div>\
            <img src="https://blog.xenproject.org/wp-content/uploads/2014/10/Testing.jpg">\
            <div id=icon></div>\
        </div>\
\
    </body>\
</html>';

const resolvedTemplate = '<html>\
    <head>\
        <link rel="stylesheet" href="file:////css/main.css" type="text/css" charset="utf-8" />\
    </head>\
    <body>\
        <div class=\'my-class\'>\
            <h1>My sample template</h1>\
            <p>tst</p>\
            <div class=webkit-test>\
                this text looks like it\'s in a textarea\
            </div>\
            <img src="https://blog.xenproject.org/wp-content/uploads/2014/10/Testing.jpg">\
            <div id=icon></div>\
        </div>\
\
    </body>\
</html>';

describe('Templator', function(): void {
    this.timeout(20000); // so we can simulate a long wait

    const sandbox = sinon.sandbox.create();
    beforeEach(function(done: MochaDone): void {

        sandbox.stub(fs, 'readFile').callsFake((path, cb) => {cb(undefined, new Buffer(template)); });
        done();
    });

    it('sample template', function(done: MochaDone): void {
        templator.generateHTML('index.html', {paragraph_text: 'tst'}).then((res) => {
            expect(res).to.eql(resolvedTemplate);
            done();
        }).catch((err) => {
            done(err);
        });
    });

    afterEach(function(done: MochaDone): void {
        sandbox.restore();
        done();
    });
});