const carousel = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const indicators = document.querySelectorAll('.carousel-indicators span');

let currentIndex = 0;
let intervalId;

function showSlide(index) {
  // Скрываем все слайды
  items.forEach(item => item.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));

  // Показываем текущий слайд
  items[index].classList.add('active');
  indicators[index].classList.add('active');
  currentIndex = index;
}

function nextSlide() {
  const newIndex = (currentIndex + 1) % items.length;
  showSlide(newIndex);
}

function prevSlide() {
  const newIndex = (currentIndex - 1 + items.length) % items.length;
  showSlide(newIndex);
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

// Инициализация
showSlide(0);
startAutoSlide();

// Обработчики событий
nextBtn.addEventListener('click', () => {
  stopAutoSlide();
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener('click', () => {
  stopAutoSlide();
  prevSlide();
  startAutoSlide();
});

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    stopAutoSlide();
    showSlide(index);
    startAutoSlide();
  });
});

// Пауза при наведении
carousel.parentElement.addEventListener('mouseenter', stopAutoSlide);
carousel.parentElement.addEventListener('mouseleave', startAutoSlide);

// Анимация карточек (оставляем без изменений)
const animateCards = () => {
  const reviewCards = document.querySelectorAll('.review-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  reviewCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  animateCards();
};
