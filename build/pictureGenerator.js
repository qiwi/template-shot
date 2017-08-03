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
const webshot = require("webshot");
/** Base Class to generate a picture from HTML */
class PictureGenerator {
    /**
     * wraps webshot() to generate an image from html, generated in the generateHTML() method
     * @param  {string} fname - filename to save
     * @param  {{generationOptions?:any}} options? - options for webshot and generateHTML method
     * @returns Promise
     */
    renderFile(html, fname, options = PictureGenerator.DEFAULT_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            options.siteType = 'html';
            return new Promise((resolve, reject) => {
                webshot(html, fname, options, (err) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve();
                    }
                });
            });
        });
    }
    renderStream(html, options = PictureGenerator.DEFAULT_OPTIONS) {
        options.siteType = 'html';
        return webshot(html, options);
    }
    renderString(html, options = PictureGenerator.DEFAULT_OPTIONS) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const stream = this.renderStream(html, options);
                let result = '';
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
        });
    }
}
PictureGenerator.DEFAULT_OPTIONS = {
    screenSize: {
        width: 320,
        height: 480
    },
    shotSize: {
        width: 320,
        height: 'all'
    }
};
exports.PictureGenerator = PictureGenerator;
