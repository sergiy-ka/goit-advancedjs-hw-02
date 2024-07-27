import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import"./assets/vendor-18b38a61.js";const r=document.querySelector(".gallery"),t=galleryItems.map(({preview:a,original:e,description:l})=>`<li class="gallery__item">
              <a class="gallery__link" href="${e}">
                <img
                  class="gallery__image"
                  src="${a}"
                  data-source="${e}"
                  alt="${l}"
                />
              </a> 
            </li>`).join("");r.insertAdjacentHTML("beforeend",t);new SimpleLightbox(".gallery a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
