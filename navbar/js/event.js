const navbarEvent = {
    fancyBurger() {
        const navbar = $('.navbar');
        const btn = $('.fancy-burger');
        btn.onclick = () => {
            btn.querySelectorAll('span').forEach((span) => {
                span.classList.toggle('open');
            });
            navbar.classList.toggle('open');
        };
    },

    navItem() {
        $$('nav a').forEach((navItem) => {
            navItem.onclick = () => {
                if ($('nav a.active')) $('nav a.active').classList.remove('active');
                navItem.classList.add('active');
            };
        });
    },

    loadSign() {
        let userIconList = $$('#user-icon');

        if (userIconList)
            userIconList.forEach((userIcon) => {
                userIcon.onclick = () => {
                    $('.modal').classList.add('active');
                    $('.modal__body').classList.add('active');
                    renderModalSign.rememberUsername();
                    modalEvent.init('sign');
                };
            });
    },

    loadWishList() {
        $('#heart-icon-mobile').onclick = () => {
            // $('.modal').classList.add('active')
            // $('.modal__wishList').classList.add('active')
            // renderWishList.start()
            window.location.hash = '#wishList';
        };
    },

    btnCart() {
        $('#cart-icon').onclick = () => {
            modalEvent.btnExist('cart')
            $('.modal').classList.add('active')
            $('.modal__cart').classList.add('active')
        }
    },

    loadProfile() {
        let profileIcon = $('#profile-icon');
        if (profileIcon)
            profileIcon.onclick = () => {
                $('.modal').classList.add('active');
                $('.modal__profile').classList.add('active');
                renderModalProfile.start();
            };
    },

    loadAdmin() {
        const admin = $('#icon-admin');
        admin.onclick = function () {
            $('.loader-container').classList.remove('fader-out');
            $('html').classList.add('loader');
            loading();
            const root = $('#root');
            root.innerHTML = Admin();

            Admin_main();
            IndexView.LoadIndex();
            CategoryView.Load();
            ProductView.Load();
            UserView.Load();
            PaginationView.initializePage();
            TableEvent.Initialize();
        };
    },

    loadOrder() {
    },

    SignOut() {
        let iconSignOut = $('#icon-logout')
        if(iconSignOut)
        iconSignOut.onclick = () => {
            chekLogin = false

            ProductModel. Initialize()
            
            let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
            let users = UserModel.getAll();

            users.forEach(user => {
                if(user.id == userCurrent.id) {
                    user.cart = getProductInCart();
                }
            });

            UserModel.UpdateAll(users);
            updateProductInCart([]);

            localStorage.setItem("userCurrent", JSON.stringify(""));
            renderComponentNavbar.userInfoDefault()
            localStorage.setItem("timeExpired", JSON.stringify(''));
            
            renderComponentNavbar.amountWishlist()
            renderWishList.start()
            renderHome.products()
        };
    },

    init() {
        this.fancyBurger();
        this.loadSign();
        this.SignOut();
        this.navItem();
        this.btnCart();
    },
};