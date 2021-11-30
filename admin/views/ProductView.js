const ProductView = {
  Load : function(){
    ProductController.LoadProduct();
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
  },
  LoadSelectCategory : function(){
    ProductController.LoadCategorySelect();
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
  },
  LoadEvent(){
    TableEvent.Product.Remove();
    TableEvent.Product.Save();
    TableEvent.Product.HandlePrice();
    TableEvent.Product.AddImage();
  },
  LoadData(page){
    ProductController.LoadProduct(page);
  }
}