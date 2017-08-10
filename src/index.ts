import {PictureGenerator} from './PictureGenerator';
import {HTMLTemplator, ITemplateValues} from './HTMLTemplator';
import {Stream, Readable} from 'stream';

export class TemplateShot {
    protected pictureGenerator: PictureGenerator;
    protected templator: HTMLTemplator;
    /**
     * Initialization of the library
     * @param  {string='./'} templateDir - path, where your tempates are stored
     * @param  {boolean=false} useCache - if set to true, we cache the templates
     */
    constructor(templateDir: string = './', useCache: boolean = false) {
        this.templator = new HTMLTemplator(templateDir, useCache);
        this.pictureGenerator = new PictureGenerator();
    }
    /**
     * Renders template to an image and puts it in the string
     * @param  {string} template - path to your template relatively to templateDir, passed to cunstructor
     * @param  {ITemplateValues={}} templateValues - values to paste in the template
     * @param  {any=PictureGenerator.DEFAULT_OPTIONS} options - render options. The same as webshot's
     * @returns Promise<string>
     */
    public async renderString(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Promise<string> {
        const html = await this.templator.generateHTML(template, templateValues);
        return await this.pictureGenerator.renderString(html, options);
    }
    /**
     * Renders template to an image and saves it to a file
     * @param  {string} template - path to your template relatively to templateDir, passed to cunstructor
     * @param  {ITemplateValues={}} templateValues - values to paste in the template
     * @param  {string} fname - path to save your image to
     * @param  {any=PictureGenerator.DEFAULT_OPTIONS} options - render options. The same as webshot's
     * @returns Promise<void>
     */
    public async renderFile(
        template: string,
        templateValues: ITemplateValues = {},
        fname: string,
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Promise<void> {
        const html = await this.templator.generateHTML(template, templateValues);
        return await this.pictureGenerator.renderFile(html, fname, options);
    }

    /**
     * Renders template to an image and passes it to the stream
     * @param  {string} template - path to your template relatively to templateDir, passed to cunstructor
     * @param  {ITemplateValues={}} templateValues - values to paste in the template
     * @param  {any=PictureGenerator.DEFAULT_OPTIONS} options - render options. The same as webshot's
     * @returns Readable
     */
    public renderStream(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Readable {
        const result = new Readable();
        result._read = () => null;
        result.pause();
        this.templator.generateHTML(template, templateValues).then((html) => {
            result.resume();
            const renderStream: Stream = this.pictureGenerator.renderStream(html, templateValues);
            renderStream.on('data', (data) => {
                result.push(data);
            });
            renderStream.on('end', () => {
                result.push(null);
            });
            renderStream.on('error', (err) => {
                result.destroy(err);
            });
        });
        return result;
    }
}