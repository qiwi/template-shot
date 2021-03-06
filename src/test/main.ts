import {TemplateShot} from '../index';
import {expect} from 'chai';
import * as imageType from 'image-type';
import * as sizeOf from 'image-size';
import * as fs from 'fs';

// TODO fix template path for tests
const templatePath =  __dirname + '/../../examples/templates';
const ts = new TemplateShot(templatePath);

const fileName = 'image1.png';

function assertFile(fileName: string, done: MochaDone, size?: {w: number, h: number}): void {
    fs.readFile(fileName, (err, result: Buffer) => {
        if (err) {
            done(err);
        }

        const imgType = imageType(result);
        expect(imgType.ext).to.eq('png');
        if (size) {
            const dims = sizeOf(fileName);
            if (dims.width !== size.w || dims.height !== size.h) {
                done('Wrong image Size!');
            }
        }
        fs.unlink(fileName, (err) => {
            if (err) {
                done(err);
            }
            done();
        });
    });
}

describe('TemplateShot', function(): void {
    this.timeout(20000); // NOTE webshot is a bit slower than default 2000ms timeout

    it('renderString', function(done: MochaDone): void {
        ts.renderString('index.html', {})
            .then((result: string) => {
                const imgType = imageType(Buffer.from(result, 'binary'));
                expect(imgType.ext).to.eq('png');
                done();
            })
            .catch((err) => {
                done(err);
            });
    });

    it('renderFile', function(done: MochaDone): void {
        ts.renderFile('index.html', {}, fileName)
            .then(() => {
                assertFile(fileName, done);
            })
            .catch((err) => {
                done(err);
            });
    });

    it('renderFile custom size', function(done: MochaDone): void {
        ts.renderFile('index.html', {}, fileName, {screenSize: {
            width: 640,
            height: 480
        },
        shotSize: {
            width: 'all',
            height: 'all'
        }}).then(() => {
                assertFile(fileName, done, {w: 640, h: 480});
            })
            .catch((err) => {
                done(err);
            });
    });

    it('renderStream', function(done: MochaDone): void {
        const stream = ts.renderStream('index.html', {});
        const fsStream = fs.createWriteStream(fileName);

        stream.pipe(fsStream).on('close', function(): void {
            assertFile(fileName, done);
        }).on('error', function(err: any): void {
            done(err);
        });
    });
});