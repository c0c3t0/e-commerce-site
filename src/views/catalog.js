import { getByCategory, getFirstCategory } from "../api/data.js";
import { html } from "../lit.js";
import { setLeftValue, setRightValue } from "./filter.js";

const productsTemplate = (products, slug) => html`

    <aside>
        <h3>Filter by Price</h3>
        <div class="filter-wrapper">
            <div class="slider-value">
                <span id="title-min" class="slider-value__title">50</span>
                <span id="title-max" class="slider-value__title">150</span>
            </div>
            <div class="double-slider">
                <div class="double-slider__body">
                    <div class="double-slider__track">
                        <div id="slider-range" class="double-slider__range"></div>
                        <div id="dot-left" class="double-slider__dot double-slider__dot--left"></div>
                        <div id="dot-right" class="double-slider__dot double-slider__dot--right"></div>
                    </div>
                    <input @input=${setLeftValue} @click=${filterProducts} id="input-left" min="0" max="200" value="50" type="range" class="double-slider__input">
                    <input @input=${setRightValue} @click=${filterProducts} id="input-right" min="0" max="200" value="150" type="range" class="double-slider__input">
                </div>
            </div>
        </div>
        <hr>
        <h3>Filter by Rating</h3>
        <div>
            <form @change=${filterByRating} action="">
                <input type="radio" id="rating1" name="rating" value="1">
                <i class="fa-star fa-solid"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i>
                <label for="rating0"></label><br>
                <input type="radio" id="rating2" name="rating" value="2">
                <i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i>
                <label for="rating2"></label><br>
                <input type="radio" id="rating3" name="rating" value="3">
                <i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-regular"></i><i class="fa-star fa-regular"></i>
                <label for="rating3"></label><br>
                <input type="radio" id="rating4" name="rating" value="4">
                <i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-regular"></i>
                <label for="rating4"></label><br>
                <input type="radio" id="rating5" name="rating" value="5">
                <i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i><i class="fa-star fa-solid"></i>
                <label for="rating5"></label><br>
             </form>
        </div>

    </aside>
    <section class="catalog">
        <div class="cat-sort">
            <div class="cat-and-desc"><em>${slug.slice(7).toUpperCase()}</em>
                <!-- <p>${products.products.length} of ${products.total} results</p> -->
            </div>
            
            <div class="sort">
                <label for="sorting">Sort By:</label> 
                <select @click=${onClick} class="sorting-options" name="sorting"> 
                    <option value="name-asc">Name A-Z</option> 
                    <option value="name-desc">Name Z-A</option> 
                    <option value="price-asc">Price Low to High</option> 
                    <option value="price-desc">Price High to Low</option> 
                </select>   
            </div> 
        </div>
        <ul role="list" class="card-wrapper" >
            ${products.products.length ? products.products.map(productCard) : html`<h3>There are no results yet!</h3>`}
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
    console.log(data);

    ctx.anchors();
}

export async function showProductsByCategory(context) {
    ctx = context;
    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);
    console.log(data);
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

async function filterProducts(e) {
    e.preventDefault();
    let id = e.target.id;

    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);

    if (id === 'input-left') {
        let titleMax = document.querySelector('#title-max');

        ctx.filteredCards['products'] = data.products
            .filter
            (p => p.price - p.price * (p.discountPercentage / 100) >= Number(e.target.value) && p.price - p.price * (p.discountPercentage / 100) <= Number(titleMax.textContent));

    } else if (id === 'input-right') {
        let titleMin = document.querySelector('#title-min');
        ctx.filteredCards['products'] = data.products
            .filter
            (p => p.price - p.price * (p.discountPercentage / 100) >= Number(titleMin.textContent) && p.price - p.price * (p.discountPercentage / 100) <= Number(e.target.value));
    };

    ctx.render(productsTemplate(ctx.filteredCards, slug));
}


async function filterByRating(e) {
    e.preventDefault();

    const slug = ctx.state.path.slice(1);
    const data = await getByCategory(slug);

    let checked = {};

    getChecked('rating1');
    getChecked('rating2');
    getChecked('rating3');
    getChecked('rating4');
    getChecked('rating5');

    setVisibility();

    function getChecked(id) {
        checked[id] = Array.from(document.querySelectorAll('input[id=' + id + ']:checked')).map(el => console.log(el.value));
        console.log(document.querySelectorAll('input[id=' + id + ']:checked'));
        console.log(checked);
    }

    function setVisibility() {
        if (checked.rating1.length) {
            ctx.rateCards['products'] = data.products.filter(p => p.rating >= 0 && p.rating < 1);
        };

        if (checked.rating2.length) {
            ctx.rateCards['products'] = data.products.filter(p => p.rating >= 1 && p.rating < 2);
        };

        if (checked.rating3.length) {
            ctx.rateCards['products'] = data.products.filter(p => p.rating >= 3 && p.rating < 4);
        };

        if (checked.rating4.length) {
            ctx.rateCards['products'] = data.products.filter(p => p.rating >= 4.0 && p.rating < 4.3);
        };

        if (checked.rating5.length) {
            ctx.rateCards['products'] = data.products.filter(p => p.rating >= 4.3 && p.rating < 5);
        };

        ctx.render(productsTemplate(ctx.rateCards, slug));

        if (checked.rating1.length == 0 &&
            checked.rating2.length == 0 &&
            checked.rating3.length == 0 &&
            checked.rating4.length == 0 &&
            checked.rating5.length == 0) {
            ctx.render(productsTemplate(data.products, slug));
        };
    }
}