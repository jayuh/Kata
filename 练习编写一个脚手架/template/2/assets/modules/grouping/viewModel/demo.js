/**
 * @description {{ name_zh }} - ViewModel
 * Created by {{ um }} on {{ date }}.
 */

define([
    'glass',
    'common',
    'avalon',
    'laydate',
    'laypage',
    'app/{{ grouping }}/model/{{ name }}-model',
    'css!plugins/layer/skin/layer.css',
    'css!plugins/laypage/skin/laypage.css'
], function (Class, common, avalon, laydate, laypage, model) {
    'use strict';
    var Index = Class.create({
        initialize: function () {
            this.initViewModel();
            this.getList(1, 10, '', true);
        },

        /**
         * 初始化VM
         */
        initViewModel: function () {
            var opt = {
                offerId: '',
                offerName: '',
                offerCode: '',
                offerTypeCode: '',
                offerTypeName: '',
                goodsTotalNum: '',
                supplierName: '',
                supplierCode: '',
                validStartDate: '',
                validEndDate: '',
                searchInput: '',
                searchKey: '',
                offerCodeList: [],
                offerCodeSub: '',
                couponCodeSub: '',
                search: $.proxy(this.search, this),
                getOfferCodeList: $.proxy(this.getOfferCodeList, this),
                insert: $.proxy(this.insert, this),
                submit: $.proxy(this.submit, this)
            };
            this.vm = avalon.define(common.createViewModel(this, opt));
            avalon.scan();
        },

        search: function () {
            this.vm.searchKey = this.vm.searchInput;
            this.getList(1, 10, this.vm.searchKey, true);
        },

        // 获取offer列表
        getList: function (pageNumber, objectsPerPage, offerName, needLaypage) {
            var self = this, param = { pageNumber: pageNumber, objectsPerPage: objectsPerPage, offerName: offerName};
            if (!offerName) {
                param = { pageNumber: pageNumber, objectsPerPage: objectsPerPage};
            }
            // TODO 分页
            model.getList(param, function (result) {
                if (result && result.responseCode === '000000') {
                    self.vm.list = result.pageDTO.list;
                    if (needLaypage) {
                        var pages = Math.ceil(result.pageDTO.fullListSize / result.pageDTO.objectsPerPage),
                            curr = pageNumber;
                        self.initLaypage(pages, curr);
                    }
                }
            });
        },
        /**
         * 初始化分页
         * @param  {[Number]} pages [总页数]
         * @param  {[Number]} curr  [当前页数]
         */
        initLaypage: function (pages, curr) {
            var self = this;
            laypage.dir = false;
            laypage({
                cont: 'laypage',
                pages: pages,
                skip: true,
                curr: curr || 1,
                skin: '#24B0F4',
                prev: '<i class="fa fa-chevron-left" style="vertical-align: middle;"></i>',
                next: '<i class="fa fa-chevron-right" style="vertical-align: middle;"></i>',
                jump: function (e, first) {
                    var pageNo = e.curr;
                    if (!first) {
                        self.getList(pageNo, 10, self.vm.searchKey);
                    }
                }
            });
        },

        // 删除一条offer
        del: function (id, $remove) {
            var self = this;
            common.delMsg(function () {
                var param = { offerId: id };
                model.del(param, function (data) {
                    if (data && data.responseCode === '000000') {
                        common.msg('删除成功', {icon: 1});
                        var currPage = $('#laypage').find('.laypage_curr').text() || '1';
                        if (self.vm.list.length === 1 && currPage !== '1') {
                            currPage--;
                        }
                        self.getList(currPage, 10, self.vm.searchKey, true);
                    }
                });
            });
        }
    });

    return Index;
});
