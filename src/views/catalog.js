import { getByCategory, getFirstCategory } from "../api/data.js";
import { html } from "../lit.js";

const productsTemplate = (products) => html`
<aside>
    <h3>Filter</h3>
</aside>
<section class="catalog">
    <div class="cat-sort">
        <div class="cat-and-desc">cat
            <span>${products.length} results</span>
        </div>
        
        <div class="sort">Sort</div>
    </div>
    <ul role="list" class="card-wrapper" >
        ${products.length > 0 ? products.map(productCard) : html`<h2>There are no products yet.</h2>`}
</section>`;

const productCard = (product) => html`
<li class="card">
    <div class="img-wrapper">
        <img src=${product.images[0]} alt="" />
    </div>
    <div class="desc">
        <p><strong>Name: </strong><span>${product.title.slice(0, 50)+'...'}</span></p> 
        <p><strong>Discription: </strong><span>${product.description.slice(0, 40)+'...'}</span></p>
        <p><strong>Price: </strong><span>$${product.price}</span></p>
        <p><strong>Rating: </strong><span>${product.rating}</span></p>
        <button>Add to Cart</button>
        <a class="details-btn" href="/products/${product.id}">Details</a>
    </div>
</li>`;

let ctx;

export async function showProducts(context) {
    ctx = context;
    const data = await getFirstCategory();
    console.log(data.products);
    ctx.render(productsTemplate(data.products));
}

export async function showProductsByCategory(context) {
    ctx = context;
    const slug = ctx.state.path;
    console.log(slug);
    const data = await getByCategory(slug);
    console.log(data);
    ctx.render(productsTemplate(data.products));
}
// export async function showDetails(context) {
//     ctx = context;
//     const albumId = ctx.params.id;
//     const data = await getById(albumId);
//     console.log(data);
// export async function showJewelery(context) {
//     ctx = context;
//     const data = await getJeweleryCategory();
//     ctx.render(productsTemplate(data));
// }

// export async function showMenClothes(context) {
//     ctx = context;
//     const data = await getMensCategory();
//     ctx.render(productsTemplate(data));
// }

// export async function showWomenClothes(context) {
//     ctx = context;
//     const data = await getWomenCategory();
//     ctx.render(productsTemplate(data));
// }