const ProductView = {
  Load: function () {
    ProductController.LoadProduct();
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
    TableEvent.actionWithEnter();
  },
  LoadSelectCategory: function () {
    ProductController.LoadCategorySelect();
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
    TableEvent.actionWithEnter();
  },
  LoadEvent() {
    TableEvent.actionWithEnter();
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
    TableEvent.Product.HandlePrice();
    TableEvent.Product.AddImage();
  },
  LoadData(page) {
    ProductController.LoadProduct(page);
  },
};
