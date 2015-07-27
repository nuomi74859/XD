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
                controller:function($scope){
                    $scope.indexAnimate = true;
                    $scope.ottPanels = ['duojiwei','2','3','4','5','6'];

                    //视图加载完毕后
                    $scope.$on('$viewContentLoaded',function(){


                        AKH.init();
                        console.log('$viewContentLoaded')
                    });
                    //setTimeout(function(){
                    //    AKH.init();
                    //},2000);
                },
                onEnter:function(){

                    console.log('onEnter')
                },
                onExit:function(){
                    console.log('onExit');
                    //$('.focusBtn').off();
                }
            }
        ).state('duojiwei',{
                url:'/duojiwei',
                templateUrl:'/tpls/duojiwei.html',
                controller:function($scope,$timeout){
                    $scope.indexAnimate = false;
                    console.log('duojiwei');
                    $scope.$on('$viewContentLoaded',function(){


                        AKH.init();
                        console.log('$viewContentLoaded')
                    });
                    //setTimeout(function(){
                    //    AKH.init();
                    //},2000);
                }
            }
        ).state('2',{
                url:'/duojiwei',
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
                    //setTimeout(function(){
                    //    AKH.init();
                    //},2000);
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

