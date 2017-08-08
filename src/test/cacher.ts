import {Cacher} from '../cacher';
import {expect} from 'chai';
import * as imageType from 'image-type';
import * as fs from 'fs';

let cacher;

describe('Cacher', function(): void {
    this.timeout(10000); // so we can simulate a long wait

    beforeEach(function(done: MochaDone): void {
        cacher = new Cacher(1000);
        done();
    });

    it('single cache', function(done: MochaDone): void {
        cacher.set('a', Promise.resolve(0));
        cacher.set('b', Promise.resolve('asdf'));
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

    it('.has check', function(done: MochaDone): void {
        expect(cacher.has('a')).to.eql(false);
        cacher.set('a', new Promise((resolve, reject) => setTimeout(() => resolve(123), 500)));
        expect(cacher.has('a')).to.eql(true);
        done();
    });

    it('smart cache', function(done: MochaDone): void {
        cacher.set('a', new Promise((resolve, reject) => setTimeout(() => resolve(123), 500)));
        const checks = [];
        checks.push(cacher.get('a').then((res) => {
            expect(res).to.eql(123);
        }));
        checks.push(cacher.get('a').then((res) => {
            expect(res).to.eql(123);
        }));
        Promise.all(checks).then((res) => {
            done();
        }).catch((err) => {
            done(err);
        });
    });
    it('smart cache timeout', function(done: MochaDone): void {
        cacher.set('a', new Promise((resolve, reject) => setTimeout(() => resolve(123), 2000)));
        cacher.get('a').then((res) => {
            return done('cacher hasn\'t rejected the timed out promise');
        }).catch((err: Error) => {
            expect(err.message).to.eql(Cacher.TIMEOUT_ERROR_MESSAGE);
            done();
        });
    });
});