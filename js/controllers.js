var myAngularCtrls=angular.module("MyAngularCtrls",[]);myAngularCtrls.controller("tpls",["$scope","$state","$http","$location",function($scope,$state,$http,$location){$scope.indexAnimate=!0,$scope.ottPanels=["1","2","3","4","5","6"],console.log("route1"),$http.get("/testData.json").success(function(data,status,headers,config){}),console.log($location.path()),setTimeout(function(){AKH.init()},200)}]);
//# sourceMappingURL=controllers.js.map