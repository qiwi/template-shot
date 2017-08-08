import {EventEmitter} from 'events';

export class Cacher<T> extends EventEmitter {
    public static readonly TIMEOUT_ERROR_MESSAGE: string = 'Cacher.get timed out\
because the value was not provided';
    private cache: Map<string, T | Promise<T> > = new Map<string, T | Promise<T> >(); // TODO; add smarter cache here
    constructor(private noResponseTimeout: number = -1) {super(); }

    public has(key: string): boolean {
        return this.cache.has(key);
    }

    public async get(key: string): Promise<T> {
        if (this.cache.has(key)) {
            const res: any = this.cache.get(key);
            let to;
            if (typeof(res.then) === 'function') { // if true, we have a Promise<T>
                return this.noResponseTimeout > 0 ? Promise.race([new Promise((resolve, reject) => {
                    to = setTimeout(() => reject(new Error(Cacher.TIMEOUT_ERROR_MESSAGE)), this.noResponseTimeout);
                }), res.then((val) => {
                    clearTimeout(to);
                    return val;
                })]) : res;
            } else {// else we have T
                return Promise.resolve(res);
            }
        } else {
            return Promise.reject(new Error('No such key'));
        }
    }

    public set(key: string, valuePromise: Promise<T>): Promise<void> {
        this.cache.set(key, valuePromise);
        return valuePromise.then((value: T) => {
            this.cache.set(key, value);
        });
    }
}