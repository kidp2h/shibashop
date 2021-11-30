window.onhashchange = function() {
    switch(window.location.hash.split('-')[0]) {
        case "#wishList":
            loading()
            renderWishList.start()
            break;
        case "#admin":
            let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
            if(userCurrent && userCurrent.isAdmin == true) {
                loading()
                renderAdmin.start()
                break; 
            }else {
                window.location.hash = "#home"
            }
        case "#home": 
            loading()
            renderHome.start()
            break;

        case "#product": 
            loading()
            let id = Number(window.location.hash.split('-')[1])
            console.log("id: ", id);
            let product = ProductModel.getAll().filter(product => product.id == id)
            renderDetail.start(product[0])
            break;
        
        case "#shop":
            renderShop.start()
        
    }
}


const renderApp =  {
    productUserList() {
        ProductModel.getAll().filter(product => {
            
        })
    },

    start() {
        $('#root').innerHTML =  App()
        navbarEvent.init()
        modalSignEvent.init()
        renderComponentNavbar.start()
        renderModalSign.rememberUsername()
    }
}

const renderComponentNavbar = {
    userInfo(userCurrent) {
        $('.user-info').innerHTML = UserInfo(userCurrent)
        navbarEvent.SignOut()
        navbarEvent.loadProfile()
    },

    userInfoDefault() {
        $('.user-info').innerHTML = UserInfoDefault()
        navbarEvent.loadSign()
    },

    rememberAccount(){
        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        if(userCurrent) {
            this.userInfo(userCurrent)
            //fix loi load lại lại bắt login nữa hic
            chekLogin = true
        }
        
    },

    amountWishlist() {
        let wish = 0

        userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        if(userCurrent) wish = userCurrent.wishList.length

        $('.navigation-container .icon').dataset.amount = wish
        $('.navigation-mobile .icon.noti').dataset.amount = wish
    },

    start() {
        this.rememberAccount()
        this.amountWishlist()
    }
}

const renderModalSign = {
    rememberUsername() {
        let username = JSON.parse(localStorage.getItem("username"));
        $('.groups input').value = username
    },
}

const renderModalProfile = {
    start() {
        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        let inputList = $$('.modal-profile__info input')
        if(inputList) {
            inputList[0].value = userCurrent.fullname
            inputList[1].value = userCurrent.address
            inputList[2].value = userCurrent.phone
        }
        $('.modal-profile__imgBox img').src = userCurrent.img || "https://source.unsplash.com/random"
        $('.modal-profile__header h1').innerText = userCurrent.username
        modalProfileEvent.init()
    }
}

const renderHome = {

    slider: function() {       
        $('.slider-wrapper').innerHTML = SliderModel.getAll()
        .map(slide => SliderItem( slide )).join('')
    
        $('.slider-dots').innerHTML = SliderModel.getAll()
        .map(slide => SliderDots( slide )).join('')  
    },

    categories: function() {
        $('.category-box').innerHTML = CategoryModel.getAll()
        .map(category => CategoryItem(category)).join('')
    },

    products: function( page = 1 ) {     
        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        
        let products

        if(userCurrent) {
            // if(userCurrent.wishList.length == 0) {
            //     ProductModel.Initialize()
            // } else {
                products = ProductModel.getAll()
                userCurrent.wishList.forEach(id => {
                    products.forEach(product => {
                        if(id == product.id) product.wish = 1;
                    })
                });
                ProductModel.UpdateAll(products)
            //}
        } 
        

        products = ProductModel.getDocumentsByPage_Rate(page, 8)
        let productBox = $('.product .product-box')
        
        if(productBox) 
        if(page == 1) {
            productBox.innerHTML = products.map((product) => ProductItem(product)).join('')
            homeEvent.btnProduct()
            homeEvent.btnItemProduct()
        }
        else {
            productBox.insertAdjacentHTML( 'beforeend', products.map((product) => ProductItem(product)).join(''))
        }
        

    },

    start: function() {
        renderApp.start()
        $('#app').innerHTML = Home()
        this.slider()
        this.categories()
        this.products()
        homeEvent.init()
    },

}

const renderWishList = {
    start() {
        if(window.location.hash == '#wishList') {
            $('#app').innerHTML = WishList()
            
            let products = ProductModel.getAll()
            let productWish = ''
            
            let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
            if(userCurrent)
            userCurrent.wishList.forEach(id => {
                products.forEach(product => {
                    if(id == product.id) productWish += ProductItem(product)
                })
            });

            if(productWish) {
                $('.wishList__box').innerHTML = ProductBox()
                $('.product-box').innerHTML = productWish
            }
            else {
                $('.wishList__box').innerHTML = WishList__Emty()
            }
            
            renderComponentNavbar.amountWishlist()
            wishListEvent.init()
        }
    },
}

//================================> PHÚC THỊNH <================================
const renderAdmin = {
    start() {
        $('#root').innerHTML = Admin()
        Admin_Main()
        IndexView.LoadIndex();
        CategoryView.Load();
        ProductView.Load();
        UserView.Load();
        BillView.Load();
        RevenueView.Load();
        PaginationView.initializePage();
        TableEvent.Initialize();

        $('#admin .user').onclick = () => {
            window.location.hash = '#home'
        }
    }
}


//================================> CHI THỊNH <================================
const renderDetail = {
    start(product) {
        loading()
        $('#app').innerHTML =  Detail()
        InitEventDetail()
        renderDetailProduct(product); 
        renderRecommendedProduct();
    }
}


const renderShop = {
    start() {
        $('#app').innerHTML =  Shop()
        rendertheloai();
        renderContent();
        renderproducts();
        taotrang();
        InitEvent()
    }
}





// start web
// renderApp.start()
// navbarEvent.init()
// modalSignEvent.init()
// renderComponentNavbar.rememberAccount()
// renderModalSign.rememberUsername()
renderApp.start()
switch(window.location.hash.split('-')[0]) {
    case "#wishList":
        loading()
        
        renderWishList.start()
        break;
    case "#admin":
        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        if(userCurrent && userCurrent.isAdmin == true) {
            loading()
            renderAdmin.start()
            break; 
        }else {
            window.location.hash = "#home"
        }
    case "#feature":
    case "#category":
    case "#home": 
        loading() 
        renderHome.start()
        break;

    case "#product": 
        loading()
        let id = Number(window.location.hash.split('-')[1])
        console.log("id: ", id);
        let product = ProductModel.getAll().filter(product => product.id == id)
        renderDetail.start(product[0])
        break;
}












    
    
   








