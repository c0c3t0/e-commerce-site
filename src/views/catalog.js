import { getByCategory, getFirstCategory } from "../api/data.js";
import { html } from "../lit.js";

const productsTemplate = (products, slug) => html`
    <section class="notifications">
        <div class="notification">
            <span></span>
        </div>
    </section>
<aside>
    <h3>Filter</h3>
</aside>
<section class="catalog">
    <div class="cat-sort">
        <div class="cat-and-desc"><i>${slug.slice(7).toUpperCase()}</i>
            <p>${products.limit} of ${products.total} results</p>
        </div>
        
        <div class="sort">Sort</div>
    </div>

    <ul role="list" class="card-wrapper" >
        ${products.products.length > 0 ? products.products.map(productCard) : html`<h2>There are no products yet.</h2>`}
</section>`;

const productCard = (product) => html`
<li class="card">
    <div class="img-wrapper">
        <img src=${product.images[0]} alt="" />
    </div>
    <div class="desc">
        <p><strong>Name: </strong><span>${product.title.slice(0, 50) + '...'}</span></p> 
        <p><strong>Discription: </strong><span>${product.description.slice(0, 40) + '...'}</span></p>
        ${product.discountPercentage 
            ? html`<p><strong>Price: </strong><span class='line-through'>$${product.price}</span>
                <span class='discount-price'>$${(product.price - product.price * (product.discountPercentage / 100)).toFixed(2)}</span></p>`
            : html`<p><strong>Price: </strong><span class='line-through'>$${product.price}</span>`}
        <p><strong>Price: </strong><span>$${product.price}</span></p>
        <p><strong>Price: </strong><span>$${product.discountPercentage ? (product.price - product.price * (product.discountPercentage / 100)).toFixed(2) : product.price}</span></p>
        <p><strong>Rating: </strong><span>${product.rating}</span></p>
        <button @click=${onAddToCard}>Add to Cart</button>
        <a class="details-btn" href="/products/${product.id}">Details</a>
    </div>
</li>`;

let ctx;

export async function showProducts(context) {
    ctx = context;
    const data = await getFirstCategory();
    ctx.render(productsTemplate(data, 'womens-dresses'));
}

export async function showProductsByCategory(context) {
    ctx = context;
    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);
    console.log(data);
    ctx.render(productsTemplate(data, slug));
}


function onAddToCard(e) {
    e.preventDefault();
    document.querySelector('.notifications span').textContent = 'Product added to cart';
    document.querySelector('.notification').style.display = 'block';

    setTimeout(() => document.querySelector('.notification').style.display = 'none', 3000);
}