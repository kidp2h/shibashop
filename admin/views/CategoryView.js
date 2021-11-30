const CategoryView = {
  Load : function(){
    CategoryController.LoadCategory();
    TableEvent.Category.Remove();
    TableEvent.Category.Save();
  },
  LoadEvent : function(){
    TableEvent.Category.Remove();
    TableEvent.Category.Save();
  },
  LoadData : function(page){
    CategoryController.LoadCategory(page);
  }
}