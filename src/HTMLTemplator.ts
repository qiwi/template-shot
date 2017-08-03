import * as path from 'path';
import * as readFile from 'fs-readfile-promise';
import * as format from 'string-template';

export class HTMLTemplator {
    constructor(private templateDir: string = '/') {
        // TODO: make this work relatively to the file where instance is created
        if (this.templateDir.startsWith('./')) {
            this.templateDir = path.join(__dirname, templateDir);
        }
    }
    public async generateHTML(templateName: string, templateValues: {[key: string]: string} = {}): Promise<string> {
        const templatePath: string = path.join(this.templateDir, templateName);
        const template: string = (await readFile(templatePath)).toString();
        // TODO: use cache here
        templateValues.templateDir = 'file://' + this.templateDir;

        const res = format(template, templateValues);
        return res;
    }
}