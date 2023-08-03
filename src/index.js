import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import PhotoSearchService from './pixabay-api.js';

const refs = {
    searchForm: document.querySelector('.search-form'),
    getGallery: document.querySelector('.gallery'),
    searchBtn: document.querySelector('.search'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]'),
}
const photoSearchService = new PhotoSearchService();
// const simpleLightbox = new SimpleLightbox();

let gallery = new SimpleLightbox('.gallery a');
gallery.refresh();

refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(event) {
    event.preventDefault();
    
    clearPhotoGallery();
    photoSearchService.query = event.currentTarget.elements.searchQuery.value;
    if(photoSearchService.query === '') {
        return Notiflix.Notify.failure('Write something in field to start search!');
    }
    
    photoSearchService.resetPage();
   
    photoSearchService.fetchPhotos().then(hits =>
        appendPhotoGallery(hits), 
      );
    refs.loadMoreBtn.classList.remove('is-hidden');  
}        

function onLoadMore() {
   
    photoSearchService.fetchPhotos().then(hits => appendPhotoGallery(hits));
}
function createMarkupPhotoGallery(arr) {
    return arr.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => 
    `<div class="photo-card">
      <a class="gallery__link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
        <div class="info">
        <p class="info-item">
            <b>Likes</b><br>${likes} 
        </p>
        <p class="info-item">
            <b>Views</b><br>${views}
        </p>
        <p class="info-item">
            <b>Comments</b><br>${comments}
        </p>
        <p class="info-item">
            <b>Downloads</b><br>${downloads}
        </p>
        </div>
    </div>
    ` 
    ).join('');
}
function appendPhotoGallery(arr) {
   return refs.getGallery.insertAdjacentHTML('beforeend', createMarkupPhotoGallery(arr));
}
function clearPhotoGallery() {
    refs.getGallery.innerHTML = '';
}





    
    


