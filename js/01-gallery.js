import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");

const renderGalleryItem = (item) => `
  <li class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </li>
`;

galleryItems.forEach((item) => {
  const galleryItemHtml = renderGalleryItem(item);
  galleryContainer.insertAdjacentHTML("beforeend", galleryItemHtml);
});

galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();
  const clickedElement = event.target;
  if (clickedElement.classList.contains("gallery__image")) {
    const largeImageUrl = clickedElement.dataset.source;
    openModal(largeImageUrl);
  }
});

const openModal = (largeImageUrl) => {
  const instance = basicLightbox.create(`
    <div>
      <img src="${largeImageUrl}" alt="">
    </div>
  `);

  instance.show();

  const closeModalOnEsc = (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  };

  const modalElement = instance.element();
  modalElement.addEventListener("click", () => {
    instance.close();
  });

  document.addEventListener("keydown", closeModalOnEsc, { once: true });
};

console.log(basicLightbox);
