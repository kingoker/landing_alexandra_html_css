document.addEventListener('DOMContentLoaded', () => {
  // Слайдер
  const feedbackList = document.querySelector('.feedback__list');
  const feedbackItems = document.querySelectorAll('.feedback__item');
  let current = 1; // Второй элемент активен по умолчанию
  
  function switchSlide(offset) {
    current = (current + offset + feedbackItems.length) % feedbackItems.length;
    feedbackList.style.transition = 'transform 0.5s ease-in-out';
    updateSlider();
  }
  
  function updateSlider() {
    feedbackItems.forEach((item, index) => {
      item.style.opacity = index === current ? '1' : '0.5';
      item.style.transform = index === current ? 'scale(1)' : 'scale(0.7)';
    });
  
    const feedbackContainerWidth = feedbackList.clientWidth;
    const halfContainerWidth = feedbackContainerWidth / 2;
    let totalWidthBeforeCurrent = 0;
    for (let i = 0; i < current; i++) {
      totalWidthBeforeCurrent += feedbackItems[i].clientWidth + 30; // Assuming 30px is the margin
    }
    const currentSlideWidth = feedbackItems[current].clientWidth;
    const halfCurrentSlideWidth = currentSlideWidth / 2;
    const newTranslateX = -(totalWidthBeforeCurrent + halfCurrentSlideWidth - halfContainerWidth);
  
    feedbackList.style.transform = `translateX(${newTranslateX}px)`;
  }

  document.querySelector('.feedback__prev').addEventListener('click', () => switchSlide(-1));
  document.querySelector('.feedback__next').addEventListener('click', () => switchSlide(1));
  
  // Меню и плавный скролл
  const toggleButton = document.querySelector('.toggle');
  const navMenu = document.querySelector('.header__nav');
  const body = document.body;

  function toggleMenu(isOpen) {
    navMenu.classList.toggle('active', isOpen);
    toggleButton.classList.toggle('active', isOpen);
    body.style.overflow = isOpen ? 'hidden' : '';
  }
  
  toggleButton.addEventListener('click', () => toggleMenu(!navMenu.classList.contains('active')));

  document.querySelectorAll('.header__nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      window.scrollTo({ top: targetElement.offsetTop - 50, behavior: 'smooth' });
      toggleMenu(false);
    });
  });

  // Инициализация слайдера
  updateSlider();
});
