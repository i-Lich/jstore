var arraySum = function (arr) {
    var sum = 0;
    arr.every(function (arrItem) {
        sum += arrItem;
        return true;
    });
    return sum;
};
var zeroFill = function(i, count){
    count = count ? count : 2;
    i = '' + i;
    while(i.length < count){
        i = '0' + i;
    }
    return i;
};
var formatDate = function (date, ignoreYear) {
    var dateString = '.' + date.getFullYear();
    if(ignoreYear){
        var now = new Date();
        if(now.getFullYear() === date.getFullYear()){
            dateString = '';
        }
    }
    return zeroFill(date.getDate()) + '.' + zeroFill(date.getMonth() + 1) + dateString;
};
function number_format( number, decimals, dec_point, thousands_sep ) {	// Format a number with grouped thousands
    var i, j, kw, kd, km;
    // input sanitation & defaults
    if( isNaN(decimals = Math.abs(decimals)) ){
        decimals = 2;
    }
    if( dec_point == undefined ){
        dec_point = ".";
    }
    if( thousands_sep == undefined ){
        thousands_sep = " ";
    }

    i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

    if( (j = i.length) > 3 ){
        j = j % 3;
    } else{
        j = 0;
    }

    km = (j ? i.substr(0, j) + thousands_sep : "");
    kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
    //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
    kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
    return km + kw + kd;
}
price_format = function($sum){
    return number_format($sum, 2, ',', '&nbsp;');
};
rublePrice = function (sum) {
    return price_format(sum) + '&nbsp;<span style="font-family:Verdana;">&#8381;</span>';
};
rublePriceAlt = function (sum) {
    return price_format(sum) + '&nbsp;₽';
};
percent = function (num) {
    return number_format(num, 2, '.', '&nbsp;') + '&nbsp;%';
};
$(function(){
    App.initHelper('table-tools');
    var YMapsCont = $('#YMapsID');
    if(YMapsCont.length){
        ymaps.ready(function () {
            var myMap = new ymaps.Map('YMapsID', {
                center: [60, 38],
                zoom: 6,
                controls: []
            });
            myMap.behaviors.disable('scrollZoom');

            var myPlacemark = new ymaps.Placemark([55.683644, 37.856144], {
                balloonContentBody: [
                    '<address>',
                    '<strong>Офис <b>jStore</b></strong>',
                    '<br/>',
                    'Адрес: 109431, Москва,<br>',
                    'ул. Авиаконструктора Миля, 19к1',
                    '</address>'
                ].join('')
            }, {
                preset: 'islands#redDotIcon'
            });

            var myPlacemark2 = new ymaps.Placemark([59.967255, 30.274465], {
                balloonContentBody: [
                    '<address>',
                    '<strong>официальный представитель в<br>г. Санкт-Петербурге<br><b>"ДЖЕЙКЬЮ ДИДЖИТАЛ"</b> -<br>Веб-студия, системный интегратор</strong>',
                    '<br/>',
                    'Адрес: 197374, г. Санкт-Петербург, ул. Вязовая,<br>' +
                    'д. 83, корп. 3, лит. А, офис 238-239.  БЦ "АНТАРЕС"<br>' +
                    'Тел: + 7(812) 943-12-67, +7 (812) 309-95-41' +
                    '</address>'
                ].join('')
            }, {
                preset: 'islands#redDotIcon'
            });

            myMap.geoObjects.add(myPlacemark);
            myMap.geoObjects.add(myPlacemark2);
        });
    }

    $('.js-open-hidden').click(function(e){
        e.preventDefault();
        var that = $(this);
        $('.js-' + that.data('id')).toggleClass('hidden', 500);
    });

    $('.fancy').fancybox({
        openEffect : 'fade',
        closeEffect : 'fade',
        nextEffect : 'fade',
        prevEffect : 'fade',
        padding : 0,
        helpers: {
            overlay: {
                locked: false
            }
        }
    });
});