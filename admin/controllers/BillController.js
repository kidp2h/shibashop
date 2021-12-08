const BillController = {
  LoadBill: function (page = 1) {
    let row = '';
    BillModel.getDocumentsByPage(page).forEach((bill) => {
      row += `<tr>          
      <td>${bill.username}</td>
      <td class="action">
        <button class="button-icon see-detail" data-id="${bill.id}">
          <span>Xem chi tiết</span>
        </button>
      </td>
      <td>${
        new Date(bill.created_at).toLocaleDateString('en-GB') +
        ' ' +
        new Date(bill.created_at).toLocaleTimeString()
      }</td>
      <td>${formatNumber(bill.subtotal)}</td>
      <td class="status-bill">
      ${
        bill.status == 'PENDING'
          ? `<div class="lds-dual-ring"></div> `
          : bill.status == 'COMPLETED'
          ? `<i class="fas fa-check-circle completed"></i>`
          : `<i class="fas fa-times-circle cancelled"></i>`
      }
      </td>
      <td class="action">
        <button class="button-icon accept" data-id="${bill.id}">
          <i class="fas fa-check-circle"></i>
        </button>
        <button class="button-icon cancel" data-id="${bill.id}">
          <i class="fas fa-times-circle"></i>
        </button>
      </td></tr>  `;
    });
    $('.tmanager-bill table tbody').innerHTML = row;
    TableEvent.Bill.Initialize();
  },
  setStatusBill(id, status) {
    let result = BillModel.setStatusBill(id, status);
    RevenueView.Load();
    HandleEvent.SlideTdTable();
    toast(result.message.type, icon[result.message.type], result.message.text);
  },
  getBillById(id) {
    return BillModel.getBillById(id);
  },
  searchBill(from, to, key) {
    key = key.toLowerCase();
    let result = [];
    BillModel.getAll().forEach((document) => {
      if (
        document.username.toLowerCase().match(new RegExp(`${key}.*`, 'g')) &&
        from <= document.created_at &&
        document.created_at <= to
      ) {
        result.push(document);
      }
    });
    let totalPage = BillModel.getTotalPage(result);
    let currentPage = ($('.page-bill input.currentPage').value = 1);
    let base = `    
      <ul>
          <li class="previous">&lt;</li>
          <li class="next">&gt;</li>
      </ul>`;
    $('.page-bill ul').innerHTML = base;
    for (let i = 1; i <= totalPage; i++) {
      let page = '';
      if (i == currentPage) {
        page = `<li style="background-color:var(--ui-background)">${i}</li>`;
      } else {
        page = `<li>${i}</li>`;
      }
      $('.page-bill ul li:last-child').insertAdjacentHTML('beforeBegin', page);
    }
    PaginationController.InitializeEventPaginationSearch(result, totalPage, 'bill');
    localStorage.setItem('searchBillByUsername', JSON.stringify(result));
    let row = '';
    BillModel.getDocumentsByPage(1, result).forEach((bill) => {
      row += `<tr>          
        <td>${bill.username}</td>
        <td class="action">
          <button class="button-icon see-detail" data-id="${bill.id}">
            <span>Xem chi tiết</span>
          </button>
        </td>
        <td>${
          new Date(bill.created_at).toLocaleDateString('en-GB') +
          ' ' +
          new Date(bill.created_at).toLocaleTimeString()
        }</td>
        <td>${formatNumber(bill.subtotal)}</td>
        <td class="status-bill">
        ${
          bill.status == 'PENDING'
            ? `<div class="lds-dual-ring"></div> `
            : bill.status == 'COMPLETED'
            ? `<i class="fas fa-check-circle completed"></i>`
            : `<i class="fas fa-times-circle cancelled"></i>`
        }
        </td>
        <td class="action">
          <button class="button-icon accept" data-id="${bill.id}">
            <i class="fas fa-check-circle"></i>
          </button>
          <button class="button-icon cancel" data-id="${bill.id}">
            <i class="fas fa-times-circle"></i>
          </button>
        </td></tr>  `;
    });
    $('.tmanager-bill table tbody').innerHTML = row;
    TableEvent.Bill.Initialize();
  },
};
