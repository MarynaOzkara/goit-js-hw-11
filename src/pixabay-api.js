import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const API_KEY = `38565431-b345df84834b1c56108720619`;
const params = new URLSearchParams ({
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: true,
        per_page: 40,
    });

export default class PhotoSearchService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchPhotos() {
        
        const url = `${BASE_URL}?key=${API_KEY}&${params}&q=${this.searchQuery}&page=${this.page}`;

        const getPhoto = () => axios.get(url);

        return getPhoto()
            .then(({data}) => {
                this.page += 1;
                return data.hits;   
            })
            .catch((error) => {
                console.log(error);
            });
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




