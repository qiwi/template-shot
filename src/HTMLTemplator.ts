import * as path from 'path';
import * as readFile from 'fs-readfile-promise';
import * as format from 'string-template';

export interface ITemplateValues {
    [key: string]: string;
}

export class HTMLTemplator {
    constructor(private templateDir: string = '/') {
        // TODO: make this work relatively to the file where instance is created
        if (this.templateDir.startsWith('./')) {
            this.templateDir = path.join(__dirname, templateDir);
        }
    }
    public async generateHTML(templateName: string, templateValues: ITemplateValues = {}): Promise<string> {
        const templatePath: string = path.join(this.templateDir, templateName);
        const template: string = (await readFile(templatePath)).toString();
        // TODO: use cache here
        templateValues.templateDir = 'file://' + this.templateDir;

        // TODO: allow using lodash
        const res = format(template, templateValues);
        return res;
    }
}