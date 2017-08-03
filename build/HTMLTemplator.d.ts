export declare class HTMLTemplator {
    private templateDir;
    constructor(templateDir?: string);
    generateHTML(templateName: string, templateValues?: {
        [key: string]: string;
    }): Promise<string>;
}
