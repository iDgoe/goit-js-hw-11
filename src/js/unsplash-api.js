const KEY = '35197019-a7fce12511fd1af60ca1b8895';
import axios from 'axios';

export class UnsplashApi {
  static BASE_URL = 'https://pixabay.com';
  static API_KEY = '35197019-a7fce12511fd1af60ca1b8895';

    constructor() {
        this.query = null;
        this.page = 1;
        this.perPage = 20;
  }

  fetchPhotosByQuery(query) {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      per_page: this.perPage,
      orientation: 'horizontal',
      image_type: 'photo',
      key: UnsplashApi.API_KEY,
    });

    return axios.get(
      `${UnsplashApi.BASE_URL}/api/?${searchParams}`
    )
  }
}