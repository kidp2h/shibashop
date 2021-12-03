const ProductModel = {
  Initialize: function (newData) {
    localStorage.setItem('products', JSON.stringify(PRODUCTS));
  },
  UpdateAll: function (data) {
    localStorage.setItem('products', JSON.stringify(data));
  },
  Remove: function (id) {
    let table = this.getAll();
    let result = table.filter((record) => record.id != id);
    this.UpdateAll(result);
    return result;
  },
  getProductById: function (id) {
    let collection = this.getAll();
    let result = collection.filter((product) => product.id == id);
    return result[0];
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem('products'));
  },
  Insert: function (document) {
    result = this.getAll();
    result.push(document);
    this.UpdateAll(result);
    return result;
  },
  updateProduct: function (id, product) {
    if (Validate.isLength(product.name, options.product.name)) {
      const collection = this.getAll();
      let found = false;
      for (let document of collection) {
        if (document.id == id) {
          found = true;
          if (
            product.name == document.name &&
            product.price == document.price &&
            product.sale == document.sale &&
            product.category == document.category &&
            product.rate == document.rate
          ) {
            return {
              status: false,
              message: lang.nothingChangeDocument,
            };
          } else {
            // modify but  modify another not name product
            if (product.name != document.name) {
              if (!isExistRecord('products', product.name)) {
                document.id = id;
                document.name = product.name;
                document.price = product.price;
                document.sale = product.sale;
                document.category = product.category;
                document.rate = product.rate;
                this.UpdateAll(collection);
                return {
                  status: true,
                  message: lang.updateSuccess,
                };
              } else {
                return {
                  status: false,
                  message: lang.existDocument,
                };
              }
            } else {
              document.id = id;
              document.name = product.name;
              document.price = product.price;
              document.sale = product.sale;
              document.category = product.category;
              document.rate = product.rate;
              this.UpdateAll(collection);
              return {
                status: true,
                message: lang.updateSuccess,
              };
            }
          }
        }
      }

      if (found == false) {
        if (isExistRecord('products', product.name))
          return { status: false, message: lang.existDocument };
        product.imgList = ['./images/products/product.jpg'];
        this.Insert({ id: id, ...product });
        return { status: true, message: lang.createSuccess };
      }
    } else return { status: true, message: lang.nameProductNotValid };
  },
  getTotalPage: function () {
    return (totalPageUser =
      this.getAll().length % LIMIT == 0
        ? this.getAll().length / LIMIT
        : this.getAll().length / LIMIT + 1);
  },
  getDocumentsByPage: function (page) {
    return sortObjectByField('name', this.getAll().slice((page - 1) * LIMIT, page * LIMIT), 'asc');
    //return this.getAll().slice((page - 1) * LIMIT, page * LIMIT);
  },
  saveImage: function (id, arrayImage) {
    let collection = this.getAll();
    collection.forEach((document) => {
      if (document.id == id) {
        document.imgList = arrayImage;
        return;
      }
    });
    this.UpdateAll(collection);
  },
  updateCategoryProduct: function (current, newName) {
    let collection = this.getAll();
    collection.forEach((document) => {
      if (document.category == current) document.category = newName;
    });
    this.UpdateAll(collection);
  },

  updateWish: function (id, wish) {
    const collection = this.getAll();
    for (let document of collection) {
      if (document.id == id) {
        document.wish = wish;
      }
    }
    this.UpdateAll(collection);
  },

  getTotalPage_Rate: function (LIMIT) {
    return (totalPageUser =
      this.getAll().filter((product) => product.rate == 5).length % LIMIT == 0
        ? this.getAll().filter((product) => product.rate == 5).length / LIMIT
        : this.getAll().filter((product) => product.rate == 5).length / LIMIT + 1);
  },

  getDocumentsByPage_Rate: function (page, LIMIT) {
    return this.getAll()
      .filter((product) => product.rate == 5)
      .slice((page - 1) * LIMIT, page * LIMIT);
  },

  getDocumentSortByField: function (field, data, type = 'asc') {
    return type == 'asc'
      ? data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0))
      : data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0)).reverse();
  },
  getProductByCategory(category = '0') {
    if (category == 0) return this.getAll();
    return this.getAll().filter((product) => product.category == category);
  },
};

if (ProductModel.getAll() == null) ProductModel.Initialize();
