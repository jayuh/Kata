/**
 * @description {{ name_zh }} - Model
 * Created by {{ um }} on {{ date }}.
 */

define([
    'common'
], function (common) {
    'use strict';
    var Model, root = APP.config.baseURI + 'market/campaign/admin/';
    Model = {
        // 获取列表
        getList: function (data, callback) {
            var url = root + 'getOfferListPage.do';
            common.utils.post(url, data, '请求异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 添加一条offer
        add: function (data, callback) {
            var url = root + 'addOffer.do';
            common.utils.post(url, data, '请求异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 删除一条offer
        del: function (data, callback) {
            var url = root + 'deleteOffer.do';
            common.utils.post(url, data, '请求异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 修改一条offer
        modify: function (data, callback) {
            var url = root + 'updateOffer.do';
            common.utils.post(url, data, '请求异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 获取offer类型
        getOfferTypeList: function (data, callback) {
            var url = root + 'getOfferTypeList.do';
            common.utils.post(url, data, '', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 获取offerCode列表
        getOfferCodeList: function (data, callback) {
            var url = root + 'getOfferList.do';
            common.utils.post(url, data, '', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 获取供应商
        getOfferSupplierList: function (data, callback) {
            var url = root + 'getOfferSupplierList.do';
            common.utils.post(url, data, '', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 获取一条数据
        get: function (data, callback) {
            var url = root + 'getOfferObject.do';
            common.utils.post(url, data, '获取数据异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },

        // 提交券码
        submit: function (data, callback) {
            var url = root + 'importResource.do';
            common.utils.post(url, data, '获取数据异常，请稍候再试！', function (result) {
                if (callback) {
                    callback(result);
                }
            });
        }
    };
    return Model;
});
