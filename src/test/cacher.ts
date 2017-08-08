import {Cacher} from '../cacher';
import {expect} from 'chai';
import * as imageType from 'image-type';
import * as fs from 'fs';

const cacher = new Cacher();

describe('Cacher', function(): void {
    this.timeout(20000); // so we can simulate a long wait

    it('single cache', function(done: MochaDone): void {
        cacher.set('a', 0);
        cacher.set('b', 'asdf');
        cacher.get('a').then((res) => {
            expect(res).to.eql(0);
            return cacher.get('b');
        }).then((res) => {
            expect(res).to.eql('asdf');
            done();
        }).catch((err) => {
            done(err);
        });
    });

    it('smart cache', function(done: MochaDone): void {
        cacher.startCounting('a');
        setTimeout(() => {cacher.set('a', 123); }, 2000);
        cacher.get('a').then((res) => {
            expect(res).to.eql(123);
            return cacher.get('a');
        }).then((res) => {
            expect(res).to.eql(123);
            done();
        }).catch((err) => {
            done(err);
        });
    });
});