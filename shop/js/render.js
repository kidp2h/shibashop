// Lấy dữ liệu ra
function productItems(item){
    return `
    <li>
        <div class="product-items"></div>
        <div class="product-top">
            <a href="#product-${item.id}" class="product-thumb">
                <img src="${item.imgList[0]}" alt="ảnh 1" width="200px" height="200px">
            </a>
           
            <!-- //Mua ngay -->
            <div class="buy-now">
            <div class="product-quantity">
                <button class="btn btn-tru"> - </button>
                <input type="text" min="1" max="99" value="1">
                <button class="btn btn-add"> + </button>
            </div>
                <div class="addtocart">
                    <p>ADD TO CART</p>
                    <i id="cart-icon" class="fas fa-shopping-cart"></i>

                </div>
            </div>
            <div class="icon-heart ${item.wish == 1 && 'active'}" data-index="${item.id}" data-wish="${item.wish}">
                    <i class="far fa-heart"></i>
                    <i class="fas fa-heart"></i>
            </div>
        </div>
        <div class="product-info ">
            <a href="" class="product-cat">${item.category}</a>
            <a href="" class="product-name">${item.name}</a>
            <div class="price">
            <div class="product-price">${item.price}</div>
            <div class="sale-price">${item.sale}</div>
            </div>
        </div>
    </li>             
    `
}
//Lấy dữ liệu cho trang đầu tiên trong local và in ra màn hình
function renderData (x=1) {
    var htmls = ProductModel.getDocumentsByPage(x).map((item) => {
        return productItems(item);
    })
    if(!$('#products'))
    $(".center-product").innerHTML = ` <ul id="products"> </ul>`;
    document.getElementById('products').innerHTML = htmls.join('');
    AddEvent();
    AddHeart();
}
// lấy dữ liệu ra trong mảng dữ liệu và in ra màn hình
function renData (data,x) {
    var htmls = getpage(data,x).map((item) => {
        return productItems(item);
    })
    document.getElementById('products').innerHTML = htmls.join('');
    AddEvent();
    AddHeart();
}
// Hàm lọc sản phẩm 
function filtersort() {
    var sanpham;  // khởi tạo biến sản phẩm
    var sortfilter = document.getElementById('slt'); // lấy id của chọc lọc
    var valuefilter = sortfilter.value; // lấy giá trị
    let sanphamtheoloai = JSON.parse(localStorage.getItem("sanphamtheoloai"));// lấy giá trị từ local ra
    let sanphamtheogia = JSON.parse(localStorage.getItem("sanphamtheogia"));
    let sanphamtheotimkiem = JSON.parse(localStorage.getItem("sanphamtheotimkiem"));
    //console.log(sanphamtheoloai);
    console.log(sanphamtheogia);
    if(sanphamtheoloai){ 
        sanpham = sanphamtheoloai; 
    }else if(sanphamtheogia){
        sanpham=sanphamtheogia;
    }else if(sanphamtheotimkiem){
        sanpham = sanphamtheotimkiem;
    }
    else {
        sanpham = ProductModel.getAll();
    }
    var productSort = sanpham.sort(function(a, b) {
        //Sếp xắp theo bảng chữ cái A_Z
        if (valuefilter === "A-Z") {
            return a.name.localeCompare(b.name);
        //Sếp xắp theo bảng chữ cái Z_A
        } else if (valuefilter === "Z-A") {
            return b.name.localeCompare(a.name);
        //Sếp xắp theo giá từ thấp đến cao
        } else if (valuefilter === "lowtohigh") {
            return a.sale - b.sale;
        //Sếp xắp theo giá từ cao đến thấp
        } else if (valuefilter === "hightolow") {
            return b.sale - a.sale;
        }
       
    })
    if (valuefilter =="All"){
        let htmls = getpage(productSort,1).map(item =>{     //sử dụng hàm getpade để in ra sản phẩm trang đầu tiên
            return productItems(item);
        })
        
    }
    if(valuefilter=="Featured"){   // Sản phẩm nổi bât
       productSort = sanpham.filter(item=>{ // Filter trong mảng sản phẩm
            return item.rate == 5; // Sản phẩm nổi bật có rate bằng 5
            
        });
    }
    //console.log(productSort);
    let htmls = getpage(productSort,1).map(item =>{     //sử dụng hàm getpade để in ra sản phẩm trang đầu tiên
        return productItems(item);
    })
    document.getElementById("products").innerHTML = htmls.join(""); //in ra màn hình
    //console.log(productSort.length); // lấy độ dài của mảng productsSort
    taotrang1(productSort,Number.parseInt(getnumberpage(productSort)));// hàm in theo trang
    AddEvent();
    AddHeart();
    filter_hide(); 
}

// lÀM CATEGORIES
// INR RA DANH SÁCH THỂ LOẠI CỦA SẢN PHẨM
function rendertheloai(){
    
    var htmls = CATEGORIES.map(items =>{
        var cout =0;
        let listProducts = ProductModel.getAll();
        listProducts.forEach(value =>{
            if(items.name.toUpperCase() == value.category.toUpperCase()){
                cout++;
            }
        });
        return `
        <li>
            <a href="#shop-${items.name.toLowerCase()}" class="locsanpham ${items.name}" ><p>${items.name} </p><div class = "soluong">(${cout})</div></a>
        </li>
       `
    })
    document.getElementById('loccategories').innerHTML =htmls.join("");
    addpagecategories()
}
    
function addpagecategories() {
    $$('.locsanpham ').forEach(element => {
        element.onclick = function() {
            localStorage.setItem("sanphamtheogia",JSON.stringify(""));
            localStorage.setItem("sanphamtheotimkiem",JSON.stringify(""));
            $("#slt").value = "All"; // mặc định ngay select
            let sanphamtheoloai =[]; // tạo mảng sản phẩm các loại
            var value= element.textContent; // lấy giá trị của element
            let s= value.split(" "); // sau đó cắt chuỗi 
            let a=s[0]; // lấy a bằng s[0]
            
            var filterdata =  ProductModel.getAll().filter(item =>{
                return item.category.toUpperCase() == a.toUpperCase();
            })
            filterdata.map(item =>{
                sanphamtheoloai.push(item); //thêm sản phẩm vào mảng local
               
            });
            let htmlcategories = getpage(filterdata,1).map(item =>{
           
                return productItems(item);
            })
            localStorage.setItem("sanphamtheoloai",JSON.stringify(sanphamtheoloai)); // đưa lên localStorage
            document.getElementById("products").innerHTML = htmlcategories.join(""); // in ra đầu tiên
            taotrang1(filterdata,Number.parseInt(getnumberpage(filterdata)));// tạo ra các tiếp theo
            AddEvent();
            AddHeart();
            filter_hide();
        }
    });
    document.getElementById("productall").onclick = function(){
        renderData (x=1);
        taotrang();
        AddEvent();
        AddHeart();
        filter_hide();
    }
}

function renderproducts() {
    document.getElementById('filterrange').onclick = function() {
        localStorage.setItem("sanphamtheotimkiem",JSON.stringify(""));
        localStorage.setItem("sanphamtheoloai",JSON.stringify(""));
        let sanphamtheogia =[] // sự kiện onclick
        let pricevalue = Number.parseInt(document.getElementById("myRange").value); // lấy giá trị của price range
        //console.log(pricevalue);
        const filterdata = ProductModel.getAll().filter(value => {
            return value.price<pricevalue;
        });
        filterdata.map(item=>{
            sanphamtheogia.push(item);
        })
        if(filterdata.length ==0){
            console.log("dô");
         $(".center-product").innerHTML = productEmty();
         filter_hide();
         page_hide()
         
         $('#return').onclick = function(){
            renderData (x=1);
            taotrang();
            AddEvent();
            AddHeart();
            filter_hide();
            page_block();
         }
         return;
        }
        $(".center-product").innerHTML =` <ul id="products"> </ul>`;
        let htmlsprice = getpage(filterdata,1).map(item =>{
           
            return productItems(item);
        })
        localStorage.setItem("sanphamtheogia",JSON.stringify(sanphamtheogia)); 
        //console.log(filterdata.length);
        document.getElementById("products").innerHTML = htmlsprice.join("");
        taotrang1(filterdata,Number.parseInt(getnumberpage(filterdata)));
        AddEvent();
        AddHeart();
        filter_hide(); 
        }
        // hàm lọc theo title (Nhập cái cần tìm)
    document.getElementById('filtertitle').onclick = function() {
        localStorage.setItem("sanphamtheogia",JSON.stringify(""));
        localStorage.setItem("sanphamtheoloai",JSON.stringify(""));  // Sự kiện onclick ở button fillter title
        let sanphamtheotimkiem= [];
        let title = document.getElementById('search').value; // lấy giá trị trong div.search
        const filterdata = ProductModel.getAll().filter(value => {   // Chạy hàm lọc
            return value.name.toUpperCase().includes(title.toUpperCase());
        })
        filterdata.map(item =>{
            sanphamtheotimkiem.push(item);
        })
        localStorage.setItem("sanphamtheotimkiem",JSON.stringify(sanphamtheotimkiem));
        if(filterdata.length ==0){
            console.log("dô");
         $(".center-product").innerHTML = productEmty();
         filter_hide();
         page_hide()
         $('#return').onclick = function(){
            renderData (x=1);
            taotrang();
            AddEvent();
            AddHeart();
            filter_hide();
            page_block();
         }
         return;
        }
        $(".center-product").innerHTML = ` <ul id="products"> </ul>`;
        let htmltilte = getpage(filterdata,1).map(item =>{    // sử dụng hàm getpage bên appli.js
            return productItems(item);
        })
        //console.log(filterdata.length);
        
       
        document.getElementById("products").innerHTML = htmltilte.join(""); // in dữ liệu ra màn hình
        taotrang1(filterdata,Number.parseInt(getnumberpage(filterdata)));
        console.log(getnumberpage(filterdata)); // tạo ra 
        AddEvent(); // sự kiện công trừ cho sản phẩm
        AddHeart(); // sự kiện thêm yêu thích cho sản phẩm
        filter_hide();  // hàm ẩn filter
        page_block();

    }

}
// tạo số trang trong localStorange
function taotrang() {
    let pageNumber = ProductModel.getTotalPage();

    var s = `<p class="trangn active" >${1}</p>`;
    for (var i = 2; i <= pageNumber; i++) {
        s += `<p class="trangn" >${i}</p>`;
    }

    document.getElementById("chuyentrang").innerHTML = s;
    addpage();
}
// hàm in tất cả các sản phẩm theo trang 
function addpage() {
    $$('.trangn').forEach(element => {
        element.onclick = function() {
            $('.trangn.active').classList.remove('active')
            element.classList.add('active')
            var x = Number(element.textContent);
            renderData(x);
        }
    });
}
// hàm in ra số trang ở dưới div.trangn in các sản phẩm theo mảng lọc
function taotrang1(data,x) {
    let pageNumber = x;
    var s = `<p class="trangn active" >${1}</p>`;
    for (var i = 2; i <= pageNumber; i++) {
        s += `<p class="trangn" >${i}</p>`;
    }
   if(x>1)
   {document.getElementById("chuyentrang").innerHTML = s;}
   else{
    document.getElementById("chuyentrang").innerHTML = "";
   }
    
    addpage1(data); 
}
// hàm tạo trang từ mảng
function addpage1(data) {
    $$('.trangn').forEach(element => {
        element.onclick = function() {
            $('.trangn.active').classList.remove('active')
            element.classList.add('active')
            var x = Number(element.textContent);
           renData(data,x);
        }
    });
}
// load trang rồi sử dụng các hàm
// window.onload = () => {
//     localStorage.setItem("sanphamtheotimkiem",JSON.stringify(""));
//     localStorage.setItem("sanphamtheogia",JSON.stringify(""));
//     localStorage.setItem("sanphamtheoloai",JSON.stringify(""));
//     rendertheloai();
//     renderData();
//     renderproducts();
//     taotrang();
//     InitEvent()
// }

function productEmty(){
    return ` <div id="empty">
    <i class="far fa-sad-tear"></i>
    <p>Sản phẩm không tồn tại</p>
    <div id="return">Return Shop</div>
</div>`
}