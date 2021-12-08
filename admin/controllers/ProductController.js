const ProductController = {
  LoadProduct: function (page = 1) {
    this.RenderDataProduct();
  },
  LoadImageToModal: function (id) {
    let result = ProductModel.getProductById(id);
    $('.image-show').innerHTML = '';
    if (result) {
      result.imgList.forEach((img) => {
        let imageHTML = `                        
        <div class="wrap-image list-image-product">
          <img class="image-product" src="${img}" alt="Image product id">
          <button class="removeImage"><i class="fas fa-remove"></i></button>
        </div>`;
        $('.image-show').insertAdjacentHTML('beforeend', imageHTML);
      });
    }
  },
  SaveImageToDB: function (id, arrayImage) {
    ProductModel.saveImage(id, arrayImage);
    let currentPage = Number($('.page-product input.currentPage').value);
    PaginationController.LoadDataAtPage('product', currentPage);
  },
  SearchProduct: function (key) {
    key = key.toLowerCase();
    if (key != '' && key != undefined) {
      let result = [];
      ProductModel.getAll().forEach((document) => {
        if (document.name.toLowerCase().match(new RegExp(`${key}.*`, 'g'))) {
          result.push(document);
        }
      });
      let totalPage = ProductModel.getTotalPage(result);
      let currentPage = ($('.page-product input.currentPage').value = 1);
      let base = `    
      <ul>
        <li class="previous">&lt;</li>
        <li class="next">&gt;</li>
      </ul>`;
      $('.page-product ul').innerHTML = base;
      for (let i = 1; i <= totalPage; i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--ui-background)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-product ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      PaginationController.InitializeEventPaginationSearch(result, totalPage, 'product');
      localStorage.setItem('searchProductByName', JSON.stringify(result));
      let row = '';
      ProductModel.getDocumentsByPage(1, result).forEach((product) => {
        let categories = CategoryModel.getAll();
        let categoriesHTML = '';
        categories.forEach((category) => {
          if (product.category == category.name) {
            categoriesHTML += `<option selected value='${category.name}'>${category.name}</option>`;
          } else {
            categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
          }
        });
        row += `
      <tr>
      <td>
        <div class="wrap-image">
          <img class="image-document i-product" src="${product.imgList[0]}" alt="Image product id ${product.id}">
          <button class="addImage" data-id="${product.id}"><i class="fas fa-plus"></i></button>
        </div>
      </td>
        <td contenteditable="true" class="nameProduct">${product.name}</td>
        <td class="categoryProduct">
          <div id="select">
            <select id="selectCategory">
                ${categoriesHTML}
            </select>
          </div>
        </td>
        <td contenteditable="true" class="priceProduct">${product.price}</td>
        <td contenteditable="true" class="priceSaleProduct">${product.sale}</td>
        <td class="rateProduct">
          <span class="input-number-decrement">–</span>
            <input class="input-number" type="text" value="${product.rate}" min="0" max="5" disabled>
          <span class="input-number-increment">+</span>
        </td>
        <td class="action">
          <button class="button-icon remove" data-id='${product.id}' data-table='products'>
            <i class="far fa-trash-alt"></i>
          </button>
          <button class="button-icon save" data-id='${product.id}' data-table='products'>
            <i class="fas fa-save"></i>
          </button>
        </td>
      </tr>`;
      });
      $('.tmanager-product table tbody').innerHTML = row;
    } else {
      this.LoadProduct(Number($('.page-product input.currentPage').value));
      localStorage.setItem('searchProductByName', '');
      PaginationController.Update('product');
      //PaginationController.LoadDataAtPage()
    }
    TableEvent.Product.Initialize();
  },
  getProductById: function (id) {
    return ProductModel.getProductById(id);
  },
  getAll: function (id) {
    return ProductModel.getAll();
  },
  RenderDataProduct: function () {
    let currentPage = Number($('.page-product input.currentPage').value);
    let products = ProductModel.getDocumentsByPage(currentPage);
    let row = ``;
    products.forEach((product) => {
      let categories = CategoryModel.getAll();
      let categoriesHTML = ``;
      if (product.category == 'NONE') {
        categoriesHTML += `<option selected value='${product.category}'>${product.category}</option>`;
      }
      categories.forEach((category) => {
        if (product.category == category.name) {
          categoriesHTML += `<option selected value='${category.name}' >${category.name}</option>`;
        } else {
          categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
        }
      });
      row += `
      <tr>
        <td>
          <div class="wrap-image">
            <img class="image-document i-product" src="${product.imgList[0]}" alt="Image product id ${product.id}">
            <button class="addImage" data-id="${product.id}"><i class="fas fa-plus"></i></button>
          </div>
        </td>
        <td contenteditable="true" class="nameProduct">${product.name}</td>
        <td class="categoryProduct">
          <div id="select">
            <select id="selectCategory">
              ${categoriesHTML}
            </select>
          </div>
        </td>
        <td contenteditable="true" class="priceProduct">${product.price}</td>
        <td contenteditable="true" class="priceSaleProduct">${product.sale}</td>
        <td class="rateProduct">
          <span class="input-number-decrement">–</span>
          <input class="input-number" type="text" value="${product.rate}" min="0" max="5" disabled>
          <span class="input-number-increment">+</span>
        </td>
        <td class="action">
          <button class="button-icon remove" data-id='${product.id}' data-table='products'>
            <i class="far fa-trash-alt"></i>
          </button>
          <button class="button-icon save" data-id='${product.id}' data-table='products'>
            <i class="fas fa-save"></i>
          </button>
        </td>
      </tr>`;
    });
    $('.tmanager-product table tbody').innerHTML = row;
    TableEvent.Product.Initialize();
  },
  SearchDetail: function (from, to, name, category, rate) {
    let products = ProductModel.Search(from, to, name, category, rate);
    console.log(from, to, name, category, rate);
    let totalPage = ProductModel.getTotalPage(products);
    let currentPage = ($('.page-product input.currentPage').value = 1);
    let base = `    
    <ul>
      <li class="previous">&lt;</li>
      <li class="next">&gt;</li>
    </ul>`;
    $('.page-product ul').innerHTML = base;
    for (let i = 1; i <= totalPage; i++) {
      let page = '';
      if (i == currentPage) {
        page = `<li style="background-color:var(--ui-background)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-product ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    PaginationController.InitializeEventPaginationSearch(products, totalPage, 'product');
    localStorage.setItem('searchProductByName', JSON.stringify(products));
    let row = '';
    ProductModel.getDocumentsByPage(1, products).forEach((product) => {
      let categories = CategoryModel.getAll();
      let categoriesHTML = '';
      categories.forEach((category) => {
        if (product.category == category.name) {
          categoriesHTML += `<option selected value='${category.name}'>${category.name}</option>`;
        } else {
          categoriesHTML += `<option value='${category.name}' >${category.name}</option>`;
        }
      });
      row += `
    <tr>
    <td>
      <div class="wrap-image">
        <img class="image-document i-product" src="${product.imgList[0]}" alt="Image product id ${product.id}">
        <button class="addImage" data-id="${product.id}"><i class="fas fa-plus"></i></button>
      </div>
    </td>
      <td contenteditable="true" class="nameProduct">${product.name}</td>
      <td class="categoryProduct">
        <div id="select">
          <select id="selectCategory">
              ${categoriesHTML}
          </select>
        </div>
      </td>
      <td contenteditable="true" class="priceProduct">${product.price}</td>
      <td contenteditable="true" class="priceSaleProduct">${product.sale}</td>
      <td class="rateProduct">
        <span class="input-number-decrement">–</span>
          <input class="input-number" type="text" value="${product.rate}" min="0" max="5" disabled>
        <span class="input-number-increment">+</span>
      </td>
      <td class="action">
        <button class="button-icon remove" data-id='${product.id}' data-table='products'>
          <i class="far fa-trash-alt"></i>
        </button>
        <button class="button-icon save" data-id='${product.id}' data-table='products'>
          <i class="fas fa-save"></i>
        </button>
      </td>
    </tr>`;
    });
    $('.tmanager-product table tbody').innerHTML = row;
  },
};
