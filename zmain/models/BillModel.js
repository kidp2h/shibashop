const BillModel = {
  Initialize: function () {
    localStorage.setItem('bills', JSON.stringify(BILLS));
  },
  getAll: function () {
    return JSON.parse(localStorage.getItem('bills'));
  },
  UpdateAll: function (data) {
    localStorage.setItem('bills', JSON.stringify(data));
  },
  setStatusBill: function (id, status) {
    let collection = this.getAll();
    for (let bill of collection) {
      if (bill.id == id) {
        if (bill.status == status && status == 'COMPLETED')
          return { status: false, message: lang.billAccepted };
        else if (bill.status == status && status == 'CANCELLED')
          return { status: false, message: lang.billCancelled };
        else {
          bill.status = status;
          this.UpdateAll(collection);
          return { status: true, message: lang.setStatusSuccess };
        }
      }
    }
  },
  getBillById: function (id) {
    let collection = this.getAll();
    return collection.filter((bill) => bill.id == id)[0];
  },
  getTotalPage: function (document = this.getAll()) {
    return (totalPageUser =
      document.length % LIMIT == 0 ? document.length / LIMIT : document.length / LIMIT + 1);
  },
  getDocumentsByPage: function (page, document = this.getAll()) {
    return document.slice((page - 1) * LIMIT, page * LIMIT);
  },

  insertBill(bill) {
    let bills = this.getAll();
    bills.push(bill);
    this.UpdateAll(bills);
  },
};

if (BillModel.getAll() == null) BillModel.Initialize();
