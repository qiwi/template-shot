import {EventEmitter} from 'events';

export class Cacher<T> extends EventEmitter {
    public static readonly TIMEOUT_ERROR_MESSAGE: string = 'Cahcer.get timed out,\
because the value was not provided by Cacher.set';
    private cache: Map<string, T> = new Map<string, T>(); // TODO; add smarter cache here
    constructor(private noResponseTimeout: number = -1) {super(); }

    public has(key: string): boolean {
        return this.cache.has(key);
    }

    public async get(key: string): Promise<T> {
        if (this.cache.has(key)) {
            const res = this.cache.get(key);
            if (res === undefined) {
                return new Promise<T>((resolve: any, reject: any): void => {
                    this.on(key + '_change', (finalResult: T) => resolve(finalResult));
                    if (this.noResponseTimeout > 0) {
                        setTimeout(() => {reject(new Error(Cacher.TIMEOUT_ERROR_MESSAGE)); }, this.noResponseTimeout);
                    }
                });
            } else {
                return Promise.resolve(res);
            }
        } else {
            return Promise.reject(new Error('No such key'));
            // Maybe we should call this.startEvaluating(key), and then return;
        }
    }

    // TODO: try PromiseLike instead. This way we'll know if the value isn't gonna be provided on reject
    public startEvaluating(key: string): void {
        this.cache.set(key, undefined);
    }

    public set(key: string, value: T): boolean {
        if (value === undefined) {
            throw new Error('don\'t assign value to undefined');
        }
        this.cache.set(key, value);
        return this.emit(key + '_change', value);
    }
}