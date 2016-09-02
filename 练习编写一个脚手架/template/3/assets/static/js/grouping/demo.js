/**
 * @description {{ name_zh }}
 * Created by {{ um }} on {{ date }}.
 */

requirejs(['../config'],function() {
    'use strict';
    require(['jquery', 'app/{{ grouping }}/viewModel/{{ name }}'], function($, Index){
		$(function() {
        	new Index();
		});
    });
});