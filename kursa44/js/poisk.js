// Функции поиска и сортировки
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const sortSelect = document.getElementById('sort-select');
const reviewsContainer = document.querySelector('.reviews');
let reviewCards = Array.from(document.querySelectorAll('.review-card'));

// Сохраняем оригинальный порядок карточек
const originalOrder = reviewCards.map(card => card.cloneNode(true));

// Функция поиска
function performSearch() {
  const searchTerm = searchInput.value.toLowerCase();

  reviewCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Функция сортировки
function performSort() {
  const sortValue = sortSelect.value;

  switch(sortValue) {
    case 'title-asc':
      reviewCards.sort((a, b) => {
        const titleA = a.querySelector('h3').textContent.toLowerCase();
        const titleB = b.querySelector('h3').textContent.toLowerCase();
        return titleA.localeCompare(titleB);
      });
      break;

    case 'title-desc':
      reviewCards.sort((a, b) => {
        const titleA = a.querySelector('h3').textContent.toLowerCase();
        const titleB = b.querySelector('h3').textContent.toLowerCase();
        return titleB.localeCompare(titleA);
      });
      break;

    case 'rating-asc':
      reviewCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.rating').textContent);
        const ratingB = parseFloat(b.querySelector('.rating').textContent);
        return ratingA - ratingB;
      });
      break;

    case 'rating-desc':
      reviewCards.sort((a, b) => {
        const ratingA = parseFloat(a.querySelector('.rating').textContent);
        const ratingB = parseFloat(b.querySelector('.rating').textContent);
        return ratingB - ratingA;
      });
      break;

    default: // По умолчанию - оригинальный порядок
      reviewCards = originalOrder.map(card => card.cloneNode(true));
      break;
  }

  // Очищаем контейнер и добавляем отсортированные карточки
  reviewsContainer.innerHTML = '';
  reviewCards.forEach(card => {
    reviewsContainer.appendChild(card);
  });

  // Применяем поиск после сортировки
  performSearch();
}

// Обработчики событий
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    performSearch();
  }
});

sortSelect.addEventListener('change', performSort);

// Инициализация - сохраняем копии карточек для сортировки по умолчанию
reviewCards = Array.from(document.querySelectorAll('.review-card'))
// Открытие/закрытие модального окна
const modal = document.getElementById('review-modal');
const btn = document.createElement('button');
btn.className = 'create-review-btn';
btn.innerHTML = '<i class="fas fa-plus"></i> Создать рецензию';

// Вставляем кнопку перед поиском
const searchPanel = document.querySelector('.search-sort-panel');
searchPanel.insertBefore(btn, searchPanel.firstChild);

const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
  modal.style.display = 'block';
}

span.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Обработка рейтинга звездами
const stars = document.querySelectorAll('.rating-stars i');
stars.forEach(star => {
  star.addEventListener('click', function() {
    const rating = parseInt(this.getAttribute('data-rating'));
    document.getElementById('book-rating').value = rating;

    stars.forEach((s, index) => {
      if (index < rating) {
        s.classList.add('active');
        s.classList.remove('far');
        s.classList.add('fas');
      } else {
        s.classList.remove('active');
        s.classList.remove('fas');
        s.classList.add('far');
      }
    });
  });
});
