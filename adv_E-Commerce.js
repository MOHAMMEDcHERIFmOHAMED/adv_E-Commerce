
let shoes_container = document.querySelector('.shoes_container');
let search_field = document.querySelector('.search');
let cart_btn = document.querySelector('#cart-btn');
let cart_container = document.querySelector('.cart');
let cart_list = document.querySelector('.cart-list');

let choosen_category = "sneakers"
                                , min = 0 , max = 50000 
                                , choosen_price = ""
                                , choosen_brand = ""
                                , choosen_color = ""
                                , search_key = ""
                                , data
                                ,anyResult = false  
                                , isAll_cat = true;


async function getProducts(){
    let response = await fetch('adv_E-Commerce.json') ;
    data = await response.json() ;
    show_products();
}

getProducts() ;
function show_products(){
    shoes_container.innerHTML = "" ;
    data.forEach(product =>{
        // get the matches answers
    let matchescategory = isAll_cat || product.category === choosen_category ;
    let matchesbrand = !choosen_brand || product.brand === choosen_brand ;
    let matchescolor = !choosen_color || product.color === choosen_color ;
    let searchessearch = !search_key || product.name.toUpperCase().includes(search_key) ;

    let curr_price = parseInt(product.price.match(/\d+/)[0]);
         if( matchescategory && matchesbrand && matchescolor && searchessearch && curr_price >= min && curr_price <= max ){
            anyResult = true ;
            shoes_container.innerHTML +=`
            <div class="product_item">
                        <div class="img"><img src="${product.imgSrc}" alt="."></div>
                        <div class="item_info">
                            <h1>${product.name}</h1>
                            <div class="rate">
                                <div class="stars">
                                    <i class='bx bxs-star' ></i>
                                    <i class='bx bxs-star' ></i>
                                    <i class='bx bxs-star' ></i>
                                    <i class='bx bxs-star' ></i>
                                    <i class='bx bxs-star' ></i>
                                    <h4>(123 reviews)</h4>
                                </div>
                            </div>
                            <div class="price_info">
                                <del><span class="old_price">$200</span></del>
                                <span class="new_price">${product.price}</span>  
                            </div>
                        </div>
                        <div onclick=" ADDProduct(this)"  class="add_to_cart"><i class='bx bxl-shopify' ></i></div>
                    </div> `;
         }
  })
  if(!anyResult){
    shoes_container.innerHTML = `<h1><i style="color:lightgray ;" > no results found</i> </h1>`;
  }
  anyResult = false ;
}

// _____________ FILTER THE PRODUCTS BY CATEGORY _____________ 

document.addEventListener("DOMContentLoaded", function() {
    const category_Buttons = document.querySelectorAll('input[name="category"]');
    category_Buttons.forEach(radio => {
        radio.addEventListener('change', () => {
            choosen_category  = radio.getAttribute("data-category") ;
            if(choosen_category != "All") isAll_cat = false ; else isAll_cat = true ; 
            show_products() ;
        });
    });
});

// _____________ FILTER THE PRODUCTS BY PRICE _____________ 

document.addEventListener("DOMContentLoaded", function() {
    const price_Buttons = document.querySelectorAll('input[name="price"]');
    price_Buttons.forEach(radio => {
        radio.addEventListener('change', () => {
            choosen_price = radio.getAttribute('data_price') ;
            if(choosen_price === "ALL_prices" ){
                choosen_price= "" ;
                min = 0 ;
                max = 500000 ;
            } 
            if(choosen_price === "lvl1" ){
                min = 0 ;
                max = 50 ;
            }
            if(choosen_price === "lvl2" ){
                min = 50 ;
                max = 100 ;
            }
            if(choosen_price === "lvl3" ){
                min = 100 ;
                max = 150 ;
            }
            if(choosen_price === "lvl4" ){
                min = 150 ;
                max = 500000 ;
            }
            console.log(choosen_price + " " + min + " " + max);
            show_products() ;
        });
    });
});

// _____________ FILTER THE PRODUCTS BY COLOR _____________ 

document.addEventListener("DOMContentLoaded", function() {
    const color_Buttons = document.querySelectorAll('input[name="color"]');

    color_Buttons.forEach(radio => {
        radio.addEventListener('change', () => {
            choosen_color = radio.getAttribute('data_color') ;
            if(choosen_color === "All_colors" ) choosen_color= "" ;
            console.log(choosen_color);
            show_products() ;
        });
    });
});

// _____________ FILTER THE PRODUCTS BY BRAND NAME    _____________ 

document.addEventListener("DOMContentLoaded", function() {
    const brand_Buttons = document.querySelectorAll('.brand_choice');

    brand_Buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            choosen_brand = btn.getAttribute('brand_name') ;
            if(choosen_brand === "All_brands" ) choosen_brand = "" ;
            show_products() ;
        });
    });
});

// ___________  SEARCH PRODUCTS BY NAME WITH KEYUP EVENT    __________

search_field.addEventListener("keyup" , ()=>{
    search_key = search_field.value.toUpperCase();
    show_products();
})

//  _______________     ADD TO CART FUNCTIONS   ___________________ 

function CartToggler(){ cart_container.classList.toggle('hide'); }

function ADDProduct(elmnt){
    let parentelmnt = elmnt.parentElement;
    let imgsrc = (parentelmnt.querySelector(".img img")).getAttribute("src") ;
    let name = parentelmnt.querySelector(".item_info h1").textContent          ;
    let price = parentelmnt.querySelector(".price_info  .new_price").textContent    ;
    console.log(price);

    cart_list.innerHTML += `

        <div class = "cart-item">
          <img src = "${imgsrc}" alt = "product image">
          <div class = "cart-item-info">
            <h3 class = "cart-item-name">${name}</h3>
            <span class = "cart-item-price">${price}</span>
          </div>
           <button onclick="rmProduct(this)" type = "button" class = "cart-item-del-btn">
                <i class = "fas fa-times"></i> X
            </button>
        </div>
    `;
}

// let item_id = parseInt(parentelmnt.getAttribute('id').match(/[\d.]+/)[0]);
// let price = parentelmnt.querySelector(".product-content p").textContent          ;
// cart_arr.push({item_id , name,category,price,imgsrc});
// localStorage.setItem("arika" ,JSON.stringify(cart_arr));
