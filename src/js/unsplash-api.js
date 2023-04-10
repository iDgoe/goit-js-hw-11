const KEY = '35197019-a7fce12511fd1af60ca1b8895';

export class UnsplashApi {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '35197019-a7fce12511fd1af60ca1b8895';

    constructor() {
        this.query = null;
  }

  fetchPhotosByQuery(query) {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: '6',
      per_page: '20',
      orientation: 'horizontal',
      image_type: 'photo',
      key: UnsplashApi.API_KEY,
    });

    return fetch(
      `${UnsplashApi.BASE_URL}/api/?${searchParams}`
      // `${UnsplashApi.BASE_URL}/api/?key=${UnsplashApi.API_KEY}}&q=dog&image_type=photo&orientation=horizontal&safesearch=true&page=6&per_page=20`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
