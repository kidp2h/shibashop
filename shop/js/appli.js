// Ẩn hiện filter
function InitEvent() {

    document.getElementById('ter').onclick = function() {
        var hidden = document.getElementById("filter");
        if (hidden.style.display == 'block') {
            hidden.style.display = 'none';
        } else {
            hidden.style.display = 'block';
            hidden.style.animation = 'fadeIn ease-in 0.5s';
        }
    }

    document.getElementById('close').onclick = function() {
            var hidden = document.getElementById("filter");
            if (hidden.style.display == 'block') {
                hidden.style.display = 'none';
            } else {
                hidden.style.animation = 'fadeIn ease-in 0.5s';
            }


    }
    $$('.loc1 h3').forEach(item =>{
        item.onclick =function (e){
            //console.log("clicked")
            item.parentElement.classList.toggle("active");
            
        }
    })

    // Sử dụng cho thanh range
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value
    slider.oninput = function() {
            output.innerHTML = this.value;
    }
    // Update the current slider value (each time you drag the slider handle)
    //chuyentrang


    // Nút backtop
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() { scrollFunction() };

    var sortfilter = document.getElementById('slt');
    sortfilter.addEventListener('input', filtersort);

    if($('#product-intro p'))
    $('#product-intro p').onclick = () => {
        renderShop.start()
    }
}

// Ẩn chuyển trang
function page_hide() {
    let page = document.getElementById('chuyentrang');
    page.style.display = 'none';
}

function page_block() {
    let page = document.getElementById('chuyentrang');
    page.style.display = 'flex';
}

// Ẩn filter
function filter_hide() {
    let filter = document.getElementById("filter");
    filter.style.display = 'none';
}

function scrollFunction() {
    var my_backtop = document.getElementById('backtop');
    if(my_backtop)
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        my_backtop.style.display = "block";
        my_backtop.style.animation = 'fadeIn ease-in 0.5s';
    } else {
        my_backtop.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}

// Cộng trừ
function AddEvent() {
    let listProductBtnAdd = $$('.product-quantity .btn-add')
    listProductBtnAdd.forEach(btn => {
        btn.onclick = function() {
            let quantity = Number.parseInt(
                btn.parentElement.querySelector('input').value) + 1;
            btn.parentElement.querySelector('input').value = quantity;
        }
    })
    let listProductBtntru = $$('.product-quantity .btn-tru')
    listProductBtntru.forEach(btn => {
        btn.onclick = function() {
            let quantity = Number.parseInt(btn.parentElement.querySelector('input').value);
            if (quantity > 1)
                btn.parentElement.querySelector('input').value = quantity - 1;
        }
    })
}
// 

// Hiệu ứng trái tim bé nhỏ
function AddHeart() {
    homeEvent.btnWish()
}
//hàm mới
// Tìm số trang
function getnumberpage(page){
    return (totalPageUser =
        page.length % LIMIT == 0
          ? page.length / LIMIT
          : page.length / LIMIT + 1);

};
// Phân trang 
function getpage (data, page) {
    return data.slice((page - 1) * LIMIT, page * LIMIT);
}
