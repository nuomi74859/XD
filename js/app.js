!function(){"use strict";var myAngularApp=angular.module("MyAngularApp",["ui.router","ngAnimate","MyAngularCtrls","MyAngularDir","MyAngularFilter"]);myAngularApp.config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/main"),$stateProvider.state("main",{url:"/main",templateUrl:"/tpls/main.html",controller:function($scope){$scope.indexAnimate=!0,$scope.ottPanels=["duojiwei","2","3","4","5","6"],$scope.$on("$viewContentLoaded",function(){AKH.init(),console.log("$viewContentLoaded")})},onEnter:function(){console.log("onEnter")},onExit:function(){console.log("onExit")}}).state("duojiwei",{url:"/duojiwei",templateUrl:"/tpls/duojiwei.html",controller:function($scope){$scope.indexAnimate=!1,console.log("duojiwei"),$scope.$on("$viewContentLoaded",function(){AKH.init(),console.log("$viewContentLoaded")})}}).state("2",{url:"/duojiwei",templateUrl:"/tpls/duojiwei.html",controller:function($scope){$scope.indexAnimate=!1,$scope.user={userName:"nuomi74859",passWord:""},$scope.save=function(){alert("保存数据")}}}).state("3",{url:"/test",templateUrl:"/tpls/test.html",controller:function($scope){$scope.indexAnimate=!1,$scope.user={userName:"nuomi74859",passWord:""},$scope.save=function(){alert("保存数据")}}}).state("4",{url:"/velocity",templateUrl:"/tpls/velocity.html",controller:function($scope){$scope.indexAnimate=!1}})}),myAngularApp.run(function(){console.log("run")})}();
//# sourceMappingURL=app.js.map