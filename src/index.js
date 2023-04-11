import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { UnsplashApi } from '../src/js/unsplash-api';

const searchForm = document.querySelector('.search-form');
console.log(searchForm);
const galleryEl = document.querySelector('.gallery')
console.log(galleryEl);

let query = '';
let lightbox = null;
// let page = 1;
// const perPage = 40;

const unsplashApi = new UnsplashApi();
console.log(unsplashApi);


function renderGallery(data) {
    if (!galleryEl) {
      return;
    }
    resetEl(galleryEl);
const markup = data.map(el => {
  const {
    id,
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = el;
  return `
    <a class="gallery__link" href="${largeImageURL}">
      <div class="gallery-item" id="${id}">
        <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item"><b>Likes</b>${likes}</p>
          <p class="info-item"><b>Views</b>${views}</p>
          <p class="info-item"><b>Comments</b>${comments}</p>
          <p class="info-item"><b>Downloads</b>${downloads}</p>
        </div>
      </div>
    </a>
  `;
})
.join('');

galleryEl.insertAdjacentHTML('beforeend', markup);

lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'buttom',
  captionDelay: 250,
});
console.dir(lightbox);
// lightbox.refresh();
}

const onSearchFormSubmit = async event => {
  event.preventDefault();

  const { target: formEl } = event;

  unsplashApi.query = formEl.elements.searchQuery.value;
  
    query = unsplashApi.query;
    try {
    const result = await unsplashApi.fetchPhotosByQuery(query);
    console.log((result.data.hits))
    renderGallery(result.data.hits)
    } catch (err) {
      console.log(err);
    }
    }

function resetEl(el) {
    el.innerHTML = '';
  }

searchForm.addEventListener('submit', onSearchFormSubmit);

// var lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionPosition: 'buttom',
//   captionDelay: 250,
// });

// console.dir(lightbox);


const loadMoreBtnEl = document.querySelector('.js-load-more');

const onLoadMoreBtnClick = async event => {
  unsplashApi.page += 1;

  try {
    const response = await unsplashApi.fetchPhotosByQuery();

    const { data } = response;

    galleryEl.insertAdjacentHTML('beforeend', createGalleryCards(data.results));
    lightbox.refresh();
    if (unsplashApi.page === data.total_pages) {
      loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (err) {
    console.log(err);
  }
};

loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);