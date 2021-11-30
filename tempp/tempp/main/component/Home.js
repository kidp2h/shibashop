function Home() {
    return html`
        <div id="home">
            <div class="slider">
                <div class="slider-wrapper">
                </div>

                <div class="slider-controls">  
                    <li class="btn btn-prev"><i class="fas fa-angle-double-left"></i></li>
                    <li class="btn btn-next"><i class="fas fa-angle-double-right"></i></li>
                </div> 

                <ul class="slider-dots">
                </ul>

            </div>   

            <div id="category" class="category">
                <div class="category-header">
                    <h2 class="heading">Shop Collections</h2>
                    <p class="content">Select from the premium product and save plenty money</p>
                </div>

                <div class="category-box">
                </div>
            </div>

            <div id="feature" class="product">
                <div class="product-header">
                    <h2 class="heading">Featured Products</h2>
                    <p class="content">Select from the premium product and save plenty money</p>
                </div>

                <div class="product-box">
                </div>       

                <div class="btn btn-load">Load More</div>
            </div>  
        </div>  
    `
}

function SliderItem( slide ) {
    return html`
        <div class="slider-wrapper__slide ${slide.id == 1 && 'active'}">
            <div class="slide__content">
                <span>${slide.title}</span>
                <h3>${slide.header}</h3>
                <p>${slide.desc}</p>
                <a href="" class="btn slide__btn">SHOP NOW</a>
            </div>
            <div class="slide__imageBox">
                <img src="${slide.img}" alt="" class="slide__image">
            </div>
        </div>

    `
}

function SliderDots(slide) {
    return html`
        <li class="slider-dot-item ${slide.id == 1 && 'active'}" data-index="${slide.id}"></li>
    `
}


function CategoryItem( category ) {
    return html`
    <div class="category-item">
        <h2 class="category-content" data-text="${category.name}"> ${category.name} </h2>
        <div class="category-image__box">
            <img src="${category.img}" alt="unsplash" class="category-image"/>
        </div>
    </div>
    `
}

function ProductItem( product, type) {
    return html`  
        <div class="product-item">
            <div class="product-image__box">

                <img src="${product.imgList[0]}" alt="unsplash" class="product-image"/>
                <img src="${product.imgList[1]}" alt="unsplash" class="product-image--back"/>

                <div class="icon-heart ${product.wish == 1 && 'active'}" data-index="${product.id}" data-wish="${product.wish}">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart"></i>
                </div>
                
                <div class="product-control">
                    <div class="product-quantity">
                        <button class="btn btn-mul"> - </button>
                        <input type="number" min="1" max="99" value="1">
                        <button class="btn btn-add"> + </button>
                    </div>
                    <div class="product-add-cart addToCart" data-id = "${product.id}">
                        ${!type && `
                        <div>
                            <i id="add">ADD TO CART</i>
                        </div>
                        `}
                        <div>
                            <i id="cart-icon" class="fas fa-shopping-cart"></i>
                        </div>   
                    </div>
                </div>
            </div>

            <div class="product-info">
                <h2 class="product-info__heading">${product.name}</h2>
                <div class="product-price">
                    <span class="product-info__price product-info__price--sale">${product.sale}</span>
                    <span class="product-info__price">${ formatMoney(product.price, '$')}</span>
                </div> 
            </div> 
        </div>
    `
}
