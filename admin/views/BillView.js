const BillView = {
  Load : function(){
    BillController.LoadBill();
    TableEvent.Bill.SeeDetail()
  }
}