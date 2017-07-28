!function(){"use strict";var myAngularApp=angular.module("MyAngularApp",["ui.router","ngAnimate","MyAngularCtrls","MyAngularDir","MyAngularFilter"]);myAngularApp.config(function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/main"),$stateProvider.state("main",{url:"/main",templateUrl:"tpls/main.html",controller:function($scope,$timeout){$scope.indexAnimate=!0,$scope.ottPanels=["djw","2","3","4","5","6"],$scope.$on("$stateChangeSuccess",function(){$timeout(function(){"undefined"!=typeof AKH&&AKH?(AKH.init(),console.log("AKH")):"undefined"!=typeof akh&&akh?(akh.init(),console.log("akh")):console.log("akh not found")},500)})},onEnter:function(){console.log("onEnter")},onExit:function(){console.log("onExit")}}).state("djw",{url:"/djw",templateUrl:"tpls/djw.html",controller:function($scope,$timeout,$state){$scope.indexAnimate=!1,$scope.viewAnimate=!0,$scope.djwNums=[!1,!1,!0,!0,!1,!0,!0,!0],$scope.djwLi=function(vipbool){$scope.vipbool=vipbool},$scope.bigVideo=function(vipbool){console.log("big video:",vipbool),console.log("window index",window.videoIndex),vipbool?$state.go("djw.djw-vip"):$state.go("djw.djw-fs")},console.log("djw"),$scope.$on("$stateChangeSuccess",function(){console.log("djw 开始加载完成 开始加载自定义js"),$timeout(function(){window.videoIndex||(window.videoIndex=1);var top=0,scrollList=function(){var $target=jQuery(".focusBtn.on.djw-li");if($target.length>0){var $parent=$target.parent(),$dr=$(".djw-right"),tOffset=$target.offset(),dOffset=$dr.offset(),tmp0=tOffset.top-dOffset.top+$target.height()-$dr.height(),tmp1=tOffset.top-dOffset.top;tmp0>0?(top-=tmp0,$parent.css({top:top})):tmp1<0&&(top-=tmp1,$parent.css({top:top}))}};console.log("video index:",window.videoIndex),"undefined"!=typeof AKH&&AKH?(AKH.init(window.videoIndex),setTimeout(function(){scrollList()},30),console.log("AKH")):"undefined"!=typeof akh&&akh?(akh.init(),console.log("akh")):console.log("akh not found"),AKH.allBtns.eq(window.videoIndex).find(".glyphicon-play").addClass("play"),jQuery(document).on("keyup",function(){scrollList()}),jQuery(".djw-l-video").addClass("djw-l-loading"),jQuery(".djw-li").on("click",function(){var $this=jQuery(this),$play=$this.find(".glyphicon-play"),$vip=$this.find(".vip-in");window.videoIndex=$this.index()+1,console.log("vip length",$vip.length),$vip.length<=0?$play.hasClass("play")&&$state.go("djw.djw-fs"):$play.hasClass("play")&&$state.go("djw.djw-vip"),jQuery(".play").removeClass("play"),$play.addClass("play"),jQuery(".djw-l-video").removeClass("djw-l-loading"),setTimeout(function(){jQuery(".djw-l-video").addClass("djw-l-loading"),$vip.length>0},300)})},500)})}}).state("djw.djw-fs",{url:"/djw_fs",views:{fs:{templateUrl:"tpls/djw_fullscreen.html",controller:function($scope){console.log("fs 开始"),$scope.viewAnimate=!1}}}}).state("djw.djw-vip",{url:"/djw_vip",views:{fs:{templateUrl:"tpls/djw_vip.html",controller:function($scope){$scope.viewAnimate=!1}}}}).state("2",{url:"/djw",templateUrl:"tpls/duojiwei.html",controller:function($scope){$scope.indexAnimate=!1,$scope.user={userName:"nuomi74859",passWord:""},$scope.save=function(){alert("保存数据")}}}).state("3",{url:"/test",templateUrl:"tpls/test.html",controller:function($scope){$scope.indexAnimate=!1,$scope.user={userName:"nuomi74859",passWord:""},$scope.save=function(){alert("保存数据")}}}).state("4",{url:"/velocity",templateUrl:"tpls/velocity.html",controller:function($scope){$scope.indexAnimate=!1}}).state("5",{url:"/video",templateUrl:"tpls/video.html",controller:function($scope,$http){$scope.indexAnimate=!1;var videoBeginTime,listNum=0,videWarp=$("#video-warp"),videoTar=$(".video-tar"),videoInfo=$(".video-info"),videoDataShow=$(".video-data"),videoBegin=0,videoTimeInfo=[];videWarp.val(listNum),$http.get("/videoData.json").success(function(data){var videoData=data.videoList,timeSelect=data.timeSelect,maxNum=videoData.length-1;1==timeSelect&&(videoTar.get(0).currentTime=videoData[listNum].time1),2==timeSelect&&(videoTar.get(0).currentTime=videoData[listNum].time2),videoBeginTime=(new Date).valueOf(),$(document).keyup(function(n){if(13==n.keyCode&&0==videoBegin)videoBegin=1,alert("开始测试"),videoBeginTime=(new Date).valueOf(),videoTimeInfo=[];else if(13==n.keyCode&&1==videoBegin){videoBegin=2,alert("结束测试");var videoTarInfo={};videoTarInfo.name=parseInt(videWarp.val())+1,videoTarInfo.time=((new Date).valueOf()-videoBeginTime)/1e3,console.log(videoTarInfo),videoTimeInfo.push(videoTarInfo),console.log(videoTimeInfo),$.each(videoTimeInfo,function(n,v){videoDataShow.append($("<p>").text("台："+v.name+"，时长："+v.time))}),videoDataShow.show()}if(40==n.keyCode&&listNum++,38==n.keyCode&&listNum--,listNum<0&&(listNum=0),listNum>maxNum&&(listNum=maxNum),videWarp.val()!=listNum){var videoTarInfo={};videoTarInfo.name=parseInt(videWarp.val())+1,videoTarInfo.time=((new Date).valueOf()-videoBeginTime)/1e3,console.log(videoTarInfo),videoTimeInfo.push(videoTarInfo),console.log(videoTimeInfo),videWarp.val(listNum),videoTar.get(0).src=data.location+"/"+videoData[listNum].name+"."+videoData[listNum].format,1==timeSelect&&(videoTar.get(0).currentTime=videoData[listNum].time1),2==timeSelect&&(videoTar.get(0).currentTime=videoData[listNum].time2),videoBeginTime=(new Date).valueOf(),videoInfo.text(listNum+1+"台")}})})}}).state("6",{url:"/jisuan",templateUrl:"tpls/jisuan.html",controller:function($scope){$scope.indexAnimate=!1;var leijia=function(a,b,n,x){for(var re=1,i=1;i<n;i++)re+=a*Math.pow(i,b);return re=re*x/n},liucun=function(a,b,n,x){for(var dau=0,i=1;i<=n;i++)dau+=leijia(a,b,i,x);return dau};console.log(leijia(.2081,-.329,180,7e3),liucun(.2081,-.329,180,7e3))}})}),myAngularApp.run(function(){console.log("run")})}();
//# sourceMappingURL=app.js.map