const IndexController = {
    LoadStatistic: function () {
        $('.card-user .number').innerHTML = UserModel.getAll().length;
        $('.card-product .number').innerHTML = ProductModel.getAll().length;
        $('.card-category .number').innerHTML = CategoryModel.getAll().length;
        $('.card-bill .number').innerHTML = BillModel.getAll().length;
    },
    LoadUserTable: function () {
        let row = '';
        UserModel.getDocumentsByPage(1).forEach((user) => {
            row += `
        <tr>
          <td>${user.username}</td>
          <td>              
            <label class="switch">
              <input type="checkbox" ${user.isAdmin ? 'checked' : ''} disabled>
              <span class="sliderBtn round"></span>
            </label>
          </td>
        </tr>`;
        });
        $('.tuser tbody').innerHTML = row;
        this.LoadStatistic();
    },
    LoadCategoryTable: function () {
        let row = '';
        CategoryModel.getDocumentsByPage(1).forEach((item) => {
            row += `
      <tr>
          <td>${item.name}</td>
      </tr>`;
        });
        $('.tcategory tbody').innerHTML = row;
        this.LoadStatistic();
    },
    LoadProductTable: function () {
        let row = ``;
        ProductModel.getDocumentsByPage(1).forEach((product) => {
            row += `
            <tr>
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.price}</td>
              <td>${product.sale}</td>
              <td>${product.rate}</td>
            </tr>`;
        });
        $('.tproduct tbody').innerHTML = row;
        this.LoadStatistic();
    },
};
