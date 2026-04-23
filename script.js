// Данные галереи
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
      countElement.classList.add('text-danger');
    } else {
      countElement.innerHTML = `Найдено ${filteredItems.length} из ${galleryItems.length} фотографий`;
      countElement.classList.remove('text-danger');
    }
  }

  container.innerHTML = '';
  filteredItems.forEach((item, idx) => {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    col.innerHTML = `
      <div class="card h-100 border-0 shadow-sm gallery-card rounded-4 overflow-hidden">
        <img src="${item.thumbnail}" class="card-img-top" style="height: 260px; object-fit: cover;" alt="Фото ${idx+1}">
        <div class="card-body text-center">
          <p class="text-muted small mb-1"><i class="fa-regular fa-calendar"></i> ${item.date}</p>
          <p class="fw-semibold mb-0">${item.photographer}</p>
        </div>
      </div>
    `;
    col.querySelector('.gallery-card').addEventListener('click', () => openModal(item));
    container.appendChild(col);
  });
}

function openModal(photoData) {
  const modal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalDate = document.getElementById('modalDate');
  const modalPhotographer = document.getElementById('modalPhotographer');
  const modalEmail = document.getElementById('modalEmail');

  modalImg.src = photoData.imgUrl;
  modalDate.innerHTML = `<i class="fa-regular fa-calendar-alt me-2"></i> Дата съёмки: ${photoData.date}`;
  modalPhotographer.innerHTML = `<i class="fa-regular fa-user me-2"></i> Фотограф: ${photoData.photographer}`;
  modalEmail.innerHTML = `<i class="fa-regular fa-envelope me-2"></i> Email: ${photoData.email}`;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modal = document.getElementById('photoModal');
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function navigate(pageId) {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => section.classList.add('d-none'));
  const activeSection = document.getElementById(pageId);
  if (activeSection) activeSection.classList.remove('d-none');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById('clientName')?.value.trim();
  const email = document.getElementById('clientEmail')?.value.trim();
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

function handleSearchInput(e) {
  currentFilter = e.target.value;
  renderGalleryWithFilter();
}

document.addEventListener('DOMContentLoaded', () => {
  renderGalleryWithFilter();
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', handleSearchInput);
  const modalOverlay = document.getElementById('photoModal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
  navigate('main');
});
