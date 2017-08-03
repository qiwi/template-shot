/// <reference types="node" />
import { Stream } from 'stream';
/** Base Class to generate a picture from HTML */
export declare class PictureGenerator {
    static readonly DEFAULT_OPTIONS: any;
    /**
     * wraps webshot() to generate an image from html, generated in the generateHTML() method
     * @param  {string} fname - filename to save
     * @param  {{generationOptions?:any}} options? - options for webshot and generateHTML method
     * @returns Promise
     */
    renderFile(html: string, fname: string, options?: any): Promise<void>;
    renderStream(html: string, options?: any): Stream;
    renderString(html: string, options?: any): Promise<string>;
}
