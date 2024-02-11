document.addEventListener('DOMContentLoaded', () => {
    const feedbackList = document.querySelector('.feedback__list');
    const feedbackItems = document.querySelectorAll('.feedback__item');
    const prevButton = document.querySelector('.feedback__prev');
    const nextButton = document.querySelector('.feedback__next');
    
    let current = 1; // Второй элемент активен по умолчанию
    
    // Переключение слайдов
    function switchSlide(offset) {
      current += offset;
      
      // Создание бесконечного цикла
      if (current >= feedbackItems.length) {
        current = 0;
      } else if (current < 0) {
        current = feedbackItems.length - 1;
      }
  
      // Применение стилей для всех слайдов
      feedbackItems.forEach((item, index) => {
        item.style.transform = index === current ? 'scale(1)' : 'scale(0.7)';
        item.style.opacity = index === current ? '1' : '0.5';
      });
  
      // Плавное перемещение слайдера
        feedbackList.style.transition = 'transform 0.5s ease-in-out';
        const slideWidth = feedbackItems[0].clientWidth;
        const slideMarginRight = 30; // Расстояние между слайдами
        // Выравнивание активного слайда по центру
        const centerShift = (feedbackList.clientWidth - slideWidth) / 2; // Смещение для центрирования активного слайда
        const newTranslateX = -(slideWidth + slideMarginRight) * current + centerShift;
        feedbackList.style.transform = `translateX(${newTranslateX}px)`;
    }
    
    // Обработчики событий для кнопок переключения слайдов
    prevButton.addEventListener('click', () => switchSlide(-1));
    nextButton.addEventListener('click', () => switchSlide(1));
    
    // Установка начального масштаба и прозрачности
    switchSlide(0);




    // Адаптивное меню
    const toggleButton = document.querySelector('.toggle');
    const navMenu = document.querySelector('.header__nav');
    const body = document.body;

    // Функция для переключения меню и анимации кнопки
    function toggleMenu() {
        navMenu.classList.toggle('active'); // Переключение меню
        toggleButton.classList.toggle('active'); // Переключение анимации кнопки

        // Если меню активно, запретить прокрутку
        if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
        } else {
        body.style.overflow = '';
        }
    }

    // Добавление обработчика событий на кнопку
    toggleButton.addEventListener('click', toggleMenu);




    // Плавный скролл
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Предотвращение стандартного действия перехода по ссылке
        const targetId = this.getAttribute('href'); // Получение целевого идентификатора из атрибута href
        const targetElement = document.querySelector(targetId); // Поиск целевого элемента на странице

        if (targetElement) {
          // Плавный скролл к целевому элементу
          window.scrollTo({
            top: targetElement.offsetTop, // Позиция целевого элемента относительно начала страницы
            behavior: 'smooth' // Включение плавного скролла
          });
        }
      });
    });
});
  