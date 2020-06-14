"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = void 0;
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            sucess: false,
            errMsg: errMsg,
            data: data,
        };
    }
    return {
        sucess: true,
        data: data,
    };
};
//# sourceMappingURL=util.js.map