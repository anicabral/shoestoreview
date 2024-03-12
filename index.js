// SELECT PRODUCT IMAGE FROM THUMBNAIL
const thumbnails = document.querySelectorAll(".img-item"); // selecciono todos los divs q tienen imagen con su link
const bigImage = document.querySelector(".img-showcase"); //
const bigImageDisplay = bigImage.querySelector('.thumbnail'); //referencia a imagen que se muestra en grande

thumbnails.forEach(img => {
  img.addEventListener("click", (event)=>{
    event.preventDefault();
    const imgLongPath = img.querySelector("a img").src; //selecciono la imagen de la etiqueta a, y accedo a su path.
    const lastIndex = imgLongPath.lastIndexOf('/'); // me da el valor del indice donde se encuentra la barra diagonal.
    const imgShortPath = imgLongPath.substring(lastIndex + 1); // Extrae desde el carácter después de la última "/" hasta el final.
    bigImageDisplay.src = `./images/${imgShortPath}`; // le asigno el nuevo path, a la big image
  });
});

// MODIFY PRODUCT SIZE
const sizeButtons = document.querySelectorAll('input[name="size"]');
const currentSize = document.querySelector('.current-size');

sizeButtons.forEach(button => {
  button.addEventListener("click", ()=> {
    const newSize = `Selected size: <span> ${button.value}`;
    currentSize.innerHTML = newSize;
  });
});

// MODIFY PRODUCT COLOR
const colorButtons = document.querySelectorAll('input[name="color"]');
const currentColor = document.querySelector('.color-title');
const product = document.querySelector('.product-content');

colorButtons.forEach(color => {
  color.addEventListener("click", ()=>{
    currentColor.innerHTML = `Color: <span> ${color.value}`;
    bigImageDisplay.src = `./images/${color.value}.jpg`;
  });
});

// MODIFY ITEM QUANTITY

const addButton = document.querySelector('#increase-quantity');
const lessButton = document.querySelector('#decrease-quantity');
const inputQuantity = document.querySelector('#quantity');

addButton.addEventListener("click", () =>{
  let currentQuantity = parseInt(inputQuantity.value);
  const newQuantity = currentQuantity + 1;
  inputQuantity.value = newQuantity.toString();
});

lessButton.addEventListener("click", () =>{
  if (parseInt(inputQuantity.value) > 1){
    let currentQuantity = parseInt(inputQuantity.value);
    const newQuantity = currentQuantity - 1;
    inputQuantity.value = newQuantity.toString();
  };
});

// WORKING WITH THE CART
const buttonOpenCart = document.querySelectorAll('[data-action="open-cart"]');
const buttonCloseCart = document.querySelectorAll('[data-action="close-cart"]');
const windowCart = document.getElementById('cart');
const buttonAddToCart = document.querySelector('.btn-add-to-cart');

const cart = [];
const notification = document.querySelector('.notification');

/// Open cart
const renderCart = () => {
    windowCart.classList.add('cart-active');
    //clean the cart so no elements get duplicated when calling renderCart
    const previousProducts = windowCart.querySelectorAll('.cart_product');
    previousProducts.forEach((product) => product.remove());
    let total = 0;
    const cartNoProductsMessage = windowCart.querySelector('.cart_alert-no-products');
    // check if there are items in the cart
    if (cart.length === 0){
      cartNoProductsMessage.style.display = 'block';
    } else {
      // delete the class of empty car
      cartNoProductsMessage.style.display = 'none';
      cart.forEach((cartProduct)=> {
        // obtain price from product dataBase when name of the product dataBase is the same from one of the list
        productsDataBase.forEach((productDataBase)=>{
          if(productDataBase.name ===  cartProduct.name){
            cartProduct.price = productDataBase.price; // save the price into a new property for cartProduct.
            total+= productDataBase.price * cartProduct.quantity;
          }
        });

        let imageFileName;
          // conditional to determine the filename of the image from color
          if (cartProduct.color === 'red') {
              imageFileName = 'red';
          } else if (cartProduct.color === 'green') {
              imageFileName = 'green';
          } else if (cartProduct.color === 'blue') {
              imageFileName = 'blue';
          } else if (cartProduct.color === 'black') {
              imageFileName = 'black';
          } else {
              imageFileName = 'black';
          }

          //create a template with the html code that will be shown in case there are products in cart
         const cartProductTemplate = `<div class="cart_product-info">
                                        <img src="./images/${imageFileName}.jpg" alt="" class="cart_thumb"/>
                                        <div>
                                          <p class="cart_product-name">
                                            <span class="cart_product-quantity"> ${cartProduct.quantity} x </span> ${cartProduct.name}
                                          </p>
                                          <p class="cart_product-properties">
                                            Size: <span>${cartProduct.size}</span> Color:<span> ${cartProduct.color}</span>
                                          </p>
                                        </div>
                                      </div>
                                      <div class="cart_product-container-price">
                                      <button class="cart_btn-delete-item" data-action="eliminar-item-cart">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          viewBox="0 0 16 16"
                                        >
                                        <path
                                          d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                                        />
                                        </svg>
                                      </button>
                                      <p class="cart_product-price">$${cartProduct.price * cartProduct.quantity}</p>
                                    </div>`
      // div where the new content to be render will be placed
      const newItemCart =  document.createElement('div');
      // add the class "cart_product" to the new element so the css styles apply
      newItemCart.classList.add('cart_product');
      newItemCart.innerHTML = cartProductTemplate;
      // add this new div content to be shown the windowCart
      windowCart.querySelector('.cart_body').appendChild(newItemCart);
      let alertNoColors = windowCart.querySelector('.cart_alert-no-products');
      alertNoColors.classList.remove('.cart_alert-no-products');
    });
    }
    windowCart.querySelector('.cart_total').innerText = `$${total}`;

};

buttonOpenCart.forEach((button)=>{
  button.addEventListener("click", ()=> {
    renderCart();
  });
});

/// close cart
buttonCloseCart.forEach((button)=>{
  button.addEventListener("click", ()=> {
    console.log('cerraste el carrito');
    windowCart.classList.remove('cart-active');
  });
});

// ADD TO CART
// *** Data base
productsDataBase = [
  {
    id: '1',
    name: 'Nike Code Dunk',
    description: 'Lorem Impsum',
    price: 130,
    colors: ['black', 'red', 'blue', 'green'],
    sizes: ['36', '37', '38', '39'],
  },
];
// *** Adding item to cart
buttonAddToCart.addEventListener('click', ()=>{
  const productName = product.querySelector('.product-title').innerText;
  const cartQuantity = parseInt(product.querySelector('#quantity').value);
  const cartColor =  product.querySelector('#property-color input:checked').value;
  const cartSize =  product.querySelector('.size-buttons input:checked').value;
  // avoid repetition in items. if it exists, only adjust quantity
  if (cart.length > 0) {
    let productInCart = false;
    cart.forEach(item=> {
      if(item.name === productName && item.size === cartSize && item.color === cartColor){
      item.quantity =+ cartQuantity;
      productInCart = true;
      };
    });
    if(productInCart === false){
      cart.push({
        name: productName,
        quantity: cartQuantity,
        color: cartColor,
        size: cartSize
      });
    }
  } else {
    // push the item as an object to the cart.
    cart.push({
      name: productName,
      quantity: cartQuantity,
      color: cartColor,
      size: cartSize
    });
  }
  // Show the notification of "added to cart"
  notification.classList.add('notification-active');
  // *** after 5 seconds, hide the notification:
  setTimeout(()=> notification.classList.remove('notification-active'), 5000);
});

// delete an item in the cart
const buttonsDeleteItems = document.querySelectorAll('.cart_btn-delete-item');

windowCart.addEventListener("click", (e)=>{
  if(e.target.closest('.cart_btn-delete-item')){
    const itemToDelete = e.target.closest('.cart_product'); //select the closest cart_product div envolving the button
    itemToDelete.remove();
  }
});
