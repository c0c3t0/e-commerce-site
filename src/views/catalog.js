import { getAllItems } from "../api/data.js";
import { html } from "../lit.js";

const productsTemplate = (products) => html`
<aside>
    <h3>Filter</h3>
</aside>
<section class="catalog">
    <div class="cat-sort">
        <div class="cat-and-desc">cat</div>
        <div class="sort">Sort</div>
    </div>
    <ul role="list" class="card-wrapper" >
        ${products.length > 0 ? products.map(productCard) : html`<h2>There are no products yet.</h2>`}
</section>`;

const productCard = (product) => html`
<li class="card">
    <div class="img-wrapper">
        <img src=${product.image} alt="" />
    </div>
    <div class="desc">
        <p><strong>Name: </strong><span>${product.title.slice(0, 60)+'...'}</span></p> 
        <p><strong>Discription: </strong><span>${product.description.slice(0, 40)+'...'}</span></p>
        <p><strong>Price: </strong><span>$${product.price}</span></p>
        <p><strong>Rating: </strong><span>${product.rating.rate}/${product.rating.count}</span></p>
        <button>Add to Cart</button>
        <a class="details-btn" href="/products/${product.id}">Details</a>
    </div>
</li>`;

let ctx;

export async function showProducts(context) {
    ctx = context;
    const data = await getAllItems();
    ctx.render(productsTemplate(data));
}
