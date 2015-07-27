(function($){
    'use strict';
    if (navigator.userAgent.indexOf('Windows') > 0) {
        $(document).keyup(function (e) {
            akh.keymove(e.keyCode);
            return false;
        });
    } else {
        window.keycodes = {
            left: 21,
            right: 22,
            up: 19,
            down: 20,
            esc: 4,
            enter: 23
        };
        if (window.top.specialMessager) {
            window.top.specialMessager.keyDown = function (key) {
                akh.keymove(window.keycodes[key]);
            }
        }
    }
    window.keymove = function ($key) {
        if(window.starcorExt){}else{
            akh.keymove($key);
        }
    };

    var btns;

    var androidKeyHandler = function () {
        this.target = 'focusBtn:visible';
        this.focusClass = 'on';
        this.parent = 'body';
        if (navigator.userAgent.indexOf('Windows') > 0) {
            this.keyNum = [13, 37, 38, 39, 40, 192];
        } else {
            this.keyNum = [23, 21, 19, 22, 20, 4];
        }
        this.btns = '';
        this.cur_btn = '';
    };
    androidKeyHandler.prototype = {
        init: function ($start) {
            var self = this;
            self.btns = $(self.parent + ' .' + self.target);

            self.btns.each(function (index, element) {
                var o = $(element), offset = o.offset();

                o.data('l', offset.left).data('t', offset.top);

            });
            var focusBtn = '';
            if ($start instanceof jQuery) {
                $(self.parent + ' .' + self.focusClass).removeClass(self.focusClass);
                focusBtn = $start;
            } else {
                if (typeof $start != 'undefined' && $start >= 0) {
                    $(self.parent + ' .' + self.focusClass).removeClass(self.focusClass);
                    focusBtn = self.btns.eq($start);
                } else {
                    if ($(self.parent).find('.' + self.defaultBtn).length > 0) {
                        focusBtn = $(self.parent).find('.' + self.defaultBtn).eq(0);
                    } else if ($(self.parent + ' .' + self.focusClass + ':visible').length > 0) {
                        focusBtn = $(self.parent + ' .' + self.focusClass + ':visible').eq(0);
                    } else {
                        focusBtn = self.btns.eq(0);
                    }
                }
            }
            self.currentBtnElement = focusBtn;
            self.currentBtnElement.addClass(self.focusClass);
        },
        keymove: function ($key) {
            var self = this, keyNum = self.keyNum;
            self.cur_btn = $(self.parent + ' .' + self.target + '.' + self.focusClass);

            if ($key == keyNum[0] || $key == 66) {
                self.cur_btn.click();
            }

            if ($key == keyNum[5]) {
                if(window.starcorExt){
                    starcorExt.closeBrowser('1');
                }else{
                    window.top.specialMessager.quit();
                }
            }


            if ($key == keyNum[1]) {
                self.filterBtn(self.btns, 'left');
            }

            if ($key == keyNum[2]) {
                self.filterBtn(self.btns, 'up');
            }

            if ($key == keyNum[3]) {
                self.filterBtn(self.btns, 'right');
            }

            if ($key == keyNum[4]) {
                self.filterBtn(self.btns, 'down');
            }
        },
        filterBtn: function ($btns, $direction) {
            var self = this, newBtn = '', range = 0, range2 = 0, cur_btn = self.cur_btn;
            var b = [];
            b['l'] = cur_btn.data('l');
            b['t'] = cur_btn.data('t');
            b['w'] = cur_btn.width();
            b['h'] = cur_btn.height();
            b['x'] = b['l'] + b['w'] / 2;
            b['y'] = b['t'] + b['h'] / 2;

            var r;
            $btns.each(function (index, element) {
                var o = $(element), a = [];
                a['l'] = o.data('l');
                a['t'] = o.data('t');
                a['w'] = o.width();
                a['h'] = o.height();
                a['x'] = a['l'] + a['w'] / 2;
                a['y'] = a['t'] + a['h'] / 2;
                if ($direction == 'up') {
                    if ((a['l'] + a['w']) < b['l'] || a['l'] > (b['l'] + b['w'])) {

                    } else {
                        if ((a['t'] + a['h']) <= b['t'] + 1) {
                            r = self.distance(b['x'], b['t'], a['x'], a['y']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }
                }

                if ($direction == 'down') {
                    if ((a['l'] + a['w']) < b['l'] || a['l'] > (b['l'] + b['w'])) {

                    } else {
                        if (a['t'] > b['t']) {
                            r = self.distance(b['l'], b['t'] + b['h'], a['l'], a['t']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }
                }

                if ($direction == 'left') {
                    if ((a['t'] + a['h']) < b['t'] || a['t'] > (b['t'] + b['h'])) {

                    } else {
                        if ((a['l'] + a['w']) <= b['l']) {

                            r = self.distance(b['l'], b['t'], a['l'] + a['w'], a['t']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }
                }

                if ($direction == 'right') {
                    if ((a['t'] + a['h']) < b['t'] || a['t'] > (b['t'] + b['h'])) {

                    } else {
                        if ((a['l']) >= (b['l'] + b['w'])) {

                            r = self.distance(b['l'] + b['w'], b['t'], a['l'], a['t']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }
                }
            });

            if (newBtn == '') {
                $btns.each(function (index, element) {
                    var o = $(element), a = [];
                    a['l'] = o.data('l');
                    a['t'] = o.data('t');
                    a['w'] = o.width();
                    a['h'] = o.height();
                    a['x'] = a['l'] + a['w'] / 2;
                    a['y'] = a['t'] + a['h'] / 2;

                    if ($direction == 'up') {
                        if ((a['t'] + a['h']) < b['t']) {
                            r = self.distance(b['x'], b['y'], a['x'], a['y']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }

                    if ($direction == 'down') {
                        if (a['t'] > b['t']) {
                            r = self.distance(b['x'], b['y'], a['x'], a['y']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }


                    if ($direction == 'left') {
                        if ((a['l'] + a['w']) < b['l']) {
                            r = self.distance(b['x'], b['y'], a['x'], a['y']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }

                    if ($direction == 'right') {
                        if (a['l'] > (b['l'] + b['w'])) {
                            r = self.distance(b['x'], b['y'], a['x'], a['y']);
                            if (newBtn == '') {
                                newBtn = o;
                                range = r;
                            } else {
                                if (r < range) {
                                    range = r;
                                    newBtn = o;
                                }
                            }
                        }
                    }

                });
            }
            if (newBtn != '') {
                self.setCurBtn(newBtn);
            } else {
            }
        },
        setCurBtn: function ($btn) {
            var self = this;
            self.cur_btn.removeClass(self.focusClass);
            $btn.addClass(self.focusClass);
            self.cur_btn = $btn;
            return $btn;
        },
        distance: function (x1, y1, x2, y2) {
            var calX = x2 - x1;
            var calY = y2 - y1;
            return Math.pow((calX * calX + calY * calY), 0.5);
        },
        checkMask: function () {

        }
    };

    window.akh = new androidKeyHandler();
    akh.init();
})(jQuery);