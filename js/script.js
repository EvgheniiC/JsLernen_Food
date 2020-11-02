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
        btn.addEventListener('click', openModel);
    });

    function openModel() {
        model.classList.add('show');
        model.classList.remove('hide');
        // model.classList.toggle('show'); то же самое, если  строки 112 и 113 закомитить
        document.body.style.overflow = 'hidden'; // нельзя скролить на заднем фоне,пока окно активно
        clearInterval(modalTimeId); // выводит окно только один раз
    }

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

    const modalTimeId = setTimeout(openModel, 3000);

    function showModelByScroll() { // когда пользователь перейдет в конец страницы ему вывидется openModel
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModel();
            window.removeEventListener('scroll', showModelByScroll); //чтобы только один раз выводило в конце
        }
    }

    window.addEventListener('scroll', showModelByScroll);


    // Use classen for cards

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 0.8;
            this.changeToDollar(); 
        }

        changeToDollar() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> Euro</div>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        '"Fitness-Menü"',
        'Das "Fitness-Menü" ist eine neue Herangehensweise an das Kochen: mehr frisches Gemüse und Obst. Ein Produkt von aktiven und gesunden Menschen. Dies ist ein völlig neues Produkt mit einem optimalen Preis und hoher Qualität!',
        9,
        '.menu.container'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        '"Premium-Menü"',
        'Im "Premium" -Menü verwenden wir nicht nur ein schönes Verpackungsdesign, sondern auch eine hochwertige Ausführung der Gerichte. Roter Fisch, Meeresfrüchte, Obst - Menü im Restaurant, ohne ins Restaurant zu gehen!',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Vegan - Menu',
        'Das Vegan-Menü ist eine sorgfältige Auswahl der Zutaten: ein völliges Fehlen tierischer Produkte, Milch aus Mandeln, Hafer, Kokosnuss oder Buchweizen, die richtige Menge an Protein aufgrund von Tofu und importierten vegetarischen Steaks.',
        21,
        ".menu .container"
    ).render();




});