function html([first,...string], ...value) {
    return value.reduce(
        (acc, cur) => acc.concat(cur, string.shift()),
        [first]
    )
    .filter(x => x && x !== true || x === 0)
    .join('')
}

function App() {
    return html`
    <div id = "main">
        <div class="navigation">
            <div class="navigation-container">      

                <div class="menu-bars">
                    <button class="fancy-burger">
                        <span class="rectangle rectangle--top rectangle--small"></span>
                        <span class="rectangle rectangle--middle"></span>
                        <span class="rectangle rectangle--bottom rectangle--small"></span>
                    </button>
                    <a href="#home" class="logo">
                        <img src="./images/logo.svg" alt="">
                        SHIBA
                    </a>
                </div>

                <nav class="navbar">
                    <a href="#home" class="home active">Home</a>
                    <a href="#category" class="category">Category</a>
                    <a href="#feature" class="feature">Featured</a>   
                    <a href="#shop" class="shop">Shop</a>
                    <a href="#about">About</a>
                </nav>

                <div class="icons">
                    <div class = "navbar__inputSearch"> 
                        <input class="navbar-input-Search" type = "text" >
                        <i class="fas fa-search"  id ="nav-search"></i>
                    </div>
                    <i class="fas fa-search"  id ="search-icon"></i>
                    <div class="user-info">
                            <i class="fas fa-user" id="user-icon"></i> 
                    </div>
                    <div class= "icon wishList" id="heart-icon" data-amount="0">
                        <a href="#wishList" class="fas fa-heart" ></a>
                    </div>
                    <div class= "icon cart" id="cart-icon" data-amount="0">
                        <i class="fas fa-shopping-cart" ></i>
                    </div>
                </div>
                

            </div>
        </div>

        <div class="navigation-mobile">
            <div class="icon" id="shop-icon">
                <i class="fab fa-shopify"></i>
                <p>Shop</p>
            </div>
            <a href="#wishList" class="icon noti wishList" data-amount="0">
                <i class="fas fa-heart"></i>
                <p>Wishlist</p>
            </a>
            <div class="icon noti cart" data-amount="0">
                <i class="fas fa-shopping-cart"></i>
                <p>Cart</p>
            </div>
            <div class="icon" id ="search-icon-mb">
                <i class="fas fa-search" ></i>
                <p>Search</p>
            </div>
        </div>

        <div id="app">
        </div>

        <div id="toast-app">
        </div>


        <div class="footer">    
            <div class="footer__top">
                <ul class="footer-track">
                    <li class="footer-top__item hiden">
                        <i class="fas fa-car"></i>
                        <div class="item__content">
                            <h3>FREE SHIPPING</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item hiden">
                        <i class="fas fa-car"></i>
                        <div class="item__content">
                            <h3>FREE SHIPPING</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item hiden">
                        <i class="fas fa-car"></i>
                        <div class="item__content">
                            <h3>FREE SHIPPING</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item hiden">
                        <i class="fas fa-car"></i>
                        <div class="item__content">
                            <h3>FREE SHIPPING</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                            <i class="fas fa-car"></i>
                            <div class="item__content">
                                <h3>FREE SHIPPING</h3>
                                <p>free shipping for all US order</p>
                            </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-life-ring"></i>
                        <div class="item__content">
                            <h3>SUPPORT 24/7</h3>
                            <p>you have 30 days to return</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-undo-alt"></i>
                        <div class="item__content">
                            <h3>30 DAYS RETURN</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-fingerprint"></i>
                        <div class="item__content">
                            <h3>100% PAYMENT SECURE</h3>
                            <p>payment 100% secure</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-car"></i>
                        <div class="item__content">
                            <h3>FREE SHIPPING</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-life-ring"></i>
                        <div class="item__content">
                            <h3>SUPPORT 24/7</h3>
                            <p>you have 30 days to return</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-undo-alt"></i>
                        <div class="item__content">
                            <h3>30 DAYS RETURN</h3>
                            <p>free shipping for all US order</p>
                        </div>
                    </li>
                    <li class="footer-top__item">
                        <i class="fas fa-fingerprint"></i>
                        <div class="item__content">
                            <h3>100% PAYMENT SECURE</h3>
                            <p>payment 100% secure</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="footer__container">               
                <div class="footer-content">
                    <div class="footer-logo">
                        <a href="#">
                            <h2 class="name">SHIBA</h2>
                        </a>
                        
                        <a href="https://www.google.com/maps/" class="address"> 
                            <i class="fas fa-map-marker-alt"></i>
                            184 Main Rd E, St Albans VIC 3021, Australia
                        </a>
                        <a href="mailto:shibashop@company.com" class="mail">
                            <i class="far fa-envelope"></i>
                            shibashop@company.com
                        </a>
                        <a href="tel:0012233456" class="phone">
                            <i class="fas fa-phone"></i>
                            +001 2233 456
                        </a>
                        <ul class="footer-logo__social">
                            <li class="social__icon">
                                <a href="" id="icon-facebook"><i class="fab fa-facebook-f"></i></a>
                            </li>
                            <li class="social__icon">
                                <a href="" id="icon-twitter"><i class="fab fa-twitter"></i></a>
                            </li>
                            <li class="social__icon">
                                <a href="" id="icon-instagram"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li class="social__icon">
                                <a href="" id="icon-youtube"> <i class="fab fa-youtube"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div class="information">
                        <h2 class="header">INFOMATION</h2>
                        <a href="#about" class="content">About Us</a>
                        <a href="#home" class="content">Home Us</a>
                        <a href="#category" class="content">Category Us</a>
                        <a href="#feature" class="content">Feature Us</a>              
                        <a href="#shop" class="content">Shop Us</a>                     
                    </div>
                    <div class="useful">
                        <h2 class="header">USEFUL LINKS</h2>
                        <a href="#home" class="content"> Store Location</a>
                        <a href="#home" class="content">Latest News</a>
                        <a onclick = "if($('#profile-icon')) $('#profile-icon').click();" class="content">My Account</a>
                        <a href="#home" class="content">Size Guide</a>
                        <a href="#home" class="content">Portfolio</a>
                        <a href="#home" class="content">FAQs</a>
                    </div>
                    <div class="newsletter">
                        <h2 class="header">NEWSLETTER SIGNUP</h2>
                        <p class="content">Subscribe to our newsletter and get 10% off your first purchase</p>
                        <form class="mail-user">
                            <input name="email" type="email" placeholder="Your email address">
                            <button type ="submit" class="btn">Subcribe</button>
                        </form>
                        <!-- <img src="./images/footer.png" alt=""> -->
                        
                    </div>
                    
                </div>
                <div class="footer__img">
                    <img src="./images/footer.jpg" alt="">
                </div>
            </div>
            <div class="footer__bottom">
                <p>Copyright © 2021 Shiba Shop. All Rights Reserved.</p>
            </div>
        </div>


        <div class="modal">
            <div class="modal__overlay"></div>

            <div class="modal__cart">
            <div class="modal__cart-header">
                <h1>CART PRODUCTS</h1>
                <button class="btn-exist">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="box">
                <ul class="modal__cart-product-box">
                    
                </ul>
            </div>

            <div class="modal__cart-footer">
                <div class="modal__cart-subtotal">
                    <h3 class="subtotal-text">Subtotal:</h3>
                    <span class="modal__cart-subtotal-all">$10000</span>
                </div>
                <div class="modal__cart-view-cart">
                    <span class="modal__cart-view-cart-btn">VIEW CART</span>
                </div>
            </div>
        </div>
            <div class="modal__body glassmorphism"> 
                <div class="modal__inner">
                    <div id="sign-in">
                        <div class="box">
                            <div class="form">
                                <div class="form__header">
                                    <h1>Sign In</h1>
                                </div>

                                <div class="form__container">
                                    <div class="col-groups">
                                        <div class="groups">
                                            <label>Username</label>
                                            <input type="text" class="username" placeholder="Username">
                                        </div>
                                        <div class="groups">
                                            <label>Password</label>
                                            <div class="input-pass">
                                                <input type="password" class="password" placeholder="Password">
                                                <span class="show-btn">
                                                    <i class="fas fa-eye"></i>
                                                </span>
                                            </div>
                                        </div>  
                                    </div> 
                                </div>  

                                <button class="btn-signin">Sign In</button>
                                <p class="hidden">Sign up here</p>
                                <button class="changeSign hidden">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <div class="action hidden">
                            <img src="./images/logo.svg" alt="">
                            <h1 class="header">SHIBA SHOP</h1>
                            <p>Chào mừng bạn đến với shop của chúng tôi :></p>
                            <button class="changeSign">
                                Sign Up
                                <i class="fas fa-arrow-right"></i>                   
                            </button>
                        </div> 
                    </div>

                    <div id="sign-up">
                        <div class="action hidden">
                            <img src="./images/logo.svg" alt="">
                            <h1 class="header">SHIBA SHOP</h1>
                            <p>Hãy đăng ký tài khoản và mua sắm thả ra nào :></p>
                            <button class="changeSign changeSignIn">
                                <i class="fas fa-arrow-left"></i>
                                Sign In
                            </button>
                        </div> 
                        <div class="box">
                            <div class="form">
                                <div class="form__header">
                                    <h1>Sign Up</h1>
                                </div>
                                <div class="form__container">
                                    <div class="col-groups">
                                        <div class="groups">
                                            <label for="">Full name</label>
                                            <input type="text" class="fullname" name="fullname" rules="required" placeholder="Nguyen Van A">
                                            <span class="message"></span>
                                        </div>
                                        <div class="groups">
                                            <label for="">Address</label>
                                            <input type="text" class="address" name="address" rules="required" placeholder="184 Main Rd E, St Albans VIC 3021">
                                            <span class="message"></span>
                                        </div>
                                        <div class="groups">
                                            <label for="">Phone</label>
                                            <input type="text" class="phone" name="phone" rules="required|isNumber|min:10" placeholder="001 2233 456">
                                            <span class="message"></span>
                                        </div>
                                    </div>
                                    <div class="col-groups">
                                        <div class="groups">
                                            <label for="">Username</label>
                                            <input type="text" class="username" name = "username" rules="required|username" placeholder="Username">
                                            <span class="message"></span>
                                        </div>
                                        <div class="groups">
                                            <label>Password</label>
                                            <div class="input-pass">
                                                <input type="password" class="password" name = "password" rules="required|min:6" placeholder="Password">
                                                <span class="show-btn">
                                                    <i class="fas fa-eye"></i>
                                                </span>
                                            </div>
                                            <span class="message"></span>
                                        </div>
                                        <div class="groups">
                                            <label for="">Password confirm</label>
                                            <div class="input-pass">
                                                <input type="password" class="password_confirm" name = "password_confirm" rules="required|isConfirmed" placeholder="Password confirm">
                                                <span class="show-btn">
                                                    <i class="fas fa-eye"></i>
                                                </span>
                                            </div>
                                            <span class="message"></span>
                                        </div>
                                    </div>  
                                </div>

                                <button class="btn-signup">Sign Up</button>
                                <p class="hidden">Sign in here</p>
                                <button class="changeSign hidden">
                                    <i class="fas fa-arrow-left"></i>
                                </button>
                            </div>
                        
                        </div>
                    </div>
                </div>  
                <button class="btn-exist">
                    <i class="fas fa-times"></i>
                </button>
            </div> 
            
            <div class="modal__noti glassmorphism ">
                <div class="modal-noti__logo">
                    <i class="far fa-check-circle" id="icon-success"></i>
                    <i class="fas fa-times" id="icon-error"></i>
                </div> 
                <input type = "text">   
                <h2 class="modal-noti__disc success"></h2>
                <h2 class="modal-noti__disc error"></h2>
                <button class="btn-noti glassmorphism ">OK</button>
            </div> 
            
            <div class="modal__profile">

                <div class="modal-profile__optinons">
                    <button class="btn-options">
                        <i class="fa-solid fa-gear"></i>
                    </button>
                    <ul class="options__menu">
                        <li class="option__item" id="edit-profile">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <span>Edit Profile</span>
                        </li>
                        <li class="option__item" id="change-pass">
                            <i class="fa-solid fa-key"></i>
                            <span>Change Pass</span>
                        </li>
                    </ul>
                </div>
                
                <button class="btn-exist">
                    <i class="fas fa-times"></i>
                </button>

                <div class="modal-profile__main">
                    <div class="modal-profile__imgBox">
                        <img src="./images/user-1.jpg" alt="">
                    </div>

                    <div class="modal-profile__header">
                        <h1>USERNAME</h1>
                    </div>

                    <div class="modal-profile__info">
                        <div class="form">
                            <div class="form__container">
                                <div class="col-groups">
                                    <div class="groups">
                                        <label for="">Full name</label>
                                        <input type="text" class="fullname" name="fullname" rules="required" disabled>
                                        <span class="message"></span>
                                    </div>
                                    <div class="groups">
                                        <label for="">Address</label>
                                        <input type="text" class="address" name="address" rules="required" disabled>
                                        <span class="message"></span>
                                    </div>
                                    <div class="groups">
                                        <label for="">Phone</label>
                                        <input type="text" class="phone" name="phone" rules="required|isNumber|min:10" disabled>
                                        <span class="message"></span>
                                    </div>
                                </div>  
                            </div>  
                            <button class="btn-save">SAVE</button>
                        </div>

                    </div>
                </div>

                <div class="modal-profile__changePass">
                    <div class="form">
                        <div class="form__container">
                            <div class="col-groups">
                                <div class="groups">
                                    <label>Current Password</label>
                                    <div class="input-pass">
                                        <input type="password" class="current-password" name = "current-password" rules="required|checkPassCurrent" placeholder="Password">
                                        <span class="show-btn">
                                            <i class="fas fa-eye"></i>
                                        </span>
                                    </div>
                                    <span class="message"></span>
                                </div>
                                <div class="groups">
                                    <label>New Password</label>
                                    <div class="input-pass">
                                        <input type="password" class="password" name = "password" rules="required|min:6" placeholder="Password">
                                        <span class="show-btn">
                                            <i class="fas fa-eye"></i>
                                        </span>
                                    </div>
                                    <span class="message"></span>
                                </div>
                                <div class="groups">
                                    <label for="">New Password Confirm</label>
                                    <div class="input-pass">
                                        <input type="password" class="password_confirm" name = "password_confirm" rules="required|isConfirmed" placeholder="Password confirm">
                                        <span class="show-btn">
                                            <i class="fas fa-eye"></i>
                                        </span>
                                    </div>
                                    <span class="message"></span>
                                </div>
                            </div>  
                            
                        </div>  
                        <button class="btn-changePass">Change</button>
                        <button class="changeSign">
                            <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    `
}


function UserInfo(user) {
    return html`
    <div class="user_menu ">
        <div class="profile">
            <img src="${user.img || 'https://source.unsplash.com/random'}" alt="">
        </div>
        <div class="menu">
            <h2 class="fullname">${user.username}</h2>
            <ul>
                ${user.isAdmin == true && `
                <li class="menu__item" id="icon-admin">
                    <i class="fas fa-cog" ></i>
                    <a href="#admin">Admin</a>  
                </li>
                `}
                <li class="menu__item"  id="profile-icon">
                    <i class="fas fa-user"></i>
                    <p>Profile</p>
                </li>
                <li class="menu__item">
                    <i class="fas fa-file-invoice-dollar"></i>
                    <a href="#order">Order</a>
                </li>
                <li class="menu__item" id="icon-logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <p>Logout</p>  
                </li>
            </ul>
        </div>
    </div> 
    `
}

function UserInfoDefault() {
    return html`
    <i class="fas fa-user" id="user-icon"></i> 
    `
}

//line 75
function ToastAddToCart() {
    return html`
        <div class="toast-app__icon">
            <i class="fas fa-cart-plus"></i>
        </div>
        <div class="toast-app__body">
            <h3 class="toast-title">Đã thêm vào giỏ hàng</h3>
            <p class="toast-msg">Vào giỏ hàng của bạn và kiểm tra ngay</p>
        </div>
        <div class="toast-app__close">
            <i class="fas fa-times"></i>
        </div>
    `
}