import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { UnsplashApi } from '../src/js/unsplash-api';

// ❗️❗️❗️ НОМЕР СТОРІНКИ ВИВОДИТЬ У КОНСОЛІ ;)

const searchForm = document.querySelector('.search-form');
// console.log(searchForm);
const galleryEl = document.querySelector('.gallery')
// console.log(galleryEl);
const loadMoreBtnEl = document.querySelector('.js-load-more');
// console.log(galleryEl);

let query = '';
let lightbox = null;
// let page = 1;
const perPage = 40;

const unsplashApi = new UnsplashApi();
// console.log(unsplashApi);


function renderGallery(data) {
    if (!galleryEl) {
      loadMoreBtnEl.classList.add('is-hidden');
      return;
    }
    // resetEl(galleryEl);

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
lightbox.refresh();
}

const onSearchFormSubmit = async event => {
  event.preventDefault();
  galleryEl.innerHTML = '';
  const { target: formEl } = event;

  unsplashApi.query = formEl.elements.searchQuery.value;
  query = unsplashApi.query;

  if (query.trim() == '') {
    Notiflix.Notify.failure(
      'Please specify your search query.',
    );
    return;
  }

    try {
    const result = await unsplashApi.fetchPhotosByQuery(query);
    // console.log(result.data);
    unsplashApi.page = 1;
     console.log('page='+unsplashApi.page);
    // console.log(result.data.total);
    if (result.data.total === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        'Search result is zero. Change your query',
      );
      galleryEl.innerHTML = '';
      return;
    }
    else {
      renderGallery(result.data.hits);
      Notiflix.Notify.success(`We found ${result.data.totalHits} images.`);
      loadMoreBtnEl.classList.remove('is-hidden');

      const totalPage = Math.ceil(result.data.totalHits / perPage);

      console.log(unsplashApi.page, totalPage);
      if (unsplashApi.page == totalPage) {
        loadMoreBtnEl.classList.add('is-hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results.",
        );
      }
    }
    } catch (err) {
      Notiflix.Notify.failure('Something went wrong. Please try again later.');
    return;
    }
    }

// function resetEl(el) {
//     el.innerHTML = '';
//   }

searchForm.addEventListener('submit', onSearchFormSubmit);


const onLoadMoreBtnClick = async event => {
  unsplashApi.page += 1;
  console.log('page='+unsplashApi.page);
  
  try {
    const response = await unsplashApi.fetchPhotosByQuery(query);
  
    const { data } = response;
    renderGallery(data.hits);
    lightbox.refresh();


    console.log(unsplashApi.page, data.total_pages);

    const totalPage = Math.ceil(data.totalHits / perPage);

    if (unsplashApi.page == totalPage) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results.",
      );
    }

  } catch (err) {
    console.log(err);
  }
};

loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

