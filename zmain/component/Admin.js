function Admin() {
  return html`
    <div id="admin">
      <div class="overlay overlayAddImage">
        <div class="modal modal-addImage">
          <div class="modal-header">
            <span>Thêm ảnh</span>
            <div id="close-modal" class="close-modal">X</div>
          </div>
          <div class="modal-main">
            <div class="image-show"></div>
          </div>
          <div class="modal-action">
            <button class="btn-addImage">
              <i class="fas fa-plus">
                <input
                  type="file"
                  name="uploadImage"
                  id="inputUploadImage"
                  style="display: none"
                  accept="image/*"
                />
              </i>
            </button>
            <button class="btn-saveImage">
              <i class="fas fa-save"></i>
            </button>
          </div>
        </div>
        <!-- <div class="modal modal-seeDetail">
        <div class="modal-header">
            <span>Chi tiết</span>
            <div id="close-modal">X</div>
        </div>
        <div class="modal-main">
            <div class="product-show"></div>
        </div>
        </div> -->
      </div>
      <div class="overlay overlayDetail">
        <div class="modal modal-seeDetail">
          <div class="modal-header">
            <span>Chi tiết</span>
            <div id="close-detail" class="close-modal">X</div>
          </div>
          <div class="modal-main" id="modal-product">
            <div class="product-show">
              <div class="t-wrap">
                <table class="content-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="sidebar active">
          <ul>
            <li>
              <a class="item" href="#home">
                <img
                  src="./images/logo.svg"
                  alt="Kiwi standing on oval"
                  width="60px"
                  height="60px"
                  style="object-fit: fill"
                />
                <span class="title">Shibaaa</span>
              </a>
            </li>
            <li class="manager active m-dashboard">
              <a class="item">
                <i class="fas fa-chart-line"></i>
                <span class="title">Dashboard</span>
              </a>
            </li>
            <li class="manager m-user">
              <a class="item">
                <i class="fas fa-user-friends"></i>
                <span class="title">User</span>
              </a>
            </li>
            <li class="manager m-product">
              <a class="item">
                <i class="fas fa-cubes"></i>
                <span class="title">Product</span>
              </a>
            </li>
            <li class="manager m-category">
              <a class="item">
                <i class="fas fa-receipt"></i>
                <span class="title">Category</span>
              </a>
            </li>

            <li class="manager m-bill">
              <a class="item">
                <i class="fas fa-file-invoice-dollar"></i>
                <span class="title">Bill</span>
              </a>
            </li>
            <li class="manager m-revenue">
              <a class="item">
                <i class="fas fa-signal"></i>
                <span class="title">Revenue</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="main-content active">
          <div class="topbar">
            <div class="toggle">
              <!-- <i class="fas fa-bars"></i> -->
              <div class="toggle__burger"></div>
            </div>
            <div class="user">
              <i style="font-size: 1.5em;" class="fas fa-door-open"></i>
            </div>
          </div>
          <input type="radio" id="r-dashboard" name="type" value="dashboard" checked />
          <input type="radio" id="r-user" name="type" value="user" />
          <input type="radio" id="r-product" name="type" value="product" />
          <input type="radio" id="r-category" name="type" value="category" />
          <input type="radio" id="r-bill" name="type" value="bill" />
          <input type="radio" id="r-revenue" name="type" value="revenue" />
          <div class="dashboard show">
            <div class="card-statistic">
              <div class="card card-user">
                <div class="card-wrap">
                  <div class="number">0</div>
                  <div class="card-name">Account</div>
                </div>
                <div class="icon-card">
                  <i class="fas fa-user-friends ui-bg"></i>
                </div>
              </div>
              <div class="card card-product">
                <div class="card-wrap">
                  <div class="number">0</div>
                  <div class="card-name">Product</div>
                </div>
                <div class="icon-card">
                  <i class="fas fa-cubes purple"></i>
                </div>
              </div>
              <div class="card card-category">
                <div class="card-wrap">
                  <div class="number">0</div>
                  <div class="card-name">Category</div>
                </div>
                <div class="icon-card">
                  <i class="fas fa-receipt green"></i>
                </div>
              </div>
              <div class="card card-bill">
                <div class="card-wrap">
                  <div class="number">0</div>
                  <div class="card-name">Bill</div>
                </div>
                <div class="icon-card">
                  <i class="fas fa-file-invoice-dollar red"></i>
                </div>
              </div>
            </div>
            <div class="details">
              <div class="wrap-table">
                <table class="content-table tuser">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>IsAdmin</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>

              <div class="wrap-table">
                <table class="content-table tproduct">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price ($)</th>
                      <th>Price Sale ($)</th>
                      <th>Rate</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>

              <div class="wrap-table">
                <table class="content-table tcategory">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="tmanager tmanager-user">
            <div class="box-filter">
              <div class="table-search">
                <i class="fas fa-search ic-input-search"></i>
                <input class="input-search" type="text" placeholder="Search by name user" />
              </div>
            </div>
            <div class="t-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>IsAdmin</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="button-add add-user"><i class="fas fa-plus"></i></div>
            <div class="pagination page-user" style="float: right">
              <input type="hidden" class="currentPage" value="1" />
              <ul>
                <li class="previous">&lt;</li>
                <li class="next">&gt;</li>
              </ul>
            </div>
          </div>
          <div class="tmanager tmanager-product">
            <div class="box-filter">
              <div class="table-search">
                <i class="fas fa-search ic-input-search"></i>
                <input class="input-search" type="text" placeholder="Search by name product" />
              </div>
            </div>
            <div class="t-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price ($)</th>
                    <th>Price Sale ($)</th>
                    <th>Rate</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>

            <div class="button-add add-product"><i class="fas fa-plus"></i></div>
            <div class="pagination page-product" style="float: right">
              <input type="hidden" class="currentPage" value="1" />
              <ul>
                <li class="previous">&lt;</li>
                <li class="next">&gt;</li>
              </ul>
            </div>
          </div>
          <div class="tmanager tmanager-category">
            <div class="box-filter">
              <div class="table-search">
                <i class="fas fa-search ic-input-search"></i>
                <input class="input-search" type="text" placeholder="Search by name category" />
              </div>
            </div>
            <div class="t-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div class="button-add add-category"><i class="fas fa-plus"></i></div>
            <div class="pagination page-category" style="float: right">
              <input type="hidden" class="currentPage" value="1" />
              <ul>
                <li class="previous">&lt;</li>
                <li class="next">&gt;</li>
              </ul>
            </div>
          </div>
          <div class="tmanager tmanager-bill">
            <div class="box-filter">
              <div class="table-search">
                <i class="fas fa-search ic-input-search"></i>
                <input class="input-search" type="text" placeholder="Search bill by username" />
              </div>
            </div>
            <div class="t-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Products</th>
                    <th>Subtotal</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr>
                    <td>npt</td>
                    <td class="action">
                    <button class="button-icon see-detail">
                        <span>Xem chi tiết</span>
                    </button>
                    </td>
                    <td>1.182.232.232.233</td>
                    <td class="status-bill">
                    <i class="fas fa-check-circle completed"></i>
                    <i class="fas fa-times-circle cancelled"></i>
                    <div class="lds-dual-ring"></div>
                    </td>
                    <td class="action">
                    <button class="button-icon accept">
                        <i class="fas fa-check-circle"></i>
                    </button>
                    <button class="button-icon cancel">
                        <i class="fas fa-times-circle"></i>
                    </button>
                    </td>
                </tr> -->
                </tbody>
              </table>
            </div>
            <div class="button-add add-category" style="visibility: hidden;">
              <i class="fas fa-plus"></i>
            </div>
            <div class="pagination page-bill" style="float: right">
              <input type="hidden" class="currentPage" value="1" />
              <ul>
                <li class="previous">&lt;</li>
                <li class="next">&gt;</li>
              </ul>
            </div>
          </div>
          <div class="tmanager tmanager-revenue">
            <div class="box-filter">
              <div class="input-date">
                <span style="font-size:1.5em;margin-left:5px;">From</span>
                <div class="table-search">
                  <i class="fas fa-calendar-alt ic-input-search"></i>
                  <input
                    class="input-search input-from"
                    type="datetime-local"
                    style="margin-bottom: 0px;"
                  />
                </div>
                <span style="font-size:1.5em;margin-left:5px;">To</span>
                <div class="table-search">
                  <i class="fas fa-calendar-alt ic-input-search"></i>
                  <input class="input-search input-to" type="datetime-local" />
                </div>
                <div><button class="btn-filter-revenue">Filter</button></div>
              </div>

              <div class="table-search search-category">
                <select name="search-category" id="select-search-category"></select>
              </div>
            </div>
            <div class="t-wrap">
              <table class="content-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Quantity Sold</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div class="groups-alert"></div>
        </div>
      </div>
    </div>
  `;
}
