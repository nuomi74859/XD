(function($){
    'use strict';
    $(document).ready(function (e) {

        var UA = navigator.userAgent, OS = '';
        if (UA.indexOf('Android') >= 0) {
            OS = 'Android';
        } else if (UA.indexOf('Windows') >= 0) {
            OS = 'Windows';
        } else if (UA.indexOf('MAC OS X') >= 0) {
            OS = 'Android';
        }else if(UA.indexOf('SmartHub') >= 0){
            OS = 'Samsung';
        }


        var androidKeyHandler = function () {
            this.container = 'html';
            this.selector = 'focusBtn:visible';
            this.layout = 'layout';
            this.highlight = 'on';
            this.disableClass = 'gray';
            this.selected = 'sel';
            this.inputing = "inputing";
            this.specialCharacters = ['@', '~', '!', '_', '-', '#', '&', '*', '(', ')'];
            this.disable = false;
            this.debug = false;
            this.initAgain = false;


            this.allBtns = '';
            this.highilghtElement = '';
            this.keyboardOpen = false;
            this.inputingElement = '';
            this.backEvent = '';
            this.KEYS = {
                "ENTER": 13,
                "LEFT": 37,
                "UP": 38,
                "RIGHT": 39,
                "DOWN": 40,
                "BACK": 27,
                "DEL": 46
            };

            if (OS == 'Android' || OS == 'Samsung') {
                this.KEYS = {
                    "ENTER": 23,
                    "LEFT": 21,
                    "UP": 19,
                    "RIGHT": 22,
                    "DOWN": 20,
                    "BACK": 4,
                    "DEL": 67
                };
            }
        };
        androidKeyHandler.prototype = {
            init: function ($start) {
                AKH.allBtns = $(AKH.container + ' .' + AKH.selector).not('.'+AKH.disableClass).add($('.' + AKH.inputing));

                console.log(AKH.allBtns);
                AKH.allBtns.each(function (index, element) {
                    var o = $(element), offset = o.offset();


                    if(o.data('pos') && o.data('pos').indexOf('|')>0){
                        var posArr = o.data('pos').split('|');
                        if(posArr.length == 4){
                            o.data('w',+posArr[0]);
                            o.data('h',+posArr[1]);
                            o.data('l',+posArr[2]);
                            o.data('t',+posArr[3]);

                            o.data('r', o.data('l') + o.data('w'));
                            o.data('b', o.data('t') + o.data('h'));
                        }
                    }else{
                        o.data('w', o.outerWidth());
                        o.data('h', o.outerHeight());

                        o.data('t', offset.top)
                            .data('r', offset.left + o.data('w'))
                            .data('b', offset.top + o.data('h'))
                            .data('l', offset.left);
                    }

                });

                if ($start instanceof jQuery) {
                    $(AKH.container + ' .' + AKH.highlight + ':visible').removeClass(AKH.highlight);
                    AKH.highilghtElement = $start;
                } else {

                    if (typeof $start != 'undefined' && $start >= 0) {
                        $(AKH.container + ' .' + AKH.highlight + ':visible').removeClass(AKH.highlight);
                        AKH.highilghtElement = AKH.allBtns.eq($start);
                    } else {

                        if ($(AKH.container + ' .' + AKH.highlight + ':visible').length > 0) {
                            AKH.highilghtElement = $(AKH.container + ' .' + AKH.highlight + ':visible').eq(0);
                        } else {

                            AKH.highilghtElement = AKH.allBtns.eq(0);
                        }
                    }
                }

                if(!AKH.debug){
                    AKH.debugMsg.clear();
                }


                AKH.highilghtElement.trigger('focusIn');
                AKH.highilghtElement.addClass(AKH.highlight);

                AKH.debugMsg.push('AKH init....');
            },

            keyEvent: function ($keyCode, $type) {
                AKH.keyCode = $keyCode;


                $('body').trigger('keyEvent');



                if (AKH.disable && $keyCode != AKH.KEYS.BACK) {
                    AKH.debugMsg.push('按键: ' + $keyCode + ' ( AKH.disable=' + AKH.disable + ' )');
                    return false;
                }


                if ($keyCode == AKH.KEYS.ENTER || $keyCode == 66) {
                    if (AKH.inputingElement == '' && AKH.isInput(AKH.highilghtElement) && !AKH.highilghtElement.hasClass(AKH.inputing)) {
                        AKH.debugMsg.push('open keyboard');
                        AKH.keyboardShow(AKH.highilghtElement);
                    } else {
                        if (AKH.highilghtElement != '') {
                            if (AKH.highilghtElement.is('a')) {
                                var href = AKH.highilghtElement.attr('href');
                                if (href != '' && typeof href != 'undefined' && href.indexOf('javascript') < 0) {
                                    location.href = href;
                                }else{
                                    AKH.highilghtElement.click();
                                }
                            } else {
                                AKH.highilghtElement.trigger('click');
                            }
                        }
                    }
                    return false;
                }





                if(AKH.highilghtElement.attr('scroll') == 'true'){
                    var mustReturn = false,scrollElem = AKH.highilghtElement.find('.scrollElem'),scrollElemMagrinTop = Math.abs(+scrollElem.css('marginTop').replace('px','')),scrollElemHeight = scrollElem.outerHeight(),scrollBoxHeigh = AKH.highilghtElement.innerHeight();

                    if(scrollElemHeight > scrollBoxHeigh){

                        if ($keyCode == AKH.KEYS.UP) {
                            if(scrollElemMagrinTop != 0 ||  scrollElemMagrinTop > 0){
                                if((scrollElemMagrinTop-260)<0){
                                    scrollElemMagrinTop = 260;
                                }
                                scrollElem.stop().animate({'marginTop':'-'+(scrollElemMagrinTop-260)+'px'},200);
                                mustReturn =true;
                            }
                        }
                        //向下
                        if ($keyCode == AKH.KEYS.DOWN) {
                            if(scrollElemMagrinTop==0 || scrollElemMagrinTop < (scrollElemHeight - scrollBoxHeigh)){
                                if( (scrollElemMagrinTop+260) > (scrollElemHeight - scrollBoxHeigh)) {
                                    scrollElemMagrinTop = (scrollElemHeight - scrollBoxHeigh)-260;
                                }
                                scrollElem.stop().animate({'marginTop':'-'+(scrollElemMagrinTop+260)+'px'},200);
                                mustReturn =true;
                            }
                        }
                        if(mustReturn){


                            return false;
                        }
                    }
                }


                if ((OS == 'Android') && $keyCode >= 7 && $keyCode <= 16) {
                    if (AKH.inputingElement != '') {
                        AKH.inputingElement.val(AKH.inputingElement.val() + ($keyCode - 7));
                    }
                }


                if ($keyCode == AKH.KEYS.DEL) {
                    if (AKH.inputingElement != '') {
                        AKH.delInputVal(AKH.inputingElement);
                    }
                }


                if ($keyCode == AKH.KEYS.BACK) {

                    if (typeof AKH.backEvent == 'function') {
                        AKH.backEvent.apply();
                    }else {
                        if (AKH.backEvent == '' || typeof AKH.backEvent == 'undefined') {
                            window.history.go(-1);
                        }
                    }
                }

                if (AKH.allBtns.length < 1) {
                    if(!AKH.initAgain){
                        AKH.init();
                        AKH.initAgain = true;
                    }
                    return;
                }

                if ($keyCode == AKH.KEYS.LEFT) {

                    if (AKH.inputingElement != '' && AKH.inputingElement.hasClass(AKH.highlight) && AKH.inputingElement.hasClass(AKH.inputing)) {
                        var cursorIndex = AKH.getCursorPosition(AKH.highilghtElement);
                        if (cursorIndex > 0) {
                            AKH.setCursorPosition(AKH.highilghtElement, cursorIndex - 1)
                        }
                        return false;
                    }
                    AKH.filterBtn(AKH.allBtns, 'L');
                }

                if ($keyCode == AKH.KEYS.UP) {
                    AKH.filterBtn(AKH.allBtns, 'U');
                }


                if ($keyCode == AKH.KEYS.RIGHT) {

                    if (AKH.inputingElement != '' && AKH.inputingElement.hasClass(AKH.highlight) && AKH.inputingElement.hasClass(AKH.inputing)) {
                        var cursorIndex = AKH.getCursorPosition(AKH.highilghtElement);
                        if (cursorIndex < AKH.highilghtElement.val().length) {
                            AKH.setCursorPosition(AKH.highilghtElement, cursorIndex + 1)
                        }
                        return false;
                    }
                    AKH.filterBtn(AKH.allBtns, 'R');
                }

                if ($keyCode == AKH.KEYS.DOWN) {
                    AKH.filterBtn(AKH.allBtns, 'D');
                }
            },

            keyboardShow: function ($obj) {
                var offset = $obj.offset(), keyboardName = 'keyboard_all';
                if ($obj.attr('keyboard')) {
                    keyboardName = $obj.attr('keyboard');
                }
                $('#' + keyboardName).css({
                    left: offset.left,
                    top: offset.top + $obj.outerHeight() + 5
                }).show();
                AKH.container = "#" + keyboardName;
                AKH.backEventCopy = AKH.backEvent;
                AKH.backEvent = function () {
                    AKH.keyboardHide();
                };
                AKH.keyboardOpen = true;
                AKH.inputingElement = $obj;
                $obj.removeClass(AKH.highlight).addClass(AKH.inputing);
                AKH.setCursorPosition($obj, $obj.val().length);
                AKH.init(1);



                $('.keyBoardTargetFlag li').unbind('click').click(function () {
                    var
                        highilghtElement = $(this),
                        input = AKH.inputingElement,
                        cursorIndex = AKH.getCursorPosition(input),
                        val = input.val(),
                        val1 = val.substr(0, cursorIndex),
                        val2 = val.substr(cursorIndex, input.val().length);
                    var keyboardBox = highilghtElement.parent();

                    if (highilghtElement.hasClass('closekeyboard')) {
                        AKH.keyboardHide()
                    } else if (highilghtElement.hasClass('delinput')) {
                        AKH.delInputVal(input);
                    } else if (highilghtElement.hasClass('okbtn')) {
                        AKH.keyboardHide();
                    } else if (highilghtElement.hasClass('lowercase')) {
                        keyboardBox.find('.letter').each(function () {
                            var o = $(this);
                            o.html(o.html().toLowerCase());
                        });
                        highilghtElement.html('大写');
                        highilghtElement.removeClass('lowercase');
                        highilghtElement.addClass('uppercase');
                    } else if (highilghtElement.hasClass('uppercase')) {
                        keyboardBox.find('.letter').each(function () {
                            $(this).html($(this).html().toUpperCase());
                        });
                        highilghtElement.html('小写');
                        highilghtElement.removeClass('uppercase');
                        highilghtElement.addClass('lowercase');
                    } else if (highilghtElement.hasClass('tochar')) {
                        keyboardBox.find('.number').each(function (i) {
                            $(this).html(AKH.specialCharacters[i]);
                        });
                        highilghtElement.html('123');
                        highilghtElement.removeClass('tochar');
                        highilghtElement.addClass('tonumber')
                    } else if (highilghtElement.hasClass('tonumber')) {
                        keyboardBox.find('.number').each(function (i) {
                            $(this).html(i);
                        });
                        highilghtElement.html('字符');
                        highilghtElement.removeClass('tonumber');
                        highilghtElement.addClass('tochar');
                    } else {
                        input.val(val1 + highilghtElement.text() + val2);
                        AKH.setCursorPosition(input, cursorIndex + 1);
                    }

                });
            },


            delInputVal: function ($input) {
                var cursorIndex = AKH.getCursorPosition($input),
                    val = $input.val(),
                    val1 = val.substr(0, cursorIndex),
                    val2 = val.substr(cursorIndex, $input.val().length);
                $input.val(val1.substr(0, val1.length - 1) + val2);
                AKH.setCursorPosition($input, cursorIndex - 1);
            },


            keyboardHide: function () {
                $('.keyBoardTargetFlag').hide();
                AKH.keyboardOpen = false;
                AKH.container = "body";
                AKH.backEvent = AKH.backEventCopy;
                AKH.inputingElement.removeClass(AKH.inputing);
                var index = $(AKH.container + ' .' + AKH.selector).index(AKH.inputingElement);
                AKH.inputingElement.blur();
                AKH.inputingElement = '';
                AKH.init(index);
            },

            filterBtn: function ($btns, $direction) {
                var resultBtn = '', highilghtElement = AKH.highilghtElement;

                var curData = {};
                curData.w = highilghtElement.data('w');
                curData.h = highilghtElement.data('h');

                curData.l = highilghtElement.data('l');
                curData.t = highilghtElement.data('t');
                curData.r = curData.l + curData.w;
                curData.b = curData.t + curData.h;

                curData.x = curData.l + curData.w / 2;
                curData.y = curData.t + curData.h / 2;


                var moveTos = highilghtElement.attr('moveTo');
                if (moveTos && moveTos != '') {
                    moveTos = moveTos.split(',');
                }
                for (var x in moveTos) {
                    if (moveTos[x]) {
                        var moveToData = moveTos[x].split(':');
                        if (moveToData.length > 1 && moveToData[0] == $direction) {
                            if ($.isNumeric(moveToData[1])) {
                                resultBtn = $(AKH.container + ' .' + AKH.selector).eq(+moveToData[1] - 1);
                            } else {
                                if ($(moveToData[1]).length) {
                                    resultBtn = $(moveToData[1]);
                                }
                            }
                        }
                    }
                }


                if (resultBtn == '') {
                    resultBtn = AKH.findTheBtn($btns, $direction, curData, 1);
                }

                if (resultBtn == '') {
                    resultBtn = AKH.findTheBtn($btns, $direction, curData, 0);
                }


                if (resultBtn != '') {
                    AKH.setCurBtn(resultBtn, $direction);
                } else {
                    AKH.debugMsg.push('tvKey no target!!! ');
                }
            },

            hasIntersection: function ($direction, thisData, curData) {

                if ($direction == 'U' || $direction == 'D') {
                    return (Math.abs(thisData.x - curData.x) <= (thisData.w + curData.w) / 2);
                }

                if ($direction == 'L' || $direction == 'R') {
                    return (Math.abs(thisData.y - curData.y) <= (thisData.h + curData.h) / 2);
                }
            },
            findTheBtn: function ($btns, $direction, curData, strict) {
                var newBtn = '', range = 0, r = 0, range2 = 0;


                $btns.each(function (index, element) {

                    var thisBtn = $(element), thisData = {}, goon = true;
                    if(thisBtn.hasClass(AKH.disableClass)){

                    }else{
                        thisData.w = thisBtn.data('w');
                        thisData.h = thisBtn.data('h');

                        thisData.l = thisBtn.data('l');
                        thisData.t = thisBtn.data('t');
                        thisData.r = thisData.l + thisData.w;
                        thisData.b = thisData.t + thisData.h;

                        thisData.x = thisData.l + thisData.w / 2;
                        thisData.y = thisData.t + thisData.h / 2;

                        //console.log(thisBtn[0],thisData)

                        if ($direction == 'U') {

                            if (thisData.b > curData.t) {
                                goon = false;
                            } else {
                                if (strict && !AKH.hasIntersection($direction, thisData, curData)) {
                                    goon = false;
                                }
                            }
                            if (goon) {
                                var
                                    r1 = AKH.distance(curData.x, curData.t, thisData.x, thisData.y),
                                    r2 = AKH.distance(curData.x, curData.t, thisData.l, thisData.b),
                                    r3 = AKH.distance(curData.x, curData.t, thisData.x, thisData.b),
                                    r4 = AKH.distance(curData.l, curData.t, thisData.l, thisData.b),
                                    r = Math.min.apply({}, [r1, r2, r3, r4]);
                                if (newBtn == '') {
                                    newBtn = thisBtn;
                                    range = r;
                                } else {
                                    if (r < range) {
                                        range = r;
                                        newBtn = thisBtn;
                                    }
                                }
                            }
                        }

                        if ($direction == 'D') {
                            if (thisData.t < curData.b) {
                                goon = false;
                            } else {
                                if (strict && !AKH.hasIntersection($direction, thisData, curData)) {
                                    goon = false;
                                }
                            }
                            if (goon) {
                                var
                                    r1 = AKH.distance(curData.x, curData.b, thisData.x, thisData.y),
                                    r2 = AKH.distance(curData.x, curData.b, thisData.l, thisData.t),
                                    r3 = AKH.distance(curData.x, curData.b, thisData.x, thisData.t),
                                    r4 = AKH.distance(curData.l, curData.b, thisData.l, thisData.t),
                                    r5 = AKH.distance(curData.l, curData.b, thisData.x, thisData.t),
                                    r = Math.min.apply({}, [r1, r2, r3, r4, r5]);
                                if (newBtn == '') {
                                    newBtn = thisBtn;
                                    range = r;
                                } else {
                                    if (r < range) {
                                        range = r;
                                        newBtn = thisBtn;
                                    }
                                }
                            }
                        }

                        if ($direction == 'L') {
                            if (thisData.r > curData.l) {
                                goon = false;
                            } else {
                                if (strict && !AKH.hasIntersection($direction, thisData, curData)) {
                                    goon = false;
                                }
                            }
                            if (goon) {
                                var
                                    r1 = AKH.distance(curData.l, curData.y, thisData.x, thisData.y),
                                    r2 = AKH.distance(curData.l, curData.y, thisData.r, thisData.t),
                                    r3 = AKH.distance(curData.l, curData.y, thisData.r, thisData.y),
                                    r4 = AKH.distance(curData.l, curData.t, thisData.r, thisData.t),
                                    r5 = AKH.distance(curData.l, curData.y, thisData.r, thisData.b),
                                    r = Math.min.apply({}, [r1, r2, r3, r4, r5]);
                                if (newBtn == '') {
                                    newBtn = thisBtn;
                                    range = r;
                                } else {
                                    if (r < range) {
                                        range = r;
                                        newBtn = thisBtn;
                                    }
                                }
                            }
                        }

                        if ($direction == 'R') {
                            if (!(thisData.l > curData.r)) {
                                goon = false;
                            } else {
                                if (strict && !AKH.hasIntersection($direction, thisData, curData)) {
                                    goon = false;
                                }
                            }
                            if (goon) {
                                var
                                    r1 = AKH.distance(curData.r, curData.y, thisData.x, thisData.y),
                                    r2 = AKH.distance(curData.r, curData.y, thisData.l, thisData.t),
                                    r3 = AKH.distance(curData.r, curData.y, thisData.l, thisData.y),
                                    r4 = AKH.distance(curData.r, curData.t, thisData.l, thisData.t),
                                    r5 = AKH.distance(curData.r, curData.t, thisData.l, thisData.y),
                                    r = Math.min.apply({}, [r1, r2, r3, r4, r5]);
                                if (newBtn == '') {
                                    newBtn = thisBtn;
                                    range = r;
                                } else {
                                    if (r < range) {
                                        range = r;
                                        newBtn = thisBtn;
                                    }
                                }
                            }
                        }
                    }
                });
                return newBtn;
            },


            setCurBtn: function ($btn, $direction) {
                var curLayout = AKH.highilghtElement.parents('.' + AKH.layout),
                    targetLayout = $btn.parents('.' + AKH.layout) || $btn.parent(),
                    curLayoutBtns = curLayout.find('.' + AKH.selector),
                    curLayoutIndex = curLayoutBtns.index(AKH.highilghtElement);


                if (curLayout[0] != targetLayout[0] && (curLayout.attr('direction') && curLayout.attr('direction').indexOf($direction) < 0)) {
                    return false;
                }

                if (curLayout[0] != targetLayout[0] && !$btn.hasClass(AKH.inputing)) {
                    AKH.debugMsg.push('layout change...');


                    if(curLayout.attr('rmb') == "true"){
                        curLayout.attr('layoutIndex',curLayoutIndex);
                    }

                    if (targetLayout.attr('layoutIndex')) {
                        var index = +targetLayout.attr('layoutIndex');
                        $btn = targetLayout.find('.' + AKH.selector).eq(index);
                    }

                }


                if (AKH.isInput(AKH.highilghtElement) && !AKH.highilghtElement.hasClass(AKH.inputing)) {
                    AKH.highilghtElement.trigger('blur');
                }

                AKH.highilghtElement.removeClass(AKH.highlight);

                AKH.highilghtElement.trigger('focusOut');


                if (AKH.isInput(AKH.highilghtElement)) {
                    AKH.highilghtElement.attr('rename', AKH.highilghtElement.attr('placeholder'));
                } else {
                    AKH.highilghtElement.attr('rename', AKH.highilghtElement.text());
                }
                if (AKH.isInput($btn)) {
                    $btn.attr('rename', $btn.attr('placeholder'));
                } else {
                    $btn.attr('rename', $btn.text());
                }
                AKH.debugMsg.push('焦点： [' + AKH.highilghtElement.attr('rename') + '] 到 [' + $btn.attr('rename') + ']');

                $btn.addClass(AKH.highlight);
                AKH.highilghtElement = $btn;

                $btn.trigger('focusIn');

                return $btn;
            },

            distance: function (x1, y1, x2, y2) {
                var calX = x2 - x1;
                var calY = y2 - y1;
                return  Math.pow((calX * calX + calY * calY), 0.5);
            },

            isInput: function ($obj) {
                return $.inArray($obj.attr('type'), ['text', 'password', 'number', 'email']) >= 0;
            },

            setCursorPosition: function (ctrl, pos) {
                ctrl = ctrl[0];
                if (ctrl.setSelectionRange) {
                    ctrl.focus();
                    ctrl.setSelectionRange(pos, pos);
                    //ctrl.blur();
                }
            },

            getCursorPosition: function (ctrl) {
                ctrl = ctrl[0];
                var CaretPos = 0;
                if (ctrl.selectionStart || ctrl.selectionStart == '0')// Firefox support
                    CaretPos = ctrl.selectionStart;
                return (CaretPos);
            },
            debugMsg: {
                'push': function ($msg) {
                    var box = '';
                    if (AKH.debug) {
                        if ($('#tvKeyDebugBox').length == 0) {
                            box = $('<div id="tvKeyDebugBox" class="tvKeyDebugBox"></div>');
                            box.css({
                                'position': 'absolute',
                                'right': 0,
                                'top': 0,
                                'padding': '6px',
                                'background': 'rgba(0,0,0,0.2)',
                                'color': '#fff',
                                'fontSize': '12px',
                                'zIndex': 99999
                            });
                            $('body').append(box);
                        } else {
                            box = $('#tvKeyDebugBox');
                        }

                        if (box.find('p').length == 20) {
                            box.find('p:last').remove();
                        }
                        box.prepend('<p>' + $msg + '</p>');
                        box.fadeIn();
                        clearTimeout(AKH.debugTimeout);
                        AKH.debugTimeout = setTimeout(function () {
                            box.fadeOut();
                        }, 8000);
                    }else{
                        console.log($msg);
                    }
                },
                'clear': function () {
                    $('#tvKeyDebugBox').hide().html('');
                }
            }
        };

        window.AKH = new androidKeyHandler();
        AKH.OS = OS;
        AKH.UA = UA;





        if (OS == 'Android') {
            if(window.starcorExt){

                if (starcorExt.hasFocus().toString() == "false") {
                    console.log('nofocus exe:4.x.requestFocus');
                    AKH.debugMsg.push('无焦点 exe:4.x.requestFocus');
                    starcorExt.requestFocus();
                } else {
                    AKH.debugMsg.push('取到焦点');
                }

                starcorExt.setKeyEventHandler(function(action, keyCode, keyName, metaState) {
                    AKH.keyEvent(keyCode, 'keymove');
                    AKH.debugMsg.push('按键: ' + keyCode + ' : ' + OS+ ' 4.X');
                });
                AKH.debugMsg.push('setKeyEventHandler .... By 4.x');
            }else{
                window.keymove = function(keyCode){
                    AKH.keyEvent(keyCode, 'keymove');
                    AKH.debugMsg.push('按键: ' + keyCode + ' : ' + OS+ ' 3.X');
                }
            }
        }
        if(OS == 'Windows'){
            $(document).keydown(function (e) {

                var windowsKeys = [13, 37, 38, 39, 40, 27, 46];
                if ($.inArray(e.keyCode, windowsKeys) >= 0) {
                    if (window.AKH) {
                        AKH.keyEvent(e.keyCode, e.type);
                    } else {
                        AKH.debugMsg.push('key envent ');
                    }
                    e.preventDefault();
                    return false;
                } else {
                    AKH.debugMsg.push('按键: ' + e.keyCode + ' : ' + OS);
                }
            });
        }
        if(OS == 'Samsung') {
            window.SamsungKeys = {left: 21,right: 22,up: 19,down: 20,esc: 4,enter: 23};
            if (window.top.specialMessager) {
                window.top.specialMessager.keyDown = function (key) {
                    AKH.keyEvent(window.SamsungKeys[key],'keyup');
                    AKH.debugMsg.push('按键: ' + window.SamsungKeys[key] + ' : ' + OS);

                }
            }
        }


        AKH.debugMsg.push('AKH loaded...By MGTV:imDong');

    });
})(jQuery);