function minusButtonClicked(event) {
    let button = event.target;
    let quantity = button.parentElement.getElementsByClassName("input")[0].value;
    let title = button.parentElement.parentElement.getElementsByClassName("product-title")[0].innerText;
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        if (cartRowsInJSON[i].title == title) {
            cartRowsInJSON[i].quantity = Math.max(1, quantity - 1);
            localStorage.setItem("cartItems2", JSON.stringify(cartRowsInJSON));
            updateCartPageFromLocalStorage();
            return;
        }
    }    
}

function plusButtonClicked(event) {
    let button = event.target;
    let quantity = button.parentElement.getElementsByClassName("input")[0].value;
    let title = button.parentElement.parentElement.getElementsByClassName("product-title")[0].innerText;
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        if (cartRowsInJSON[i].title == title) {
            cartRowsInJSON[i].quantity = Number(quantity) + 1;
            localStorage.setItem("cartItems2", JSON.stringify(cartRowsInJSON));
            updateCartPageFromLocalStorage();
            return;
        }
    }    
}

function removeButtonClicked(event) {
    let button = event.target;
    let title = button.parentElement.parentElement.getElementsByClassName("product-title")[0].innerText;
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        if (cartRowsInJSON[i].title == title) {
            cartRowsInJSON.splice(i, 1);
            localStorage.setItem("cartItems2", JSON.stringify(cartRowsInJSON));
            updateCartPageFromLocalStorage();
            return;
        }
    }      
}

function inputQuantityChanged(event) {
    let inputElement = event.target;
    console.log(inputElement);
    let quantity = inputElement.parentElement.getElementsByClassName("input")[0].value;
    //let quantity = inputElement.value;
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1;
    }
    console.log(quantity);
    let title = event.target.parentElement.parentElement.getElementsByClassName("product-title")[0].innerText;
    console.log(title);
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        if (cartRowsInJSON[i].title == title) {
            cartRowsInJSON[i].quantity = quantity;
            localStorage.setItem("cartItems2", JSON.stringify(cartRowsInJSON));
            updateCartPageFromLocalStorage();
            return;
        }
    }    
}

function addProductToCart(imageSrc, title, price, quantity) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartRowContents = `
    <div>
        <img class = "product-image-in-cart" src = "${imageSrc}">
        <p class = "product-title">${title}</p>
    </div>
    <div>
        <span class = "product-price">${price}</span>
        <span> tk</span>
    </div>
    <div>
        <button class = "minus">-</button>
        <input class = "input" size = 9 value = ${quantity}>
        <button class = "plus">+</button>
        <button class = "remove">Remove</button>
    </div>`;
    cartRow.innerHTML = cartRowContents;
    var cartProducts = document.getElementsByClassName("cart-products")[0];
    cartProducts.append(cartRow);
    cartRow.getElementsByClassName("minus")[0].addEventListener(
        "click", minusButtonClicked);
    cartRow.getElementsByClassName("plus")[0].addEventListener(
        "click", plusButtonClicked);
    cartRow.getElementsByClassName("remove")[0].addEventListener(
        "click", removeButtonClicked);
    cartRow.getElementsByClassName("input")[0]
    .addEventListener("change", inputQuantityChanged);
}

function updateCartPageFromLocalStorage() {
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    if ( !cartRowsInJSON) {
        cartRowsInJSON = [];
    }
    let cartProducts = document.getElementsByClassName("cart-products")[0];
    while (cartProducts.hasChildNodes()) {
        cartProducts.removeChild(cartProducts.firstChild);
    }
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        var imageSrc = cartRowsInJSON[i].imageSrc;
        var title = cartRowsInJSON[i].title;
        var price = cartRowsInJSON[i].price;
        var quantity = cartRowsInJSON[i].quantity;
        addProductToCart(imageSrc, title, price, quantity);
    }
    updateCartTotalPrice();
}

function addToCartButtonClicked(event) {
    let button = event.target;
    let product = button.parentElement;
    let imageSrc = product.getElementsByClassName("product-image")[0].src;
    let title = product.getElementsByClassName("product-name")[0].innerText;
    let price = product.getElementsByClassName("price")[0].innerText;
    price = price.replace(/\D/g, '');
    price = Number(price);
    let quantity = 1;
    var cartRowsInJSON = JSON.parse(localStorage.getItem("cartItems2"));
    if ( !cartRowsInJSON) {
        cartRowsInJSON = [];
    }
    for (var i = 0; i < cartRowsInJSON.length; ++i) {
        if (cartRowsInJSON[i].title == title) {
            alert('This product is already added to the cart');
            return;
        }
    } 
    let productObject = {
        "imageSrc" : imageSrc,
        "title" : title,
        "price" : price,
        "quantity" : quantity
    }
    cartRowsInJSON.push(productObject);
    localStorage.setItem("cartItems2", JSON.stringify(cartRowsInJSON));
}

function ready() {
    var cartProducts = document.getElementsByClassName("cart-products")[0];
    if (cartProducts != null) {
        updateCartPageFromLocalStorage();
    }
    let addToCartButtons = document.getElementsByClassName("add-to-cart-button");
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i];
        button.addEventListener('click', addToCartButtonClicked);
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function addToCartClicked(event) {
    var button = event.target;
    var product = button.parentElement;
    console.log(product);
    var title = product.getElementsByClassName("product-name")[0].innerText;
    var price = product.getElementsByClassName("price")[0].innerText;
    price = price.replace(/\D/g, '');
    price = Number(price);
    var imageSrc = product.getElementsByClassName("product-image")[0].src;
    console.log(title, price, imageSrc);
    addItemToCart(title, price, imageSrc, 1);
    updateCartTotalPrice();
}

function addItemToCart(title, price, imageSrc, quantity) {
    var cartItemTitles = document.getElementsByClassName
    ("product-title");
    console.log(cartItemTitles, cartItemTitles.length);
    for (var i = 0; i < cartItemTitles.length; ++i) {
        if (cartItemTitles[i].innerText == title) {
            alert('This item is already added to the cart');
            return;
        }
    }

}

function updateCartTotalPrice() {
    let cartProducts = document.getElementsByClassName("cart-products")[0];
    let cartRows = cartProducts.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; ++i) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("product-price")[0];
        let price = priceElement.textContent;
        let quantity = cartRow.getElementsByClassName("input")[0].value;
        total += quantity * price;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].textContent = total;
}

function updateLocalStorage() {
    var cartProducts = document.getElementsByClassName("cart-products")[0];
    var cartRows = cartProducts.getElementsByClassName("cart-row");
    var cartProductsInArray = [];
    for (var i = 0; i < cartRows.length; ++i) {
        var cartRow = cartRows[i];
        var imageSrc = cartRow.getElementsByClassName
        ("product-image-in-cart")[0].src;
        var title = cartRow.getElementsByClassName
        ("product-title")[0].innerText;
        var price = cartRow.getElementsByClassName
        ("product-price")[0].innerText;
        var quantity = cartRow.getElementsByClassName
        ("input")[0].value;
        var cartObject = {
            "imageSrc" : imageSrc,
            "title" : title,
            "price" : price,
            "quantity" : quantity
        }
        cartProductsInArray.push(cartObject);
    }
    localStorage.setItem("cartItems2", JSON.stringify(cartProductsInArray));
    console.log(localStorage.getItem("cartItems2"));
}