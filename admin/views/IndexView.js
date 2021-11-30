const IndexView = {
  LoadStatistics : function(){
    IndexController.LoadStatistic();
  },
  LoadTable : {
    User: function(){
      IndexController.LoadUserTable();
    },
    Product: function(){
      IndexController.LoadProductTable();
    },
    Category: function(){
      IndexController.LoadCategoryTable();
    },
    All : function(){
      this.User();
      this.Product();
      this.Category();
    }
  },
  LoadIndex : function () {
    this.LoadStatistics();
    this.LoadTable.All();
  }
}