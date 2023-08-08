import { page, render } from './lit.js';
import { showProducts, showProductsByCategory } from './views/catalog.js';

const root = document.querySelector('main');
const navLinks = document.querySelectorAll('.navigation a');

page(decorateContext)
page('/womens-dresses', showProducts);
page('/:slug', showProductsByCategory);
page.start();
anchors();


function decorateContext(ctx, next) {
    ctx.anchors = anchors;
    ctx.sortedCards = {};
    ctx.filteredCards = {};
    ctx.rateCards = {};
    ctx.render = (content) => render(content, root);
    next();
}


function anchors() {
    navLinks.forEach(a => {
        if (document.location.pathname.endsWith('/')) {
            a.style.color = 'black';
        }
        else if (a.href.includes(document.location.pathname.slice(8))) {
            a.style.color = 'green';
        } else {
            a.style.color = 'black';
        };
    });
}