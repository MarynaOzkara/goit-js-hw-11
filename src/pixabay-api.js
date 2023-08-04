import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `38565431-b345df84834b1c56108720619`;


export default class PhotoSearchService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

   async fetchPhotos() {
        const url = `${BASE_URL}`;
        const params = {
            key: API_KEY,
            image_type: `photo`,
            orientation: `horizontal`,
            safesearch: true,
            per_page: 40,
            q: this.searchQuery,
            page: this.page,
        };
        try {
            const response = await axios.get(url, { params });
            this.page += 1;
            const { hits, total } = response.data;
            
            if (total === 0) {
                throw new Error('No images matching your search query.');
              }
              return { hits, total };
            } catch (error) {
              console.log(error);
              throw error;
        }
          
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
       this.searchQuery = newQuery;
    }
}




