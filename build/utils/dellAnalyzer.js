"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
var DellAnalyzer = /** @class */ (function () {
    function DellAnalyzer() {
        this.courseInfos = [];
    }
    DellAnalyzer.getInstance = function () {
        DellAnalyzer.instance = new DellAnalyzer();
        return DellAnalyzer.instance;
    };
    DellAnalyzer.prototype.getCourseInfo = function (html) {
        var _this = this;
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.list_item');
        courseItems.map(function (index, element) {
            var descs = $(element).find('.figure_desc').text();
            var title = $(element).find('.figure_title').text();
            _this.courseInfos.push({ title: title, descs: descs });
        });
        return {
            time: new Date(),
            data: this.courseInfos,
        };
    };
    DellAnalyzer.prototype.gengerateJsonContent = function (courseResult, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseResult.time.toString()] = courseResult.data;
        return fileContent;
    };
    DellAnalyzer.prototype.analyze = function (html, filePath) {
        var courseResult = this.getCourseInfo(html);
        var fileContent = this.gengerateJsonContent(courseResult, filePath);
        return JSON.stringify(fileContent);
    };
    return DellAnalyzer;
}());
exports.default = DellAnalyzer;
//# sourceMappingURL=dellAnalyzer.js.map