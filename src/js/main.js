$(function(){
    $(".menu-more").click(function () {
        $('#lsp-block-tree').toggleClass('open');
    });
    $(".recommendation-more").click(function () {
        $('.lsp-js-recommendation-items').toggleClass('openFlex');
    });
    $(".happy-hour-more").click(function () {
        $('.lsp-block-hh-product-title').toggleClass('open');
        $('.lsp-block-hh-product-image').toggleClass('open');
        $('.lsp-block-hh-product-desc').toggleClass('open');
        $('.lsp-block-hh-product-prices').toggleClass('open');
        $('.lsp-block-hh-countdown-title').toggleClass('open');
        $('.lsp-block-hh-countdown-time').toggleClass('open');
        $('.lsp-block-hh-add-to-cart').toggleClass('open');
        $('.lsp-block-hh-inner').toggleClass('open');
    });
    $(".lsp-block-gift-more").click(function () {
        $('.lsp-block-js-gift-items').toggleClass('open');
        $('.lsp-block-gift-accept').toggleClass('open');
    });
    $(".cart-more").click(function () {
        $('#lsp-block-cart .lsp-cart-items-list').toggleClass('open');
        $('#lsp-block-cart .lsp-info-message-bottom').toggleClass('open');
    });
});

$(function() {

    window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
    jStoreEvents.push(['pageChanged', null, function (data) {
        $('.show-menu-burger').removeClass('active');
        $('.jstore-block-search').removeClass('open');
        $('#lsp-block-userinfo').removeClass('open');
        $('.dropdown-cart').removeClass('open');
    }]);

    $(".show-menu-burger").click(function () {
        $('.jstore-block-search').removeClass('open');
        $('#lsp-block-userinfo').removeClass('open');
        $('.dropdown-cart').removeClass('open');
        $('.jstore-header-menu').toggleClass('open');
        $('.show-menu-burger').toggleClass('active');
    });

    $(".icon-search").click(function () {
        $('.jstore-header-menu').removeClass('open');
        $('.show-menu-burger').removeClass('active');
        $('#lsp-block-userinfo').removeClass('open');
        $('.dropdown-cart').removeClass('open');
        $('.jstore-block-search').toggleClass('open');
    });

    $(".icon-signin").click(function () {
        $('.jstore-header-menu').removeClass('open');
        $('.show-menu-burger').removeClass('active');
        $('.jstore-block-search').removeClass('open');
        $('.dropdown-cart').removeClass('open');
        $('#lsp-block-userinfo').toggleClass('open');
    });

/*    function cartHeight() {
        if (document.getElementById('lsp-header-cart').classList.contains('open')) {
            let clientWindowHeight = document.documentElement.clientHeight;
            let cartBlockHeight = document.getElementById('lsp-block-cart').offsetHeight + 60;
            let maxCartBlockHeight = cartBlockHeight - (cartBlockHeight - clientWindowHeight) - 65;
            document.getElementById('lsp-header-cart').style.maxHeight = maxCartBlockHeight + 'px';
        }
    }*/

    function cartHeight(){
        if(document.getElementById('lsp-header-cart').classList.contains('open')) {

            let clientWindowHeight = document.documentElement.clientHeight;
            let cartBlockTopPosition = document.getElementById('lsp-header-cart').getBoundingClientRect().top;
            let contentHeight = document.querySelector('body').offsetHeight - cartBlockTopPosition;
            let cartBlockHeight = document.getElementById('lsp-header-cart').offsetHeight + cartBlockTopPosition;
            let maxCartBlockHeight = 0;
            if (contentHeight > clientWindowHeight) {
                maxCartBlockHeight =  clientWindowHeight - cartBlockTopPosition -15 ;
            } else{
                maxCartBlockHeight =  contentHeight -15;
            }
            document.getElementById('lsp-header-cart').style.maxHeight = maxCartBlockHeight + 'px';
        }
    }

    $(".btn-lsp-header-cart").click(function () {
        $('.jstore-header-menu').removeClass('open');
        $('.show-menu-burger').removeClass('active');
        $('.jstore-block-search').removeClass('open');
        $('#lsp-block-userinfo').removeClass('open');
        $('#lsp-header-cart').toggleClass('open');
        cartHeight();
    });

    window.onresize = function resizeCartBlock() {
        if (document.getElementById('lsp-header-cart').classList.contains('open')) {
            cartHeight();
        }
    };

    window.jStoreEvents = window.jStoreEvents ? window.jStoreEvents : [];
    jStoreEvents.push(['ready', null, function (data) {
        let standartBodyClass =  document.body.className;
        console.log(standartBodyClass);
        $('#selectColor').change( function() {
            let selectColor = $('#selectColor option:selected').text();
            document.querySelector('body').className = standartBodyClass;
            document.querySelector('body').classList.add(selectColor);
        });
        //scroll к контенту при клике на авторизацию-вход на мобилках
        const buttonsSignInUp = document.querySelectorAll('.lsp-block-userinfo .lsp-block-userinfo-inner a');
        buttonsSignInUp.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
            });
        });
        //end scroll к контенту при клике на авторизацию-вход
        //scroll к контенту при клике на кнопку "оформить заказ"
        $('.lsp-block-cart-wrapper a.cart-to-order').click(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#lsp-block-content").offset().top - 120
            }, 500);
        });
        const buttonsToOrder = document.querySelectorAll('.lsp-block-cart-order-button-cont a');
        buttonsToOrder.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $('.dropdown-cart').removeClass('open');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
            });
        });
        //scroll к контенту при кнопке поиска
        const buttonsToSearch = document.querySelectorAll('.lsp-block-search-order-button-cont > input');
        buttonsToSearch.forEach(function(elem) {
            elem.addEventListener("click", function() {
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#lsp-block-content").offset().top - 120
                }, 500);
                $('#jstore-block-search--popup').removeClass('open--search');
            });
        });
    }]);


//test modernizr
    if (Modernizr.touch){
        alert('touch')
    }


});


