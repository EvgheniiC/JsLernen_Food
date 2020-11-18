window.addEventListener('DOMContentLoaded', function () {

    const tabs = require('./modules/tabs'),
        calcul = require('./modules/calcul'),
        cards = require('./modules/cards'),
        forms = require('./modules/forms'),
        modal = require('./modules/modal'),
        slider = require('./modules/slider'),
        timer = require('./modules/timer');

        tabs();
        calcul();
        cards();
        forms();
        modal();
        slider();
        timer();

});