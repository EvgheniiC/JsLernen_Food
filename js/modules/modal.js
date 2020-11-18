function modal() {
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

}

module.exports = modal;