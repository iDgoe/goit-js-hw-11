// <!-- Search Images === GEThttps://pixabay.com/api/ -->
// <!-- key (required)	str	Your API key: 35197019-a7fce12511fd1af60ca1b8895

// Получение фотографий «желтых цветов». Поисковый запросддолжен быть закодирован URL:
// https://pixabay.com/api/?key=35197019-a7fce12511fd1af60ca1b8895&q=yellow+flowers&image_type=photo

// page	=== int	Returned search results are paginated. 
// Use this parameter to select the page number.
// Default: 1
// per_page	=== int	Determine the number of results per page.
// Accepted values: 3 - 200
// Default: 20 -->

import { UnsplashApi } from '../src/js/unsplash-api';

const searchForm = document.querySelector('.search-form');
console.log(searchForm);
const galleryEl = document.querySelector('.gallery')
console.log(galleryEl);

const unsplashApi = new UnsplashApi();
console.log(unsplashApi);


// function renderGallery(images) {
//     if (!gallery) {
//       return;
//     }


// const markup = images
// .map(image => {
//   const {
//     id,
//     largeImageURL,
//     webformatURL,
//     tags,
//     likes,
//     views,
//     comments,
//     downloads,
//   } = image;
//   return `
//     <a class="gallery__link" href="${largeImageURL}">
//       <div class="gallery-item" id="${id}">
//         <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//         <div class="info">
//           <p class="info-item"><b>Likes</b>${likes}</p>
//           <p class="info-item"><b>Views</b>${views}</p>
//           <p class="info-item"><b>Comments</b>${comments}</p>
//           <p class="info-item"><b>Downloads</b>${downloads}</p>
//         </div>
//       </div>
//     </a>
//   `;
// })
// .join('');

// galleryEl.insertAdjacentHTML('beforeend', markup);
// }

const onSearchFormSubmit = event => {
  event.preventDefault();
  const { target: formEl } = event;

  unsplashApi.query = formEl.elements.searchQuery.value;
    // console.log(searchQuery);

    console.log(unsplashApi);
    
    unsplashApi
    .fetchPhotosByQuery()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })
};

searchForm.addEventListener('submit', onSearchFormSubmit);
