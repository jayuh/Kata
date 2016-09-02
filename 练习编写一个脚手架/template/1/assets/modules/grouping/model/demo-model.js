/**
 * @description {{ name_zh }} - Model
 * Created by {{ um }} on {{ date }}.
 */

define([
    'common'
], function (common) {
    'use strict';
    // TODO root是请求后端的通用路径，请自行修改，并删除此段注释！
    var Model, root = APP.config.baseURI + 'market/campaign/admin/';
    Model = {

        // TODO 这是一个新建的model文件，请从这里开始，并修改此段注释！
        todo: function (data, callback) {
            var url = root + 'todo.do';
            common.utils.post(url, data, '请求异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        }
    };
    return Model;
});
