var tool = {
    inherit(tar, ori) {
        var Temp = function () {}
        Temp.prototype = ori.prototype;
        tar.prototype = new Temp();
        tar.prototype.constructor = tar;
    },
    extends(ori) {
        var result = function () {
            ori.apply(this, arguments)
        }
        this.inherit(result, ori);
        return result
    },
    single(ori) {
        var singlrResult = (function () {
            var instance;
            return function () {
                if (instance) {
                    return instance
                }
                instance = this
                ori && ori.apply(this, arguments);
                return instance
            }
        })()
        ori && this.inherit(singlrResult, ori);
        return singlrResult
    }
}