import { page, render } from './lit.js';
import { showProducts } from './views/catalog.js';

const root = document.querySelector('main');

page(decorateContext)
page('/', showProducts);

page.start();

function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, root);
    next();
}