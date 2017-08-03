import * as webshot from 'webshot';
import {Stream} from 'stream';

/** Base Class to generate a picture from HTML */
export class PictureGenerator {
    public static readonly DEFAULT_OPTIONS: any = {
        screenSize: {
            width: 320,
            height: 480
        },
        shotSize: {
            width: 320,
            height: 'all'
        }
    };
    /**
     * wraps webshot() to generate an image from html, generated in the generateHTML() method
     * @param  {string} fname - filename to save
     * @param  {{generationOptions?:any}} options? - options for webshot
     * @returns Promise
     */
    public async renderFile(
                html: string, fname: string, options: any = PictureGenerator.DEFAULT_OPTIONS
            ): Promise<void> {
        options.siteType = 'html';
        return new Promise<void>((resolve, reject) => {
            webshot(html, fname , options, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    public renderStream(html: string, options: any = PictureGenerator.DEFAULT_OPTIONS): Stream {
        options.siteType = 'html';
        return webshot(html, options);
    }
    public async renderString(html: string, options: any = PictureGenerator.DEFAULT_OPTIONS): Promise<string> {
        return new Promise<string>((resolve, reject): void => {
            const stream: Stream = this.renderStream(html, options);
            let result: string = '';
            stream.on('data', (data) => {
                result += data.toString('binary');
            });
            stream.on('end', () => {
                resolve(result);
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }
}