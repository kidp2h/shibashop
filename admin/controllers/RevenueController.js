const RevenueController = {
  getRevenue : function(){
    let category = CategoryModel.getAll()
    let bill = BillModel.getAll();
    return [category,bill]
  }
}