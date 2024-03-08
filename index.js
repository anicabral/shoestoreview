// Change product image
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
    console.log(bigImageDisplay.src);
  });
});

// Change product size
const sizeButtons = document.querySelectorAll('input[name="size"]');
const currentSize = document.querySelector('.current-size');
console.log(sizeButtons);

sizeButtons.forEach(button => {
  button.addEventListener("click", ()=> {
    console.log(button.value)
    const newSize = `Selected size: <span> ${button.value}`;
    currentSize.innerHTML = newSize;
  });
});

// change product color
const colorButtons = document.querySelectorAll('input[name="color"]');
const currentColor = document.querySelector('.color-title');
const product = document.querySelector('.product-content');

colorButtons.forEach(color => {
  color.addEventListener("click", ()=>{
    currentColor.innerHTML = `Color: <span> ${color.value}`;
    bigImageDisplay.src = `./images/${color.value}.jpg`;
  });
});

// modify item quantity

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
