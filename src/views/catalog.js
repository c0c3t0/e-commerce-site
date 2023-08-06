import { getByCategory, getFirstCategory } from "../api/data.js";
import { html } from "../lit.js";

const productsTemplate = (products, slug) => html`

    <aside>
        <h3>Filter</h3>
    </aside>
    <section class="catalog">
        <div class="cat-sort">
            <div class="cat-and-desc"><i>${slug.slice(7).toUpperCase()}</i>
                <p>${products.limit} of ${products.total} results</p>
            </div>
            
            <div class="sort">
                <label for="sorting">Sort By:</label> 
                <select @change=${(e, products) => onClick(e, products)} class="sorting-options" name="sorting"> 
                    <option value="name-asc">Name A-Z</option> 
                    <option value="name-desc">Name Z-A</option> 
                    <option value="price-asc">Price Low to High</option> 
                    <option value="price-desc">Price High to Low</option> 
                </select>   
            </div> 
        </div>
        <ul role="list" class="card-wrapper" >
            ${products.products.map(productCard)}
        </ul>
    </section>`;

const productCard = (product) => html`
<li class="card">
    <div class="img-wrapper">
        <img src=${product.images[0]} alt="" />
    </div>
    <div class="desc">
        <p><strong class="title">${product.title.toUpperCase()}</strong></p> 
        <p>${product.description.length > 120
        ? product.description.slice(0, 120) + '...'
        : product.description}</p>
        ${product.discountPercentage
        ? html`<p> 
                    <span class='line-through'>$${product.price}</span>
                    <span class='discount-price'>$${(product.price - product.price * (product.discountPercentage / 100)).toFixed(2)}</span>
                </p>`
        : html`<p><span>$${product.price}</span></p>`}
        <p>
            <i class="fa-star ${product.rating > 1 ? "fa-solid" : "fa-regular"}"></i>
            <i class="fa-star ${product.rating > 2 ? "fa-solid" : "fa-regular"}"></i>
            <i class="fa-star ${product.rating > 3 ? "fa-solid" : "fa-regular"}"></i>
            <i class="fa-star ${product.rating > 4 ? "fa-solid" : "fa-regular"}"></i>
            <i class="fa-star ${product.rating > 5 ? "fa-solid" : "fa-regular"}"></i>
            <span>${product.rating}/5</span>
        </p>
        <button @click=${onAddToCard} class="add">Add to Cart</button>
        <!-- <a class="details-btn" href="/products/${product.id}">Details</a> -->
    </div>
</li>`;

let ctx;

export async function showProducts(context) {
    ctx = context;
    const data = await getFirstCategory();
    ctx.render(productsTemplate(data, 'womens-dresses'));
    ctx.anchors();
}

export async function showProductsByCategory(context) {
    ctx = context;
    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);
    console.log(slug);
    ctx.render(productsTemplate(data, slug));
    ctx.anchors();
}


function onAddToCard(e) {
    e.preventDefault();
    document.querySelector('.notification span').textContent = 'Product added to cart';
    document.querySelector('.notification').style.display = 'flex';

    setTimeout(() => document.querySelector('.notification').style.display = 'none', 4000);
}


async function onClick(e) {
    e.preventDefault();
    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);

    if (e.target.value == 'name-asc') {
        ctx.sortedCards['products'] = data.products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (e.target.value == 'name-desc') {
        ctx.sortedCards['products'] = data.products.sort((a, b) => b.title.localeCompare(a.title));
    } else if (e.target.value == 'price-asc') {
        ctx.sortedCards['products'] = data.products.sort((a, b) => (a.price - a.price * (a.discountPercentage / 100)) - (b.price - b.price * (b.discountPercentage / 100)));
    } else if (e.target.value == 'price-desc') {
        ctx.sortedCards['products'] = data.products.sort((a, b) => (b.price - b.price * (b.discountPercentage / 100)) - (a.price - a.price * (a.discountPercentage / 100)));
    }
    ctx.render(productsTemplate(ctx.sortedCards, slug));
}

