import axios from 'axios';
import notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formEl = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.gallery a');

let inputData = '';
let page = 1;

function smoothScrollToNextGroup(cardHeight) {
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function searchImages() {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '42617556-81109194e933f8c86a5f2575e',
        q: inputData,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });

    const results = response.data.hits;

    if (page === 1) {
      gallery.innerHTML = '';
      notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
    }

    if (results.length === 0) {
      notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
      return;
    }

    results.forEach((result) => {
      const photoCard = document.createElement('div');
      photoCard.classList.add('photo-card');

      const link = document.createElement('a');
      link.href = result.largeImageURL;

      const image = document.createElement('img');
      image.src = result.webformatURL;
      image.alt = result.tags;
      image.loading = 'lazy';
      link.append(image);

      const infoDiv = document.createElement('div');
      infoDiv.classList.add('info');

      const likes = document.createElement('p');
      likes.classList.add('info-item');
      likes.innerHTML = `<b>Likes:</b> ${result.likes}`;
      infoDiv.append(likes);

      const views = document.createElement('p');
      views.classList.add('info-item');
      views.innerHTML = `<b>Views:</b> ${result.views}`;
      infoDiv.append(views);

      const comments = document.createElement('p');
      comments.classList.add('info-item');
      comments.innerHTML = `<b>Comments:</b> ${result.comments}`;
      infoDiv.append(comments);

      const downloads = document.createElement('p');
      downloads.classList.add('info-item');
      downloads.innerHTML = `<b>Downloads:</b> ${result.downloads}`;
      infoDiv.append(downloads);

      photoCard.appendChild(link);
      photoCard.append(infoDiv);
      gallery.append(photoCard);
    });

    lightbox.refresh();

    page++;

    if (response.data.totalHits <= page * 40) {
      loadMoreBtn.style.display = 'none';
      notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
      loadMoreBtn.style.display = 'block';
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    smoothScrollToNextGroup(cardHeight);

  } catch (err) {
    console.error(err);
    notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  inputData = document.getElementById('search-input').value;
  page = 1;
  searchImages();
  loadMoreBtn.style.display = 'none';
});

loadMoreBtn.addEventListener('click', () => {
  searchImages();
});