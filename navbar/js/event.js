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
                if ($('.navbar.open')) $('.fancy-burger').click()
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

    btnSearch() {
        let search = $('#search-icon')
        search.onclick = () => {
            $('.navbar__inputSearch').classList.toggle('active')
            $('#search-icon').classList.toggle('fa-times')
            $('#search-icon-mb i').classList.toggle('fa-times')

            if($('.navbar__inputSearch.active')) $('.navbar-input-Search').focus()
        }

        $('#search-icon-mb').onclick = () => {
            search.click()
        }

        $('#nav-search').onclick = () => {
            search.click()
            window.location.hash = `#shop-search:${$('.navbar-input-Search').value}`
            $('.navbar-input-Search').value = ""   
        }

        $('.navbar-input-Search').onkeydown = (e) => {
            if(e.keyCode == 13)  {
                if(!$('.navbar-input-Search').value) return;
                search.click()
                window.location.hash = `#shop-search:${$('.navbar-input-Search').value}`
                $('.navbar-input-Search').value = ""
            }
        }
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
                    user.wishList = userCurrent.wishList;
                }
            });

            UserModel.UpdateAll(users);
            updateProductInCart([]);

            localStorage.setItem("userCurrent", JSON.stringify(""));
            renderComponentNavbar.userInfoDefault()
            localStorage.setItem("timeExpired", JSON.stringify(''));
            
            renderComponentNavbar.amountWishlist()
            renderComponentNavbar.amountCart()
            renderOrderPage.items()
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
        this.btnSearch();
    },
};