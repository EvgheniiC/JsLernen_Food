window.addEventListener('DOMContentLoaded', function () {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        timerId;

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });


    /*     const btn = document.querySelector('.tabheader__item');
        btn.addEventListener('click', () => {
            timerId = setTimeout(logger,200);
        });

        function logger (){
            console.log('Time');
        } */

    // Timer
    const dedline = '2020-10-31';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', dedline);

    // Modal Fenster

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        model = document.querySelector('.modal'),
        modalClostBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            model.classList.add('show');
            model.classList.remove('hide');
            // model.classList.toggle('show'); то же самое, если  строки 112 и 113 закомитить
            document.body.style.overflow = 'hidden'; // нельзя скролить на заднем фоне,пока окно активно
        });

    });

    function closeModel() {
        model.classList.add('hide');
        model.classList.remove('show');
        // model.classList.toggle('show'); то же самое если выше закомитеть
        document.body.style.overflow = ''; // возврат скролла
    }

    modalClostBtn.addEventListener('click', closeModel);

    model.addEventListener('click', (e) => {
        if (e.target === model) { // кликаем на любое место на сайти
            closeModel();
        }
    });

    document.addEventListener('keydown', (e) => { // если нажимаем Escape, то окно закрывватся
        if (e.code === 'Escape' && modal.classList.contains('show')) { // modal.classList.contains('show') только когда окно открыто
            closeModel();
        }

    });

});