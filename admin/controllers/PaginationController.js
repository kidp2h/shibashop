const PaginationController = {
  Initialize: function () {
    for (let i = 1; i <= UserModel.getTotalPage(); i++) {
      let page = '';
      if (i == 1) {
        page = `<li style="background-color:var(--purple)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-user ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    for (let i = 1; i <= ProductModel.getTotalPage(); i++) {
      let page = '';
      if (i == 1) {
        page = `<li style="background-color:var(--ui-background)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-product ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    for (let i = 1; i <= CategoryModel.getTotalPage(); i++) {
      let page = '';
      if (i == 1) {
        page = `<li style="background-color:var(--ui-background)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-category ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    for (let i = 1; i <= BillModel.getTotalPage(); i++) {
      let page = '';
      if (i == 1) {
        page = `<li style="background-color:var(--ui-background)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-bill ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    this.InitializeEventPagination();
  },
  InitializeEventPagination: function () {
    $$('.page-user ul li').forEach((page) => {
      page.onclick = function () {
        if (this.textContent == Number($('.page-user input.currentPage').value)) return;
        $$('.page-user ul li').forEach((item) => (item.style.backgroundColor = null));
        let currentPage = Number($('.page-user input.currentPage').value);
        if (this.classList.contains('previous')) {
          if (currentPage <= 1) {
            $('.page-user ul li.previous').nextElementSibling.style.backgroundColor =
              'var(--purple)';
            return;
          } else {
            --currentPage;
            $('.page-user input.currentPage').value = currentPage;
          }
        } else if (this.classList.contains('next')) {
          if (currentPage >= Math.floor(UserModel.getTotalPage())) {
            $('.page-user ul li.next').previousElementSibling.style.backgroundColor =
              'var(--purple)';
            return;
          } else {
            ++currentPage;
            $('.page-user input.currentPage').value = currentPage;
          }
        } else {
          $('.page-user input.currentPage').value = this.textContent;
        }
        let page = Number($('.page-user input.currentPage').value);
        $$('.page-user ul li').forEach((item) => {
          if (item.textContent == page) {
            item.style.backgroundColor = 'var(--purple)';
          }
        });
        let collection = UserModel.getDocumentsByPage(page);
        let result = ``;
        collection.forEach((document) => {
          result += `
                <tr>
                  <td  class="username">${document.username}</td>
                  <td class="fullname">${document.fullname}</td>
                  <td class="address">${document.address}</td>
                  <td class="phone">${document.phone}</td>
                  <td class="isAdmin">                
                      <label class="switch">
                          <input type="checkbox" ${document.isAdmin ? 'checked' : ''}>
                          <span class="sliderBtn round"></span>
                      </label>
                  </td>
                  <td class="action">
                      <button class="button-icon remove" data-id='${
                        document.id
                      }' data-table='users' style="visibility:${
            document.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
          }">
                          <i class="far fa-trash-alt"></i>
                      </button>
                      <button class="button-icon save" data-id='${
                        document.id
                      }' data-table='users' style="visibility:${
            document.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
          }">
                          <i class="fas fa-save"></i>
                      </button>
                  </td>
                </tr>`;
        });
        $('.tmanager-user table tbody').innerHTML = result;
        TableEvent.User.Initialize();
        HandleEvent.SlideTdTable();
      };
    });
    $$('.page-product ul li').forEach((page) => {
      page.onclick = function () {
        if (this.textContent == Number($('.page-product input.currentPage').value)) return;
        $$('.page-product ul li').forEach((item) => (item.style.backgroundColor = null));
        let currentPage = Number($('.page-product input.currentPage').value);
        if (this.classList.contains('previous')) {
          if (currentPage <= 1) {
            $('.page-product ul li.previous').nextElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            --currentPage;
            $('.page-product input.currentPage').value = currentPage;
          }
        } else if (this.classList.contains('next')) {
          if (currentPage >= Math.floor(ProductModel.getTotalPage())) {
            $('.page-product ul li.next').previousElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            ++currentPage;
            $('.page-product input.currentPage').value = currentPage;
          }
        } else {
          $('.page-product input.currentPage').value = this.textContent;
        }
        let page = Number($('.page-product input.currentPage').value);
        $$('.page-product ul li').forEach((item) => {
          if (item.textContent == page) {
            item.style.backgroundColor = 'var(--ui-background)';
          }
        });
        let collection = ProductModel.getDocumentsByPage(page);
        let result = ``;
        collection.forEach((document) => {
          let categories = CategoryModel.getAll();
          let categoriesHTML = '';
          categories.forEach((category) => {
            if (document.category == category.name) {
              categoriesHTML += `<option selected value='${category.name}'>${category.name}</option>`;
            } else {
              categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
            }
          });
          result += `
            <tr>
            <td>
            <div class="wrap-image">
              <img class="image-document i-product" src="${document.imgList[0]}" alt="Image product id ${document.id}">
              <button class="addImage" data-id="${document.id}"><i class="fas fa-plus"></i></button>
            </div>
          </td>
              <td contenteditable="true" class="nameProduct">${document.name}</td>
              <td class="categoryProduct">
                <div id="select">
                  <select id="selectCategory">
                    ${categoriesHTML}
                  </select>
                </div>
              </td>
              <td contenteditable="true" class="priceProduct">${document.price}</td>
              <td contenteditable="true" class="priceSaleProduct">${document.sale}</td>
              <td class="rateProduct">
                <span class="input-number-decrement">???</span>
                  <input class="input-number" type="text" value="${document.rate}" min="0" max="5" disabled>
                <span class="input-number-increment">+</span>
              </td>
              <td class="action">
                <button class="button-icon remove" data-id='${document.id}' data-table='products'>
                  <i class="far fa-trash-alt"></i>
                </button>
                <button class="button-icon save" data-id='${document.id}' data-table='products'>
                  <i class="fas fa-save"></i>
                </button>
              </td>
            </tr>`;
        });
        $('.tmanager-product table tbody').innerHTML = result;
        TableEvent.Product.Initialize();
        HandleEvent.SlideTdTable();
      };
    });
    $$('.page-category ul li').forEach((page) => {
      page.onclick = function () {
        if (this.textContent == Number($('.page-category input.currentPage').value)) return;
        $$('.page-category ul li').forEach((item) => (item.style.backgroundColor = null));
        let currentPage = Number($('.page-category input.currentPage').value);
        if (this.classList.contains('previous')) {
          if (currentPage <= 1) {
            $('.page-category ul li.previous').nextElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            --currentPage;
            $('.page-category input.currentPage').value = currentPage;
          }
        } else if (this.classList.contains('next')) {
          if (currentPage >= Math.floor(CategoryModel.getTotalPage())) {
            $('.page-category ul li.next').previousElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            ++currentPage;
            $('.page-category input.currentPage').value = currentPage;
          }
        } else {
          $('.page-category input.currentPage').value = this.textContent;
        }
        let page = Number($('.page-category input.currentPage').value);
        $$('.page-category ul li').forEach((item) => {
          if (item.textContent == page) {
            item.style.backgroundColor = 'var(--ui-background)';
          }
        });
        let collection = CategoryModel.getDocumentsByPage(page);
        let result = ``;
        collection.forEach((document) => {
          result += `
            <tr>
            <td>
            <div class="wrap-image">
              <img class="image-document i-category" src="${document.img}" alt="Image product id ${document.id}">
              <button class="changeImage" data-id="${document.id}">
                <i class="fas fa-exchange-alt">
                  <input type="file" name="changeImage" id="inputChangeImage"  style="display: none;" accept="image/*">
                </i>
              </button>
            </div>
          </td>
              <td contenteditable="true" class="nameCategory">${document.name}</td>
              <td class="action">
                <button class="button-icon remove" data-id='${document.id}' data-name='${document.name}' data-table='categories'>
                  <i class="far fa-trash-alt"></i>
                </button>
                <button class="button-icon save" data-id='${document.id}' data-name='${document.name}' data-table='categories'>
                  <i class="fas fa-save"></i>
                </button>
              </td>
            </tr>`;
        });
        $('.tmanager-category table tbody').innerHTML = result;
        TableEvent.Category.Initialize();
        HandleEvent.SlideTdTable();
      };
    });
    $$('.page-bill ul li').forEach((page) => {
      page.onclick = function () {
        if (this.textContent == Number($('.page-bill input.currentPage').value)) return;
        $$('.page-bill ul li').forEach((item) => (item.style.backgroundColor = null));
        let currentPage = Number($('.page-bill input.currentPage').value);
        if (this.classList.contains('previous')) {
          if (currentPage <= 1) {
            $('.page-bill ul li.previous').nextElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            --currentPage;
            $('.page-bill input.currentPage').value = currentPage;
          }
        } else if (this.classList.contains('next')) {
          if (currentPage >= Math.floor(BillModel.getTotalPage())) {
            $('.page-bill ul li.next').previousElementSibling.style.backgroundColor =
              'var(--ui-background)';
            return;
          } else {
            ++currentPage;
            $('.page-bill input.currentPage').value = currentPage;
          }
        } else {
          $('.page-bill input.currentPage').value = this.textContent;
        }
        let page = Number($('.page-bill input.currentPage').value);
        $$('.page-bill ul li').forEach((item) => {
          if (item.textContent == page) {
            item.style.backgroundColor = 'var(--ui-background)';
          }
        });
        let collection = BillModel.getDocumentsByPage(page);
        let result = ``;
        collection.forEach((bill) => {
          result += `<tr>          
          <td>${bill.username}</td>
          <td class="action">
            <button class="button-icon see-detail" data-id="${bill.id}">
              <span>Xem chi ti???t</span>
            </button>
          </td>
          <td>${
            new Date(bill.created_at).toLocaleDateString('en-GB') +
            ' ' +
            new Date(bill.created_at).toLocaleTimeString()
          }</td>
          <td>${formatNumber(bill.subtotal)}</td>
          <td class="status-bill">
          ${
            bill.status == 'PENDING'
              ? `<div class="lds-dual-ring"></div> `
              : bill.status == 'COMPLETED'
              ? `<i class="fas fa-check-circle completed"></i>`
              : `<i class="fas fa-times-circle cancelled"></i>`
          }
          </td>
          <td class="action">
            <button class="button-icon accept" data-id="${bill.id}">
              <i class="fas fa-check-circle"></i>
            </button>
            <button class="button-icon cancel" data-id="${bill.id}">
              <i class="fas fa-times-circle"></i>
            </button>
          </td></tr>  `;
        });
        $('.tmanager-bill table tbody').innerHTML = result;

        TableEvent.Bill.Initialize();
        HandleEvent.SlideTdTable();
      };
    });
  },
  Update: function (page) {
    if (page == 'user') {
      let currentPage = Number($('.page-user input.currentPage').value);
      let base = `    
      <ul>
        <li class="previous">&lt;</li>
        <li class="next">&gt;</li>
      </ul>`;
      $('.page-user ul').innerHTML = base;
      for (let i = 1; i <= UserModel.getTotalPage(); i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--purple)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-user ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      this.InitializeEventPagination();
    } else if (page == 'product') {
      let currentPage = Number($('.page-product input.currentPage').value);
      let base = `    
      <ul>
        <li class="previous">&lt;</li>
        <li class="next">&gt;</li>
      </ul>`;
      $('.page-product ul').innerHTML = base;
      for (let i = 1; i <= ProductModel.getTotalPage(); i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--ui-background)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-product ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      this.InitializeEventPagination();
    } else if (page == 'category') {
      let currentPage = Number($('.page-category input.currentPage').value);
      let base = `    
      <ul>
          <li class="previous">&lt;</li>
          <li class="next">&gt;</li>
      </ul>`;
      $('.page-category ul').innerHTML = base;
      for (let i = 1; i <= CategoryModel.getTotalPage(); i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--ui-background)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-category ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      this.InitializeEventPagination();
    } else {
      let currentPage = Number($('.page-bill input.currentPage').value);
      let base = `    
      <ul>
          <li class="previous">&lt;</li>
          <li class="next">&gt;</li>
      </ul>`;
      $('.page-bill ul').innerHTML = base;
      for (let i = 1; i <= BillModel.getTotalPage(); i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--ui-background)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-bill ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      this.InitializeEventPagination();
    }
  },
  LoadDataAtPage: function (view, page) {
    if (view == 'product') {
      let collection = ProductModel.getDocumentsByPage(page);
      let result = ``;
      collection.forEach((document) => {
        let categories = CategoryModel.getAll();
        let categoriesHTML = '';
        categories.forEach((category) => {
          if (document.category == category.name) {
            categoriesHTML += `<option selected value='${category.name}'>${category.name}</option>`;
          } else {
            categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
          }
        });
        result += `
          <tr>
          <td>
          <div class="wrap-image">
            <img class="image-document i-product" src="${document.imgList[0]}" alt="Image product id ${document.id}">
            <button class="addImage" data-id="${document.id}"><i class="fas fa-plus"></i></button>
          </div>
        </td>
            <td contenteditable="true" class="nameProduct">${document.name}</td>
            <td class="categoryProduct">
              <div id="select">
                <select id="selectCategory">
                  ${categoriesHTML}
                </select>
              </div>
            </td>
            <td contenteditable="true" class="priceProduct">${document.price}</td>
            <td contenteditable="true" class="saleProduct">${document.sale}</td>
            <td class="rateProduct">
              <span class="input-number-decrement">???</span>
                <input class="input-number" type="text" value="${document.rate}" min="0" max="5" disabled>
              <span class="input-number-increment">+</span>
            </td>
            <td class="action">
              <button class="button-icon remove" data-id='${document.id}' data-table='products'>
                <i class="far fa-trash-alt"></i>
              </button>
              <button class="button-icon save" data-id='${document.id}' data-table='products'>
                <i class="fas fa-save"></i>
              </button>
            </td>
          </tr>`;
      });
      $('.tmanager-product table tbody').innerHTML = result;
      TableEvent.Product.Initialize();
      HandleEvent.SlideTdTable();
    } else if (view == 'user') {
      let row = '';
      UserModel.getDocumentsByPage(page).forEach((user) => {
        row += `
        <tr>
            <td contenteditable="true" class="username">${user.username}</td>
            <td class="isAdmin">                
                <label class="switch">
                    <input type="checkbox" ${user.isAdmin ? 'checked' : ''}>
                    <span class="sliderBtn round"></span>
                </label>
            </td>
            <td class="action">
                <button class="button-icon remove" data-id='${user.id}' data-table='users'>
                    <i class="far fa-trash-alt"></i>
                </button>
                <button class="button-icon save" data-id='${user.id}' data-table='users'>
                    <i class="fas fa-save"></i>
                </button>
            </td>
        </tr>`;
      });
      $('.tmanager-user table tbody').innerHTML = row;
      HandleEvent.SlideTdTable();
    } else {
    }
  },
  InitializeEventPaginationSearch: function (document, totalPage, table) {
    if (table == 'user') {
      $$('.page-user ul li').forEach((page) => {
        page.onclick = function () {
          $$('.page-user ul li').forEach((item) => (item.style.backgroundColor = null));
          let currentPage = Number($('.page-user input.currentPage').value);
          if (this.classList.contains('previous')) {
            if (currentPage <= 1) {
              $('.page-user ul li.previous').nextElementSibling.style.backgroundColor =
                'var(--purple)';
              return;
            } else {
              --currentPage;
              $('.page-user input.currentPage').value = currentPage;
            }
          } else if (this.classList.contains('next')) {
            if (currentPage >= Math.floor(totalPage)) {
              $('.page-user ul li.next').previousElementSibling.style.backgroundColor =
                'var(--purple)';
              return;
            } else {
              ++currentPage;
              $('.page-user input.currentPage').value = currentPage;
            }
          } else {
            $('.page-user input.currentPage').value = this.textContent;
          }
          let page = Number($('.page-user input.currentPage').value);
          $$('.page-user ul li').forEach((item) => {
            if (item.textContent == page) {
              item.style.backgroundColor = 'var(--purple)';
            }
          });

          let collection = UserModel.getDocumentsByPage(page, document);
          let result = ``;
          collection.forEach((document) => {
            result += `
                  <tr>
                    <td  class="username">${document.username}</td>
                    <td class="fullname">${document.fullname}</td>
                    <td class="address">${document.address}</td>
                    <td class="phone">${document.phone}</td>
                    <td class="isAdmin">                
                        <label class="switch">
                            <input type="checkbox" ${document.isAdmin ? 'checked' : ''}>
                            <span class="sliderBtn round"></span>
                        </label>
                    </td>
                    <td class="action">
                        <button class="button-icon remove" data-id='${
                          document.id
                        }' data-table='users' style="visibility:${
              document.username == JSON.parse(localStorage.getItem('username'))
                ? 'hidden'
                : 'visible'
            }">
                            <i class="far fa-trash-alt"></i>
                        </button>
                        <button class="button-icon save" data-id='${
                          document.id
                        }' data-table='users' style="visibility:${
              document.username == JSON.parse(localStorage.getItem('username'))
                ? 'hidden'
                : 'visible'
            }">
                            <i class="fas fa-save"></i>
                        </button>
                    </td>
                  </tr>`;
          });
          $('.tmanager-user table tbody').innerHTML = result;
          TableEvent.User.Initialize();
          HandleEvent.SlideTdTable();
        };
      });
    } else if (table == 'product') {
      $$('.page-product ul li').forEach((page) => {
        page.onclick = function () {
          $$('.page-product ul li').forEach((item) => (item.style.backgroundColor = null));
          let currentPage = Number($('.page-product input.currentPage').value);
          if (this.classList.contains('previous')) {
            if (currentPage <= 1) {
              $('.page-product ul li.previous').nextElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              --currentPage;
              $('.page-product input.currentPage').value = currentPage;
            }
          } else if (this.classList.contains('next')) {
            if (currentPage >= Math.floor(totalPage)) {
              $('.page-product ul li.next').previousElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              ++currentPage;
              $('.page-product input.currentPage').value = currentPage;
            }
          } else {
            $('.page-product input.currentPage').value = this.textContent;
          }
          let page = Number($('.page-product input.currentPage').value);
          $$('.page-product ul li').forEach((item) => {
            if (item.textContent == page) {
              item.style.backgroundColor = 'var(--ui-background)';
            }
          });
          let collection = ProductModel.getDocumentsByPage(page, document);
          let result = ``;
          collection.forEach((document) => {
            let categories = CategoryModel.getAll();
            let categoriesHTML = '';
            categories.forEach((category) => {
              if (document.category == category.name) {
                categoriesHTML += `<option selected value='${category.name}'>${category.name}</option>`;
              } else {
                categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
              }
            });
            result += `
              <tr>
              <td>
              <div class="wrap-image">
                <img class="image-document i-product" src="${document.imgList[0]}" alt="Image product id ${document.id}">
                <button class="addImage" data-id="${document.id}"><i class="fas fa-plus"></i></button>
              </div>
            </td>
                <td contenteditable="true" class="nameProduct">${document.name}</td>
                <td class="categoryProduct">
                  <div id="select">
                    <select id="selectCategory">
                      ${categoriesHTML}
                    </select>
                  </div>
                </td>
                <td contenteditable="true" class="priceProduct">${document.price}</td>
                <td contenteditable="true" class="priceSaleProduct">${document.sale}</td>
                <td class="rateProduct">
                  <span class="input-number-decrement">???</span>
                    <input class="input-number" type="text" value="${document.rate}" min="0" max="5" disabled>
                  <span class="input-number-increment">+</span>
                </td>
                <td class="action">
                  <button class="button-icon remove" data-id='${document.id}' data-table='products'>
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button class="button-icon save" data-id='${document.id}' data-table='products'>
                    <i class="fas fa-save"></i>
                  </button>
                </td>
              </tr>`;
          });
          $('.tmanager-product table tbody').innerHTML = result;
          TableEvent.Product.Initialize();
          HandleEvent.SlideTdTable();
        };
      });
    } else if (table == 'category') {
      $$('.page-category ul li').forEach((page) => {
        page.onclick = function () {
          $$('.page-category ul li').forEach((item) => (item.style.backgroundColor = null));
          let currentPage = Number($('.page-category input.currentPage').value);
          if (this.classList.contains('previous')) {
            if (currentPage <= 1) {
              $('.page-category ul li.previous').nextElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              --currentPage;
              $('.page-category input.currentPage').value = currentPage;
            }
          } else if (this.classList.contains('next')) {
            if (currentPage >= Math.floor(totalPage)) {
              $('.page-category ul li.next').previousElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              ++currentPage;
              $('.page-category input.currentPage').value = currentPage;
            }
          } else {
            $('.page-category input.currentPage').value = this.textContent;
          }
          let page = Number($('.page-category input.currentPage').value);
          $$('.page-category ul li').forEach((item) => {
            if (item.textContent == page) {
              item.style.backgroundColor = 'var(--ui-background)';
            }
          });
          let collection = CategoryModel.getDocumentsByPage(page, document);
          let result = ``;
          collection.forEach((document) => {
            result += `
              <tr>
              <td>
              <div class="wrap-image">
                <img class="image-document i-category" src="${document.img}" alt="Image product id ${document.id}">
                <button class="changeImage" data-id="${document.id}">
                  <i class="fas fa-exchange-alt">
                    <input type="file" name="changeImage" id="inputChangeImage"  style="display: none;" accept="image/*">
                  </i>
                </button>
              </div>
            </td>
                <td contenteditable="true" class="nameCategory">${document.name}</td>
                <td class="action">
                  <button class="button-icon remove" data-id='${document.id}' data-name='${document.name}' data-table='categories'>
                    <i class="far fa-trash-alt"></i>
                  </button>
                  <button class="button-icon save" data-id='${document.id}' data-name='${document.name}' data-table='categories'>
                    <i class="fas fa-save"></i>
                  </button>
                </td>
              </tr>`;
          });
          $('.tmanager-category table tbody').innerHTML = result;
          TableEvent.Category.Initialize();
          HandleEvent.SlideTdTable();
        };
      });
    } else {
      $$('.page-bill ul li').forEach((page) => {
        page.onclick = function () {
          $$('.page-bill ul li').forEach((item) => (item.style.backgroundColor = null));
          let currentPage = Number($('.page-bill input.currentPage').value);
          if (this.classList.contains('previous')) {
            if (currentPage <= 1) {
              $('.page-bill ul li.previous').nextElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              --currentPage;
              $('.page-bill input.currentPage').value = currentPage;
            }
          } else if (this.classList.contains('next')) {
            if (currentPage >= Math.floor(totalPage)) {
              $('.page-bill ul li.next').previousElementSibling.style.backgroundColor =
                'var(--ui-background)';
              return;
            } else {
              ++currentPage;
              $('.page-bill input.currentPage').value = currentPage;
            }
          } else {
            $('.page-bill input.currentPage').value = this.textContent;
          }
          let page = Number($('.page-bill input.currentPage').value);
          $$('.page-bill ul li').forEach((item) => {
            if (item.textContent == page) {
              item.style.backgroundColor = 'var(--ui-background)';
            }
          });
          let collection = BillModel.getDocumentsByPage(page, document);
          let result = ``;
          collection.forEach((bill) => {
            result += `<tr>          
            <td>${bill.username}</td>
            <td class="action">
              <button class="button-icon see-detail" data-id="${bill.id}">
                <span>Xem chi ti???t</span>
              </button>
            </td>
            <td>${
              new Date(bill.created_at).toLocaleDateString('en-GB') +
              ' ' +
              new Date(bill.created_at).toLocaleTimeString()
            }</td>
            <td>${formatNumber(bill.subtotal)}</td>
            <td class="status-bill">
            ${
              bill.status == 'PENDING'
                ? `<div class="lds-dual-ring"></div> `
                : bill.status == 'COMPLETED'
                ? `<i class="fas fa-check-circle completed"></i>`
                : `<i class="fas fa-times-circle cancelled"></i>`
            }
            </td>
            <td class="action">
              <button class="button-icon accept" data-id="${bill.id}">
                <i class="fas fa-check-circle"></i>
              </button>
              <button class="button-icon cancel" data-id="${bill.id}">
                <i class="fas fa-times-circle"></i>
              </button>
            </td></tr>  `;
          });
          $('.tmanager-bill table tbody').innerHTML = result;

          TableEvent.Bill.Initialize();
          HandleEvent.SlideTdTable();
        };
      });
    }
  },
};
