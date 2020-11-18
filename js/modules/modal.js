function openModel(modalSelector, modalTimeId) {
    const model = document.querySelector(modalSelector);
    model.classList.add('show');
    model.classList.remove('hide');
    // model.classList.toggle('show'); то же самое, если  строки 112 и 113 закомитить
    document.body.style.overflow = 'hidden'; // нельзя скролить на заднем фоне,пока окно активно
    console.log(modalTimeId);
    if (modalTimeId) {
        clearInterval(modalTimeId); // выводит окно только один разА
    }
}

function closeModel(modalSelector) {
    const model = document.querySelector(modalSelector);
    model.classList.add('hide');
    model.classList.remove('show');
    // model.classList.toggle('show'); то же самое если выше закомитеть
    document.body.style.overflow = ''; // возврат скролла
}

function modal(triggerSelector, modalSelector, modalTimeId) {
    // Modal Fenster

    const modalTrigger = document.querySelectorAll(triggerSelector),
        model = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModel(modalSelector, modalTimeId));
    });

    model.addEventListener('click', (e) => {
        if (e.target === model || e.target.getAttribute('data-close') == '') { // кликаем на любое место на сайти
            closeModel(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => { // если нажимаем Escape, то окно закрывватся
        if (e.code === 'Escape' && modal.classList.contains('show')) { // modal.classList.contains('show') только когда окно открыто
            closeModel(modalSelector);
        }

    });

  

    function showModelByScroll() { // когда пользователь перейдет в конец страницы ему вывидется openModel
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModel(modalSelector, modalTimeId);
            window.removeEventListener('scroll', showModelByScroll); //чтобы только один раз выводило в конце
        }
    }

    window.addEventListener('scroll', showModelByScroll);

}

export default modal;
export {
    closeModel
};
export {
    openModel
};