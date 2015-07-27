(function(){
    'use strict';
    var myAngularDir = angular.module('MyAngularDir', []);

//    myAngularDir.directive('halo',function(){
//        return {
//            scope:{
//                flav:'='
//            },
////            独立作用域，防止相互污染
//            restrict:'AE',
//            template:'<div><input type="text" ng-model="flav"></div>{{flav}}<div ng-transclude></div> ',
//            transclude:true,
//            link:function(s,e,a){
//                console.log(a);
//            }
//        }
//    });
    myAngularDir.directive('ottHeightInit',function(){
        return {
            restrict:'A',
            replace:false,
            link:function(scope,element,attr){
                var eId = scope.$index;
                console.log(element);
                element.height(element.width());
                $(window).off('resize.' + eId).on('resize.' + eId,function(){
                    element.height(element.width());
                    console.count('resize:');
                });
            }
        }
    });

    //myAngularDir.directive('ottJelly',function(){
    //    return {
    //        restrict:'A',
    //        replace:false,
    //        link:function(scope,element,attr){
    //            var moveNum = 0,moveWidth = element.width(),startX,startY,endX,endY,temp = 0;
    //            element.on({
    //                'touchstart':function(e){
    //                    console.log(e);
    //                    startX = e.originalEvent.changedTouches[0].clientX;
    //                    startY = e.originalEvent.changedTouches[0].clientY;
    //                    element.addClass('ott-jelly');
    //                    e.preventDefault();
    //                    e.stopPropagation();
    //                },
    //                'webkitAnimationEnd':function(e){
    //                    element.removeClass('ott-jelly');
    //                },
    //                'touchmove':function(e){
    //                    e.preventDefault();
    //                    e.stopPropagation();
    //                },
    //                'touchend':function(e){
    //                    endX = e.originalEvent.changedTouches[0].clientX;
    //                    endY = e.originalEvent.changedTouches[0].clientY;
    //                    temp = (endY - startY) * (endY - startY) + (endX - startX) * (endX - startX);
    //                    console.log(temp);
    //                    if(temp <= moveWidth * moveWidth) {
    //                        element.trigger('click');
    //                    }
    //                }
    //            });
    //        }
    //    }
    //});
    //
    //myAngularDir.directive('ottTouch',function(){
    //    return {
    //        restrict:'A',
    //        replace:false,
    //        link:function(scope,element,attr){
    //            var moveNum = 0,moveWidth = element.width(),startX,startY,endX,endY,temp = 0;
    //            element.on({
    //                'touchstart':function(e){
    //                    startX = e.originalEvent.changedTouches[0].clientX;
    //                    startY = e.originalEvent.changedTouches[0].clientY;
    //                    e.preventDefault();
    //                    e.stopPropagation();
    //                },
    //                'touchmove':function(e){
    //                    e.preventDefault();
    //                    e.stopPropagation();
    //                },
    //                'touchend':function(e){
    //                    endX = e.originalEvent.changedTouches[0].clientX;
    //                    endY = e.originalEvent.changedTouches[0].clientY;
    //                    temp = (endY - startY) * (endY - startY) + (endX - startX) * (endX - startX);
    //                    console.log(temp);
    //                    if(temp <= moveWidth * moveWidth) {
    //                        element.trigger('click');
    //                    }
    //                }
    //            });
    //        }
    //    }
    //});

//    velocity js动画测试
//    myAngularDir.directive('velocity',function($timeout){
//        return {
//            restrict:'A',
//            replace:false,
//            link:function(scope,element,attr){
//                $timeout(function(){
//                    element.velocity({
//                        translateZ:0,
//                        translateX:'200px',
//                        rotateZ:'45deg'
//                    },{
//                        duration:10,
//                        loop:true
//                    });
//                },1000);
//            }
//        }
//    });
})();

