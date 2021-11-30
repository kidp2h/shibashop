function OrderPage() {
    return html`
        <div id="orderPage">
            <div class="banner">
                <div class="banner__header">
                    <h1>My Order</h1>
                </div>
                <div class="banner__img-box">
                    <img src="https://source.unsplash.com/random" alt="" />
                </div>
            </div>

            <div class="orderPage__box">
                <div class="orderPage__filter">
                    <div class="orderPage-filter__item active" data-filter = "ALL">
                        <span>ALL</span>
                    </div>
                    <div class="orderPage-filter__item" data-filter = "PENDING">
                        <span>PENDING</span>
                    </div>
                    <div class="orderPage-filter__item" data-filter = "COMPLETED">
                        <span>COMPLETED</span>
                    </div>
                    <div class="orderPage-filter__item" data-filter = "CANCELLED">
                        <span>CANCELLED</span>
                    </div>
                </div>

                <div class="orderPage__items"></div>
            </div>
        </div>
    `;
}

function OrderEmpty() {
    return html`
    <div class="orderPage__Empty">
        <div class="emty__logo">
            <i class="fas fa-file-invoice-dollar"></i>
        </div>
        <h2>MY ORDER IS EMPTY.</h2>
        <p>You don't have any order in the My Order yet.</p>
        
        <p>You will find a lot of interesting products on our "Shop" page.</p>

        <button>RETURN TO SHOP</button>
    </div>
    `
}

function OrderItem(orderBill) {
    return html`
    <div class="order__item">
        <div class="order__products">
            <div class="order-products__header">
                <h2>${orderBill.status}</h2>
            </div>
            <div class="order-products__box">
                ${orderBill.products.map(product => OrderProduct(product))}
            </div>
        </div>
        <div class="order__subtotal">
            <p>Oder date: ${dateTime(orderBill.created_at)}</p>
            <h2>SUBTOTAL: &emsp; ${formatMoney(orderBill.subtotal,'$')}</h2>
        </div>
    </div>
    `;
}

function dateTime(date) {
    let d = new Date(date)
    return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + " " 
}

function OrderItemEmpty() {
    return html`
        <div class="order__itemEmpty">
            <i class="fas fa-file-invoice-dollar"></i>
            <h2>No orders yet</h2>
        </div>
    `
}

function OrderProduct(product) {
    return html`
    <div class="order-product">
        <div class="order-product__info">
            <div class="order-product__imgBox">
                <img
                    src="${product.img}"
                    alt=""
                />
            </div>
            <div class="order-product__content">
                <h2 class="order-product__name">
                    ${product.name}
                </h2>
                <p class="order-product__quantity">Quantity: ${product.quantity}</p>
                <p class="order-product__price">${formatMoney(product.price,'$')}</p>
            </div>
        </div>
        <div class="order-products__priceTotal">
            <p>${formatMoney(product.price * product.quantity, '$')}</p>
        </div>
    </div>
    `
}
