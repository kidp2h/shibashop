// const $ = document.querySelector.bind(document);
// const $$ = document.querySelectorAll.bind(document);
function InitEventDetail() {
    const detailInforItem = $$('.detail__infor-item');
    const detailContentPanes = $$('.detail__content-pane');

    // click để thấy nội dung trên PC
    detailInforItem.forEach((Item, index) => {
        const pane = detailContentPanes[index];

        Item.onclick = function () {
            //da fix loi null
            $('.detail__infor-item.detail__infor-item--active').classList.remove(
                'detail__infor-item--active'
            );
            if ($('.detail__content-pane.detail__content-pane--active'))
                $('.detail__content-pane.detail__content-pane--active').classList.remove(
                    'detail__content-pane--active'
                );

            this.classList.add('detail__infor-item--active');
            if (pane) pane.classList.add('detail__content-pane--active');
        };
    });

    // click để thấy nội dung trên điện thoại và Ipad
    const detailPaneHeading = $$('.pane-heading');
    const detailMinusIcons = $$('.pane-icon--minus-icon');
    const detailPlusIcons = $$('.pane-icon--plus-icon');
    const detailTabContent = $$('.pane-tab-content');

    detailPaneHeading.forEach((Item, index) => {
        const content = detailTabContent[index];
        const disableIcon = detailMinusIcons[index];
        const activeIcon = detailPlusIcons[index];
        Item.onclick = function () {
            if (content.style.display == 'block') {
                content.style.display = 'none';
                disableIcon.style.display = 'none';
                activeIcon.style.display = 'block';
                Item.querySelector('.pane-title').style.color = 'black';
            } else {
                content.style.display = 'block';
                disableIcon.style.display = 'block';
                activeIcon.style.display = 'none';
                Item.querySelector('.pane-title').style.color = '#b59677';
            }
        };
    });
}

// click + - lên số ở phần detail:
function stepper(btn) {
    const myInput = $('.my-input');
    let Class = btn.getAttribute('class');
    let min = myInput.min;
    let max = myInput.max;
    let value = myInput.value;
    let step = myInput.step;
    let calcStep = Class == 'increment' ? step * 1 : step * -1;
    let newValue = parseInt(value) + calcStep;
    if (newValue >= min && newValue <= max) {
        myInput.value = newValue;
    }
}

// click + - lên số ở phần you may also like:
function clickPlusMinusRecommendedInput() {
    const recommendedInput = $$('.recommended__input');
    const recommendedIncrement = $$('.recommended__increment');
    const recommendedDecrement = $$('.recommended__decrement');

    recommendedIncrement.forEach((item, index) => {
        let Input = recommendedInput[index];
        item.onclick = function () {
            let max = Input.max;
            let value = Input.value;
            let newValue = parseInt(value) + 1;
            if (newValue <= max) {
                Input.value = newValue;
            }
        };
    });

    recommendedDecrement.forEach((item, index) => {
        let Input = recommendedInput[index];
        item.onclick = function () {
            let min = Input.min;
            let value = Input.value;
            let newValue = parseInt(value) + -1;
            if (newValue >= min) {
                Input.value = newValue;
            }
        };
    });
}

// hover vào màu ảnh chuyển
function hoverColorChangeImg() {
    const recomendedColorList = $$('.recommended__color-item');

    recomendedColorList.forEach((Item) => {
        Item.onmouseover = function (e) {
            let index = e.target.dataset.index - 1;
            let ParentItem = Item.parentElement.parentElement.parentElement;
            let recommendedImagine = ParentItem.querySelectorAll('.recommended-img');

            ParentItem.querySelector('.recommended-img.recommended-img--active').classList.remove(
                'recommended-img--active'
            );
            ParentItem.querySelector(
                '.recommended__color-item.recommended__color-item--active'
            ).classList.remove('recommended__color-item--active');

            this.classList.add('recommended__color-item--active');

            recommendedImagine[index].classList.add('recommended-img--active');
        };
    });
}

// Show slider khi click vào nút next hoặc previous
var slideIndex = 1;

function clickSlideBtn(n) {
    showSlide((slideIndex += n));
}

function showSlide(n) {
    var slides = $$('.item-imgBx');
    var detailColorList = $$('.color__list-item');
    $('.item-imgBx.item-imgBx--active').classList.remove('item-imgBx--active');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    slides[slideIndex - 1].classList.add('item-imgBx--active');

    detailColorList.forEach((colorItem) => {
        if (colorItem.dataset.img == slideIndex - 1) {
            $('.color__list-item.color__list-item--active').classList.remove(
                'color__list-item--active'
            );
            colorItem.classList.add('color__list-item--active');
        }
    });
}

// click vào màu trên mục detail thì nó chuyển ảnh
function clickColorChangeSlide() {
    var slides = $$('.item-imgBx');
    var detailColorList = $$('.color__list-item');

    detailColorList.forEach((color) => {
        color.onclick = function () {
            let slide = slides[color.dataset.img];

            $('.color__list-item.color__list-item--active').classList.remove(
                'color__list-item--active'
            );
            $('.item-imgBx.item-imgBx--active').classList.remove('item-imgBx--active');

            this.classList.add('color__list-item--active');
            slide.classList.add('item-imgBx--active');
        };
    });
}



function makeItem(amountItemAppear) {
    const listItem = $$('.recommended__products-item');
    const wrapperItem = $('.recommended__products-wrapper');
    const recommendedBtnNext = $('.recommended__next-btn');
    const recommendedBtnPrev = $('.recommended__prev-btn');
    const recommendedProducts = $('.recommended__products');
    if(recommendedProducts) {// sua lỗi null khi render trang khac
        const widthItem = recommendedProducts.offsetWidth / amountItemAppear;
        let widthAllItem = widthItem * listItem.length;

        wrapperItem.style.width = `${widthAllItem}px`;

        listItem.forEach((item) => {
            item.style.marginRight = '10px';
            item.style.marginLeft = '10px';
            item.style.width = `${widthItem - 20}px`;
        });

        var count = 0;
        let spacing = widthAllItem - amountItemAppear * widthItem;
        recommendedBtnNext.addEventListener('click', function () {
            count += widthItem;
            if (count > spacing) {
                count = 0;
            }
            wrapperItem.style.transform = `translateX(${-count}px)`;
        });

        recommendedBtnPrev.addEventListener('click', function () {
            count -= widthItem;

            if (count < 0) {
                count = spacing;
            }
            wrapperItem.style.transform = `translateX(${-count}px)`;
        });
    }   
    
}

function SliderProducts() {
    //1366: 4, 1190: 3, 600: 2, 280: 1;
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1366) {
            makeItem(4);
        } else if (window.innerWidth >= 1000) {
            //1280
            makeItem(3);
        } else if (window.innerWidth >= 600) {
            //540
            makeItem(2);
        } else {
            makeItem(1);
        }
    });

    const media = [
        window.matchMedia('(min-width: 1366px)'),
        window.matchMedia('(min-width: 1000px)'),
        window.matchMedia('(min-width: 600px)'),
    ];

    if (media[0].matches) {
        makeItem(4);
    } else if (media[1].matches) {
        makeItem(3);
    } else if (media[2].matches) {
        makeItem(2);
    } else makeItem(1);
}

//sự kiện click next previous của mục you may also like
function slideItem() {
    // document.addEventListener('DOMContentLoaded', );
    SliderProducts()
}



const renderDetailProduct = function (detailProduct) {
    const htmls = html`<div class="detail-item__slider">
            ${detailProduct.imgList
                .map((img, index) => {
                    return `
            <div class="item-imgBx ${index == 0 && 'item-imgBx--active'} 
            data-index = "${index + 1}"">
                <img class="item__img" src="${img}" alt="">
            </div>
            `;
                })
                .join('')}

            <div class="detail-item__next-prev-btn">
                <button class="detail-item__prev-btn" onclick="clickSlideBtn(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="detail-item__next-btn" onclick="clickSlideBtn(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <div class="item-infor">
            <h1 class="item__title">${detailProduct.name}</h1>
            <div class="item__price-status">
                <span class="item__price">${formatMoney(detailProduct.sale, '$')}</span>
                <span class="item__status">In stock</span>
            </div>

            <div class="item__rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span>(11 reviews)</span>
            </div>

            <div class="item-infor__description">
                A pair of twill woven shorts featuring slanted front pockets, buttoned back pockets,
                a zip pocket, buttoned waist, and keychain loop.
            </div>

            <div class="item__option">
                <div class="item__option-color">
                    <h4 class="color__title">
                        COLOR:
                        <span>BLUE</span>
                    </h4>

                    ${detailProduct.colorList &&
                    `
                    <ul class="color__list">
                        ${detailProduct.colorList
                            .map((color, index) => {
                                let colors = color.split(':');
                                console.log('colors : ', colors);
                                return ` 
                                <li class="color__list-item color${colors[0]} ${
                                    index == 0 && 'color__list-item--active'
                                }" data-img="${colors[1] - 1}"></li>                             
                            `;
                            })
                            .join('')}
                    </ul>
                    `}
                </div>
            </div>

            <div class="item__variation">
                <div class="variation__choose">
                    <div class="item__change-input">
                        <button class="decrement" id="decrement" onclick="stepper(this)">-</button>
                        <input
                            type="number"
                            min="1"
                            max="100"
                            step="1"
                            value="1"
                            class="my-input"
                            id="my-input"
                            inputmode="numeric"
                        />
                        <button class="increment" id="increment" onclick="stepper(this)">+</button>
                    </div>
                    <button id="add-to-cart" class="add-to-cart-btn">Add to cart</button>
                    <div class="item__favorative">
                        <i class="far fa-heart"></i>
                    </div>
                </div>
                <button id="buy-it-now" class="buy-it-now-btn">Buy it now</button>
            </div>

            <div class="Img_box">
                <img class="img_more" src="./assets/img/img_more.png" alt="" />
            </div>

            <div class="item__support-link">
                <a class="support-link" href="#">Size Guide</a>
                <a class="support-link" href="#">Delivery & Return</a>
                <a class="support-link" href="#">Ask a Question</a>
            </div>

            <div class="item__meta">
                <span class="sku__wrapper"
                    >SKU:
                    <span class="sku__value"> M-06</span>
                </span>
                <span class="item__meta-Category"
                    >Categories:
                    <a href="#" title>${detailProduct.category}</a>
                </span>
                <span class="item__meta-tags"
                    >Tags:
                    <a href="#" title> blue,</a>
                    <a href="#" title> blue,</a>
                    <a href="#" title> blue,</a>
                </span>
            </div>

            <div class="icon-bar">
                <i class="fab fa-facebook icon-facebook"></i>
                <i class="fab fa-twitter icon-twitter"></i>
                <i class="fas fa-envelope icon-envelope"></i>
                <i class="fab fa-facebook-messenger icon-messenger"></i>
            </div>
        </div>`;
    $('.detail__more-infor-imgBox').innerHTML = detailInforImgBox(detailProduct);
    document.getElementById('detail-item').innerHTML = htmls;
    clickColorChangeSlide();
};

function randomIdProduct(Products, numbers) {
    let number = Math.floor(Math.random() * Products.length);
    let isExist = numbers.includes(number);

    while (isExist) {
        number = Math.floor(Math.random() * Products.length);
        isExist = numbers.includes(number);
    }

    numbers.push(number);
    return number;
}

function detailInforImgBox(product) {
    return ` ${product.imgList
        .map((img, index) => {
            return `
            <div class="detail__more-infor-img">
                <img src="${img}" alt="">
            </div>
        `;
        })
        .join('')}
    `;
}

const renderRecommendedProduct = function () {
    let Products = ProductModel.getAll();
    let htmls = '';
    let numbers = [];

    for (let i = 0; i < 8; i++) {
        htmls += ProductItem(Products[randomIdProduct(Products, numbers)]);
    }

    function ProductItem(product) {
        return html`<div class="recommended__products-item">
            <div class="recommended__product-image">
                <div class="recommended__img">
                    ${product.imgList.map((img, index) => {
                        return `
                            <img class="recommended-img ${
                                index == 0 && 'recommended-img--active'
                            }" src="${img}" alt="">
                        `;
                    }).join('')}
                </div>

                <div class="recommended__add-to-cart">
                    <div class="recommended__quantity">
                        <div class="recommended__quantity-input">
                            <button class="recommended__decrement">-</button>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                step="1"
                                value="1"
                                class="recommended__input"
                                inputmode="numeric"
                            />
                            <button class="recommended__increment">+</button>
                        </div>
                    </div>
                    <span>
                        <button
                            class="recommended__add-to-cart-btn"
                            class="recommended__add-to-cart-btn"
                        >
                            Add to cart
                        </button>
                    </span>
                </div>
            </div>

            <div class="recommended-product-infor">
                <h3>${product.name}</h3>
                <span>${formatMoney(product.sale,'$')}</span>
            </div>
            <div class="recommended__control">
                ${product.colorList &&
                `
                    <ul class="recommended__color-list">
                        ${product.colorList .map((color, index) => {
                            let colors = color.split(':');
                            return `
                            <li data-index="${colors[1]}" class="recommended__color-item color${
                                colors[0]
                            } ${index == 0 && 'recommended__color-item--active'}"></li>
                        `;
                        }) .join('')}
                    </ul> 
                `}
            </div>
        </div>`;
    }

    document.getElementById('recommended__products-wrapper').innerHTML = htmls;
    hoverColorChangeImg();
    clickPlusMinusRecommendedInput();
    slideItem();
};
