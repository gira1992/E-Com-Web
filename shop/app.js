//MODAL
var modal = document.querySelector("#myModal");
var btn = document.querySelector(".myBtn");
var span = document.querySelector(".close");

btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//CART
let cart = document.querySelectorAll('.add-to-cart'); //selectin btns add-to-cart

let products = [   //array of objects
    {
        name: "Black joggers",
        tag: "blackjoggers",
        price: 110,
        inCart: 0
    },
    {
        name: "Slim fitted black T",
        tag: 'slimfiitedBlack',
        price: 25,
        inCart: 0
    },
    {
        name: "White Jumper",
        tag: "whiteJumper",
        price: 21,
        inCart: 0
    },
    {
        name: "Blue waterproof Jacket",
        tag: "waterproofJacket",
        price: 65,
        inCart: 0
    },
    {
        name: "Grey Slim fit Shirt",
        tag: "slimfittedGrey",
        price: 22,
        inCart: 0
    },
    {
        name: "Pinapple Pink Shirt",
        tag: "pinkShirt",
        price: 55,
        inCart: 0
    },
    //WOMAN CART

    {
        name: "White Breezy Dress",
        tag: "WhiteDress",
        price: 30,
        inCart: 0
    },
    {
        name: "White Blazer",
        tag: "Whiteblazer",
        price: 19,
        inCart: 0
    },
    {
        name: "Grey Tracksuit",
        tag: "Greytracksuit",
        price: 39,
        inCart: 0
    },
    {
        name: "Summer Pink Blouse",
        tag: "summer",
        price: 29,
        inCart: 0
    },
    {
        name: "Black Jeggers",
        tag: "BlackJeggers",
        price: 15,
        inCart: 0
    },
    {
        name: "Pink Silk Dress",
        tag: "Pinkslik",
        price: 22,
        inCart: 0
    },

    //ACC

    {
        name: "Crystal Blue Watch",
        tag: "crystalbluewatch",
        price: 19,
        inCart: 0
    },
    {
        name: "Butterfly Necklace",
        tag: "butterfly",
        price: 25,
        inCart: 0
    },
    {
        name: "Black Fred Perry Cap",
        tag: "blackcap",
        price: 21,
        inCart: 0
    }


];

for (let i = 0; i < cart.length; i++) {
    cart[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
        displayCart()
       // alert(`${products[i].name} was added`)
        console.log("added to cart")
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers'); //

    if (productNumbers) {
        document.querySelector('#cart span').innerText = productNumbers;
    }
}


function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers'); //getting key from local storage
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('#cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('#cart span').textContent = 1;
    }
    setItems(product);
}


function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    //parseing JSON to js object
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {

        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //        console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("my cartCost is", cartCost);


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
    <div class = "product col-3">
     
        <img src = "./fashion/Men/${item.tag}.jpg">
         <p class = "product "> ${item.name}</p>
    </div>

    <div class = "price col-3"> 
        £${item.price}
    </div>

    <div class ="quantity col-3">
        <ion-icon class="decrease"
        name="arrow-dropleft-circle"></ion-icon>
        <span>${item.inCart}</span>
    </div>

    <div class ="total col-3">
        £${item.inCart * item.price}
    </div>
    ` ;
        });

        productContainer.innerHTML += `
    <div class="basketTotalContainer col-12">
        <h6 class="basketTotalTitle">
            Basket total
        </h6>
        <h6 class = "basketTotal">
            £${cartCost}
        </h6>
    </div>
`

    }
}

//BUTTON ON CART
const clearBtn = document.querySelector('.clearCart')
const buyCart = document.querySelector('.buyCart')

buyCart.addEventListener('click', () => {

    let productContainer = document.querySelector(".products");
    let spanCart = document.querySelector('#cart span').innerHTML;
    if (spanCart == 0) {
        productContainer.innerHTML = "Your cart is empty"
    } else {
        productContainer.innerHTML = 'Payment Successful';
        document.querySelector('#cart span').textContent = 0;
    }
    localStorage.clear()
})

clearBtn.addEventListener('click', () => {
    localStorage.clear()
    document.querySelector('#cart span').textContent = 0;
    let productContainer = document.querySelector(".products");
    productContainer.innerHTML = '';
    
})

localStorage.clear()
// onLoadCartNumbers();
// displayCart()