function toast(type, icon, text) {
  let toast = document.createElement('div');
  let html = `                
  <div class="alert ${type}">
    <div class="alert-icon">
      <i class="fas ${icon}"></i>
    </div>
    <div class="alert-text">
      <span>${text}</span>
    </div>
    <div class="alert-close">
      <i class="fas fa-times-circle"></i>
    </div>
  </div>`;
  toast.innerHTML = html;
  toast.style.transition = 'all 1s';
  $('.groups-alert').prepend(toast);
  const removeToast = setTimeout(() => {
    $('.groups-alert').removeChild(toast);
  }, 5500);
  toast.onclick = function (e) {
    if (e.target.closest('.alert-close')) {
      toast.style.transform = 'translate(500px)';
      setTimeout(() => {
        $('.groups-alert').removeChild(toast);
      }, 1000);
      clearTimeout(removeToast);
    }
  };
}

function Admin_Main() {
  $$('.sidebar li:not(:first-child)').forEach((item) =>
    item.addEventListener('click', function () {
      $$('.sidebar li').forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
      $('.sidebar').classList.add('active');
      $('.main-content').classList.add('active');
      $('.toggle').classList.remove('open');
      $$('.pagination').forEach((item) => {
        item.classList.remove('hidden');
      });
    })
  );
  $('.toggle').onclick = () => {
    $('.sidebar').classList.toggle('active');
    $('.main-content').classList.toggle('active');
    $('.toggle').classList.toggle('open');
    $$('.pagination').forEach((item) => {
      item.classList.toggle('hidden');
    });
  };

  $('.tmanager-user').style.display = 'none';
  $('.tmanager-product').style.display = 'none';
  $('.tmanager-category').style.display = 'none';
  $('.tmanager-bill').style.display = 'none';
  $('.tmanager-revenue').style.display = 'none';

  //Render table when click change page
  $$('.manager').forEach((item) =>
    item.addEventListener('click', function () {
      $$('.tmanager').forEach((item) => (item.style.display = 'none'));
      if (!this.classList.contains('m-dashboard')) {
        document.getElementsByClassName('dashboard')[0].style.display = 'none';
      }
      if (this.classList.contains('m-dashboard')) {
        document.getElementById('r-dashboard').checked = true;
        document.getElementsByClassName('dashboard')[0].style.display = 'block';
      } else if (this.classList.contains('m-user')) {
        document.getElementsByClassName('tmanager-user')[0].style.display = 'block';
        document.getElementById('r-user').checked = true;
      } else if (this.classList.contains('m-product')) {
        document.getElementById('r-product').checked = true;
        document.getElementsByClassName('tmanager-product')[0].style.display = 'block';
      } else if (this.classList.contains('m-category')) {
        document.getElementById('r-category').checked = true;
        document.getElementsByClassName('tmanager-category')[0].style.display = 'block';
      } else if (this.classList.contains('m-bill')) {
        document.getElementById('r-bill').checked = true;
        document.getElementsByClassName('tmanager-bill')[0].style.display = 'block';
      } else {
        document.getElementById('r-revenue').checked = true;
        document.getElementsByClassName('tmanager-revenue')[0].style.display = 'block';
      }
    })
  );

  $('#close-modal').onclick = function () {
    $('.modal').style.transform = 'translateY(-600px)';
    $('#inputUploadImage').value = '';
    setTimeout(() => {
      $('.overlayAddImage').style.display = 'none';
    }, 300);
  };
  $('#close-detail').onclick = function () {
    $('.modal-seeDetail').style.transform = 'translateY(-600px)';
    setTimeout(() => {
      $('.overlayDetail').style.display = 'none';
    }, 300);
  };
}
