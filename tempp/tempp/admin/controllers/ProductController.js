const ProductController = {
  LoadProduct: function (page = 1) {
    this.RenderDataProduct();
  },
  LoadImageToModal : function(id){
    let result =  ProductModel.getProductById(id);
    $(".image-show").innerHTML = ""
    if(result){
      result.imgList.forEach(img => {
        let imageHTML = `                        
        <div class="wrap-image list-image-product">
          <img class="image-product" src="${img}" alt="Image product id">
          <button class="removeImage"><i class="fas fa-remove"></i></button>
        </div>`
        $(".image-show").insertAdjacentHTML("beforeend",imageHTML);
      })
    }
  },
  SaveImageToDB : function(id, arrayImage){
    ProductModel.saveImage(id, arrayImage);
    let currentPage = Number($(".page-product input.currentPage").value);
    PaginationController.LoadDataAtPage("product",currentPage)
  },
  SearchProduct : function(key){
    key = key.toLowerCase()
    if(key != "" && key != undefined){
      let result = []
      ProductModel.getAll().forEach(document => {
        if(document.name.toLowerCase().match(new RegExp(`${key}.*`,"g"))){
          result.push(document);
        }
      })
      let row = ''
      result.forEach((product) => {
        let categories = CategoryModel.getAll();
      let categoriesHTML = "";
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
        <td contenteditable="true" class="priceProduct">${formatNumber(product.price)}</td>
        <td class="rateProduct">${product.rate}</td>
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
      $(".tmanager-product table tbody").innerHTML = row
    }else{
      this.LoadProduct(Number($(".page-product input.currentPage").value));
      //PaginationController.LoadDataAtPage()
    }
    TableEvent.Product.Initialize();
  },
  getProductById : function(id){
    return ProductModel.getProductById(id);
  },
  getAll : function(id){
    return ProductModel.getAll();
  },
  RenderDataProduct : function(){
    let currentPage = Number($(".page-product input.currentPage").value);
    let products = ProductModel.getDocumentsByPage(currentPage);
    let row = ``;
    products.forEach((product) => {
      let categories = CategoryModel.getAll();
      let categoriesHTML = ``
      if(product.category == "NONE"){
        categoriesHTML += `<option selected value='${product.category}'>${product.category}</option>`;
      }
      categories.forEach((category) => {
        if(product.category == category.name){
          categoriesHTML += `<option selected value='${category.name}' >${category.name}</option>`;
        }else{
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
        <td contenteditable="true" class="priceProduct">${formatNumber(product.price)}</td>
        <td class="rateProduct">${product.rate}</td>
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
    $(".tmanager-product table tbody").innerHTML = row;
    TableEvent.Product.Initialize();
  }
};
