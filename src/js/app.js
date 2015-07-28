(function(){
    'use strict';
    var myAngularApp = angular.module('MyAngularApp', [
        'ui.router', 'ngAnimate','MyAngularCtrls','MyAngularDir','MyAngularFilter'
    ]);

    myAngularApp.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/main');
        $stateProvider.state('main',{
                url:'/main',
                templateUrl:'/tpls/main.html',
                controller:function($scope, $timeout){
                    $scope.indexAnimate = true;
                    $scope.ottPanels = ['djw','2','3','4','5','6'];
                    //视图加载完毕后
                    $scope.$on('$viewContentLoaded',function(){
                        $timeout(function(){
                            if(typeof(AKH) != 'undefined' && AKH) {
                                AKH.init();
                                console.log('AKH')
                            }
                            else if(typeof(akh) != 'undefined' && akh) {
                                akh.init();
                                console.log('akh')
                            }
                            else {
                                console.log('akh not found');
                            }
                        },500);
                    });
                    //过渡动画加载完毕后
                },
                onEnter:function(){
                    console.log('onEnter')
                },
                onExit:function(){
                    console.log('onExit');
                }
            }
        ).state('djw',{
                url:'/djw',
                templateUrl:'/tpls/djw.html',
                controller:function($scope,$timeout){
                    $scope.indexAnimate = false;
                    $scope.viewAnimate = true;
                    $scope.djwNums = [1,1,1,1,1,1,1];
                    $scope.$on('$viewContentLoaded',function(){
                        $timeout(function(){
                            if(!window.videoIndex) {
                                window.videoIndex = 1;
                            }
                            console.log('video index:',window.videoIndex);
                            if(typeof(AKH) != 'undefined' && AKH) {
                                AKH.init(window.videoIndex);
                                console.log('AKH')
                            }
                            else if(typeof(akh) != 'undefined' && akh) {
                                akh.init();
                                console.log('akh')
                            }
                            else {
                                console.log('akh not found');
                            }
                            var top = 0;
                            //console.log(AKH.allBtns.eq(window.videoIndex));
                            AKH.allBtns.eq(window.videoIndex).find('.glyphicon-play').addClass('play');
                            (function($){
                                $(document).on('keyup', function(){
                                    var $target = $('.focusBtn.on.djw-li');
                                    if ($target.length > 0) {
                                        var $parent = $target.parent();
                                        var $dr = $('.djw-right');
                                        var tOffset = $target.offset(), dOffset = $dr.offset();
                                        //console.log(tOffset,dOffset);
                                        var tmp0 = tOffset.top - dOffset.top + $target.height() - $dr.height();
                                        var tmp1 = tOffset.top - dOffset.top;
                                        //console.log(tmp0,tmp1);
                                        if(tmp0 > 0) {
                                            top = top - tmp0;
                                            $parent.css({
                                                'top':top
                                            });
                                            //console.log('work',top);
                                        }
                                        else if(tmp1 < 0){
                                            top = top - tmp1;
                                            $parent.css({
                                                'top':top
                                            });
                                            //console.log('work',top);
                                        }
                                    }

                                });
                                //AKH.allBtns = $(AKH.container + ' .' + AKH.selector).not('.'+AKH.disableClass).add($('.' + AKH.inputing));
                                $('.djw-li').off().on('click',function(){
                                    var $play = $(this).find('.glyphicon-play');
                                    if($play.hasClass('play')){
                                        window.location.hash = '#/djw/djw_fs';
                                        window.videoIndex = $(this).index() + 1;
                                    }
                                    $('.play').removeClass('play');
                                    $play.addClass('play');
                                });
                            })(jQuery);
                        },500);

                        console.log('$viewContentLoaded')
                    });
                }
            }
        ).state('djw.djw-fs',{
                url:'/djw_fs',

                views:{
                    "fs":{
                        templateUrl:'/tpls/djw_fullscreen.html',
                        controller:function($scope){
                            $scope.viewAnimate = false;
                        }
                    }
                }
                //templateUrl:'/tpls/djw_fullscreen.html',
                //controller:function($scope){
                //    $scope.viewAnimate = false;
                //}

            }
        ).state('2',{
                url:'/djw',
                templateUrl:'/tpls/duojiwei.html',
                controller:function($scope){
                    $scope.indexAnimate = false;
                    $scope.user = {
                        userName:'nuomi74859',
                        passWord:''
                    };
                    $scope.save = function(){
                        alert('保存数据');
                    };
                }
            }
        ).state('3',{
                url:'/test',
                templateUrl:'/tpls/test.html',
                controller:function($scope){
                    $scope.indexAnimate = false;
                    $scope.user = {
                        userName:'nuomi74859',
                        passWord:''
                    };
                    $scope.save = function(){
                        alert('保存数据');
                    }
                }
            }
        ).state('4',{
                url:'/velocity',
                templateUrl:'/tpls/velocity.html',
                controller:function($scope){
                    $scope.indexAnimate = false;
                }
            }
        );
    });
    myAngularApp.run(function(){
        console.log('run')
    });
})();

