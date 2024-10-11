let menu = [
    { image: 'burger.jpg', title: 'Burger', price: 10},
    { image: 'pizza.jpg', title: 'Pizza', price: 12},
    { image: 'salad.jpg', title: 'Salad', price: 8},
    { image: 'soda.jpg', title: 'Soda', price: 2},
    { image: 'soda.jpg', title: 'Meatpie', price: 5},
];
let localCart = localStorage.getItem('cart');
let cart = !localCart ? [] : JSON.parse(localCart);

loadMenu();
cartNumber();

function loadMenu() {
    let menuItems = '';
    menu.forEach((m, index) => {
        menuItems += `<div class="menu-item">
                <img src="assets/images/${m.image}" alt="${m.title}">
                <h3>${m.title}</h3>
                <p>$${m.price}</p>
                <button class="add-btn" onclick="addToCart(${index})">Add to Cart</button>
            </div>`
    });
    document.getElementById('menu-section').innerHTML = menuItems;
}

function addToCart(menuIndex) {
    let menuItem = menu[menuIndex];
    let cartSearch = cart.find((cartItem) => cartItem.title == menuItem.title);
    if (cartSearch == undefined) {
        cart.push({
            title: menuItem.title,
            price: menuItem.price,
            quantity: 1,
            total: menuItem.price
        });
        alert(`${menuItem.title} added to cart`);
        cartNumber();
    } else {
        cartSearch.quantity += 1;
        cartSearch.price = menuItem.price;
        cartSearch.total = cartSearch.quantity * menuItem.price;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function cartNumber() {
    document.getElementById('cart-count').innerHTML = cart.length;
}


function sumCartTotal() {
    // let totalCost = cart.reduce((accum, value) => accum + value.total, 0);
    let totalCost = 0;
    cart.forEach(cartItem => {
        totalCost += cartItem.total
    });
    document.getElementById('total-amount').innerHTML = `Total: $${totalCost}`;
}

function listCartItems() {
    let cartLi = '';
    if (cart.length == 0) {
        cartLi = `<li>No items in the cart yet.</li>`;
    } else {
        cart.forEach(cartItem => {
            cartLi += `<li>Item: ${cartItem.title} | Price: $${cartItem.price} | Qty: ${cartItem.quantity} | Total: $${cartItem.total}</li>`
        })
    }

    document.getElementById('cart-list').innerHTML = cartLi;
}

listCartItems();
sumCartTotal();




