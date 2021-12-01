const eventOrderPage = {
    init() {
        $$('.orderPage-filter__item').forEach((item) => {
            item.onclick = () => {
                $('.orderPage-filter__item.active').classList.remove('active');
                item.classList.add('active');

                let filter = item.dataset.filter;
                renderOrderPage.items(filter);
            };
        });
    },
};
