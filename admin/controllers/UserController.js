const UserController = {
  LoadUser: function (page = 1) {
    let row = '';
    UserModel.getDocumentsByPage(page).forEach((user) => {
      row += `
            <tr>
            <td class="username">${user.username}</td>
            <td class="fullname">${user.fullname}</td>
            <td class="address">${user.address}</td>
            <td class="phone">${user.phone}</td>
            <td class="isAdmin">                
              <label class="switch">
                  <input type="checkbox" ${user.isAdmin ? 'checked' : ''}>
                  <span class="sliderBtn round"></span>
              </label>
            </td>
            <td class="action">
              <button class="button-icon remove" data-id='${
                user.id
              }' data-table='users' style="visibility:${
        user.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
      }"> 
                <i class="far fa-trash-alt"></i>
              </button>
              <button class="button-icon save" data-id='${
                user.id
              }' data-table='users' style="visibility:${
        user.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
      }">
                <i class="fas fa-save"></i>
              </button>
            </td>
          </tr>`;
    });
    $('.tmanager-user table tbody').innerHTML = row;
    TableEvent.User.Initialize();
  },
  SearchUser: function (key) {
    key = key.toLowerCase();
    if (key != '' && key != undefined) {
      let result = [];
      UserModel.getAll().forEach((document) => {
        if (document.username.toLowerCase().match(new RegExp(`${key}.*`, 'g'))) {
          result.push(document);
        }
      });
      let totalPage = UserModel.getTotalPage(result);
      let currentPage = ($('.page-user input.currentPage').value = 1);
      let base = `    
      <ul>
        <li class="previous">&lt;</li>
        <li class="next">&gt;</li>
      </ul>`;
      $('.page-user ul').innerHTML = base;
      for (let i = 1; i <= totalPage; i++) {
        let page = '';
        if (i == currentPage) {
          page = `<li style="background-color:var(--purple)">${i}</li>`;
        } else {
          page = `<li>${i}</li>`;
        }
        $('.page-user ul li:last-child').insertAdjacentHTML('beforeBegin', page);
      }
      PaginationController.InitializeEventPaginationSearch(result, totalPage, 'user');
      //localStorage.setItem('searchUserByUsername', JSON.stringify(result));
      let row = '';
      UserModel.getDocumentsByPage(1, result).forEach((user) => {
        row += `
        <tr>
            <td class="username">${user.username}</td>
            <td class="fullname">${user.fullname}</td>
            <td class="address">${user.address}</td>
            <td class="phone">${user.phone}</td>
            <td class="isAdmin">                
                <label class="switch">
                    <input type="checkbox" ${user.isAdmin ? 'checked' : ''}>
                    <span class="sliderBtn round"></span>
                </label>
            </td>
            <td class="action">
                <button class="button-icon remove" data-id='${
                  user.id
                }' data-table='users' style="visibility:${
          user.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
        }">
                    <i class="far fa-trash-alt"></i>
                </button>
                <button class="button-icon save" data-id='${
                  user.id
                }' data-table='users' style="visibility:${
          user.username == JSON.parse(localStorage.getItem('username')) ? 'hidden' : 'visible'
        }">
                    <i class="fas fa-save"></i>
                </button>
            </td>
        </tr>`;
      });
      $('.tmanager-user table tbody').innerHTML = row;
      TableEvent.User.Initialize();
    } else {
      this.LoadUser(Number($('.page-user input.currentPage').value));
      //localStorage.setItem('searchUserByUsername', '');
      PaginationController.Update('user');
    }
  },
};
