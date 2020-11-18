import tabs from './modules/tabs';
import calcul from './modules/calcul';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import {
    openModel
} from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {

    const modalTimeId = setTimeout(() => openModel('.modal', modalTimeId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    calcul();
    cards();
    forms('.form', modalTimeId);
    modal('[data-modal]', '.modal', modalTimeId);
    timer('.timer', '2020-12-12');
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});