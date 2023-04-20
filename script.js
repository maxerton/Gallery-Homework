'use strict'

class ModalMenenger {
  constructor(gallery, modal) {
    this.gallery = gallery;
    this.modal = modal;
  }

  galleryHandler(ev) {
    console.log(ev.target);
    if (ev.target.matches('img')) {
      this.showModal(ev.target.dataset.title, ev.target.dataset.text, ev.target.getAttribute('src'));
      this.modal.dataset.id = Array.prototype.indexOf.call(this.gallery.querySelectorAll('.img-wrapper img'), ev.target);
    }
  }

  modalHandler(ev){
    if (ev.target.matches('.cross, .cross span')) {
      this.closeModal();
    } else if (ev.target.matches('.next-btn, .next-btn span')) {
      const imgs = this.gallery.querySelectorAll('.img-wrapper img');
      const g = imgs.length;
      const nextElem = (+this.modal.dataset.id + 1) % g;
      console.log(nextElem);
      this.showModal(imgs[nextElem].dataset.title, imgs[nextElem].dataset.text, imgs[nextElem].getAttribute('src'));
      this.modal.dataset.id = nextElem;
    }
  }

  showModal(title, text, src) {
    this.modal.querySelector('img').setAttribute('src', src);
    this.modal.querySelector('h3').textContent = title;
    this.modal.querySelector('p').textContent = text;
    this.modal.style.display = 'flex';
    const mod = this.modal;
    setTimeout(function() {
      mod.classList.add('show');
    }, 1);
  }

  closeModal() {
    this.modal.classList.remove('show');
    const mod = this.modal;
    setTimeout(function() {
      mod.style.display = 'none';
    }, 500);
  }

  init() {
    this.gallery.addEventListener('click', this.galleryHandler.bind(this));
    this.modal.addEventListener('click', this.modalHandler.bind(this));
    this.modal.style.display = 'none';
  }
}

const mm = new ModalMenenger(
  document.querySelector('.container'),
  document.querySelector('.modal')
);
mm.init();
