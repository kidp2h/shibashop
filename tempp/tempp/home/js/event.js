// ===============================> HOME <======================================
let chekLogin = false


const homeEvent = {

    slider: function () {
        let slides = $$('.slider-wrapper__slide')
        let sliderDots = $$('.slider-dot-item')
        let i = 0;
        let timeout = 5000;

        let btnNext = $('.btn-next')
        btnNext.onclick = function () {
            slides.forEach(slide => {
                slide.classList.remove('active')
            })
            sliderDots.forEach(item => {
                item.classList.remove('active')
            })

            i = (i + 1) % slides.length
            slides[i].classList.add('active')
            sliderDots[i].classList.add('active')
        }

        let btnPrev = $('.btn-prev')
        btnPrev.onclick = function () {
            slides.forEach(slide => {
                slide.classList.remove('active')
            })
            sliderDots.forEach(item => {
                item.classList.remove('active')
            })

            i = (i - 1 + slides.length) % slides.length
            slides[i].classList.add('active')
            sliderDots[i].classList.add('active')
        }
        auto();
        function auto() {
            var lap = setInterval(function () {
                btnNext.click();
            }, timeout)

            btnNext.addEventListener('click', function () {
                clearInterval(lap);
                lap = setInterval(function () {
                    btnNext.click();
                }, timeout)
            })

            btnPrev.addEventListener('click', function () {
                clearInterval(lap);
                lap = setInterval(function () {
                    btnNext.click();
                }, timeout)
            })
        }



        sliderDots.forEach(item => {
            item.addEventListener('click', function (e) {
                i = e.target.dataset.index - 2;
                btnNext.click();
            })
        })
    },

    btnProduct: function () {

        let productControl = $$('.product-control')
        productControl.forEach(product => {
            product.onclick = function (e) {
                e.stopPropagation();
            }
        })

        let productItem = $$('.product-item')
        productItem.forEach(product => {
            product.onclick = function (e) {
                e.stopPropagation();
            }
        })

        let listProductBtnAdd = $$('.product-quantity .btn-add')
        listProductBtnAdd.forEach(btn => {
            btn.onclick = function () {
                let quantity = Number.parseInt(
                    btn.parentElement.querySelector('input').value) + 1;
                btn.parentElement.querySelector('input').value = quantity;
            }
        })

        let listProductBtnMul = $$('.product-quantity .btn-mul')
        listProductBtnMul.forEach(btn => {
            btn.onclick = function () {
                let quantity = Number.parseInt(btn.parentElement.querySelector('input').value);
                if (quantity > 1)
                    btn.parentElement.querySelector('input').value = quantity - 1;
            }
        })

        let btnWishList = $$('.icon-heart')

        btnWishList.forEach(icon => {
            icon.onclick = function (e) {
                e.stopPropagation();
                if(!chekLogin) {
                    $('.modal').classList.add('active')
                    $('.modal__noti').classList.add('error')
                    $('.modal-noti__disc.error').innerText = "Vui lòng đăng nhập !"
                    modalEvent.btnNoti('checkLogin')
                } else {
                    wishListEvent.changeStatusWish(icon)
                    renderComponentNavbar.amountWishlist()
                }
                
            }
        })

    },
    
    btnItemProduct() {
        $$('.product-item').forEach(item => {
            item.onclick = function () {
                let id = item.querySelector('.icon-heart').dataset.index;
                let product = ProductModel.getAll().filter(product => product.id == id)
                window.location.hash = `#product-${id}`
                renderDetail.start(product[0])
                
            }
        })
    },

    btnLoad: function () {
        var btnLoad = $('.btn-load')
        let _this = this;
        let page = 1;
        btnLoad.onclick = function () {
            renderHome.products(++page)
            _this.btnProduct()
            _this.btnItemProduct()
            if(page == Math.floor( ProductModel.getTotalPage_Rate(8)))
            btnLoad.style.display = 'none'
        }
    },

    init: function () {
        window.onload = loading()
        this.slider()
        this.btnLoad() 
    }
}

const navbarEvent = {
    fancyBurger() {
        const navbar = $('.navbar')
        const btn = $(".fancy-burger");
        btn.onclick = () => {
            btn.querySelectorAll("span").forEach((span) => {
                span.classList.toggle("open")
            });
            navbar.classList.toggle("open");
        };
    },

    loadSign() {
        let userIconList =$$('#user-icon')
        
        if(userIconList) 
        userIconList.forEach(userIcon => {
            userIcon.onclick = () => {
                $('.modal').classList.add('active')
                $('.modal__body').classList.add('active')
                modalEvent.init('sign')
            } 
        })
        
    },

    loadWishList() {
        $('#heart-icon-mobile').onclick = () => {
            // $('.modal').classList.add('active')
            // $('.modal__wishList').classList.add('active')
            // renderWishList.start()
            window.location.hash = "#wishList"
        }
    },

    btnCart() {
        $('#cart-icon').onclick = () => {
            $('.modal').classList.add('active')
            $('.modal__cart').classList.add('active')
        }
    },

    loadProfile() {
        let profileIcon = $('#profile-icon')
        if(profileIcon) 
        profileIcon.onclick = () => {
            $('.modal').classList.add('active')
            $('.modal__profile').classList.add('active')
            renderModalProfile.start()
        }
        
    },

    loadAdmin() {
        const admin = $('#icon-admin')
        admin.onclick = function () {
            $('.loader-container').classList.remove('fader-out')
            $('html').classList.add('loader')
            loading()
            const root = $('#root')
            root.innerHTML = Admin();
            
            Admin_main()
            IndexView.LoadIndex();
            CategoryView.Load();
            ProductView.Load();
            UserView.Load();
            PaginationView.initializePage();
            TableEvent.Initialize();
        }
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
        }
    },

    init() {
        this.fancyBurger()
        this.loadSign()
        // this.loadWishList()
        this.SignOut()
        this.btnCart();
    }
}

const modalEvent = {
    btnNoti(view) {
        let modalNoti = $('.modal__noti')

        $('.btn-noti').onclick = () => {

            if(view == 'sign') {
                if(chekLogin) {
                    $$('.btn-exist').forEach(btn => {btn.click()})
                }
                if(modalNoti.classList.contains('success'))
                {
                    $('#sign-in .username').value = $('#sign-up .username').value
                    $('.changeSignIn').click()
                    $$('.groups input').forEach((input, index) => {
                        if(index > 0) input.value = ""
                    })             
                }
            }

            if(view == 'profile') {
                if(modalNoti.classList.contains('success'))
                {
                    $$('.modal-profile__changePass .groups input').forEach(input => {
                        input.value = ""
                    })             
                }
            }
            
            if(view == 'checkLogin') {
                $('.modal').classList.remove('active')
                $('#user-icon').click()
            }
            
            modalNoti.classList.remove('success')
            modalNoti.classList.remove('error')
        }
    },

    btnExist(view) {
        $$('.btn-exist').forEach(btn => {
            btn.onclick = () => {
                $('.modal').classList.remove('active')

                if(view == 'sign') {
                    $('.modal__body').classList.remove('active')
                    $('#sign-in').classList.remove('active')
                    $('#sign-up').classList.remove('active')
                    $$('.groups input').forEach((input, index) => {
                        if(index > 0) input.value = ""
                        ValidatorForm.clearError({target: input})
                    })
                }
                
                if(view == 'profile') {
                    $('.modal__profile').classList.remove('active')
                    $('.modal-profile__main').classList.remove('hidden')
                    $('.modal-profile__changePass').classList.remove('active')
                    modalProfileEvent.disabledEdit()
                    $$('.groups input').forEach(input => {
                        input.value = ""
                        ValidatorForm.clearError({target: input})
                    })
                }
                
                
                // $('.modal__wishList').classList.remove('active')

                $('.modal__noti').classList.remove('success')
                $('.modal__noti').classList.remove('error')
                
            }
        })
    },


    init(view) {
        this.btnNoti(view)
        this.btnExist(view)
    }
}

const modalSignEvent = {
    changeSign() {
        $$('.modal__inner .changeSign').forEach(header => {
            header.onclick = () => {
                $('#sign-in').classList.toggle('active')
                $('#sign-up').classList.toggle('active')
            }
        })
    },

    showPass() {
        $$('.groups span i').forEach(item => {
            item.onclick = () => {
                let passField = item.parentElement.parentElement.querySelector('input')
                if(passField.type === "password"){
                    passField.type = "text";
                    item.classList.add("hide-btn");
                }
                else{
                    passField.type = "password";
                    item.classList.remove("hide-btn");
                }
            }
        })
    },

    SignIn() {
        
        $('.btn-signin').onclick = () => {
            let userName = $('#sign-in .username')
            let passWord = $('#sign-in .password')
            let userCurrent
            
            UserModel.getAll().forEach(user => {
                if(user.username == userName.value && user.password == passWord.value) { 
                    chekLogin = true;
                    userCurrent = user;
                    UserModel.setUserCurrent(userCurrent)
                    setTimeExpired()
                }
            })

            if( chekLogin ) {
                $('.modal__noti').classList.add('success')
                $('.modal-noti__disc.success').innerText = "Đăng nhập thành công"

                updateProductInCart(userCurrent.cart);

                renderComponentNavbar.userInfo(userCurrent)
                renderHome.products()
                renderComponentNavbar.amountWishlist()
                renderWishList.start()
            }
            else {
                $('.modal__noti').classList.add('error')
                $('.modal-noti__disc.error').innerText = "Tài khoản và mật khẩu sai"
            }
        }
    },

    SignUp() {

        $('.btn-signup').onclick = () => {
            
            let isValid = true
   
            let inputList = $('.btn-signup').parentElement.querySelectorAll('.groups input')
            inputList.forEach(input => {
               if(!ValidatorForm.handleValidate({target: input})) {
                   isValid = false
               }
            })

            if( isValid ) 
            {
                $('.modal__noti').classList.add('success')
                $('.modal-noti__disc.success').innerText = "Đăng ký thành công"
                UserModel.Insert({
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value,
                    username: inputList[3].value,
                    password: inputList[4].value,
                 })  
            }else {
                $('.modal__noti').classList.add('error')
                $('.modal-noti__disc.error').innerText = "Vui lòng nhập đủ thông tin"
            }
           
        }
    },

    init() {
        this.changeSign()
        this.showPass()
        this.SignIn()
        this.SignUp()
        modalEvent.init('sign')
        ValidatorForm.Initialize('#sign-up .form')
    }
}

const modalProfileEvent = {

    activeEdit() {
        let inputList = $$('.modal-profile__info input')
        $('#edit-profile').onclick = () => {
            $('.modal-profile__info').classList.add('edit')
            $('.modal-profile__main').classList.remove('hidden')
            $('.modal-profile__changePass').classList.remove('active')
            inputList.forEach(input => {
                input.disabled = false
            })
        }
    },

    disabledEdit() {
        let inputList = $$('.modal-profile__info input')
        $('.modal-profile__info').classList.remove('edit')
        inputList.forEach(input => {
            input.setAttribute('disabled', "")
        })
    },

    save() {
        let inputList = $('.btn-save').parentElement.querySelectorAll('.groups input')
        $('.btn-save').onclick = () => {
            let isValid = true
   
            
            inputList.forEach(input => {
               if(!ValidatorForm.handleValidate({target: input})) {
                   isValid = false
               }
            })

            if(isValid) {    
                
                this.disabledEdit()
                let infoNew = {
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value
                }

                let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
                UserModel.chaneInfo(infoNew, userCurrent)
                
               
            } else {
                $('.modal__noti').classList.add('error')
                $('.modal-noti__disc.error').innerText = "Vui lòng nhập đúng thông tin"
            }
        }
    },

    changePass() {
        $('#change-pass').onclick = () => {
            $('.modal-profile__main').classList.add('hidden')
            $('.modal-profile__changePass').classList.add('active')
            this.disabledEdit()
        }
    },

    changeProfile() {
        $('.modal-profile__changePass .changeSign').onclick = () => {
            $('.modal-profile__main').classList.remove('hidden')
            $('.modal-profile__changePass').classList.remove('active')

            $$('.modal-profile__changePass .groups input').forEach(input => {
                input.value = ""
                ValidatorForm.clearError({target: input})
            })
        }
    },

    btnChangePass() {
        let inputList = $('.btn-changePass').parentElement.querySelectorAll('.groups input')
        $('.btn-changePass').onclick = () => {
            let isValid = true
   
            
            inputList.forEach(input => {
               if(!ValidatorForm.handleValidate({target: input})) {
                   isValid = false
               }
            })

            if(isValid) {    
                $('.modal__noti').classList.add('success')
                $('.modal-noti__disc.success').innerText = "Đổi pass thành công"
                let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
                UserModel.changePass(userCurrent ,inputList[1].value)
               
            } else {
                $('.modal__noti').classList.add('error')
                $('.modal-noti__disc.error').innerText = "Vui lòng nhập đúng thông tin"
            }
        }
    },

    init() {
        this.activeEdit()
        this.save()
        this.changePass()
        this.changeProfile()
        this.btnChangePass()
        modalEvent.init('profile')
        ValidatorForm.Initialize('.modal-profile__main .form')
        ValidatorForm.Initialize('.modal-profile__changePass .form')
    }



}


const wishListEvent = {
    btn() {
        let btnWishList = $$('#wishList .icon-heart')
        let _this = this
        btnWishList.forEach(icon => {
            icon.onclick = function (e) {
                e.stopPropagation();
                _this.changeStatusWish(icon)
                renderWishList.start()
            }
        })

        let btnReturn = $('.wishList__Emty button')
        if(btnReturn)
        btnReturn.onclick = () => {
            window.location.hash = "#home"
        }
    },

    changeStatusWish(icon) {

        let userCurrent = JSON.parse(localStorage.getItem("userCurrent"));
        let wish = icon.dataset.wish == 1 ? true : false
        wish = !wish
        icon.dataset.wish = wish ? 1 : 0
        icon.classList.toggle('active')

        ProductModel.updateWish(icon.dataset.index, wish ? 1 : 0)
        UserModel.updateWishList(userCurrent, icon.dataset.index, wish)
    },

    init() {
        homeEvent.btnProduct()
        homeEvent.btnItemProduct()
        this.btn()
    }
}

// <=====================================================================>















