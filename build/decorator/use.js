"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
function use(middleware) {
    return function (target, key) {
        var originMiddiewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddiewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddiewares, target, key);
    };
}
exports.use = use;
//# sourceMappingURL=use.js.map