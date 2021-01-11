"use strict";

document.addEventListener('DOMContentLoaded', function () {
    // polyfill flat
    // if (!Array.prototype.flat) Array.prototype.flat = function () {
    // 	return (function f(arr) {
    // 	return arr.reduce(
    // 			(a, v) =>
    // 	Array.isArray(v)
    // 				? a.concat(f(v))
    // 				: a.concat(  v )
    // 			, []
    // 		)
    // 	})(this)
    // };

    /*
        beforebegin
        afterbegin
        beforeend
        afterend
    */
    let anchorBtn = document.querySelector('.anchor');

    if (anchorBtn) {
        anchorBtn.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        };
    }

    function showButton(e) {
        if (window.pageYOffset >= 250) {
            anchorBtn.style.display = 'flex';
        } else {
            anchorBtn.style.display = 'none';
        }
    }

    window.addEventListener('scroll', showButton);

    function createRipple(e) {
        let button = e.target.closest('.g-btn--animate');
        let ripple = document.querySelectorAll(".ripple");
        if (ripple) ripple.forEach(function (el) {
            return el.remove();
        });
        let circle = document.createElement("span");
        let diameter = Math.max(button.clientWidth, button.clientHeight);
        let radius = diameter / 2;
        circle.style.width = circle.style.height = "".concat(diameter, "px");
        circle.style.left = "".concat(e.offsetX - radius, "px");
        circle.style.top = "".concat(e.offsetY - radius, "px");
        circle.classList.add("ripple");
        button.appendChild(circle);
    }

    let buttons = document.querySelectorAll('.g-btn--animate');

    if (buttons.length) {
        buttons.forEach(function (el) {
            return el.addEventListener('click', createRipple);
        });
    }

    let innerContentWrap = document.querySelector('.inner-content');
    let headerTopMenu = document.querySelector('.header__top');
    let menuCatalog = document.querySelector('.catalog-menu');
    let menuCatalogFixed = document.querySelector('.catalog-menu--fixed');
    let footerElem = document.querySelector('.footer');
    let asideBar = document.querySelector('aside');
    let search = document.querySelector('.search');
    let logo = document.querySelector('.header__logo');

    if (document.documentElement.clientWidth < 992) {
        menuCatalog.appendPositionElem('afterbegin', headerTopMenu);
        search.appendPositionElem('afterbegin', headerTopMenu);
    }

    window.addEventListener('resize', function (e) {
        if (document.documentElement.clientWidth < 992) {
            menuCatalog.appendPositionElem('afterbegin', headerTopMenu);
            search.appendPositionElem('afterbegin', headerTopMenu);
        } else {
            menuCatalog.appendPositionElem('afterbegin', asideBar);
            search.appendPositionElem('afterbegin', innerContentWrap);
        }
    });

    if (menuCatalogFixed && document.documentElement.clientWidth > 991) {
        let sticky = new Sticky('.catalog-menu--fixed');
        window.addEventListener('scroll', function (e) {
            return sticky.update();
        });
    }

    let menuBtn = document.querySelector('.hide-nav');

    if (menuBtn) {
        menuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            headerTopMenu.classList.toggle('active');
            document.body.classList.toggle('active');
        });
    }

    let accordionBtns = document.querySelectorAll('.catalog__item button');
    let accordionBody = document.querySelectorAll('.catalog__list');

    function openAccordion(body, btns) {
        btns && btns.forEach(function (el) {
            return el.classList.remove('active');
        });
        let nextElem = this.nextElementSibling;

        if (nextElem.style.maxHeight) {
            nextElem.style.maxHeight = null;
        } else {
            body && body.forEach(function (el) {
                return el.style.maxHeight = null;
            });
            nextElem.style.maxHeight = nextElem.scrollHeight + 15 + 'px';
            this.classList.toggle('active');
        }
    }

    if (accordionBtns.length) {
        accordionBtns.forEach(function (el) {
            el.addEventListener('click', function () {
                return openAccordion.bind(el)(accordionBody, accordionBtns);
            });
        });
    }

    function openTab(body, btns) {
        let dataTarget = this.getAttribute('data-idx');
        body && body.forEach(function (el) {
            return el.classList.remove('active');
        });
        btns && btns.forEach(function (el) {
            return el.classList.remove('active');
        });
        this.classList.add('active');
        body[dataTarget].classList.add('active');
    }

    let menuTabBtns = document.querySelectorAll('[data-target-tab]');
    let menuTabBody = document.querySelectorAll('.catalog__tab');

    if (menuTabBtns.length) {
        menuTabBtns.forEach(function (el) {
            return el.addEventListener('click', function () {
                return openTab.bind(el)(menuTabBody, menuTabBtns);
            });
        });
    }

    let sectionTabBtns = document.querySelectorAll('[data-section-btn]');
    let sectionTabBody = document.querySelectorAll('[data-section-tab]');

    if (sectionTabBtns.length) {
        sectionTabBtns.forEach(function (el) {
            return el.addEventListener('click', function () {
                return openTab.bind(el)(sectionTabBody, sectionTabBtns);
            });
        });
    }

    let numberInputs = document.querySelectorAll('[data-number]');

    if (numberInputs.length) {
        numberInputs.forEach(function (el) {
            return IMask(el, {
                mask: Number,
                min: 0,
                max: 10000
            });
        });
    }

    let phoneInputs = document.querySelectorAll('.number');
    if (phoneInputs.length) phoneInputs.forEach(function (el) {
        return IMask(el, {
            mask: '+{7} (000) 000-00-00'
        });
    });

    function init() {
        let _this = this;

        this.el.addEventListener('mouseenter', function () {
            _this.autoplay.stop();
        });
        this.el.addEventListener('mouseleave', function () {
            _this.autoplay.start();
        });
    }

    let sectionCatalogSlider = new Swiper('.section-content-slider', {
        // spaceBetween: 15,
        observer: true,
        observeParents: true,
        // autoplay: {
        // 	delay: 2500,
        // 	disableOnInteraction: false,
        // },
        on: {
            init: init
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 3
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 5
            },
            1300: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1600: {
                slidesPerView: 6,
                spaceBetween: 10
            }
        }
    });
    let brandsSlider = new Swiper('.brand-slider', {
        spaceBetween: 15,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        on: {
            init: init
        },
        breakpoints: {
            320: {
                slidesPerView: 2
            },
            360: {
                slidesPerView: 3
            },
            577: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 5
            },
            992: {
                slidesPerView: 6
            },
            1199: {
                slidesPerView: 10
            }
        }
    });
    let bannerSlider = new Swiper('.banner-slider', {
        spaceBetween: 10,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        on: {
            init: init
        },
        breakpoints: {
            320: {
                slidesPerView: 2
            },
            375: {
                slidesPerView: 3
            },
            577: {
                slidesPerView: 4
            },
            768: {
                slidesPerView: 5
            },
            992: {
                slidesPerView: 6
            }
        }
    });
    let galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 6,
        // loop: true,
        // loopedSlides: 5, //looped slides should be the same
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true
    });
    let galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 10,
        // loop: true,
        // loopedSlides: 5, //looped slides should be the same
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev',
        // },
        thumbs: {
            swiper: galleryThumbs
        }
    });
    let videoWrap = document.querySelector('.video');

    function handlerVideo(e) {
        let videoLink = e.target.querySelector('video');

        if (e.target.querySelector('video') && e.target.tagName === 'A') {
            if (e.type === 'mouseover') {
                videoLink.play();
            }

            if (e.type === 'mouseout') {
                // videoLink.currentTime = 0.0;
                videoLink.pause();
            }
        }
    }

    if (videoWrap) {
        videoWrap.onmouseover = videoWrap.onmouseout = handlerVideo;
    }

    let scrollAnimationItems = document.querySelectorAll('[data-scroll-animation]');

    if (scrollAnimationItems.length) {
        window.addEventListener('scroll', showAfterScroll);
    }

    function showAfterScroll(event) {
        for (let i = 0; i < scrollAnimationItems.length; i++) {
            if (scrollAnimationItems[i].getBoundingClientRect().top < document.documentElement.clientHeight / 1.5 && scrollAnimationItems[i].getBoundingClientRect().top > 0 || scrollAnimationItems[i].getBoundingClientRect().bottom < document.documentElement.clientHeight / 1.5 && scrollAnimationItems[i].getBoundingClientRect().bottom > 0) {
                scrollAnimationItems[i].removeAttribute('data-scroll-animation');
            }
        }
    } // Element.prototype.changeValue = function() {
    // 	return this.value
    // }


    let inputFilters = document.querySelectorAll('[data-filter]');
    let inputRanges = document.querySelectorAll('[type="range"]');

    function changeValueElem(elem, param) {
        switch (param) {
            case 'prev':
                elem.previousElementSibling.value = elem.value;
                break;

            case 'next':
                elem.nextElementSibling.value = elem.value;

            default:
                return true;
        }
    }

    let masksFilters;

    function addedValuisForRange(elem) {
        let _positionStatus = elem.dataset.positionVal;
        let _min = elem.dataset.min;
        let _max = elem.dataset.max;
        let _rangeInputElem = elem.nextElementSibling;
        let _startRangePosition = elem.dataset.startRange; // Если нет старт параметра то берется максимальное или минимальное значение

        let _startCountMin = _startRangePosition > 0 ? _startRangePosition : _min;

        let _startCountMax = _startRangePosition > 0 ? _startRangePosition : _max; // Ограничение ввода символов ( сторонняя либа)


        let _numberParam = {
            mask: Number,
            min: _min // max: _max

        };
        masksFilters = IMask(elem, _numberParam);

        _rangeInputElem.setAttribute('min', _min);

        _rangeInputElem.setAttribute('max', _max);

        switch (_positionStatus) {
            case 'min':
                elem.placeholder = _startCountMin;
                _rangeInputElem.value = _startCountMin;
                _startRangePosition > 0 ? elem.value = _startCountMax : true;
                break;

            case 'max':
                elem.placeholder = _startCountMax;
                _rangeInputElem.value = _startCountMax;
                _startRangePosition > 0 ? elem.value = _startCountMax : true;
                break;

            default:
                return true;
        }
    }

    if (inputFilters.length) {
        inputFilters.forEach(function (el) {
            addedValuisForRange(el);
            el.addEventListener('input', function () {
                return changeValueElem(el, 'next');
            });
            el.addEventListener('change', function () {
                let maxValue = this.dataset.max;
                if (this.value > maxValue) this.value = maxValue;
            });
        });
    }

    if (inputRanges.length) {
        inputRanges.forEach(function (el) {
            return el.addEventListener('input', function () {
                return changeValueElem(el, 'prev');
            });
        });
    }

    let showFilter = document.querySelector('.filter__show');
    let filterRows = document.querySelectorAll('.filter__row');

    if (showFilter) {
        showFilter.addEventListener('click', function (e) {
            e.preventDefault();
            filterRows.forEach(function (el) {
                return el.classList.toggle('active');
            });
        });
    }
});