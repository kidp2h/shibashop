let prevHash = [];
prevHash.push(window.location.hash);

window.onhashchange = function () {
    prevHash.push(window.location.hash);
    switch (window.location.hash.split('-')[0]) {
        case '#wishList':
            loading();
            renderWishList.start();
            if ($('nav a.active')) $('nav a.active').classList.remove('active');
            break;

        case '#order':
            let userCurrent1 = JSON.parse(localStorage.getItem('userCurrent'));
            if (userCurrent1) {
                loading();
                if ($('nav a.active')) $('nav a.active').classList.remove('active');
                renderOrderPage.start();
                break;
            }

        case '#admin':
            let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
            if (userCurrent && userCurrent.isAdmin == true) {
                loading();
                renderAdmin.start();
                break;
            } else {
                window.location.hash = '#home';
            }

        case '#feature':
        case '#category':
        case '#home':
            if (prevHash[0] != '#home' && prevHash[0] != '#feature' && prevHash[0] != '#category') {
                loading();
                renderHome.start();

                if ($('nav a.active')) 
                $('nav a.active').classList.remove('active');
                $('nav a.home').classList.add('active');

                if (window.location.hash == '#category') {
                    $('nav a.category').click();
                }
                if (window.location.hash == '#feature') {
                    $('nav a.feature').click();
                }
            }
            break;

        case '#product':
            loading();
            let id = Number(window.location.hash.split('-')[1]);
            let product = ProductModel.getAll().filter((product) => product.id == id);
            renderDetail.start(product[0]);
            if ($('nav a.active')) $('nav a.active').classList.remove('active');
            break;

        case '#shop':
            if (prevHash[0].split('-')[0] != '#shop') {
                loading();
                renderShop.start();
                if (window.location.hash.split('-')[1]) {
                    let categoryName = window.location.hash.split('-')[1];
                    $(`.locsanpham.${categoryName.toUpperCase()}`).click();
                }
                if ($('nav a.active')) 
                $('nav a.active').classList.remove('active');
                $('nav a.shop').classList.add('active');
            }
            break;

        case '#order':
            loading();
            if ($('nav a.active')) 
            $('nav a.active').classList.remove('active');
            renderOrderPage.start();
            break;
        case '#about':
            loading();
            renderAbout.start();
            break;
    }
    prevHash.shift();
};

const renderApp = {
    productUserList() {
        ProductModel.getAll().filter((product) => {});
    },

    start() {
        $('#root').innerHTML = App();
        navbarEvent.init();
        modalSignEvent.init();
        renderComponentNavbar.start();
        renderModalSign.rememberUsername();
        //modal - js
        renderProductCart.CartModel();
        eventCart.init();
    },
};

const renderComponentNavbar = {
    userInfo(userCurrent) {
        $('.user-info').innerHTML = UserInfo(userCurrent);
        navbarEvent.SignOut();
        navbarEvent.loadProfile();
    },

    userInfoDefault() {
        $('.user-info').innerHTML = UserInfoDefault();
        navbarEvent.loadSign();
    },

    rememberAccount() {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent) {
            this.userInfo(userCurrent);
            //fix loi load lại lại bắt login nữa hic
            chekLogin = true;
        }
    },

    amountWishlist() {
        let wish = 0;

        userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent) wish = userCurrent.wishList.length;

        $('.navigation-container .icon.wishList').dataset.amount = wish;
        $('.navigation-mobile .icon.noti.wishList').dataset.amount = wish;
    },

    amountCart() {
        let cart = 0;

        productsInCart = JSON.parse(localStorage.getItem('productsInShoppingCart'));
        if (productsInCart) cart = productsInCart.length;

        $('.navigation-container .icon.cart ').dataset.amount = cart;
        $('.navigation-mobile .icon.noti.cart ').dataset.amount = cart;
    },

    start() {
        this.rememberAccount();
        this.amountWishlist();
        this.amountCart()
    },
};

const renderModalSign = {
    rememberUsername() {
        let username = JSON.parse(localStorage.getItem('username'));
        $('.groups input').value = username;
    },
};

const renderModalProfile = {
    start() {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let inputList = $$('.modal-profile__info input');
        if (inputList) {
            inputList[0].value = userCurrent.fullname;
            inputList[1].value = userCurrent.address;
            inputList[2].value = userCurrent.phone;
        }
        $('.modal-profile__imgBox img').src =
            userCurrent.img || 'https://source.unsplash.com/random';
        $('.modal-profile__header h1').innerText = userCurrent.username;
        modalProfileEvent.init();
    },
};

const renderHome = {
    slider: function () {
        $('.slider-wrapper').innerHTML = SliderModel.getAll()
            .map((slide) => SliderItem(slide))
            .join('');

        $('.slider-dots').innerHTML = SliderModel.getAll()
            .map((slide) => SliderDots(slide))
            .join('');
    },

    categories: function () {
        $('.category-box').innerHTML = CategoryModel.getAll()
            .map((category) => CategoryItem(category))
            .join('');
    },

    products: function (page = 1) {
        let products = ProductModel.getDocumentsByPage_Rate(page, 8);
        
        let productBox = $('.product .product-box');
        if (!productBox) return;

        if (page == 1) {
            productBox.innerHTML = products.map((product) => ProductItem(product)).join('');
            homeEvent.btnProduct();
            homeEvent.btnItemProduct();
            homeEvent.btnLoad();
        } else {
            productBox.insertAdjacentHTML(
                'beforeend',
                products.map((product) => ProductItem(product)).join('')
            );
        }

        AddToCart();
    },

    start: function () {
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = Home();
        this.slider();
        this.categories();
        this.products();
        homeEvent.init();
    },
};

const renderWishList = {
    start() {
        //fix lỗi sign out lỗi bậy
        if (window.location.hash != '#wishList') return;
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = WishList();

        let products = ProductModel.getAll();
        let productWish = '';

        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent)
            userCurrent.wishList.forEach((id) => {
                products.forEach((product) => {
                    if (id == product.id) productWish += ProductItem(product);
                });
            });

        if (productWish) {
            $('.wishList__box').innerHTML = ProductBox();
            $('.product-box').innerHTML = productWish;
        } else {
            $('.wishList__box').innerHTML = WishList__Empty();
        }

        renderComponentNavbar.amountWishlist();
        wishListEvent.init();
    },
};

const renderOrderPage = {
    items(filter = 'ALL') {
        if(window.location.hash != '#order') return;
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let bills;
        if(userCurrent) 
        bills = BillModel.getAll().filter((bill) => bill.username == userCurrent.username);

        if(!bills) {
            $('.orderPage__items').innerHTML = OrderItemEmpty()
            return;
        }

        let items = ''
        if(filter == 'ALL') {
            items = bills.map((bill) => OrderItem(bill)).join('');
        }
        else {
            items = bills.filter(bill => bill.status == filter)
            .map((bill) => OrderItem(bill)).join('');
        }

        if(items == '') $('.orderPage__items').innerHTML = OrderItemEmpty()
        else  $('.orderPage__items').innerHTML = items;
    },

    start() {
        if (window.location.hash != '#order') return;
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = OrderPage();
        this.items();
        eventOrderPage.init()
    },
};

const renderAbout = {
    start() {
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = About();
    }
};

const renderToastAddToCart = {
    start() {
        let toastApp = $('#toast-app')
        let toasts = document.createElement('div')
        toasts.classList.add('toast-app')
        toasts.innerHTML = ToastAddToCart()
        toastApp.appendChild(toasts)

        toasts.querySelector('.toast-app__close').onclick = () => {
            toastApp.removeChild(toasts);
        }

        setTimeout(() => {
            toastApp.removeChild(toasts);
        },2000)
    }
}

//================================> PHÚC THỊNH <================================
const renderAdmin = {
    start() {
        $('#root').innerHTML = Admin();
        Admin_Main();
        IndexView.LoadIndex();
        CategoryView.Load();
        ProductView.Load();
        UserView.Load();
        BillView.Load();
        RevenueView.Load();
        PaginationView.initializePage();
        TableEvent.Initialize();

        $('#admin .user').onclick = () => {
            window.location.hash = '#home';
        };
    },
};

//================================> CHI THỊNH <================================
const renderDetail = {
    start(product) {
        loading();
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = Detail();
        InitEventDetail();
        renderDetailProduct(product);
        renderRecommendedProduct();
        SliderProducts();
    },
};

const renderShop = {
    start() {
        if (!$('#app')) renderApp.start();
        $('#app').innerHTML = Shop();
        rendertheloai();
        renderData();
        renderproducts();
        taotrang();
        InitEvent();
    },
};

// start web
// renderApp.start()
// navbarEvent.init()
// modalSignEvent.init()
// renderComponentNavbar.rememberAccount()
// renderModalSign.rememberUsername()
renderApp.start();
switch (window.location.hash.split('-')[0]) {
    case '#wishList':
        loading();
        renderWishList.start();
        $('nav a.active').classList.remove('active');
        break;

    case '#order':
        let userCurrent1 = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent1) {
            loading();
            if ($('nav a.active')) $('nav a.active').classList.remove('active');
            renderOrderPage.start();
            break;
        }

    case '#admin':
        let userCurrent2 = JSON.parse(localStorage.getItem('userCurrent'));
        if (userCurrent2 && userCurrent2.isAdmin == true) {
            loading();
            renderAdmin.start();
            break;
        } else {
            window.location.hash = '#home';
        }

    case '#feature':
    case '#category':
    case '#home':
        loading();
        renderHome.start();
        break;

    case '#product':
        loading();
        let id = Number(window.location.hash.split('-')[1]);
        let product = ProductModel.getAll().filter((product) => product.id == id);
        if ($('nav a.active')) $('nav a.active').classList.remove('active');
        renderDetail.start(product[0]);
        break;

    case '#shop':
        loading();
        renderShop.start();
        window.location.hash = '#shop';
        $('nav a.active').classList.remove('active');
        $('nav a.shop').classList.add('active');
        break;
        
    case '#about':
        loading();
        renderAbout.start();
        break;
}