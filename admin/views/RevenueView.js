const RevenueView = {
  Load: function () {
    let [categories, bills] = RevenueController.getRevenue();
    let category = $('#select-search-category').value;
    let products = ProductModel.getProductByCategory(category);
    let rowCategory = `<option value="0" selected>All</option>`;
    categories.forEach(
      (category) => (rowCategory += `<option value="${category.name}">${category.name}</option>`)
    );
    $('.search-category select').innerHTML = rowCategory;
    let idsProduct = [],
      billFilter = [];

    bills.forEach((bill) => {
      bill.products.forEach((product) => {
        idsProduct.push(product.id);
      });
    });

    let idsUnique = [...new Set(idsProduct)];
    idsUnique.forEach((idProduct) => {
      let qty = 0,
        currentProduct,
        currentBill;
      bills.forEach((bill) => {
        bill.products.forEach((product) => {
          if (product.id == idProduct) {
            currentProduct = product;
            qty += product.quantity;
            currentBill = bill;
          }
        });
      });
      billFilter.push({
        product: currentProduct,
        qty,
        created_at: currentBill.created_at,
        status: currentBill.status,
      });
    });
    let row = '',
      totalPrice = 0,
      totalAmountSold = 0;
    billFilter.forEach((bill) => {
      if (bill.status != '') {
        row += `<tr>
          <td>${bill.product.name}</td>
          <td>${bill.product.category}</td>
          <td>${formatNumber(bill.product.sale)}</td>
          <td>${bill.qty}</td>
          <td>${formatNumber(bill.product.sale * bill.qty)}</td>
        </tr>`;
        totalAmountSold += bill.qty;
        totalPrice += bill.product.sale * bill.qty;
      }
    });
    row += `<tr>
        <td></td>
        <td></td>
        <td></td>
        <td><b>Amount Sold</b> = <b style="color:var(--ui-background)">${totalAmountSold}</b></td>
        <td><b>Sub total</b> = <b style="color:var(--red)">${formatNumber(totalPrice)}</b></td>
      </tr>`;
    $('.tmanager-revenue tbody').innerHTML = row;
  },
  renderProductToRevenueView: function (data) {},
  renderSubtotalToView: function (data) {
    data.rowProduct += `<tr>
      <td></td>
      <td></td>
      <td></td>
      <td><b>Amount Sold</b> = <b style="color:var(--ui-background)">${
        data.totalAmountSold
      }</b></td>
      <td><b>Sub total</b> = <b style="color:var(--red)">${formatNumber(data.subtotal)}</b></td>
    </tr>`;
    $('.tmanager-revenue tbody').innerHTML = data.rowProduct;
  },
};
