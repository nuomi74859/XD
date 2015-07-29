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
                    //模板解析完成后 开始加载  ps:使用视图加载回调会导致加载两次 $viewContentLoaded
                    $scope.$on('$stateChangeSuccess',function(){
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
                controller:function($scope,$timeout,$state){
                    $scope.indexAnimate = false;
                    $scope.viewAnimate = true;
                    $scope.djwNums = [false,false,true,true,false,true,true,true];
                    $scope.djwLi = function(vipbool){
                        $scope.vipbool = vipbool;
                    };

                    //视频小窗内容
                    $scope.bigVideo = function(vipbool){
                        console.log('big video:',vipbool);
                        console.log('window index',window.videoIndex);
                        if(vipbool) {
                            $state.go('djw.djw-vip');
                        }
                        else {
                            $state.go('djw.djw-fs');
                        }
                    };
                    console.log('djw');
                    //模板解析完成后 开始加载
                    $scope.$on('$stateChangeSuccess',function(){
                        console.log('djw 开始加载完成 开始加载自定义js');
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

                            //列表上下滚动
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

                            //结束loading动画
                            $('.djw-l-video').addClass('djw-l-loading');

                            $('.djw-li').on('click',function(){
                                var $this = $(this);
                                var $play = $this.find('.glyphicon-play');
                                var $vip = $this.find('.vip-in');

                                //记录入口位置
                                window.videoIndex = $this.index() + 1;
                                console.log('vip length',$vip.length);


                                if($vip.length <= 0){
                                    if($play.hasClass('play')){
                                        $state.go('djw.djw-fs');
                                    }

                                }
                                else {
                                    if($play.hasClass('play')){
                                        $state.go('djw.djw-vip');
                                    }
                                }

                                //li播放标记
                                $('.play').removeClass('play');
                                $play.addClass('play');

                                //开始做loading动画
                                $('.djw-l-video').removeClass('djw-l-loading');
                                setTimeout(function(){
                                    $('.djw-l-video').addClass('djw-l-loading');
                                    if($vip.length > 0){

                                    }
                                },300);
                            });

                        },500);

                    });
                }
            }
        ).state('djw.djw-fs',{
                url:'/djw_fs',

                views:{
                    "fs":{
                        templateUrl:'/tpls/djw_fullscreen.html',
                        controller:function($scope){
                            console.log('fs 开始');
                            $scope.viewAnimate = false;
                        }
                    }
                }
            }
        ).state('djw.djw-vip',{
                url:'/djw_vip',
                views:{
                    'fs':{
                        templateUrl:'/tpls/djw_vip.html',
                        controller:function($scope){
                            $scope.viewAnimate = false;
                        }
                    }
                }
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

