import {EventEmitter} from 'events';

function isPromise(val: any): boolean {
    return typeof(val.then) === 'function';
}

export class Cacher<T> extends EventEmitter {
    public static readonly TIMEOUT_ERROR_MESSAGE: string = 'Cacher.get timed out\
because the value was not provided';
    private cache: Map<string, T | Promise<T> > = new Map<string, T | Promise<T> >(); // TODO; add smarter cache here
    /**
     * @param  {number=-1} noResponseTimeout - numbet of mllis to wait for the .get method until it throws an error
     * if number > 0 === true, else this param is not used
     */
    constructor(private noResponseTimeout: number = -1) {super(); }

    /**
     * Returns true if something is cached with key
     * @param  {string} key
     * @returns boolean
     */
    public has(key: string): boolean {
        return this.cache.has(key);
    }
    /**
     * returns the value by key. If the value is still being evaluated, waits until it is and then returns the value
     * if this.noResponseTimeout > 0 === true, waits no longer than this.noResponseTimeout millis and throws an error if
     * evaluation continues longer.
     * @param  {string} key
     * @returns Promise
     */
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
    /**
     * Sets the value to the cache by key.
     * If a promise is provided instead of value, puts the promise into the cache until it's resolved.
     * Then puts the resolved value to the cache
     * @param  {string} key
     * @param  {T|Promise<T>} value
     * @returns Promise
     */
    public set(key: string, value: T | Promise<T>): Promise<void> {
        this.cache.set(key, value);
        if (isPromise(value)) {
            const valuePromise: any = value;
            return valuePromise.then((v: T) => {
                this.cache.set(key, v);
            });
        } else {
            return Promise.resolve();
        }
    }
}