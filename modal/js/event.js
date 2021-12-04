const modalEvent = {
    btnNoti(view = 'normal') {
        let modalNoti = $('.modal__noti');

        $('.btn-noti').onclick = () => {
            if (view == 'sign') {
                if (chekLogin) {
                    $$('.btn-exist').forEach((btn) => {
                        btn.click();
                    });
                }
                if (modalNoti.classList.contains('success')) {
                    $('#sign-in .username').value = $('#sign-up .username').value;
                    $('.changeSignIn').click();
                    $$('.groups input').forEach((input, index) => {
                        if (index > 0) input.value = '';
                    });
                }
            }

            if (view == 'profile') {
                if (modalNoti.classList.contains('success')) {
                    $$('.modal-profile__changePass .groups input').forEach((input) => {
                        input.value = '';
                    });
                }
            }

            if (view == 'checkLogin') {
                $('.modal').classList.remove('active');
                $('#user-icon').click();
            }

            if (view == 'normal') { 
                $('.modal').classList.remove('active');
            }

            modalNoti.classList.remove('success');
            modalNoti.classList.remove('error');

        };

        $('.modal__noti input').onkeydown = (e) => {
            if(e.keyCode == 13) {
                $('.btn-noti').click()
                $$('.groups input')[1].focus()
            }
        }
    },

    btnExist(view) {
        $$('.btn-exist').forEach((btn) => {
            btn.onclick = () => {
                $('.modal').classList.remove('active');

                if (view == 'sign') {
                    $('.modal__body').classList.remove('active');
                    $('#sign-in').classList.remove('active');
                    $('#sign-up').classList.remove('active');
                    $$('.groups input').forEach((input, index) => {
                        if (index > 0) input.value = '';
                        ValidatorForm.clearError({ target: input });
                    });
                }

                if (view == 'profile') {
                    $('.modal__profile').classList.remove('active');
                    $('.modal-profile__main').classList.remove('hidden');
                    $('.modal-profile__changePass').classList.remove('active');
                    modalProfileEvent.disabledEdit();
                    $$('.groups input').forEach((input) => {
                        input.value = '';
                        ValidatorForm.clearError({ target: input });
                    });
                }

                if (view == 'cart') {
                    $('.modal__cart').classList.remove('active')
                }



                $('.modal__noti').classList.remove('success');
                $('.modal__noti').classList.remove('error');
            };
        });
    },

    init(view) {
        this.btnNoti(view);
        this.btnExist(view);
    },
};

const modalSignEvent = {
    changeSign() {
        $$('.modal__inner .changeSign').forEach((header) => {
            header.onclick = () => {
                $('#sign-in').classList.toggle('active');
                $('#sign-up').classList.toggle('active');
            };
        });
    },

    showPass() {
        $$('.groups span i').forEach((item) => {
            item.onclick = () => {
                let passField = item.parentElement.parentElement.querySelector('input');
                if (passField.type === 'password') {
                    passField.type = 'text';
                    item.classList.add('hide-btn');
                } else {
                    passField.type = 'password';
                    item.classList.remove('hide-btn');
                }
            };
        });
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
                $('.modal__noti input').focus()
                $('.modal-noti__disc.success').innerText = "Đăng nhập thành công"

                updateProductInCart(userCurrent.cart);

                renderComponentNavbar.userInfo(userCurrent)
                wishListEvent.updateProductBeWish()
                renderHome.products()
                renderComponentNavbar.amountWishlist()
                renderComponentNavbar.amountCart()
                renderWishList.start()
                renderOrderPage.items()
                renderShop.start()
            }
            else {
                $('.modal__noti').classList.add('error')
                $('.modal__noti input').focus()
                $('.modal-noti__disc.error').innerText = "Tài khoản và mật khẩu sai"
            }
        }

        $('#sign-in').onkeydown = (e) => {
            if(e.keyCode == 13)
            $('.btn-signin').click()
        }
    },

    SignUp() {
        $('.btn-signup').onclick = () => {
            let isValid = true;

            let inputList = $('.btn-signup').parentElement.querySelectorAll('.groups input');
            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                $('.modal__noti').classList.add('success');
                $('.modal-noti__disc.success').innerText = 'Đăng ký thành công';
                UserModel.Insert({
                    id: UserModel.getIdMax() + 1,
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value,
                    username: inputList[3].value,
                    password: inputList[4].value,
                    isAdmin: false,
                    cart: [],
                    wishList: []
                });
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đủ thông tin';
            }
        };
        $('#sign-up').onkeydown = (e) => {
            if(e.keyCode == 13)
            $('.btn-signup').click()
        }
    },

    init() {
        this.changeSign();
        this.showPass();
        this.SignIn();
        this.SignUp();
        modalEvent.init('sign');
        ValidatorForm.Initialize('#sign-up .form');
    },
};

const modalProfileEvent = {
    activeEdit() {
        let inputList = $$('.modal-profile__info input');
        $('#edit-profile').onclick = () => {
            $('.modal-profile__info').classList.add('edit');
            $('.modal-profile__main').classList.remove('hidden');
            $('.modal-profile__changePass').classList.remove('active');
            inputList.forEach((input) => {
                input.disabled = false;
            });
        };
    },

    disabledEdit() {
        let inputList = $$('.modal-profile__info input');
        $('.modal-profile__info').classList.remove('edit');
        inputList.forEach((input) => {
            input.setAttribute('disabled', '');
        });
    },

    save() {
        let inputList = $('.btn-save').parentElement.querySelectorAll('.groups input');
        $('.btn-save').onclick = () => {
            let isValid = true;

            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                this.disabledEdit();
                let infoNew = {
                    fullname: inputList[0].value,
                    address: inputList[1].value,
                    phone: inputList[2].value,
                };

                let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
                UserModel.chaneInfo(infoNew, userCurrent);
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đúng thông tin';
            }
        };
    },

    changePass() {
        $('#change-pass').onclick = () => {
            $('.modal-profile__main').classList.add('hidden');
            $('.modal-profile__changePass').classList.add('active');
            this.disabledEdit();
        };
    },

    changeProfile() {
        $('.modal-profile__changePass .changeSign').onclick = () => {
            $('.modal-profile__main').classList.remove('hidden');
            $('.modal-profile__changePass').classList.remove('active');

            $$('.modal-profile__changePass .groups input').forEach((input) => {
                input.value = '';
                ValidatorForm.clearError({ target: input });
            });
        };
    },

    btnChangePass() {
        let inputList = $('.btn-changePass').parentElement.querySelectorAll('.groups input');
        $('.btn-changePass').onclick = () => {
            let isValid = true;

            inputList.forEach((input) => {
                if (!ValidatorForm.handleValidate({ target: input })) {
                    isValid = false;
                }
            });

            if (isValid) {
                $('.modal__noti').classList.add('success');
                $('.modal-noti__disc.success').innerText = 'Đổi pass thành công';
                let userCurrent = JSON.parse(localStorage.getItem('userCurrent'));
                UserModel.changePass(userCurrent, inputList[1].value);
            } else {
                $('.modal__noti').classList.add('error');
                $('.modal-noti__disc.error').innerText = 'Vui lòng nhập đúng thông tin';
            }
        };
    },

    init() {
        this.activeEdit();
        this.save();
        this.changePass();
        this.changeProfile();
        this.btnChangePass();
        modalEvent.init('profile');
        ValidatorForm.Initialize('.modal-profile__main .form');
        ValidatorForm.Initialize('.modal-profile__changePass .form');
    },
};