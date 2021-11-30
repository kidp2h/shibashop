function WishList() {
    return html`
    <div id="wishList">
        <div class="banner">
            <div class="banner__header">
                <h1>View your wishlist products</h1>
            </div>
            <div class="banner__img-box">
                <img src="https://source.unsplash.com/random" alt="">
            </div>
        </div>
        <div class="wishList__box">
            
        </div>
    </div>
    `
}

function ProductBox() {
    return html`
    <div class="product-box"></div>       
    `
}

function WishList__Empty() {
    return html`
    <div class="wishList__Empty">
        <div class="emty__logo">
            <i class="far fa-heart"></i>
        </div>
        <h2>WISHLIST IS EMPTY.</h2>
        <p>You don't have any products in the wishlist yet.</p>
        
        <p>You will find a lot of interesting products on our "Shop" page.</p>

        <button>RETURN TO SHOP</button>
    </div>
    `
}