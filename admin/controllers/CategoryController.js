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
      let row = '';
      result.forEach((item) => {
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
      //PaginationController.LoadDataAtPage("category",Number($(".page-category input.currentPage").value))
    }
  },
};
