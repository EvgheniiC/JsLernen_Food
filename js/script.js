window.addEventListener('DOMContentLoaded', function () {

    // Tabs

    let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

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
        model = document.querySelector('.modal');

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



    model.addEventListener('click', (e) => {
        if (e.target === model || e.target.getAttribute('data-close') == '') { // кликаем на любое место на сайти
            closeModel();
        }
    });

    document.addEventListener('keydown', (e) => { // если нажимаем Escape, то окно закрывватся
        if (e.code === 'Escape' && modal.classList.contains('show')) { // modal.classList.contains('show') только когда окно открыто
            closeModel();
        }

    });

    const modalTimeId = setTimeout(openModel, 50000);

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
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 0.8;
            this.changeToDollar();
        }

        changeToDollar() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                   <img src=${this.src} alt=${this.alt}>
                   <h3 class="menu__item-subtitle">${this.title}</h3>
                   <div class="menu__item-descr">${this.descr}</div>
                   <div class="menu__item-divider"></div>
                   <div class="menu__item-price">
                       <div class="menu__item-cost">Price</div>
                       <div class="menu__item-total"><span>${this.price}</span> Euro/Tag</div>
                   </div>
               `;
            this.parent.append(element);
        }
    }

    const getResourse = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not Fetch ${url} , status ${res.status}`);
        }
        return await res.json();
    };

    /*  getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
 */

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });

        });

    // getResource('http://localhost:3000/menu') // alternativa von oben если надо 1 раз создать
    //     .then(data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');

    //         element.classList.add("menu__item");

    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }



    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Danke, wir rufen Sie gleich',
        failure: 'Fehler...'

    }

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // отмена стандартного поведения браузера,те он не будет перегружать страницу

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display : block;
                margin : 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            //  req.setRequestHeader('Content-type', 'application/json'); // эту строку нао закоментить,если в консоле хочу увидеть данные
            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

        });
    }
    // Modal wenn wurde bestellt
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); //скрываем окошко с данными
        openModel();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show'); // показываем окошко
            prevModalDialog.classList.remove('hide');
            closeModel();
        }, 4000);
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

    //Slider

    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelectorAll('.offer__slider-prev'),
        next = document.querySelectorAll('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector('.offer__slider-inner');
    let slideIndex = 1,
        offset = 0;



    /*    showSlides(slideIndex);

       if(slides.length < 10){
          total.textContent = `0${slides.length}`;
      } else {
         total.textContent = slides.length;
      }

       function showSlides(n) {

          if(n > slides.length){
              slideIndex = 1;
          }

          if(n < 1){
              slideIndex = slides.length;
          }

          slides.forEach(item =>item.style.display = 'none' )// скрываем слайды 
          sliders[slideIndex -1].style.display = 'block'; // показываем нужный слайд 

          if(slides.length < 10){
              current.textContent = `0${slideIndex}`;
          } else {
              current.textContent = slideIndex;
          }
      }

       function plusSlider(n) {
         showSlides(slideIndex +=n);
      }

      prev.addEventListener('click', () => {
          plusSlider(-1);
      })

      next.addEventListener('click', () => {
          plusSlider(+1);
      }) */


    //Slider Alternativa 
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent =  `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent =  slideIndex;
    }
    
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    });


});