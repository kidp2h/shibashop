const HandleEvent = {
  User: {
    Add: function () {
      let nextId = getNextId(UserModel);
      let row = `
      <tr>
        <td contenteditable="true" class="username">Username here</td>
        <td contenteditable="true" class="fullname">Full name user</td>
        <td contenteditable="true" class="address">Address user</td>
        <td contenteditable="true" class="phone">00000000000</td>
        <td class="isAdmin">
            <label class="switch">
                <input type="checkbox">
                <span class="sliderBtn round"></span>
            </label>
        </td>
        <td class="action">
            <button class="button-icon remove" data-id='${nextId}' data-table='users'>
                <i class="far fa-trash-alt"></i>
            </button>
            <button class="button-icon save" data-id='${nextId}' data-table='users'>
                <i class="fas fa-save"></i>
            </button>
        </td>
      </tr>`;
      $('.tmanager-user table tbody').insertAdjacentHTML('afterBegin', row);
      var el = $('.username');
      var range = document.createRange();
      var sel = window.getSelection();

      range.setStart(el.childNodes[0], 0);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    Save: function (item) {
      if (confirm('Bạn có thật sự muốn lưu không ?')) {
        $('.tmanager-user .input-search').value = '';
        let row = item.parentNode.parentNode;
        let id = Number(item.dataset.id);
        let currentPage = Number($('.page-user input.currentPage').value);
        let user = {
          username: row.querySelector('.username').textContent,
          address: row.querySelector('.address').textContent,
          fullname: row.querySelector('.fullname').textContent,
          phone: row.querySelector('.phone').textContent,
          isAdmin: row.querySelector('.isAdmin label input').checked,
        };
        let result = UserModel.updateUser(id, user);
        toast(result.message.type, icon[result.message.type], result.message.text);
        if (result.message.type == 'success') {
          PaginationController.Update('user');
          localStorage.setItem('searchUserByUsername', '');
          // only load page current, not load all
          UserView.LoadData(currentPage);
          UserView.LoadEvent();
          IndexController.LoadUserTable();
        }
      }
    },
    Remove: function (item) {
      if (confirm('Bạn có thật sự muốn xoá không ?')) {
        let row = item.parentNode.parentNode;
        let length = row.parentNode.querySelectorAll('tr').length - 1;
        row.style.transition = 'all 1s';
        row.style.transform = 'translateX(-2000px)';
        let id = item.dataset.id;
        UserModel.Remove(id);
        IndexView.LoadTable.User();
        setTimeout(() => {
          row.remove();
          PaginationController.Update('user');
          if (length == 0) {
            $('.tmanager-user .previous').click();
          }
        }, 500);
      }
    },
    SearchUser: function (key) {
      UserController.SearchUser(key);
    },
  },
  Product: {
    Add: function () {
      let categories = CategoryModel.getAll();
      let categoriesHTML = '';
      categories.forEach((category) => {
        categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
      });
      let nextId = getNextId(ProductModel);
      let row = `
      <tr>
        <td>
          <div class="wrap-image" style="cursor:not-allowed">
            <img class="image-document i-product" src="./images/products/product.jpg" alt="">
            <button class="addImage" data-id="${nextId}" style="pointer-events:none;cursor:not-allowed"><i class="fas fa-plus"></i></button>
          </div>
        </td>
          <td contenteditable="true" class="nameProduct">NameProduct</td>
          <td class="categoryProduct">
              <div id="select">
                  <select id="selectCategory">
                      ${categoriesHTML}
                  </select>
              </div>
          </td>
          <td contenteditable="true" class="priceProduct">1000</td>
          <td contenteditable="true" class="priceSaleProduct">1000</td>
          <td class="rateProduct">
            <span class="input-number-decrement">–</span>
              <input class="input-number" type="text" value="0" min="0" max="5" disabled>
            <span class="input-number-increment">+</span>
          </td>
          <td class="action">
              <button class="button-icon remove" data-id='${nextId}'data-table='products'>
                  <i class="far fa-trash-alt"></i>
              </button>
              <button class="button-icon save" data-id='${nextId}' data-table='products'>
                  <i class="fas fa-save"></i>
              </button>
          </td>
      </tr>`;
      HandleEvent.RemoveAnimation();
      $('.tmanager-product table tbody').insertAdjacentHTML('afterBegin', row);
      var el = $('.nameProduct');
      var range = document.createRange();
      var sel = window.getSelection();

      range.setStart(el.childNodes[0], 0);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    Save: function (item) {
      let row = item.parentNode.parentNode;
      let id = Number(item.dataset.id);
      let product = {
        name: row.querySelector('.nameProduct').textContent,
        category: row.querySelector('.categoryProduct select').value,
        rate: row.querySelector('.input-number').value,
        price: +row.querySelector('.priceProduct').textContent,
        sale: +row.querySelector('.priceSaleProduct').textContent,
      };
      if (Validate.isNumber(product.price)) {
        if (confirm('Bạn có thật sự muốn lưu không ?')) {
          let result = ProductModel.updateProduct(id, product);
          toast(result.message.type, icon[result.message.type], result.message.text);
          if (result.message.type == 'success') {
            PaginationController.Update('product');
            ProductView.Load();
            TableEvent.Product.Initialize();
            IndexController.LoadProductTable();
            //RevenueView.Load();
          }
        }
      } else {
        toast('warning', warning, 'Giá không hợp lệ');
      }
    },
    Remove: function (item) {
      if (confirm('Bạn có thật sự muốn xoá không ?')) {
        let row = item.parentNode.parentNode;
        let length = row.parentNode.querySelectorAll('tr').length - 1;
        row.style.transition = 'all 1s';
        row.style.transform = 'translateX(-2000px)';
        let id = item.dataset.id;
        ProductModel.Remove(id);
        IndexController.LoadProductTable();
        RevenueView.Load();
        setTimeout(() => {
          row.remove();
        }, 500);
        PaginationController.Update('product');
        if (length == 0) {
          $('.tmanager-product .previous').click();
        }
      }
    },
    AddImage: function (id) {
      $('.btn-addImage').onclick = function () {
        $('#inputUploadImage').click();
      };
      $('.overlayAddImage').style.display = 'flex';
      $('.modal-addImage').style.transform = 'translateY(0px)';
      ProductController.LoadImageToModal(id);
      TableEvent.Product.SaveImage();
      TableEvent.Product.RemoveImage();
      $('.btn-saveImage').setAttribute('data-id', id);
      $('.btn-saveImage').setAttribute('type', 'product');
    },
    RemoveImage: function (btn) {
      btn.onclick = function () {
        btn.parentNode.remove();
      };
    },
    SaveImage: function (id) {
      let arrayImage = [];
      $$('.list-image-product').forEach((image) => {
        arrayImage.push(image.querySelector('img').getAttribute('src'));
      });
      ProductController.SaveImageToDB(id, arrayImage);

      toast('success', success, 'Đã lưu');
    },
    SearchProduct: function (key) {
      ProductController.SearchProduct(key);
      TableEvent.Product.Initialize();
    },
    UploadImage: function () {
      if (this.files && this.files[0]) {
        var FR = new FileReader();
        let result;
        FR.addEventListener('load', function (e) {
          if (e.total > 500000) {
            toast('danger', danger, 'Vui lòng upload ảnh size nhỏ hơn 500 KB');
          } else if (!e.target.result.includes('data:image/')) {
            toast('warning', warning, 'Vui lòng chỉ upload ảnh');
          } else {
            let imageHTML = `                        
            <div class="wrap-image list-image-product" data-status="new">
              <img class="image-product" src="${e.target.result}" alt="Image product id">
              <button class="removeImage"><i class="fas fa-remove"></i></button>
            </div>`;
            $('.image-show').insertAdjacentHTML('beforeend', imageHTML);
            TableEvent.Product.RemoveImage();
          }
          $('#inputUploadImage').value = '';
        });
        FR.readAsDataURL(this.files[0]);
      }
    },
    SearchDetail: function () {
      let to = $('#rangePrice-to').value || 999999999999999999;
      let from = $('#rangePrice-from').value || 0;
      let name = $('.tmanager-product .input-search').value || '';
      let category = 0,
        rate = 0;
      if (to < from) {
        console.log(to, from);
        toast('warning', warning, 'Vui lòng chọn khoảng giá hợp lệ');
        return;
      }

      $$('.btn-select-category').forEach((item) => {
        if (item.classList.contains('active')) {
          category = item.textContent == 'All' ? 0 : item.textContent;
        }
      });
      $$('.selectRate i').forEach((item) => {
        if (item.classList.contains('active')) {
          rate = item.dataset.pos;
        }
      });
      console.log(to, from, category, rate);
      ProductController.SearchDetail(from, to, name, category, rate);
    },
    InnerCategoryInFilter: function () {
      let categories = CategoryModel.getAll();
      let listButton = '<button class="btn-select-category">All</button>';
      categories.forEach((category, index) => {
        if (index == 0) {
          listButton += `<button class="btn-select-category active">${category.name}</button>`;
        } else {
          listButton += `<button class="btn-select-category">${category.name}</button>`;
        }
      });
      $('.list-btn-category').innerHTML = listButton;
      $$('.btn-select-category').forEach((btn) => {
        btn.onclick = function () {
          $$('.btn-select-category').forEach((item) => item.classList.remove('active'));
          btn.classList.add('active');
        };
      });
    },
  },
  Category: {
    Add: function () {
      let nextId = getNextId(CategoryModel);
      let row = `
      <tr>
      <td>
      <div class="wrap-image">
        <img class="image-document i-category" src="./images/products/product.jpg" alt="Image category ">
        <button class="changeImage" data-id="${nextId}">
          <i class="fas fa-plus">
            <input type="file" name="changeImage" id="inputChangeImage"  style="display: none;" accept="image/*">
          </i>
        </button>
      </div>
    </td>
        <td contenteditable="true" class="nameCategory">Name category here</td>
        <td class="action">
          <button class="button-icon remove" data-id='${nextId}' data-table='categories'>
            <i class="far fa-trash-alt"></i>
          </button>
          <button class="button-icon save" data-id='${nextId}' data-table='categories'>
            <i class="fas fa-save"></i>
          </button>
        </td>
      </tr>`;
      $('.tmanager-category table tbody').insertAdjacentHTML('afterBegin', row);
      var el = $('.nameCategory');
      var range = document.createRange();
      var sel = window.getSelection();

      range.setStart(el.childNodes[0], 0);
      range.collapse(true);

      sel.removeAllRanges();
      sel.addRange(range);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      IndexController.LoadCategoryTable();
    },
    Save: function (item) {
      if (confirm('Bạn có thật sự muốn lưu không ?')) {
        let row = item.parentNode.parentNode;
        let currentPage = Number($('.page-category input.currentPage').value);
        let id = Number(item.dataset.id);
        let oldNameCategory = item.dataset.name;
        let name = row.querySelector('.nameCategory').textContent;
        let img = row.querySelector('.i-category').getAttribute('src');
        let result = CategoryModel.updateNameCategory(id, name, img, oldNameCategory);
        toast(result.message.type, icon[result.message.type], result.message.text);
        if (result.message.type == 'success') {
          PaginationController.Update('category');
          CategoryView.LoadData(currentPage);
          TableEvent.Category.Initialize();
          IndexController.LoadCategoryTable();
          ProductView.Load();
          //RevenueView.Load();
        }
      }
    },
    Remove: function (item) {
      if (confirm('Bạn có thật sự muốn xoá không ?')) {
        let row = item.parentNode.parentNode;
        let length = row.parentNode.querySelectorAll('tr').length - 1;
        row.style.transition = 'all 1s';
        row.style.transform = 'translateX(-2000px)';
        let id = item.dataset.id;
        let oldName = item.dataset.name;
        CategoryModel.Remove(id, oldName);
        IndexController.LoadCategoryTable();
        ProductController.LoadProduct();
        setTimeout(() => {
          row.remove();
        }, 500);
        PaginationController.Update('category');
        if (length == 0) {
          $('.tmanager-category .previous').click();
        }
      }
    },
    SearchCategory: function (key) {
      CategoryController.SearchCategory(key);
      TableEvent.Category.Initialize();
    },
    ChangeImage: function (btn, id) {
      let imgCurrent = btn.parentNode.querySelector('.image-document');
      $('#inputChangeImage').click();
      $('#inputChangeImage').onchange = function () {
        if (this.files && this.files[0]) {
          var FR = new FileReader();
          FR.addEventListener('load', function (e) {
            console.log(e);
            if (e.total > 500000) {
              toast('danger', danger, 'Vui lòng upload ảnh size nhỏ hơn 500 KB');
            } else if (!e.target.result.includes('data:image/')) {
              toast('warning', warning, 'Vui lòng chỉ upload ảnh');
            } else {
              imgCurrent.setAttribute('src', e.target.result);
            }
            $('#inputChangeImage').value = '';
          });
          FR.readAsDataURL(this.files[0]);
        }
      };
    },
  },
  Bill: {
    seeDetail: function (btn) {
      $('.overlayDetail').style.display = 'flex';
      let id = btn.dataset.id;
      $('.modal-seeDetail').style.transform = 'translateY(0px)';
      let { products } = BillController.getBillById(id);
      let row = ``;
      let table = $('.product-show tbody');
      products.forEach((item) => {
        // let product = ProductController.getProductById(item.id)
        row += `<tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${formatNumber(item.quantity * item.sale)}</td>
        </tr>`;
      });
      table.innerHTML = row;
    },
    acceptBill: function (btn) {
      let row = btn.parentNode.parentNode;
      let status = row.querySelector('.status-bill');
      status.innerHTML = `<i class="fas fa-check-circle completed"></i>`;
      BillController.setStatusBill(btn.dataset.id, 'COMPLETED');
    },
    cancelBill: function (btn) {
      let row = btn.parentNode.parentNode;
      let status = row.querySelector('.status-bill');
      status.innerHTML = `<i class="fas fa-times-circle cancelled"></i>`;
      BillController.setStatusBill(btn.dataset.id, 'CANCELLED');
    },
    searchBill: function (from, to, key) {
      BillController.searchBill(from, to, key);
      HandleEvent.SlideTdTable();
    },
  },
  Revenue: {
    Filter: function () {
      let category = $('#select-search-category').value;
      let bills = BillModel.getAll();
      let idsProduct = [],
        billFilter = [];

      bills.forEach((bill) => {
        if (bill.status == 'COMPLETED') {
          bill.products.forEach((product) => {
            idsProduct.push(product.id);
          });
        }
      });

      let idsUnique = [...new Set(idsProduct)];
      console.log(idsUnique);
      idsUnique.forEach((idProduct) => {
        let qty = 0,
          currentProduct,
          currentBill;
        bills.forEach((bill) => {
          if (bill.status == 'COMPLETED') {
            bill.products.forEach((product) => {
              if (product.id == idProduct) {
                currentProduct = product;
                qty += product.quantity;
                currentBill = bill;
              }
            });
          }
        });
        billFilter.push({
          product: currentProduct,
          qty,
          status: currentBill.status,
        });
      });
      console.log(billFilter);
      let row = '',
        totalPrice = 0,
        totalAmountSold = 0;
      billFilter.forEach((bill) => {
        if (category == '0') {
          if (bill.status == 'COMPLETED') {
            row += `<tr>
                <td>${bill.product.name}</td>
                <td>${bill.product.category}</td>
                <td>${formatNumber(bill.product.sale)}</td>
                <td>${bill.qty}</td>
                <td>${formatNumber(bill.product.sale * bill.qty)}</td>
              </tr>`;
            totalAmountSold += bill.qty;
            totalPrice += bill.product.sale * bill.qty;
          }
        } else {
          if (bill.status == 'COMPLETED' && bill.product.category == category) {
            row += `<tr>
                <td>${bill.product.name}</td>
                <td>${bill.product.category}</td>
                <td>${formatNumber(bill.product.sale)}</td>
                <td>${bill.qty}</td>
                <td>${formatNumber(bill.product.sale * bill.qty)}</td>
              </tr>`;
            totalAmountSold += bill.qty;
            totalPrice += bill.product.sale * bill.qty;
          }
        }
      });
      row += `<tr>
            <td></td>
            <td></td>
            <td></td>
            <td><b>Amount Sold</b> = <b style="color:var(--ui-background)">${totalAmountSold}</b></td>
            <td><b>Sub total</b> = <b style="color:var(--red)">${formatNumber(totalPrice)}</b></td>
          </tr>`;
      $('.tmanager-revenue tbody').innerHTML = row;
      HandleEvent.SlideTdTable();
    },
    LoadBillByDate: function (from, to) {},
  },
  Add: function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  SlideTdTable: function () {
    $$('tbody tr:nth-child(even)').forEach((r) => {
      r.style.animation = 'tdSlideR2L ease 0.85s forwards';
    });
    $$('tbody tr:nth-child(odd)').forEach((r) => {
      r.style.animation = 'slideL2R ease 0.85s forwards';
    });
    $$('tbody tr:first-child').forEach((r) => {
      r.style.animation = 'slideT2B ease 0.85s forwards';
    });
    $$('tbody tr:last-child').forEach((r) => {
      r.style.animation = 'slideB2T ease 0.85s forwards';
    });
  },
  RemoveAnimation: function () {
    $$('.tmanager-product tbody tr').forEach((r) => {
      r.style.animation = 'none';
    });
  },
};
