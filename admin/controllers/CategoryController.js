const CategoryController = {
  LoadCategory: function (page = 1) {
    let row = '';
    CategoryModel.getDocumentsByPage(page).forEach((item) => {
      row += `
      <tr>
        <td>
          <div class="wrap-image">
            <img class="image-document i-category" src="${item.img}" alt="Image product id ${item.id}">
            <button class="changeImage" data-id="${item.id}">
              <i class="fas fa-exchange-alt">
                <input type="file" name="changeImage" id="inputChangeImage"  style="display: none;" accept="image/*">
              </i>
            </button>
          </div>
        </td>
          <td contenteditable="true" class="nameCategory">${item.name}</td>
          <td class="action">
              <button class="button-icon remove" data-id='${item.id}' data-name='${item.name}' data-table='categories'>
                  <i class="far fa-trash-alt"></i>
              </button>
              <button class="button-icon save" data-id='${item.id}' data-name='${item.name}' data-table='categories'>
                  <i class="fas fa-save"></i>
              </button>
          </td>
      </tr>`;
    });
    $('.tmanager-category table tbody').innerHTML = row;
    TableEvent.Category.Initialize();
  },
  SaveImageToDB: function (id, image) {
    CategoryModel.saveImage(id, image);
    let currentPage = Number($('.page-category input.currentPage').value);
    PaginationController.LoadDataAtPage('category', currentPage);
  },
  SearchCategory: function (key) {
    key = key.toLowerCase();
    if (key != '' && key != undefined) {
      let result = [];
      CategoryModel.getAll().forEach((document) => {
        if (document.name.toLowerCase().match(new RegExp(`${key}.*`, 'g'))) {
          result.push(document);
        }
      });
      let totalPage = CategoryModel.getTotalPage(result);
      let currentPage = ($('.page-category input.currentPage').value = 1);
      let base = `    
      <ul>
          <li class="previous">&lt;</li>
          <li class="next">&gt;</li>
      </ul>`;
      $('.page-category ul').innerHTML = base;
      for (let i = 1; i <= totalPage; i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--ui-background)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-category ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      PaginationController.InitializeEventPaginationSearch(result, totalPage, 'category');
      localStorage.setItem('searchCategoryByName', JSON.stringify(result));
      let row = '';
      CategoryModel.getDocumentsByPage(1, result).forEach((item) => {
        row += `
      <tr>
      <td>
      <div class="wrap-image">
        <img class="image-document i-category" src="${item.img}" alt="Image product id ${item.id}">
        <button class="changeImage" data-id="${item.id}">
        <i class="fas fa-exchange-alt">
            <input type="file" name="changeImage" id="inputChangeImage"  style="display: none;" accept="image/*">
          </i>
        </button>
      </div>
    </td>
          <td contenteditable="true" class="nameCategory">${item.name}</td>
          <td class="action">
              <button class="button-icon remove" data-id='${item.id}' data-name='${item.name}' data-table='categories'>
                  <i class="far fa-trash-alt"></i>
              </button>
              <button class="button-icon save" data-id='${item.id}' data-name="${item.name}" data-table='categories'>
                  <i class="fas fa-save"></i>
              </button>
          </td>
      </tr>`;
      });
      $('.tmanager-category table tbody').innerHTML = row;
      TableEvent.Category.Initialize();
    } else {
      this.LoadCategory(Number($('.page-category input.currentPage').value));
      localStorage.setItem('searchCategoryByName', '');
    }
  },
};
