/*
 * jQuery buildMenu v 1.0
 *
 * Copyright 2015, Kylaksizov Vladymyr | http://kylaksizov.ru
 * Free to use
 * 
The MIT License (MIT)

Copyright (c) 2016 Kylaksizov Vladymyr <masterz1zzz@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

 */
(function($){
    
    jQuery.fn.buildMenu = function(options){
        options = $.extend({
            
            menuHide: true,       // true - скрывать меню, false - не скрывать // todo это тест
            speedShowMenu: 300,   // скорость появления меню
            speedHideMenu: 500,   // скорость скрытия меню
            startBuild: 50,       // сколько пикселов нужно прокрутить от верха, что бы появлялось меню?
            scrollTopBlock: 50,   // отступ сверху до активного блока при нажатии на меню
            jointMenu: 1,         // cколько пунктов меню оставлять слева
            activeMenu: "center", // инициализация активного пункта меню при появлении блока на экране
                                  //(количество пикселов от верхней границы окна браузера до блока px|"center")
            speedScroll: 1000     // скорость прокрутки блоков при нажатии на меню
            
        }, options);
        
        var i = 1;
        
        $("body").append('<div class="buildMenu"><div class="ov_menu"><ul></ul></div></div>');
        
        var make = function(){
        
            $(this).each(function () {
                $(this).attr("id", "bm_" + i);
                var iconClass = [];
                iconClass[1] = "";
                var m = $(this).text();
                var listElement = '<li><a href="#bm_' + i + '" class="scroll" id="buildm_' + i + '">' + m + '</a></li>';
                $(".buildMenu ul").append(listElement);
                i++;
                
            });
            
            $(".scroll").click(function () {
                var elementClick = $(this).attr("href");
                var destination = $(elementClick).offset().top - options.scrollTopBlock;
                $('html, body').stop(true,false).animate({ scrollTop: destination }, options.speedScroll);
                return false; 
            });
            
            $res_iu = i-1;
            $res_i = $res_iu++;
            var result_i = 0;
            
            $(document).scroll(function () {
                
                s_top = $(document).scrollTop();
                height_menu = $(".buildMenu").height();
                if(options.menuHide === true){                
                    if(s_top >= options.startBuild){
                        $(".buildMenu").stop(true,false).animate({
                            "top": "0",
                        }, options.speedShowMenu);
                    } else{
                        $(".buildMenu").stop(true,false).animate({
                            "top": "-" + height_menu + "px",
                        }, options.speedHideMenu);
                    }
                } else{
                    $(".buildMenu").css("top", "0");
                }
                
                h_doc = $(window).height();
                
                if(options.activeMenu == "center"){
                    activeMenu = h_doc / 2;
                } else{
                    activeMenu = options.activeMenu;
                }
                
                for(i = $res_i; i >= 1; i--){
                    yes = $("#bm_" + i).offset().top - activeMenu;
                    if(s_top > yes){
                        result_i = i;
                        cont = $("#bm_"+result_i).text();
                        $('.scroll').removeClass("active_buildMenu");
                        $('.scroll:contains("'+cont+'")').addClass("active_buildMenu");
                        break;
                    }
                }
                
                this_element = $(".active_buildMenu").text();
                var w_a_el = 0;
                var w_menu = 0;
                
                $(".ov_menu li").each(function(index){
                    if(index+1+options.jointMenu < result_i){
                        w_a_el += parseInt($(this).width()); // сумма ширины всех ли до активного
                    }
                    w_menu += parseInt($(this).width()); // Ширина всего меню
                })
                
                w_doc = $(document).width();
                result_s = w_menu - w_doc;
                result_w_a_el = w_a_el;
                
                if(result_w_a_el > result_s){
                    result_w_a_el = result_s;
                }
                
                $(".buildMenu ul").css("marginLeft","-"+result_w_a_el+"px");
                
            });
        
        };
        
        return this.each(make); 
    
    };

})(jQuery);