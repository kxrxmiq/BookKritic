document.addEventListener('DOMContentLoaded', function() {
  // Темная тема (оставляем без изменений)
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const sunIcon = themeToggle.querySelector('.fa-sun');
  const moonIcon = themeToggle.querySelector('.fa-moon');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }

  themeToggle.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'block';
    } else {
      moonIcon.style.display = 'block';
      sunIcon.style.display = 'none';
    }
  });
// Обработка формы
  document.getElementById('review-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const image = document.getElementById('book-image').value || 'img/default-book.jpg';
    const review = document.getElementById('book-review').value;
    const pros = document.getElementById('book-pros').value.split(',').map(item => item.trim());
    const cons = document.getElementById('book-cons').value.split(',').map(item => item.trim());
    const rating = document.getElementById('book-rating').value;

    // Здесь можно добавить логику для сохранения рецензии
    console.log({title, author, image, review, pros, cons, rating});

    // Создаем новую карточку рецензии
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';
    reviewCard.innerHTML = `
    <div class="review-image">
      <img src="${image}" alt="${title}">
      <div class="rating">${rating}.0</div>
    </div>
    <div class="review-content">
      <h3>${title}</h3>
      <p class="author">${author}</p>
      <p class="excerpt">${review.substring(0, 100)}...</p>
      <a href="#" class="read-more">Читать полностью</a>
    </div>
  `;

    // Добавляем новую карточку в начало списка
    document.querySelector('.reviews').prepend(reviewCard);

    // Закрываем модальное окно и сбрасываем форму
    modal.style.display = 'none';
    this.reset();

    // Сбрасываем звезды рейтинга
    stars.forEach(star => {
      star.classList.remove('active', 'fas');
      star.classList.add('far');
    });
    document.getElementById('book-rating').value = 0;

    // Показываем уведомление
    alert('Ваша рецензия успешно добавлена!')
  });
});
