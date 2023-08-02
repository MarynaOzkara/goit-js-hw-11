import PhotoSearchService from './pixabay-api.js';
import PhotoSearchService from './pixabay-api.js';

const refs = {
    searchForm: document.querySelector('.search-form'),
    getGallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}
const photoSearchService = new PhotoSearchService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(event) {
    event.preventDefault();

    photoSearchService.query = event.currentTarget.elements.searchQuery.value;
    photoSearchService.resetPage();
    photoSearchService.fetchPhotos();
    
}

function onLoadMore() {
   
    photoSearchService.fetchPhotos();

}

