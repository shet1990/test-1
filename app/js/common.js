$(function() {
    /* Анимация гамбургера */
    $('.my__hamburger').on('click', function(){
        //Появление
        if(!$(this).hasClass('is-active')){
            $(this).addClass('is-active');
            $('.head__nav').slideDown();
        } else {
            //Скрытие
            $(this).removeClass('is-active');
            $('.head__nav').slideUp();
        }
    });
    /* Конец */

    /* Работа псевдо-селектов */
    $('.select__tab').on('click', function () {
        let parent = $(this).parent();
        if($(parent).hasClass('is-active')){
            $(parent).removeClass('is-active');
            $(parent).find('.select__hide').slideToggle();
            if($(parent).hasClass('filter__select')){
                filterMultiSelect(parent);
            }
        } else {
            $(parent).addClass('is-active');
            $(parent).find('.select__hide').slideToggle();
        }
    });

    $('.one__option li').on('click', function () {
        let parent = $(this).closest('.select__wrap');
        let text = $(this).text();
        let value = $(this).data('val');
        $(parent).removeClass('is-active');
        $(parent).find('li').removeClass('is-active');
        $(parent).find('.select__tab span').text(text);
        $(parent).find('input').val(value).change();
        $(this).addClass('is-active');
        $(this).parent().slideToggle();
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest(".select__wrap").length) {
            $('.select__wrap').removeClass('is-active');
            $('.select__wrap .select__hide').slideUp();
            $('.filter__select').each(function () {
                filterMultiSelect($(this));
            });
        }
        e.stopPropagation();
    });
    /* Конец */

    /* Выпадение второго уровня меню */
    $('.menu-item-has-children').on('click', function () {
        $(this).find('.sub-menu').slideToggle();
    });
    /* Конец */

    /* Слайдер на главной */
    if($('div').hasClass('slider__slick')){
        $('.slider__slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 5000,
            fade: true,
            speed: 1000,
            draggable: false
        });
    }
    /* Конец */
    /* Слайдер ленты клипов */
    if($('div').hasClass('slick__adaptiv')){
        $('.slick__adaptiv').slick({
            slidesToShow: 3.6,
            slidesToScroll: 1,
            infinite: false,
            dots: false,
            arrows: true,
            nextArrow : '<div class="slick__btn flex right"><span class="fas fa-angle-right"></span></div>',
            prevArrow : '<div class="slick__btn flex left"><span class="fas fa-angle-left"></span></div>',
            speed: 500,
            draggable: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2.4,
                    }
                },
                {
                    breakpoint: 520,
                    settings: {
                        slidesToShow: 1.4,
                    }
                },
            ]
        });
    }
    /* Конец */

    /* Слайдер галереи фото */
    if($('div').hasClass('gallery__slick')){
        let countSlidesToscroll = 4,
            countAllSlides = $('.gallery__item').length;
        if($(window).width() < 521){
            countSlidesToscroll = 1;
        } else if($(window).width() < 993){
            countSlidesToscroll = 3;
        }
        countAllSlides -= countSlidesToscroll;
        $('.gallery__slick').slick({
            slidesToShow: countSlidesToscroll,
            slidesToScroll: countSlidesToscroll,
            infinite: false,
            dots: false,
            arrows: true,
            nextArrow : `<div class="slick__btn flex right">+<span class="gallery__counter">${countAllSlides}</span></div>`,
            prevArrow : `<div class="slick__btn flex left"><span class="fas fa-angle-left"></span></div>`,
            speed: 500,
            draggable: false,
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: countSlidesToscroll,
                        slidesToScroll: countSlidesToscroll,
                    }
                },
                {
                    breakpoint: 521,
                    settings: {
                        slidesToShow: countSlidesToscroll,
                        slidesToScroll: countSlidesToscroll,
                    }
                },
            ]
        });
        $('.gallery__slick .slick__btn.right').on('click', function () {
            countAllSlides -= countSlidesToscroll;
            $('.gallery__slick .gallery__counter').text(countAllSlides);
        });
        $('.gallery__slick .slick__btn.left').on('click', function () {
            countAllSlides += countSlidesToscroll;
            $('.gallery__slick .gallery__counter').text(countAllSlides);
        });
    }
    /* Конец */

    /* Кнопка play */
    $('.label__play').on('click', function (e) {
        let parent = $(this).closest('.figure'),
            name = $(parent).find('meta[itemprop="name"]').attr('content'),
            videoId = $(this).data('frame');
        if(!$(parent).hasClass('is-active')){
            $('.figure').removeClass('is-active');
            $(parent).addClass('is-active');
            startFrameYoutube(videoId, name, false);
        } else {
            $(parent).removeClass('is-active');
            endFrameYoutube();
        }
        e.preventDefault();
        e.stopPropagation();
    });
    /* Конец */

    /* Кнопка Воспроизвести все */
    $('.play__all').on('click', function () {
       var parent = $(this).closest('.api__wrap');
           //name = $(parent).find('.title').text();
        $(parent).find('.label__play').each(function (index) {
            let id = $(this).data('frame'),
                name = $(this).closest('.figure').find('meta[itemprop="name"]').attr('content');
            arrItem[index] = {
                id : id,
                name : name,
                isPlay : false
            };
        });
        startFrameYoutube(arrItem, name, true);
    });
    /* Конец */

    /* Закрыть iframe и перетаскивание */
    $('.frame__close').on('click', function(){
        $('.figure').removeClass('is-active');
        endFrameYoutube();
    });

    $('.frame__modal').draggable();
    /* Конец */

    /* Переключение табов */
    $('.tabs__btn').on('click', function () {
        let container = $(this).closest('.tabs__wrap'),
        containerBtn = $(this).closest('.tabs__btn__container'),
            tab = $(this).data('tab');
        $(containerBtn).children('.tabs__btn').removeClass('is-active');
        $(container).children('.tabs__block').removeClass('is-active');
        $(container).children('.tabs__block[data-tab="' + tab + '"]').addClass('is-active');
        $(this).addClass('is-active');
    });
    /* Конец */

    /* Скролл сайдбара */
    var sidebarBlock = document.querySelector('.scroll__sidebar');
    if(sidebarBlock && $(window).width() > 767){
        var b = null, P = 0;
        window.addEventListener('scroll', Ascroll, false);
        document.body.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
            if (b == null) {
                var Sa = getComputedStyle(sidebarBlock, ''), s = '';
                for (var i = 0; i < Sa.length; i++) {
                    if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                        s += Sa[i] + ': ' +Sa.getPropertyValue(Sa[i]) + '; '
                    }
                }
                b = document.createElement('div');
                b.style.cssText = s + ' box-sizing: border-box; width: ' + sidebarBlock.offsetWidth + 'px;';
                sidebarBlock.insertBefore(b, sidebarBlock.firstChild);
                var l = sidebarBlock.childNodes.length;
                for (var i = 1; i < l; i++) {
                    b.appendChild(sidebarBlock.childNodes[1]);
                }
                sidebarBlock.style.height = b.getBoundingClientRect().height + 'px';
                sidebarBlock.style.padding = '0';
                sidebarBlock.style.border = '0';
            }
            var Ra = sidebarBlock.getBoundingClientRect(),
                R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('.main__wrap').getBoundingClientRect().bottom);  // селектор блока, при достижении нижнего края которого нужно открепить прилипающий элемент
            if ((Ra.top - P) <= 0) {
                if ((Ra.top - P) <= R) {
                    b.className = 'scroll__stop';
                    b.style.top = - R +'px';
                } else {
                    b.className = 'scroll__sticky';
                    b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            window.addEventListener('resize', function() {
                sidebarBlock.children[0].style.width = getComputedStyle(sidebarBlock, '').width
            }, false);
        }
    }
    /* Конец */

    /* Кнопки поделится и рейтинг */
    $('.btn__shares').on('click', function () {
        $(this).toggleClass('is-active');
        $('.single__shares').toggle('slow');
    });
    $('.btn__stars').on('click', function () {
        $('.single__stars').toggle('slow');
    });
    /* Конец */

    /* Одиночная кнопка ajax-фильтра */
    $('.filter__btn').on('click', function () {
        let type = $(this).data('type'),
            index = $(this).data('index'),
            name = $(this).data('name');

        $('.filter__submit').removeClass('is-disable');
        if($(this).hasClass('is-active')){
            $(this).removeClass('is-active');
            $(this).find('input').val('');
        } else {
            $(this).addClass('is-active');
            $(this).find('input').val($(this).data('index'))
        }
    });
    /* Конец */

    /* Множественный селект ajax-фильтра */
    $('.multi__option input[type="checkbox"], .alphabet__option input[type="checkbox"]').on('change', function () {
        $('.filter__submit').removeClass('is-disable');
    });
    /* Конец */

    /* Ajax фильтра */
    $('.filter__submit').on('click', function () {
        $('#filter__form').submit();
    });
    $('#filter__form').on('submit', function (e) {
        e.preventDefault();
        let container = $('.ajax__container'),
            formData = $(this).serialize();

        /* Имитация ajax (удалить) */
        $(container).prepend(loader);
        $(container).find('.figure__wrap').hide();
        $(container).find('.pagination__wrap').hide();
        $('.filter__submit').addClass('is-disable');
        setTimeout(function () {
            createItemFilterResult();
            $(container).find('.ajax__loader').detach();
            $('.filter__result__count').show();
            $(container).find('.figure__wrap').show();
            $(container).find('.pagination__wrap').show();
        }, 2000);
        /* КОнец */

        /* $.ajax({
             type: 'POST',
             url: './ajax.php',
             data: formData + "&action=ajaxfilter",
             beforeSend: () => {
                 $(container).html(loader);
                 $('.filter__submit').addClass('is-disable');
             },
             success: (html) => {
                 $(container).html(html);
                 $('.filter__result__count').show();
                 $('.filter__result__count span').text('сюда количество найденых клипов');
                 createItemFilterResult();
             }
         });*/
    });
    /* Конец */

    /* Градиент */
    if($('div').hasClass('js__gradi__wrap')){
        $('.js__gradi__wrap').each(function () {
            let color = $(this).data('color');
            let gradient = `linear-gradient(to top, rgba(${color}, 0.9), rgba(${color}, 0.8), rgba(${color}, 0.7), rgba(${color}, 0))`;
            $(this).find('.js__gradi__title').css('background', gradient);
        })
    }
    /* Конец */

    /* Подсчёт символов в комментариях */
    $('.comment__form textarea').on('input', function () {
        let countText = $(this).val().length,
            counter = $(this).closest('.comment__form').find('.comment__count__text span'),
            allCount = $(counter).data('count');
        $(counter).text(allCount - countText);
        if((allCount - countText) > 0){
            $(counter).parent().removeClass('full');
        } else {
            $(counter).parent().addClass('full');
        }
    });
    /* Конец */

    /* Модалка с полным текстом */
    $(".text__modal__btn").fancybox({
        maxWidth	: 800,
        maxHeight	: 600,
        padding     : '10',
        fitToView	: false,
        width		: '70%',
        height		: '70%',
        autoSize	: false,
        closeClick	: false,
        openEffect	: 'elastic',
        closeEffect	: 'elastic'
    });
    /* Конец */

});

var arrItem = [],
    heghtFrame = '235',
    widthFrame = '460',
    loader = '<div class="ajax__loader"></div>';

/* Api Youtube */
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var playerYoutube = false;
/* Конец */

/* Функция которая запускает когда загрузилось API Youtube */
function onYouTubeIframeAPIReady() {
    if($('div').hasClass('clip__frame')){
        let id = $('#frame-clip').data('frame');
        player = new YT.Player('frame-clip', {
            width: '100%',
            videoId: id,
            events: {
                //'onReady': onPlayerReady,
            }
        });
    }
}
function onPlayerReady(event) {
    event.target.playVideo();
}
/* Конец */

/* Функция обработки события изменения клипа */
function changeVideoStatus() {
    if(playerYoutube.getPlayerState() === 0) {  // если видео закончилось
        let countItem = arrItem.length;
        console.log(arrItem);
        arrItem.every(function (item, i) {
            if(!arrItem[i].isPlay){
                playerYoutube.destroy();
                $('.frame__name.one').text(arrItem[i].name);
                if((i + 1) == countItem){
                    $('.frame__name.two').text(arrItem[0].name);
                    arrItem.every(function (item, i) {
                        arrItem[i].isPlay = false;
                    });
                } else {
                    $('.frame__name.two').text(arrItem[(i + 1)].name);
                    arrItem[i].isPlay = true;
                }
                playerYoutube = new YT.Player('frame', {
                    height: heghtFrame,
                    width: '460',
                    videoId: arrItem[i].id,
                    playerVars: {
                        'autoplay': 1,
                        'controls': 1,
                        'end': 3,
                    },
                    events: {
                        'onStateChange': changeVideoStatus
                    }
                });
                return false;
            } else {
                return true;
            }
        });
    }
}
/* Конец */

/* Функция запуска плеера */
function startFrameYoutube( item, name, list ) {

    if(playerYoutube) {
        playerYoutube.destroy();
    }

    $('.frame__modal').show('slow');
    $('.frame__next__clip').removeClass('is-active');

    if(list) { //Если воспроизводится список клипов
        $('.frame__next__clip').addClass('is-active');
        $('.frame__name.one').text(item[0].name);
        $('.frame__name.two').text(item[1].name);
        playerYoutube = new YT.Player('frame', {
            height: heghtFrame,
            width: widthFrame,
            videoId: item[0].id,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
                //'end': 5,
            },
            events: {
                'onStateChange': changeVideoStatus // Проверка события изменения видео
            }
        });
        item[0].isPlay = true;
    } else { // Если воспроизводится 1 клип
        $('.frame__name.one').text(name);
        playerYoutube = new YT.Player('frame', {
            height: heghtFrame,
            width: widthFrame,
            videoId: item,
            playerVars: {
                'autoplay': 1,
                'controls': 1,
            },
        });
    }
}
/* Конец */

/* Функция выключения плеера */
function endFrameYoutube() {
    $('.frame__modal').hide('slow');
    playerYoutube.stopVideo();
}
/* Конец */

/* Удаление выбранных фильтров */
function deleteFilterItem(item, isArray) {
    $('.filter__submit').removeClass('is-disable');
    let parent = $(item).closest('.filter__result__item'),
        type = $(parent).data('type'),
        name = $(parent).data('name');
    if(isArray) {
        $(parent).detach();
        $('.filter__select[data-type="' + type + '"] input[data-name="' + name + '"]').prop('checked', false);
    } else {
        $(parent).detach();
        $('.filter__btn[data-type="' + type + '"]').removeClass('is-active');
        $('.filter__btn[data-type="' + type + '"] input').val('');
    }
}
/* Конец */

/* Функция подсчёта чекбоксов */
function filterMultiSelect(item) {
    if($(item).find('input[type="checkbox"]:checked').length){
        $(item).addClass('blue');
    } else {
        $(item).removeClass('blue');
    }
}
/* Конец */

/* Функция создания элементов выбранных в фильтре */
function createItemFilterResult() {
    $('.filter__result').html('');
    $('.filter__btn.is-active').each(function () {
        let type = $(this).data('type'),
            name = $(this).data('name');
        let item = `<div class="filter__result__item" data-type="${type}" data-name="${name}">${name}<i class="fas fa-times filter__delete" onclick="deleteFilterItem(this, false)"></i></div>`;
        $('.filter__result').append(item);
    });
    $('.filter__select.blue').each(function () {
        let type = $(this).data('type');
        $(this).find('input:checked').each(function () {
            let name = $(this).data('name');
            let item = `<div class="filter__result__item" data-type="${type}" data-name="${name}">${name}<i class="fas fa-times filter__delete" onclick="deleteFilterItem(this, true)"></i></div>`;
            $('.filter__result').append(item);
        });
    });
}
/* Конец */