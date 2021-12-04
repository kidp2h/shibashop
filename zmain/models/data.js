let SLIDER = [
  {
    id: 1,
    title: 'Mega Summer Sale',
    header: 'BIG DISCOUNT UP TO 50%',
    desc: 'New arrival, high quality product only at SHIBA SHOP',
    img: './images/slider/slide-img-1.jpg',
  },
  {
    id: 2,
    title: 'Back To School',
    header: 'LAPTOP, PHONE SALE 70%',
    desc: 'LIMITED TIME ONLY ! LIMITED TIME ONLY ! LIMITED TIME ONLY !',
    img: './images/slider/slide-img-2.jpg',
  },
  {
    id: 3,
    title: 'Orders From $0',
    header: 'FREE SHIP ON THE WORLD',
    desc: 'When you orders from $0, you will get free shipping',
    img: './images/slider/slide-img-3.jpg',
  },
  {
    id: 4,
    title: 'Service 24/7',
    header: 'WE ARE ALWAYS HERE.',
    desc: 'The support team of SHIBA SHOP is always there',
    img: './images/slider/slide-img-4.jpg',
  },
];

let CATEGORIES = [
  {
    id: 1,
    name: 'LAPTOP',
    img: `./images/categories/category-img-1.jpg`,
  },
  {
    id: 2,
    name: 'WATCH',
    img: `./images/categories/category-img-2.jpg`,
  },
  {
    id: 3,
    name: 'KEYBOARD',
    img: `./images/categories/category-img-3.jpg`,
  },
  {
    id: 4,
    name: 'HEADPHONE',
    img: `./images/categories/category-img-4.jpg`,
  },
  {
    id: 5,
    name: 'CAMERA',
    img: `./images/categories/category-img-5.jpg`,
  },
  {
    id: 6,
    name: 'PHONE',
    img: `./images/categories/category-img-6.jpg`,
  },
  {
    id: 7,
    name: 'MOUSE',
    img: './images/categories/category-img-7.jpg',
  },
];

let USERS = [
  {
    id: 1,
    fullname: 'Nguyễn Phúc Thịnh',
    address: '105/77 Lê Hồng Phong, Tân Tiến, Thành phố Buôn Ma Thuột, Đắk Lắk ',
    phone: '0896359374',
    username: 'nguyenphucthinh',
    password: '123',
    isAdmin: true,
    cart: [],
    wishList: [],
  },
  {
    id: 2,
    fullname: 'Lương Chi Thịnh',
    address: '45/2 Lê Lợi, P.10, Q.3, Thành phố Hồ Chí Minh',
    phone: '0777226469',
    username: 'luongchithinh',
    password: '123',
    isAdmin: true,
    cart: [],
    wishList: [],
  },
  {
    id: 3,
    fullname: 'Nguyễn Hữu Đại',
    address: '15/2 Phan Bội Châu, P.2, Q.5, Thành phố Hồ Chí Minh',
    phone: '0936482952',
    username: 'nguyenhuudai',
    password: '123',
    isAdmin: true,
    cart: [],
    wishList: [],
  },
  {
    id: 4,
    fullname: 'Châu Phú Thịnh',
    address: '15/2 Lý Thường Kiệt, P.7, Q.10, Thành phố Hồ Chí Minh',
    phone: '0936482952',
    username: 'chauphuthinh',
    password: '123',
    isAdmin: true,
    cart: [],
    wishList: [],
  },
  {
    id: 5,
    fullname: 'Hoàng Lê Gia Bảo',
    address: '99/99 Trần Hưng Đạo, P.9, Q.9, Thành phố Hồ Chí Minh',
    phone: '09999999999',
    username: 'admin',
    password: 'admin',
    isAdmin: true,
    cart: [],
    wishList: [],
  },
  {
    id: 6,
    fullname: 'Phạm Hoàng Vũ',
    address: '11/11 Nguyễn Tri Phương, P.1, Q.1, Thành phố Hồ Chí Minh',
    phone: '0111111111111',
    username: 'user1',
    password: '123',
    isAdmin: false,
    cart: [],
    wishList: [],
  },
  {
    id: 7,
    fullname: 'Lê Nguyễn Nhật Huy',
    address: '22/22 Quang Trung, P.2, Q.2, Thành phố Hồ Chí Minh',
    phone: '0222222222222',
    username: 'user2',
    password: '123',
    isAdmin: false,
    cart: [],
    wishList: [],
  },
  {
    id: 8,
    fullname: 'Võ Huy Hoàng',
    address: '33/33 Lê Thánh Tông, P.3, Q.3, Thành phố Hồ Chí Minh',
    phone: '0333333333333',
    username: 'user3',
    password: '123',
    isAdmin: false,
    cart: [],
    wishList: [],
  },
  {
    id: 9,
    fullname: 'Tống Thanh Phúc',
    address: '44/44 Nguyễn Huệ, P.4, Q.4, Thành phố Hồ Chí Minh',
    phone: '0444444444444',
    username: 'user4',
    password: '123',
    isAdmin: false,
    cart: [],
    wishList: [],
  },
  {
    id: 10,
    fullname: 'Hoàng Thông',
    address: '55/55 Nguyễn Huệ, P.5, Q.5, Thành phố Hồ Chí Minh',
    phone: '0555555555555',
    username: 'user5',
    password: '123',
    isAdmin: false,
    cart: [],
    wishList: [],
  },
];

let PRODUCTS = [
  {
    id: 1,
    name: 'MASTER HEADPHONE',
    sale: 179,
    price: 189,
    category: 'HEADPHONE',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-1-img-1.jpg',
      './images/products/product-1-img-2.jpg',
      './images/products/product-1-img-3.jpg',
      './images/products/product-1-img-4.jpg',
    ],
  },
  {
    id: 2,
    name: 'SUPER SINGLE CAMERA',
    sale: 123,
    price: 154,
    category: 'CAMERA',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-2-img-1.jpg',
      './images/products/product-2-img-2.jpg',
      './images/products/product-2-img-3.jpg',
    ],
  },
  {
    id: 3,
    name: 'GOOGLE HOME',
    sale: 199,
    price: 213,
    category: 'SMART',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-3-img-1.jpg',
      './images/products/product-3-img-2.jpg',
      './images/products/product-3-img-3.jpg',
      './images/products/product-3-img-4.jpg',
    ],
  },
  {
    id: 4,
    name: 'IPHONE 11',
    sale: 534,
    price: 612,
    category: 'PHONE',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-4-img-1.jpg',
      './images/products/product-4-img-2.jpg',
      './images/products/product-4-img-3.jpg',
    ],
    colorList: ['--red:1', '--black:2', '--yellow:3'],
  },
  {
    id: 5,
    name: 'POLAROID CAMERA',
    sale: 152,
    price: 178,
    category: 'CAMERA',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-5-img-1.jpg',
      './images/products/product-5-img-3.jpg',
      './images/products/product-5-img-2.jpg',
      './images/products/product-5-img-4.jpg',
    ],
    colorList: ['--black:1', '--blue:3'],
  },
  {
    id: 6,
    name: 'BLUETOOTH PINK',
    sale: 109,
    price: 112,
    category: 'HEADPHONE',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-6-img-1.jpg',
      './images/products/product-6-img-2.jpg',
      './images/products/product-6-img-3.jpg',
    ],
  },
  {
    id: 7,
    name: 'KEYBORD AKO',
    sale: 187,
    price: 230,
    category: 'KEYBOARD',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-7-img-1.jpg',
      './images/products/product-7-img-2.jpg',
      './images/products/product-7-img-3.jpg',
      './images/products/product-7-img-4.jpg',
    ],
  },
  {
    id: 8,
    name: 'ACER NITRO 5',
    sale: 5431,
    price: 6120,
    category: 'LAPTOP',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-8-img-1.jpg',
      './images/products/product-8-img-2.jpg',
      './images/products/product-8-img-3.jpg',
      './images/products/product-8-img-4.jpg',
    ],
  },
  {
    id: 9,
    name: 'Sony Alpha ILCE-7CL',
    sale: 1854,
    price: 1941,
    category: 'CAMERA',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-9-img-1.jpg',
      './images/products/product-9-img-2.jpg',
      './images/products/product-9-img-3.jpg',
    ],
  },
  {
    id: 10,
    name: 'Galaxy Z Flip 3',
    sale: 3487,
    price: 4845,
    category: 'PHONE',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-10-img-1.jpg',
      './images/products/product-10-img-2.jpg',
      './images/products/product-10-img-3.jpg',
      './images/products/product-10-img-4.jpg',
    ],
    colorList: ['--purple:1', '--black:2', '--yellow:3', '--gray:4'],
  },
  {
    id: 11,
    name: 'OPPO Reno6 Pro',
    sale: 2485,
    price: 3678,
    category: 'PHONE',
    rate: 3,
    wish: 0,
    imgList: ['./images/products/product-11-img-1.jpg', './images/products/product-11-img-2.jpg'],
    colorList: ['--gray:1', '--lightBlue:2'],
  },
  {
    id: 12,
    name: 'IPHONE 13',
    sale: 2103,
    price: 3458,
    category: 'PHONE',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-12-img-1.jpg',
      './images/products/product-12-img-2.jpg',
      './images/products/product-12-img-3.jpg',
      './images/products/product-12-img-4.jpg',
    ],
    colorList: ['--red:1', '--pink:2', '--black:3', '--white:4'],
  },
  {
    id: 13,
    name: 'Galaxy Z Fold 3',
    sale: 2458,
    price: 4868,
    category: 'PHONE',
    rate: 5,
    wish: 0,
    imgList: ['./images/products/product-13-img-1.jpg', './images/products/product-13-img-2.jpg'],
    colorList: ['--black:1', '--pink:2'],
  },
  {
    id: 14,
    name: 'Fujifilm Instax Mini 11',
    sale: 248,
    price: 536,
    category: 'CAMERA',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-14-img-1.jpg',
      './images/products/product-14-img-2.jpg',
      './images/products/product-14-img-3.jpg',
    ],
    colorList: ['--blue:1', '--white:2', '--purple:3'],
  },
  {
    id: 15,
    name: 'GOOGLE HOME',
    sale: 199,
    price: 245,
    category: 'SMART',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product.jpg',
      './images/products/product.jpg',
      './images/products/product.jpg',
      './images/products/product.jpg',
    ],
  },
  {
    id: 16,
    name: 'MSI Gaming GF65',
    sale: 1895,
    price: 2490,
    category: 'LAPTOP',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-16-img-1.jpg',
      './images/products/product-16-img-2.jpg',
      './images/products/product-16-img-3.jpg',
    ],
  },
  {
    id: 17,
    name: 'Lenovo Ideapad 5 Pro',
    sale: 2784,
    price: 3687,
    category: 'LAPTOP',
    rate: 5,
    wish: 0,
    imgList: ['./images/products/product-17-img-1.jpg', './images/products/product-17-img-2.jpg'],
  },
  {
    id: 18,
    name: 'Asus ROG Strix Scope TKL Electro Punk',
    sale: 233,
    price: 399,
    category: 'KEYBOARD',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-18-img-1.jpg',
      './images/products/product-18-img-2.jpg',
      './images/products/product-18-img-3.jpg',
    ],
  },
  {
    id: 19,
    name: 'Cooler Master CK530 V2',
    sale: 194,
    price: 201,
    category: 'KEYBOARD',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-19-img-1.jpg',
      './images/products/product-19-img-2.jpg',
      './images/products/product-19-img-3.jpg',
    ],
  },
  {
    id: 20,
    name: 'Razer BlackWidow V3 HALO Infinite Green',
    sale: 187,
    price: 245,
    category: 'KEYBOARD',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-20-img-1.jpg',
      './images/products/product-20-img-2.jpg',
      './images/products/product-20-img-3.jpg',
    ],
  },
  {
    id: 21,
    name: 'Leopold FC660MPD Blue Star',
    sale: 156,
    price: 245,
    category: 'KEYBOARD',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-21-img-1.jpg',
      './images/products/product-21-img-2.jpg',
      './images/products/product-21-img-3.jpg',
    ],
  },
  {
    id: 22,
    name: 'Apple Watch s6',
    sale: 1784,
    price: 1999,
    category: 'WATCH',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-22-img-1.jpg',
      './images/products/product-22-img-2.jpg',
      './images/products/product-22-img-3.jpg',
      './images/products/product-22-img-4.jpg',
    ],
    colorList: ['--pink:1', '--black:3', '--blue:4'],
  },
  {
    id: 23,
    name: 'Oppo Watch 41mm',
    sale: 1236,
    price: 2541,
    category: 'WATCH',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-23-img-1.jpg',
      './images/products/product-23-img-2.jpg',
      './images/products/product-23-img-3.jpg',
    ],
  },
  {
    id: 24,
    name: 'Galaxy Watch 4 Ite',
    sale: 1584,
    price: 2315,
    category: 'WATCH',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-24-img-1.jpg',
      './images/products/product-24-img-2.jpg',
      './images/products/product-24-img-3.jpg',
      './images/products/product-24-img-4.jpg',
    ],
  },
  {
    id: 25,
    name: 'Garmin Forerunner 45',
    sale: 1212,
    price: 1490,
    category: 'WATCH',
    rate: 4,
    wish: 0,
    imgList: [
      './images/products/product-25-img-1.jpg',
      './images/products/product-25-img-2.jpg',
      './images/products/product-25-img-3.jpg',
      './images/products/product-25-img-4.jpg',
      './images/products/product-25-img-5.jpg',
    ],
    colorList: ['--red:1', '--black:4', '--white:5'],
  },
  {
    id: 26,
    name: 'Corsair HS50 PRO',
    sale: 450,
    price: 568,
    category: 'HEADPHONE',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-26-img-1.jpg',
      './images/products/product-26-img-2.jpg',
      './images/products/product-26-img-3.jpg',
    ],
  },
  {
    id: 27,
    name: 'Asus ROG THETA 7.1',
    sale: 398,
    price: 490,
    category: 'HEADPHONE',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-27-img-1.jpg',
      './images/products/product-27-img-2.jpg',
      './images/products/product-27-img-3.jpg',
    ],
  },
  {
    id: 28,
    name: 'SteelSeries Arctis Pro 61486',
    sale: 569,
    price: 785,
    category: 'HEADPHONE',
    rate: 4,
    wish: 0,
    imgList: ['./images/products/product-28-img-1.jpg', './images/products/product-28-img-2.jpg'],
  },
  {
    id: 29,
    name: 'Kingston HyperX Cloud Alpha Gold - Limited Edition',
    sale: 623,
    price: 754,
    category: 'HEADPHONE',
    rate: 3,
    wish: 0,
    imgList: [
      './images/products/product-29-img-1.jpg',
      './images/products/product-29-img-2.jpg',
      './images/products/product-29-img-3.jpg',
    ],
  },
  {
    id: 30,
    name: 'ROG Zephyrus G14',
    sale: 2302,
    price: 5990,
    category: 'LAPTOP',
    rate: 5,
    wish: 0,
    imgList: [
      './images/products/product-15-img-1.jpg',
      './images/products/product-15-img-2.jpg',
      './images/products/product-15-img-3.jpg',
    ],
  },
];

let BILLS = [
  {
    id: 1,
    username: 'admin',
    products: [
      {
        id: 25,
        name: 'Garmin Forerunner 45',
        sale: 1212,
        price: 1490,
        category: 'WATCH',
        img: './images/products/product-25-img-1.jpg',
        quantity: 3,
      },
      {
        id: 8,
        name: 'ACER NITRO 5',
        sale: 5431,
        price: 6120,
        category: 'LAPTOP',
        img: './images/products/product-8-img-1.jpg',
        quantity: 1,
      },
      {
        id: 19,
        name: 'Cooler Master CK530 V2',
        sale: 194,
        price: 201,
        category: 'KEYBOARD',
        img: './images/products/product-19-img-1.jpg',
        quantity: 2,
      },
    ],
    subtotal: 9455,
    created_at: 1638205200000,
    status: 'PENDING',
  },
  {
    id: 2,
    username: 'admin',
    products: [
      {
        id: 29,
        name: 'Kingston HyperX Cloud Alpha Gold - Limited Edition',
        sale: 623,
        price: 754,
        category: 'HEADPHONE',
        img: './images/products/product-29-img-1.jpg',
        quantity: 2,
      },
      {
        id: 25,
        name: 'Garmin Forerunner 45',
        sale: 1212,
        price: 1490,
        category: 'WATCH',
        img: './images/products/product-25-img-1.jpg',
        quantity: 2,
      },
    ],
    subtotal: 3670,
    created_at: 1638032400000,
    status: 'COMPLETED',
  },
  {
    id: 3,
    username: 'user',
    products: [
      {
        id: 25,
        name: 'Garmin Forerunner 45',
        sale: 1212,
        price: 1490,
        category: 'WATCH',
        img: './images/products/product-25-img-1.jpg',
        quantity: 5,
      },
    ],
    subtotal: 6060,
    created_at: 1637946000000,
    status: 'CANCELLED',
  },
  {
    id: 4,
    username: 'admin',
    products: [
      {
        id: 17,
        name: 'Lenovo Ideapad 5 Pro',
        category: 'LAPTOP',
        img: './images/products/product-17-img-1.jpg',
        quantity: 6,
        sale: 2784,
      },
      {
        id: 15,
        name: 'GOOGLE HOME',
        category: 'SMART',
        img: './images/products/product.jpg',
        quantity: 5,
        sale: 199,
      },
      {
        id: 14,
        name: 'Fujifilm Instax Mini 11',
        category: 'CAMERA',
        img: './images/products/product-14-img-1.jpg',
        quantity: 6,
        sale: 248,
      },
      {
        id: 18,
        name: 'Asus ROG Strix Scope TKL Electro Punk',
        category: 'KEYBOARD',
        img: './images/products/product-18-img-1.jpg',
        quantity: 6,
        sale: 233,
      },
      {
        id: 13,
        name: 'Galaxy Z Fold 3',
        category: 'PHONE',
        img: './images/products/product-13-img-1.jpg',
        quantity: 8,
        sale: 2458,
      },
      {
        id: 12,
        name: 'IPHONE 13',
        category: 'PHONE',
        img: './images/products/product-12-img-1.jpg',
        quantity: 7,
        sale: 2103,
      },
      {
        id: 9,
        name: 'Sony Alpha ILCE-7CL',
        category: 'CAMERA',
        img: './images/products/product-9-img-1.jpg',
        quantity: 6,
        sale: 1854,
      },
      {
        id: 6,
        name: 'BLUETOOTH PINK',
        category: 'HEADPHONE',
        img: './images/products/product-6-img-1.jpg',
        quantity: 1,
        sale: 109,
      },
    ],
    subtotal: 66203,
    created_at: 1638601317546,
    status: 'PENDING',
  },
  {
    id: 5,
    username: 'user1',
    products: [
      {
        id: 18,
        name: 'Asus ROG Strix Scope TKL Electro Punk',
        category: 'KEYBOARD',
        img: './images/products/product-18-img-1.jpg',
        quantity: 2,
        sale: 233,
      },
      {
        id: 17,
        name: 'Lenovo Ideapad 5 Pro',
        category: 'LAPTOP',
        img: './images/products/product-17-img-1.jpg',
        quantity: 2,
        sale: 2784,
      },
      {
        id: 15,
        name: 'GOOGLE HOME',
        category: 'SMART',
        img: './images/products/product.jpg',
        quantity: 1,
        sale: 199,
      },
      {
        id: 14,
        name: 'Fujifilm Instax Mini 11',
        category: 'CAMERA',
        img: './images/products/product-14-img-1.jpg',
        quantity: 1,
        sale: 248,
      },
      {
        id: 6,
        name: 'BLUETOOTH PINK',
        category: 'HEADPHONE',
        img: './images/products/product-6-img-1.jpg',
        quantity: 1,
        sale: 109,
      },
      {
        id: 9,
        name: 'Sony Alpha ILCE-7CL',
        category: 'CAMERA',
        img: './images/products/product-9-img-1.jpg',
        quantity: 4,
        sale: 1854,
      },
      {
        id: 12,
        name: 'IPHONE 13',
        category: 'PHONE',
        img: './images/products/product-12-img-1.jpg',
        quantity: 8,
        sale: 2103,
      },
      {
        id: 13,
        name: 'Galaxy Z Fold 3',
        category: 'PHONE',
        img: './images/products/product-13-img-1.jpg',
        quantity: 1,
        sale: 2458,
      },
      {
        id: 19,
        name: 'Cooler Master CK530 V2',
        category: 'KEYBOARD',
        img: './images/products/product-19-img-1.jpg',
        quantity: 1,
        sale: 194,
      },
      {
        id: 22,
        name: 'Apple Watch s6',
        category: 'WATCH',
        img: './images/products/product-22-img-1.jpg',
        quantity: 1,
        sale: 1784,
      },
      {
        id: 27,
        name: 'Asus ROG THETA 7.1',
        category: 'HEADPHONE',
        img: './images/products/product-27-img-1.jpg',
        quantity: 1,
        sale: 398,
      },
      {
        id: 26,
        name: 'Corsair HS50 PRO',
        category: 'HEADPHONE',
        img: './images/products/product-26-img-1.jpg',
        quantity: 1,
        sale: 450,
      },
    ],
    subtotal: 36114,
    created_at: 1638601385425,
    status: 'PENDING',
  },
];
