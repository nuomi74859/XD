(function(){
    'use strict';
    var myAngularApp = angular.module('MyAngularApp', [
        'ui.router', 'ngAnimate','MyAngularCtrls','MyAngularDir','MyAngularFilter'
    ]);

    myAngularApp.config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/main');
        $stateProvider.state('main',{
                url:'/main',
                templateUrl:'tpls/main.html',
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
                templateUrl:'tpls/djw.html',
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
                            //初始化 列表位置
                            if(!window.videoIndex) {
                                window.videoIndex = 1;
                            }

                            //定义存储变量 与scroll有关
                            var top = 0;
                            //列表上下滚动
                            var scrollList = function(){
                                var $target = jQuery('.focusBtn.on.djw-li');
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
                            };
                            console.log('video index:',window.videoIndex);

                            //AKH初始化
                            if(typeof(AKH) != 'undefined' && AKH) {
                                AKH.init(window.videoIndex);

                                //回到之前的位置
                                setTimeout(function(){
                                    scrollList();
                                },30);
                                console.log('AKH')
                            }
                            else if(typeof(akh) != 'undefined' && akh) {
                                akh.init();
                                console.log('akh')
                            }
                            else {
                                console.log('akh not found');
                            }


                            //console.log(AKH.allBtns.eq(window.videoIndex));
                            AKH.allBtns.eq(window.videoIndex).find('.glyphicon-play').addClass('play');


                            //每次按键检测位置移动
                            jQuery(document).on('keyup', function(){
                                scrollList();
                            });

                            //结束loading动画
                            jQuery('.djw-l-video').addClass('djw-l-loading');

                            jQuery('.djw-li').on('click',function(){
                                var $this = jQuery(this);
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
                                jQuery('.play').removeClass('play');
                                $play.addClass('play');

                                //开始做loading动画
                                jQuery('.djw-l-video').removeClass('djw-l-loading');
                                setTimeout(function(){
                                    jQuery('.djw-l-video').addClass('djw-l-loading');
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
                        templateUrl:'tpls/djw_fullscreen.html',
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
                        templateUrl:'tpls/djw_vip.html',
                        controller:function($scope){
                            $scope.viewAnimate = false;
                        }
                    }
                }
            }

        ).state('2',{
                url:'/djw',
                templateUrl:'tpls/duojiwei.html',
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
                templateUrl:'tpls/test.html',
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
                templateUrl:'tpls/velocity.html',
                controller:function($scope){
                    $scope.indexAnimate = false;
                }
            }
        ).state('5',{
                url:'/video',
                templateUrl:'tpls/video.html',
                controller:function ($scope,$http) {
                    $scope.indexAnimate = false;
                    var videoData;
                    var listNum = 0;
                    //console.log(videoData.length);
                    //var maxNum = videoData.length - 1;
                    var videWarp = $('#video-warp');
                    var videoTar = $('.video-tar');
                    var videoInfo = $('.video-info');
                    var videoDataShow = $('.video-data');
                    var videoBegin = 0;
                    var videoTimeInfo = [];
                    //var videoTarInfo = {};
                    var videoBeginTime;
                    //var videoTimeNum = 0;
                    videWarp.val(listNum);
                    $http.get('/videoData.json').success(function(data){
                        //console.log(data);
                        var videoData = data.videoList;
                        var timeSelect = data.timeSelect;
                        var maxNum = videoData.length - 1;
                        //console.log(videoData);
                        //videoTar.get(0).currentTime = videoData[listNum].time;
                        if(timeSelect == 1){
                            videoTar.get(0).currentTime = videoData[listNum].time1;
                        }
                        if(timeSelect == 2){
                            videoTar.get(0).currentTime = videoData[listNum].time2;
                        }
                        videoBeginTime = (new Date()).valueOf();
                        $(document).keyup(function (n) {
                            //console.log(n.keyCode);
                            if(n.keyCode == 13 && videoBegin == 0) {
                                videoBegin = 1;
                                alert("开始测试");
                                videoBeginTime = (new Date()).valueOf();
                                videoTimeInfo = [];
                            }
                            else if(n.keyCode == 13 && videoBegin == 1) {
                                videoBegin = 2;
                                alert("结束测试");
                                var videoTarInfo = {};
                                videoTarInfo['name'] = parseInt(videWarp.val()) + 1;
                                videoTarInfo['time'] = ((new Date()).valueOf() - videoBeginTime) / 1000;
                                console.log(videoTarInfo);
                                videoTimeInfo.push(videoTarInfo);
                                console.log(videoTimeInfo);
                                $.each(videoTimeInfo, function(n, v){
                                    videoDataShow.append(
                                        $('<p>').text('台：' + v['name'] + '，时长：' + v['time'])
                                    );
                                });
                                //videoDataShow.text(videoTimeInfo);
                                videoDataShow.show();
                            }
                            if(n.keyCode == 40) {
                                listNum ++;
                            }
                            if(n.keyCode == 38) {
                                listNum --;
                            }
                            if(listNum < 0) {
                                listNum = 0;
                            }
                            if(listNum > maxNum) {
                                listNum = maxNum;
                            }
                            //console.log(videoData[listNum].name);
                            if(videWarp.val() != listNum) {
                                //console.log(videWarp.val());
                                var videoTarInfo = {};
                                videoTarInfo['name'] = parseInt(videWarp.val()) + 1;
                                videoTarInfo['time'] = ((new Date()).valueOf() - videoBeginTime) / 1000;
                                console.log(videoTarInfo);
                                videoTimeInfo.push(videoTarInfo);
                                console.log(videoTimeInfo);
                                videWarp.val(listNum);
                                videoTar.get(0).src = data.location + '/' + videoData[listNum].name + '.' + videoData[listNum].format;
                                if(timeSelect == 1){
                                    videoTar.get(0).currentTime = videoData[listNum].time1;
                                }
                                if(timeSelect == 2){
                                    videoTar.get(0).currentTime = videoData[listNum].time2;
                                }
                                videoBeginTime = (new Date()).valueOf();
                                //videoTar.get(0).currentTime = videoData[listNum].time;
                                videoInfo.text(listNum + 1 + '台');
                                /*videWarp.empty().append(
                                    $('<video>').attr({
                                        'src':data.location + '/' + videoData[listNum].name + '.' + videoData[listNum].format,
                                        'autoplay':'autoplay',
                                        'loop':'loop',
                                        'width':'100%',
                                        'height':'100%',
                                        'class':'video-tar'
                                    }),
                                    $('<div>').addClass('video-info').text(listNum + 1 + '台')
                                )*/
                            }
                        })
                    });

                }
        }).state('6',{
            url:'/jisuan',
            templateUrl:'tpls/jisuan.html',
            controller:function($scope){
                $scope.indexAnimate = false;
                var leijia = function (a,b,n,x) {
                    var re = 1;
                    for(var i=1;i<n;i++){
                        //console.log(Math.pow(i,2));
                        re = re + a * Math.pow(i,b)
                    }
                    re = re * x / n;
                    return re;
                };
                //console.log(leijia(1,2,2,1));
                var liucun = function(a,b,n,x){
                    var dau = 0;
                    for(var i = 1;i <= n;i ++) {
                        dau = dau + leijia(a,b,i,x);
                    }
                    return dau;
                };
                console.log(leijia(0.2081,-0.329,180,7000),liucun(0.2081,-0.329,180,7000))
            }
        })
    });
    myAngularApp.run(function(){
        console.log('run')
    });
})();

