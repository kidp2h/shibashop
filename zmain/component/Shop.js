function Shop() {
    return html`
    <div id="shop">
        <div id="wrapper" class="overlay">
            <div id="product-intro">
                <p>Product</p>
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
                            <option value="All">All</option>
                            <option value="Featured">Featured</option>
                            <option value="A-Z">Alphabetically, A-Z</option>
                            <option value="Z-A">Alphabetically, Z-A</option>
                            <option value="lowtohigh">Price, low to high</option>
                            <option value="hightolow">Price, high to low</option>
                        </select>
                    </div>

                </div>
                <div id="product-gaoshop" >
                    <div id="filter" class="hide" style="z-index:10">
                        <i class="fas fa-times" id="close"></i>
                        <ul class="loc1" >
                            
                                <h3>Product Categories</h3>
                                <li><span id="productall">All</span></li>
                        <ul id="loccategories"></ul>
                        </ul>
                        <ul class="loc1">
                            
                                <h3>By Price</h3>
                        
                            <li>
                                <div class="slidecontainer">
                                    <input type="range" min="0" max="3000" value="2000" class="slider" id="myRange">
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
                                <div>
                                <span class="tachchu" >
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
                <div class="btn-load">Load More</div>
            </div>
            
            <div id="backtop" onclick="topFunction()">
                <i class="fas fa-arrow-up"></i>
            </div>
        </div>
    </div>
    `
}