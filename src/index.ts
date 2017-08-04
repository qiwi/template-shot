import {PictureGenerator} from './PictureGenerator';
import {HTMLTemplator, ITemplateValues} from './HTMLTemplator';
import {Stream, Readable} from 'stream';

export class TemplateShot {
    protected pictureGenerator: PictureGenerator;
    protected templator: HTMLTemplator;
    constructor(templateDir: string = './') {
        this.templator = new HTMLTemplator(templateDir);
        this.pictureGenerator = new PictureGenerator();
    }

    public async renderString(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Promise<string> {
        const html = await this.templator.generateHTML(template, templateValues);
        return await this.pictureGenerator.renderString(html, options);
    }

    public async renderFile(
        template: string,
        templateValues: ITemplateValues = {},
        fname: string,
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Promise<void> {
        const html = await this.templator.generateHTML(template, templateValues);
        return await this.pictureGenerator.renderFile(html, fname, options);
    }

    public renderStream(
        template: string,
        templateValues: ITemplateValues = {},
        options: any = PictureGenerator.DEFAULT_OPTIONS
    ): Stream {
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