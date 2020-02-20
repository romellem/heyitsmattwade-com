import * as basicLightbox from 'basiclightbox';
import { once } from './util';

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const lightbox_links = qsa('[data-basiclightbox-enable]');
for (let i = 0; i < lightbox_links.length; i++) {
	const lightbox_link = lightbox_links[i];
	lightbox_link.addEventListener('click', function onClick(e) {
		e.preventDefault();
		const href = this.getAttribute('href');
		const lightbox_type = this.getAttribute('data-basiclightbox-enable');
		let instance;
		let escToClose;
		const default_options = {
			onShow(modal) {
				escToClose = once(document.body, 'keydown', function (ev) {
					if (ev.keyCode === 27 && modal.visible()) {
						modal.close();
					}
				});
			},
			onClose() {
				escToClose?.();
			},
		};

		if (this.instance?.visble?.()) {
			this.instance?.close();
		}
		if (lightbox_type === 'video') {
			// @todo support different video formats
			instance = basicLightbox.create(
				`<video autoplay controls loop muted>
					<source src="${href}" type="video/mp4">
				</video>`,
				default_options
			);
			instance.show();
		} else if (lightbox_type === 'image') {
			instance = basicLightbox.create(`<img src="${href}" />`, default_options);
			instance.show();
		}

		this.instance = instance;
	});
}
