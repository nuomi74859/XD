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

                        //console.log('$viewContentLoaded');

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
                    $scope.djwNums = [1,1,1,1,1,1,1];
                    console.log('djw');
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
                            var top = 0;
                            (function($){
                                $(document).on('keydown', function(){
                                    var $target = $('.focusBtn.on.djw-li');
                                    var $parent = $target.parent();
                                    var $dr = $('.djw-right');
                                    var tOffset = $target.offset(), dOffset = $dr.offset();
                                    console.log(tOffset,dOffset);
                                    var tmp = tOffset.top - dOffset.top + $target.height() - $dr.height();
                                    console.log(tmp);
                                    if(tmp > 0) {
                                        top = top - tmp;
                                        $parent.animate({
                                            'top':top
                                        },200);
                                        console.log('work',top);
                                    }
                                });
                            })(jQuery);
                        },500);

                        console.log('$viewContentLoaded')
                    });
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

