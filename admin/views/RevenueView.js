const RevenueView = {
  Load : function(){
    let [categories,bills] = RevenueController.getRevenue();
    let products = ProductController.getAll();
    let rowCategory = `<option value="0" selected>All</option>`
    let rowProduct = ""
    categories.forEach(category =>  rowCategory += `<option value="${category.name}">${category.name}</option>`);
    $(".search-category select").innerHTML = rowCategory;
    let data = {
      rowProduct :``,
      subtotal : 0,
      bills : bills,
    }
    products.forEach(item => {
      let amountSold = 0;
      bills.forEach(bill => {
        bill.products.forEach(product => {
          if(product.id == item.id){
            amountSold+=product.quantity
          }
        })
      })
      data.subtotal+= amountSold * item.price 
      data.rowProduct +=
      `<tr>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${formatNumber(item.price)}</td>
        <td>${amountSold}</td>
        <td>${formatNumber(amountSold * item.price)}</td>
      </tr>`

    });
    this.renderSubtotalToView(data);
    //$(".tmanager-revenue tbody").innerHTML = data.rowProduct;
  },
  renderProductToRevenueView : function (data) { 

  },
  renderSubtotalToView : function(data){
    data.rowProduct +=
    `<tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td><b>Sub total</b> = <b style="color:var(--red)">${formatNumber(data.subtotal)}</b></td>
    </tr>`
    $(".tmanager-revenue tbody").innerHTML = data.rowProduct;
  },
}
