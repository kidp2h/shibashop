const wishListEvent = {
    btn() {
        let btnWishList = $$('#wishList .icon-heart');
        let _this = this;
        btnWishList.forEach((icon) => {
            icon.onclick = function (e) {
                e.stopPropagation();
                _this.changeStatusWish(icon);
                renderWishList.start();
            };
        });

        let btnReturn = $('.wishList__Empty button');
        if (btnReturn)
            btnReturn.onclick = () => {
                window.location.hash = '#home';
            };
    },

    changeStatusWish(icon) {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let wish = icon.dataset.wish == 1 ? true : false;
        wish = !wish;
        icon.dataset.wish = wish ? 1 : 0;
        icon.classList.toggle('active');

        ProductModel.updateWish(icon.dataset.index, wish ? 1 : 0);
        UserModel.updateWishList(userCurrent, icon.dataset.index, wish);
    },

    updateProductBeWish() {
        let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
        let userCurrentTemp = JSON.parse(localStorage.getItem('userCurrent'));

        if (!userCurrent) return;

        let isExist;

        if (userCurrent.wishList.length == 0) return

        let products = ProductModel.getAll();

        userCurrent.wishList.forEach((id) => {
            isExist = false;

            products.forEach((product) => {
                if (id == product.id) {
                    product.wish = 1;
                    isExist = true;
                }
            });

            if (!isExist) {
                UserModel.updateWishList(userCurrentTemp, id, 0);
            }
        });

        renderComponentNavbar.amountWishlist();
        ProductModel.UpdateAll(products);
    },

    init() {
        homeEvent.btnProduct();
        homeEvent.btnItemProduct();
        this.btn();
    },
};