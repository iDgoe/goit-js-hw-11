import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { UnsplashApi } from '../src/js/unsplash-api';

const searchForm = document.querySelector('.search-form');
console.log(searchForm);
const galleryEl = document.querySelector('.gallery')
console.log(galleryEl);

let query = '';
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
}

const onSearchFormSubmit = event => {
  event.preventDefault();
  const { target: formEl } = event;

  unsplashApi.query = formEl.elements.searchQuery.value;
    
    // console.log(unsplashApi.page)
  
    query = unsplashApi.query;
   

    unsplashApi
    .fetchPhotosByQuery(query)
    .then(data => {
        console.log(data.hits)
        console.log(unsplashApi.page)
        unsplashApi.page += 1;
        console.log(unsplashApi.page)
        renderGallery(data.hits)
    })
    .catch(err => {
        console.log(err);
    })
};

function resetEl(el) {
    el.innerHTML = '';
  }

searchForm.addEventListener('submit', onSearchFormSubmit);


