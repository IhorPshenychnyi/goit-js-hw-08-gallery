import galleryItems from './gallery-items.js';


const galleryContainer = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.lightbox');
const currentImage = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlayBox = document.querySelector('.lightbox__overlay');

const galleryMarkUp = makeGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkUp);
galleryContainer.addEventListener('click', onGalleryContainerClick);
closeModalBtn.addEventListener('click', onCloseModal);
overlayBox.addEventListener('click', onOverlayClick);


function makeGalleryItemsMarkup(galleryItems) {
    return galleryItems
        .map(({ preview, original, description }) => {
            return `
                <li class="gallery__item">
                    <a
                        class="gallery__link"
                        href="${original}"
                    >
                        <img
                            class="gallery__image"
                            src="${preview}"
                            data-source="${original}"
                            alt="${description}"
                        />
                    </a>
                </li>`;
        })
        .join(''); 
}

function onGalleryContainerClick(event) {
    event.preventDefault();
    if (!event.target.classList.contains('gallery__image')) {
        return ;
    } else { event.target.dataset.source };
    modalWindow.classList.add('is-open');
    currentImage.src = event.target.dataset.source;
    window.addEventListener('keydown', onEscKeyPress)
}

function onCloseModal() {
    window.removeEventListener('keydown', onEscKeyPress);
    modalWindow.classList.remove('is-open');
}

function onOverlayClick() {
    onCloseModal();
}

function onEscKeyPress(event) {
    if (event.code === 'Escape') {
        onCloseModal()
    }
}
