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
const lightbox = new SimpleLightbox('.gallery a');
const photoSearchService = new PhotoSearchService();

// refs.loadMoreBtn.classList.add('is-hidden');
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


async function onSearch(event) {
    event.preventDefault();
    
    refs.loadMoreBtn.hidden = true; 
    clearPhotoGallery();
    const searchQuery = event.currentTarget.elements.searchQuery.value;
    if(!searchQuery) { 
        return Notiflix.Notify.failure('Write something in field to start search!');
    }
    
    photoSearchService.query = searchQuery;
    photoSearchService.resetPage();

    try { 
        const { hits, total } = await photoSearchService.fetchPhotos();
        appendPhotoGallery(hits);
        showTotalHits(total); 
        refs.loadMoreBtn.hidden = false;    
    } catch (error) {
        console.log(error);
        refs.loadMoreBtn.hidden = true; ;
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
      
}        
let hasMorePhotos = true;
async function onLoadMore() {
    
    if (!hasMorePhotos) return;
   try {
        const { hits } = await photoSearchService.fetchPhotos();
        if (hits.length === 0) {
            hasMorePhotos = false;
            refs.loadMoreBtn.hidden = true; 
            Notiflix.Notify.info('There are no more photos.');
          } else {
            appendPhotoGallery(hits);
          }
        
   } catch (error) {
        console.log(error);
        Notiflix.Notify.failure('Something went wrong. Please try again later.');
  }
    
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
    const markup = createMarkupPhotoGallery(arr);
    refs.getGallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    if (!hasMorePhotos) {
        refs.loadMoreBtn.hidden = true; ;
      }
}
function clearPhotoGallery() {
    refs.getGallery.innerHTML = '';
}
 function showTotalHits(total) {
    if (total === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      } else {
        Notiflix.Notify.success(`Hooray! We found ${total} images.`);
      }
    
 }





    
    


