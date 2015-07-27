/**
 * Created by Administrator on 2014/8/27.
 */
(function(){
    'use strict';
    var myAngularFilter = angular.module('MyAngularFilter',[]);
    myAngularFilter.filter('filter1',function(){
        return function(item,num){
            item = item + num;
            return item;
        }
    });
})();
