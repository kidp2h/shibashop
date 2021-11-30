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

    init() {
        homeEvent.btnProduct();
        homeEvent.btnItemProduct();
        this.btn();
    },
};