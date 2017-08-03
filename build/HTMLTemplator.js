"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const readFile = require("fs-readfile-promise");
const format = require("string-template");
class HTMLTemplator {
    constructor(templateDir = '/') {
        this.templateDir = templateDir;
        if (this.templateDir.startsWith('./')) {
            this.templateDir = path.join(__dirname, templateDir);
        }
    }
    generateHTML(templateName, templateValues = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const templatePath = path.join(this.templateDir, templateName);
            const template = (yield readFile(templatePath)).toString();
            templateValues.templateDir = 'file://' + this.templateDir;
            const res = format(template, templateValues);
            return res;
        });
    }
}
exports.HTMLTemplator = HTMLTemplator;
