import * as path from 'path';
import {readFile} from 'fs';
import * as format from 'string-template';

export interface ITemplateValues {
    [key: string]: string;
}

export class HTMLTemplator {
    private templateCache: Map<string, string> = new Map<string, string>();
    constructor(private templateDir: string = '/', private useCache: boolean = false) {
        // TODO: make this work relatively to the file where instance is created
        if (this.templateDir.startsWith('./')) {
            this.templateDir = path.join(__dirname, templateDir);
        }
    }

    public async generateHTML(
        templateName: string,
        templateValues: ITemplateValues = {}
    ): Promise<string> {
        // TODO: add the ability to load template from string
        const templatePath: string = path.join(this.templateDir, templateName);
        const template: string = await this.readCachedFile(templatePath);
        // TODO: use cache here
        templateValues.templateDir = 'file://' + this.templateDir;
        // TODO: allow using lodash
        const res = format(template, templateValues);
        return res;
    }

    private async readCachedFile(path: string): Promise<string> {
        if (this.useCache && this.templateCache.has(path)) {
            return Promise.resolve(this.templateCache.get(path));
        } else {
            return new Promise<string>((resolve: any, reject: any): void => {
                readFile(path, (err: Error, template: Buffer) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(template.toString);
                    }
                });
            });
        }
    }
}