$(function(){

    //menu
    var menuBtn = $('.js-menu-btn');
    menuBtn.click(function(e){
        e.preventDefault();
        menuBtn.toggleClass('act');
    });

    [1,2].every(function (value) {
        var overlay = $('.js-overlay-' + value);
        var overlayInner = $('.js-overlay-' + value + ' .js-popup-inner');

        $('.js-popup-btn-' + value).click(function(e){
            e.preventDefault();
            var target = $(this).data('target');
            overlay.fadeIn();
            if(value === 1){
                overlay.find('.radio-row label').eq(target).trigger('click');
            }
        });

        //если кликнули вне контента попапа, то закрываем блок
        overlay.click(function(e) {
            var $target = $(e.target);
            if (!$target.closest(overlayInner).length){
                $('.overlay').fadeOut();
            }
        });

        return true;
    });

    if($('.js-overlay-2').length){
        var isFriday = $.cookie('winter');
        if(isFriday !== '1'){
            $('.js-overlay-2').fadeIn();
            $.cookie('winter', '1',{'expires' : 7});
        }
    }


    new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: false,
        live: true
    }).init();

    $('.js-demo a').fancybox({
        helpers: {
            overlay: {
                locked: false
            }
        },
        padding: 20
    });


    $('.examples ul').bxSlider({
        auto: true,
        pager: false,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        slideWidth: 380,
        shrinkItems: true
    });

    $(window).scroll(function(){
        if($(window).scrollTop()> 300){
            if(!$('.fixed-panel').hasClass('act')) $('.fixed-panel').addClass('act');
            $('.header .menu-btn').removeClass('act');
        }else{
            $('.fixed-panel').removeClass('act');
            $('.fixed-panel .menu-btn').removeClass('act');
        }
    });

    $('.scroll-bottom').click(function(){
        $('body').animate({scrollTop: $('.question').offset().top}, 300);
        return false;
    });

    $('form').each(function () {
        var form = $(this);
        var formEvent = form.data('ya');
        var validateField = function(input){
            var ok = true;
            if(input.attr('type') === 'email'){
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                if(!emailReg.test(input.val())){
                    ok = false;
                }
            }

            if(input.hasClass('js-form-field-required') && input.val().trim() === ""){
                ok = false;
            }

            input.toggleClass('error', !ok);
            return ok;
        };

        var validate = function () {
            var ok = true;
            form.find('.js-form-field').each(function () {
                ok = validateField($(this)) && ok;
            });
            return ok;
        };


        form.on('submit', function (e) {
            e.preventDefault();
            if(validate()){
                var data = form.serialize();
                var fio = form.find('.js-fio').val();
                var email = form.find('.js-email').val();
                form.html("<p class='success-message'>Спасибо за обращение!<br />Мы отреагируем на него максимально оперативно!</p>");
                $.ajax({
                    'method' : 'post',
                    'url' : '/site/message',
                    'data' : data,
                    'success' : function (answer) {
                        if(answer){
                            if(window.yaCounter26939808 && formEvent){
                                window.yaCounter26939808.reachGoal(formEvent, {
                                    'fio' : fio,
                                    'email' : email
                                });
                            }
                        }else{
                            form.html("<p class='error-message'>" +
                                "Возникла непредвиденная ошибка и мы не смогли зарегистрировать ваше сообщение.<br />" +
                                "Просим вас написать нам на нашу почту <a href='mailto:contact@jstore.me'>contact@jstore.me</a></p>"
                            );
                        }
                    },
                    'error' : function () {
                        form.html("<p class='error-message'>" +
                            "Возникла непредвиденная ошибка и мы не смогли зарегистрировать ваше сообщение.<br />" +
                            "Просим вас написать нам на нашу почту <a href='mailto:contact@jstore.me'>contact@jstore.me</a></p>"
                        );
                    }
                });
            }
        });

        form.find('.js-form-field').blur(function () {
            validateField($(this));
        });

        form.find('.js-phone').mask('+7(000)000 00 00');
    });

});