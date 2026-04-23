// Данные галереи (все фото и метаданные)
const galleryItems = [
  {
    imgUrl: "https://avatars.mds.yandex.net/i?id=b476c03c8504ae3b4d3bab7d47993abf_l-5235887-images-thumbs&n=13",
    thumbnail: "https://avatars.mds.yandex.net/i?id=b476c03c8504ae3b4d3bab7d47993abf_l-5235887-images-thumbs&n=13",
    date: "14 марта 2026",
    photographer: "Елена Виноградова",
    email: "elena@lenscraft.ru"
  },
  {
    imgUrl: "https://static.tildacdn.com/tild6334-3032-4131-a133-613439336135/plato-putorana-semka.JPG",
    thumbnail: "https://static.tildacdn.com/tild6334-3032-4131-a133-613439336135/plato-putorana-semka.JPG",
    date: "05 января 2026",
    photographer: "Анна Сереброва",
    email: "a.serebrova@lenscraft.ru"
  },
  {
    imgUrl: "https://mrg-online.ru/wp-content/uploads/2022/10/p0007_dsc4616_02102022_121151.jpg",
    thumbnail: "https://mrg-online.ru/wp-content/uploads/2022/10/p0007_dsc4616_02102022_121151.jpg",
    date: "22 февраля 2026",
    photographer: "Михаил Орлов",
    email: "m.orlov@lenscraft.ru"
  },
  {
    imgUrl: "https://cdn.britannica.com/02/236302-050-E1F61BB1/Alaskan-Malamute-sled-dog.jpg",
    thumbnail: "https://cdn.britannica.com/02/236302-050-E1F61BB1/Alaskan-Malamute-sled-dog.jpg",
    date: "18 декабря 2025",
    photographer: "Дмитрий Ковальчук",
    email: "d.koval@lenscraft.ru"
  },
  {
    imgUrl: "https://i.pinimg.com/originals/d2/0e/0a/d20e0af2bc61449e8a4ec0b7d7fc0ee4.jpg?nii=t",
    thumbnail: "https://i.pinimg.com/originals/d2/0e/0a/d20e0af2bc61449e8a4ec0b7d7fc0ee4.jpg?nii=t",
    date: "30 ноября 2025",
    photographer: "София Рожкова",
    email: "s.rozhkova@lenscraft.ru"
  },
  {
    imgUrl: "https://avatars.mds.yandex.net/i?id=c7d123e05bea6138070142f299cbee62_l-5886109-images-thumbs&n=13",
    thumbnail: "https://avatars.mds.yandex.net/i?id=c7d123e05bea6138070142f299cbee62_l-5886109-images-thumbs&n=13",
    date: "09 октября 2025",
    photographer: "Илья Громов",
    email: "i.gromov@lenscraft.ru"
  }
];

let currentFilter = '';

// Рендер галереи с фильтрацией
function renderGalleryWithFilter() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  const lowerFilter = currentFilter.toLowerCase().trim();
  let filteredItems = galleryItems;

  if (lowerFilter !== '') {
    filteredItems = galleryItems.filter(item =>
      item.photographer.toLowerCase().includes(lowerFilter) ||
      item.date.toLowerCase().includes(lowerFilter)
    );
  }

  const countElement = document.getElementById('searchResultsCount');
  if (countElement) {
    if (filteredItems.length === 0) {
      countElement.innerHTML = '😕 Ничего не найдено';
      countElement.classList.add('text-red-500');
      countElement.classList.remove('text-gray-500');
    } else {
      countElement.innerHTML = `Найдено ${filteredItems.length} из ${galleryItems.length} фотографий`;
      countElement.classList.remove('text-red-500');
      countElement.classList.add('text-gray-500');
    }
  }

  container.innerHTML = '';
  filteredItems.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'gallery-card bg-white rounded-2xl overflow-hidden shadow-lg';
    card.innerHTML = `
      <img src="${item.thumbnail}" alt="Фото ${idx + 1}" class="w-full h-64 object-cover">
      <div class="p-4 text-center">
        <p class="text-gray-500 text-sm"><i class="fa-regular fa-calendar"></i> ${item.date}</p>
        <p class="font-medium text-gray-800 mt-1">${item.photographer}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(item));
    container.appendChild(card);
  });
}

// Открытие модального окна
function openModal(photoData) {
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalDate = document.getElementById('modalDate');
  const modalPhotographer = document.getElementById('modalPhotographer');
  const modalEmail = document.getElementById('modalEmail');

  modalImg.src = photoData.imgUrl;
  modalDate.innerHTML = `<i class="fa-regular fa-calendar-alt mr-2"></i> Дата съёмки: ${photoData.date}`;
  modalPhotographer.innerHTML = `<i class="fa-regular fa-user mr-2"></i> Фотограф: ${photoData.photographer}`;
  modalEmail.innerHTML = `<i class="fa-regular fa-envelope mr-2"></i> Email: ${photoData.email}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
  const modal = document.getElementById('photoModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Навигация между страницами
function navigate(pageId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.add('hidden'));
  const activeSection = document.getElementById(pageId);
  if (activeSection) activeSection.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Отправка формы заказа
function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('clientName')?.value || '';
  const email = document.getElementById('clientEmail')?.value || '';
  if (!name || !email) {
    alert('Пожалуйста, заполните имя и email');
    return;
  }
  alert(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами по адресу ${email} в ближайшее время.`);
  document.getElementById('clientName').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientMessage').value = '';
  navigate('main');
}

// Обработчик поиска
function handleSearchInput(e) {
  currentFilter = e.target.value;
  renderGalleryWithFilter();
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // Рендерим галерею
  renderGalleryWithFilter();

  // Вешаем обработчик на поле поиска
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearchInput);
  }

  // Закрытие модального окна по клику на фон
  const modal = document.getElementById('photoModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Показываем главную страницу по умолчанию
  navigate('main');
});