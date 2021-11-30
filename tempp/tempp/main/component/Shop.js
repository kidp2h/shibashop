function Shop() {
    return html`
    <div id="wrapper" class="overlay">
        <div id="product-intro">
            <a href="">
                <p>Product</p>
            </a>
        </div>

        <div id="content">
            <div id="menu">
                <div id="ter">
                    <i class="fas fa-sliders-h"></i>
                    <p>Filter</p>
                </div>

                <div id="chuyentren">

                </div>
                <div id="chocloc">
                    <select name="Select" id="slt">
                        <option value="Featured">Featured</option>
                        <option value="A-Z">Alphabetically, A-Z</option>
                        <option value="Z-A">Alphabetically, Z-A</option>
                        <option value="lowtohigh">Price, low to high</option>
                        <option value="hightolow">Price, high to low</option>
                    </select>
                </div>

            </div>
            <div id="product-gaoshop" class="overlay">
                <div id="filter" class="hide">
                    <i class="fas fa-times" id="close"></i>
                    <ul class="loc1" >
                        <h3>Product Categories</h3>
                        
                    <ul id="loccategories"></ul>
                    </ul>
                    <ul class="loc1">
                        <h3>By Price</h3>
                        <li>
                            <div class="slidecontainer">
                                <input type="range" min="1500" max="3000" value="2000" class="slider" id="myRange">
                                <div id="byPricein">
                                    <p>Price:</p>
                                    <span id="demo"></span>
                                </div>


                            </div>
                        </li>
                        <li>
                         <button type="submit" class="filter-submit" id="filterrange">Filter</button>
                        </li>

                    </ul>
                    <ul class="loc1">
                        <h3>By Title</h3>
                        <li>
                            <input type="text" name="" id="search" placeholder="Search for product title">
                        </li>
                        <li>
                            <button class="filter-submit" id="filtertitle">Filter</button>
                        </li>

                    </ul>
                    <ul class="loc1">
                        <h3>By Color</h3>
                        <div id="bycolor">
                            <li>
                                <div id="color1"></div>
                                <p>Black</p>
                             </a>
                            </li>
                            <li>
                                <div id="color2"></div>
                                <p>Black</p>
                            </li>
                            <li>                           
                                <div id="color3"> </div>
                                <p>Black</p>
                            </li>
                            <li>
                                <div id="color4"></div>
                                <p>Black</p>
                            </li>
                        </div>
                    </ul>
                    <ul class="loc1">

                       
                        <h3>Shipping & Delivery</h3>
                        
                        <li class="hotro">
                            <i class="fas fa-shipping-fast"></i>
                            <div>
                                <span class="tachchu">FREE SHIPPING
                                    </span>
                                <span>
                                        Free shipping for all US order
                                    </span>
                            </div>
                        </li>
                        <li class="hotro">
                            <i class="fas fa-headphones-alt"></i>
                            <div>
                                <span class="tachchu">SUPPORT 24/7
                                </span>
                                <span>
                                        We support 24 hours a day
                                    </span>
                            </div>
                        </li>
                        <li class="hotro">
                            <i class="fas fa-exchange-alt"></i>
                            <div class="tachchu"><span>
                                30 DAYS RETURN
                            </span>
                                <span>
                            You have 30 days to return
                        </span>
                            </div>
                        </li>

                    </ul>
                </div>
                <div class="center-product" id='trang1'>
                    <ul id="products">
                    </ul>
                </div>
            </div>


            <div id="chuyentrang">

            </div>

        </div>
        <div id="backtop" onclick="topFunction()">

            <i class="fas fa-arrow-up"></i>
        </div>
    </div>
    `
}