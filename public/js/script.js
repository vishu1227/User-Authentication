// Left and Right Slider

function openLeftSide()
{
    let Slide=document.getElementById('leftSlide')

    if(screen.width<460)
    {
        Slide.style.width='205px'
        document.getElementById('user_img').style.width='300px'
        document.getElementById('user_img').style.height='300px'    
    }
    else{
        Slide.style.width='260px'
    }
    Slide.style.display='block'

    document.getElementById('user_img').style.width='12vw'
    document.getElementById('user_img').style.height='12vw'

    let Cbtn=document.getElementById('closebutton')
    Cbtn.style.display='block'

    let links_Box=document.getElementById('links')
    links_Box.style.display='flex'

    let copyrights=document.getElementById('copyrights')
    copyrights.style.display='block'
}
function closeSLideBar()
{
    let Slide=document.getElementById('leftSlide')
    Slide.style.width='0vw'

    document.getElementById('user_img').style.width='0px'
    document.getElementById('user_img').style.height='0px'

    // let img=document.getElementById('innerImg')
    // img.style.width='0vw'

    let Cbtn=document.getElementById('closebutton')
    Cbtn.style.display='none'

    let links_Box=document.getElementById('links')
    links_Box.style.display='none'
    // links_Box.style.width='20vw'

    let copyrights=document.getElementById('copyrights')
    copyrights.style.display='none'
}
closeSLideBar()

function closeRightSlide()
{
    let rightSlide=document.getElementById('RightSlide');

    rightSlide.style.width='0px';

    document.getElementById('close').style.display='none';

    rightSlide.style.paddingLeft='0px'
    rightSlide.style.paddingRight='0px'
}

function openRightSide()
{
    let rightSlide=document.getElementById('RightSlide');

    
    if(screen.width>460 && screen.width<690)
    {
        rightSlide.style.width='350px';

        document.getElementById('all_items').style.height='370px'
    }
    else if(screen.width<=460)
    {
        let w=screen.width;

        rightSlide.style.width='90vw';
        document.getElementById('all_items').style.height='70vh'
    }
    else{
        rightSlide.style.width='500px';
        document.getElementById('all_items').style.height='480px'
    }

    document.getElementById('close').style.display='block';

    rightSlide.style.paddingLeft='20px'
    rightSlide.style.paddingRight='20px'

}

closeRightSlide()

// Fetching the products and displaying 

function getProduct(title,price,url)
{
    return   `<img src="${url}" alt="">
                <p>${title}</p>
                <div class="add_to_cart">
                    <p>&dollar;${price}</p>
                    <button type="button" class='btn-add-to-cart' data-name='${title}' 
                    data-price=${price} onclick="addToCart(this)" ><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                        fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>Add to Cart</button>
                </div>`
}

async function getJSON()
{
    data = await fetch('products.json')
    jdata = await data.json();

    sessionStorage.setItem('all-products',JSON.stringify(jdata))

    return jdata;
}

function ShowProducts()
{
    const products=document.createElement('div')

    products.className='products'

    getJSON().then((productsList)=>{
      
      for(item of productsList.items)
      {
          let prod=document.createElement('div')
          prod.className='product'

          let product_name=item.fields.title;
          let price=item.fields.price;
          let img_url=item.fields.image.fields.file.url;
  
          prod.innerHTML=getProduct(product_name,price,img_url)
          
          products.appendChild(prod)
      }
    })

    const prod_disp=document.getElementById('product_display');

    prod_disp.appendChild(products)
}

ShowProducts()


// Cart functioning


//It like a class whith only one object beacuse of the only one cart
var shoppingCart=(function(){

// ======================================
//    Private methods and properties
//=======================================

    cart=[]

    function  Item(name,price,count){
        this.name=name;
        this.price=price;
        this.count=count;
    }

    function saveCart() {
        sessionStorage.setItem('shoppingCart',JSON.stringify(cart));        
    }

    function loadCart() {
        cart=JSON.parse(sessionStorage.getItem('shoppingCart'))
    }
    //every time it udate the cart array
    if(sessionStorage.getItem('shoppingCart') != null)
    {
        loadCart();
    }

// ====================================
//     Public methods and propeties
// ====================================

    //this object will have all cart functions
    var obj={}

    //Add to cart
    obj.addItemToCart=function(name,price,count) {

        for(var item in cart)
        {
            //if the item is already present in the cart then just increase it's count
            if(cart[item].name === name)
            {
                cart[item].count++;
                //update the cart in local mempry / sessionStorage
                saveCart();
                return;
            }
        }

        //if not present in the cart
        var item=new Item(name,price,count)
        cart.push(item)
        saveCart();
    }

    //set Count for the item
    obj.setCountforItem=function(name,count) {
        for(var i in cart)
        {
            if(cart[i].name===name)
            {
                cart[i].count=count;
                break;
            }
        }        
    }

    //Remove a item from Cart(-)
    obj.removeItemFromCart=function(name) {
        for(var i in cart)
        {
            if(cart[i].name===name)
            {
                if(cart[i].count>1)
                {
                    cart[i].count--;
                }

                // if(cart[i].count === 0)
                // {
                //     cart.splice(i,1);
                // }
                break;
            }
        }
        saveCart();
    }

    //Remove all items from cart
    obj.removeItemFromCartAll=function(name){
        for(var i in cart)
        {
            if(cart[i].name === name)
            {
                cart.splice(i,1);
                break;
            }
        }
        saveCart();
    }

    //clear cart
    obj.clearCart=function(){
        cart=[]
        saveCart();
    }

    //countCart
    obj.totalCount=function(){

        var totalItems=0;
        for(var i in cart)
        {
            totalItems+=cart[i].count;
        }
        return totalItems;
    }

    //total Amount of Items
    obj.totalCart=function(){
        var totalCost=0;

        for(var i in cart)
        {
            totalCost+=cart[i].price*cart[i].count;
        }

        return Number(totalCost.toFixed(2));
    }

    //returns the copy of cart
    obj.listCart=function() {
        var cartCopy = []

        for(var i in cart)
        {
            item=cart[i];

            itemCopy={};

            // itemCopy={
//              price:
//              cost:
//              count:
//              total:  //total Cost              
//            }

            for(var p in item)
            {
                itemCopy[p]=item[p];
            }
            itemCopy.total = Number(item.price*item.count).toFixed(2);

            cartCopy.push(itemCopy);
        }
        return cartCopy;
    }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function

  return obj;
})();

// =================================================
//                 Trigger / Events
// =================================================

function addToCart(ele)
{

    var name=ele.getAttribute('data-name');
    var price=ele.getAttribute('data-price');

    shoppingCart.addItemToCart(name,price,1);

    document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()

    displayCart()

}
document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()

function getImgUrl(name)
{
    let all_products=JSON.parse(sessionStorage.getItem('all-products')).items

    for(item of all_products)
    {
        let product_name=item.fields.title;
        let price=item.fields.price;
        let img_url=item.fields.image.fields.file.url;

        if(product_name===name)
        {
            return img_url;
        }   
    }
}

function displayCart()
{
    let cartArray=shoppingCart.listCart()

    let output=''

    let totalcost=0;

    for(var i in cartArray)
    {

        let img_url=getImgUrl(cartArray[i].name)
        let price=cartArray[i].price;
        let count=cartArray[i].count;
        let total_cost=cartArray[i].total;
        let title=cartArray[i].name;

        totalcost+=Number(total_cost);

        output+=`<div class="cart-product">
        <img src="${img_url}" alt="">
        <div class="details">
            <p>${title}</p>
            <p>Price&dollar;${price}</p>
            <button item-name='${title}' 
            onclick="deleteItem(this)" type="button">remove</button>
        </div>
        <p class="totalcost">&dollar;${total_cost}</p>
        <div class="incr_decr">
            <button item-name='${title}' onclick="increment(this)" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                </svg>
            </button>
            <p class="total">${count}</p>
            <button item-name='${title}' type="button" onclick="decrement(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
        </div>`
    }

    totalcost=totalcost.toFixed(2)

    document.getElementById('all_items').innerHTML=output;
    document.getElementById('t_cost').innerHTML=`&dollar;${totalcost}`
}
displayCart()


function deleteItem(ele)
{
    let name=ele.getAttribute('item-name');
    shoppingCart.removeItemFromCartAll(name)
    document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()

    displayCart()
}

function emptyCart(ele)
{
    shoppingCart.clearCart()
    document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()
    displayCart()
}

function increment(ele)
{
    let name=ele.getAttribute('item-name');

    shoppingCart.addItemToCart(name);

    document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()
    displayCart()
}

function decrement(ele)
{
    let name=ele.getAttribute('item-name');

    shoppingCart.removeItemFromCart(name);

    document.getElementById('cart_items').innerHTML=shoppingCart.totalCount()
    displayCart()
}
