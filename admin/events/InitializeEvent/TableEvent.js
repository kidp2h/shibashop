const TableEvent = {
  User: {
    Save: function () {
      $$('.tmanager-user .save').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.User.Save(item);
        };
      });
    },
    Add: function () {
      $('.add-user').onclick = function () {
        HandleEvent.User.Add();
        TableEvent.User.Initialize();
      };
    },
    Remove: function () {
      $$('.tmanager-user .remove').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.User.Remove(item);
        };
      });
    },
    Search: function () {
      $('.tmanager-user .input-search').onkeyup = function () {
        HandleEvent.User.SearchUser(this.value);
      };
    },
    Initialize: function () {
      this.Save();
      this.Add();
      this.Remove();
      this.Search();
      this.Sort();
    },
    Sort: function () {
      $$('.tmanager-user .sort').forEach((ele) => {
        ele.onclick = function () {
          let type = ele.classList[1];
          switch (type) {
            case 'sortUsername':
              sortTable(0, 'user');
              break;
            case 'sortFullName':
              sortTable(1, 'user');
              break;
            case 'sortAddress':
              sortTable(2, 'user');
              break;
            case 'sortPhone':
              sortTable(3, 'user');
              break;
            case 'sortPermission':
              sortTable(4, 'user');
              break;
            default:
              return;
          }
          ele.querySelector('input').checked = true;
        };
      });
    },
  },
  Product: {
    Save: function () {
      $$('.tmanager-product .save').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.Product.Save(item);
        };
      });
    },
    Add: function () {
      $('.tmanager-product .add-product').onclick = function () {
        HandleEvent.Product.Add();
        TableEvent.Product.Initialize();
      };
    },
    Remove: function () {
      $$('.tmanager-product .remove').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.Product.Remove(item);
        };
      });
    },
    Search: function () {
      $('.tmanager-product .input-search').onkeyup = function () {
        HandleEvent.Product.SearchProduct(this.value);
      };
    },
    HandlePrice: function () {
      $$('.priceProduct').forEach((row) => {
        row.onkeypress = function (e) {
          if (e.which < 48 || e.which > 57) e.preventDefault();
        };
      });
      $$('.priceSaleProduct').forEach((row) => {
        row.onkeypress = function (e) {
          if (e.which < 48 || e.which > 57) e.preventDefault();
        };
      });
    },
    HandleRate: function () {
      $$('.input-number-decrement').forEach((el) => {
        el.onclick = function () {
          let tdRate = el.parentNode;
          let inputRate = tdRate.querySelector('input');
          inputRate.value <= 0 ? (inputRate.value = 0) : --inputRate.value;
        };
      });
      $$('.input-number-increment').forEach((el) => {
        el.onclick = function () {
          let tdRate = el.parentNode;
          let inputRate = tdRate.querySelector('input');
          inputRate.value >= 5 ? (inputRate.value = 5) : ++inputRate.value;
        };
      });
    },
    AddImage: function () {
      $$('.addImage').forEach((btn) => {
        btn.onclick = function () {
          HandleEvent.Product.AddImage(btn.dataset.id);
        };
      });
    },
    SaveImage: function () {
      $('.btn-saveImage').onclick = function () {
        HandleEvent.Product.SaveImage(this.dataset.id);
      };
    },
    UploadImage: function () {
      $('#inputUploadImage').addEventListener('change', HandleEvent.Product.UploadImage);
    },
    RemoveImage: function () {
      $$('.removeImage').forEach((btn) => {
        HandleEvent.Product.RemoveImage(btn);
      });
    },
    Sort: function () {
      $$('.tmanager-product .sort').forEach((ele) => {
        ele.onclick = function () {
          let type = ele.classList[1];
          switch (type) {
            case 'sortName':
              sortTable(1, 'product');
              break;
            case 'sortCategory':
              sortTableByCategoryProduct(2);
              break;
            case 'sortPrice':
              sortTable(3, 'product');
              break;
            case 'sortSale':
              sortTable(4, 'product');
              break;
            case 'sortRate':
              sortTable(5, 'product');
              break;
            default:
              return;
          }
          ele.querySelector('input').checked = true;
        };
      });
    },
    Initialize: function () {
      this.Save();
      this.Add();
      this.Remove();
      this.UploadImage();
      this.HandlePrice();
      this.AddImage();
      this.SaveImage();
      this.Search();
      this.HandleRate();
      this.Sort();
    },
  },
  Category: {
    Save: function () {
      $$('.tmanager-category .save').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.Category.Save(item);
        };
      });
    },
    Add: function () {
      $('.add-category').onclick = function () {
        HandleEvent.Category.Add();
        TableEvent.Category.Initialize();
      };
    },
    Remove: function () {
      $$('.tmanager-category .remove').forEach(function (item) {
        item.onclick = function () {
          HandleEvent.Category.Remove(item);
        };
      });
    },
    Search: function () {
      $('.tmanager-category .input-search').onkeyup = function () {
        HandleEvent.Category.SearchCategory(this.value);
      };
    },
    ChangeImage: function () {
      $$('.changeImage').forEach((btn) => {
        btn.onclick = function () {
          HandleEvent.Category.ChangeImage(btn, btn.dataset.id);
        };
      });
    },
    Sort: function () {
      $$('.tmanager-category .sort').forEach((ele) => {
        ele.onclick = function () {
          let type = ele.classList[1];
          switch (type) {
            case 'sortName':
              sortTable(1, 'category');
              break;
            default:
              return;
          }
          ele.querySelector('input').checked = true;
        };
      });
    },
    Initialize: function () {
      this.Save();
      this.Add();
      this.Remove();
      this.Search();
      this.ChangeImage();
      this.Sort();
    },
  },
  Bill: {
    SeeDetail: function () {
      $$('.see-detail').forEach((btn) => {
        btn.onclick = function () {
          HandleEvent.Bill.seeDetail(btn);
        };
      });
    },
    Accept: function () {
      $$('.accept').forEach((btn) => {
        btn.onclick = function () {
          HandleEvent.Bill.acceptBill(btn);
        };
      });
    },
    Cancel: function () {
      $$('.cancel').forEach((btn) => {
        btn.onclick = function () {
          HandleEvent.Bill.cancelBill(btn);
        };
      });
    },
    Initialize: function () {
      this.SeeDetail();
      this.Accept();
      this.Cancel();
      this.Sort();
    },
    Sort: function () {
      $$('.tmanager-bill .sort').forEach((ele) => {
        ele.onclick = function () {
          let type = ele.classList[1];
          switch (type) {
            case 'sortUsername':
              sortTable(0, 'bill');
              break;
            case 'sortSubtotal':
              sortTable(2, 'bill');
              break;
            case 'sortStatus':
              sortTable(3, 'bill');
              break;
            default:
              return;
          }
          ele.querySelector('input').checked = true;
        };
      });
    },
  },
  Revenue: {
    Filter: function () {
      $('.btn-filter-revenue').onclick = function () {
        HandleEvent.Revenue.Filter();
      };
    },
    Initialize: function () {
      this.Filter();
      this.Sort();
    },
    Sort: function () {
      $$('.tmanager-revenue .sort').forEach((ele) => {
        ele.onclick = function () {
          let type = ele.classList[1];
          switch (type) {
            case 'sortProductName':
              sortTable(0, 'revenue');
              break;
            case 'sortCategory':
              sortTable(1, 'revenue');
              break;
            case 'sortPrice':
              sortTable(2, 'revenue');
              break;
            case 'sortQTY':
              sortTable(3, 'revenue');
              break;
            case 'sortTotal':
              sortTable(4, 'revenue');
              break;
            default:
              return;
          }
          ele.querySelector('input').checked = true;
        };
      });
    },
  },
  Initialize: function () {
    this.User.Initialize();
    this.Product.Initialize();
    this.Category.Initialize();
    this.Bill.Initialize();
    this.Revenue.Initialize();
  },
  Add: function () {
    $('.button-add').onclick = HandleEvent.Add();
  },
};
