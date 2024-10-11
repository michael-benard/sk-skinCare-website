document.addEventListener('DOMContentLoaded',() => {
    let menu = document.getElementById("menue")
    let iconbtn = document.getElementById("harmburger")
    let cancelbtn = document.getElementById("cancel")
    iconbtn.addEventListener("click",() => {
        menu.classList.add("menue-active")
        iconbtn.style.display = "none"
        cancelbtn.style.display = "block";
    });
    cancelbtn.addEventListener("click", () => {
        menu.classList.remove("menue-active")
        iconbtn.style.display = "block"
        cancelbtn.style.display = "none"
    })
})

let product = [
    { category : "Facial-care", image:"c5.png",Name: "Bohemian skin care", price:5000},
    {category : "Facial-care", image:"t1.jpg",Name: "Face Toner", price:3000},
    {category : "Facial-care", image:"m1.png",Name: "Oriflame", price:5000},
    {category : "Facial-care", image:"m2.png",Name: "Nivea soft jail", price:5000},
    {category : "Facial-care", image:"c6.png",Name: "Dr. loretta oil", price:3500},
    {category : "Facial-care", image:"c8.png",Name: "Face glowl", price:2000},
    {category : "Facial-care", image:"c4.png",Name: "Ceramide", price:5000},
    {category : "Facial-care", image:"t2.png",Name: "Innisfree", price:5000},
    {category : "body-care", image:"body1.png",Name: "Beauty counter", price:5000},
    {category : "body-care", image:"body3.png",Name: "Himalaya", price:3000},
    {category : "body-care", image:"body4.jpg",Name: "Foaming Body scrub", price:3000},
    {category : "body-care", image:"body4.jpg",Name: "Himalaya", price:3000},
]
let localCart = localStorage.getItem('cart');
let cart = !localCart ? [] : JSON.parse(localCart);

loadproducts();

function loadproducts(){
    let resp = ""
    product.forEach((x,index) => {
        resp +=`<div class="col-6 col-md-3 Products">
                        <img src="img/${x.image}" alt="">
                        <div class="price">
                            <h5>${x.Name}</h5>
                            <h6>#${x.price}</h6>
                           <button type="button" onclick = "addToCart(${index})">Add to  cart</button>
                        </div>
                    </div>`
    let container = document.querySelector(`#${x.category} .container .row`)
    container.innerHTML = resp
    })

}
loadproducts()
cartcount()
function addToCart(cartItem){
    let menu = product[cartItem]
    let items = cart.find(goods => goods.Name == menu.Name)
    if(!items){
        cart.push({
            goods: menu.image,
            Name: menu.Name,
            price: menu.price,
            quantity: 1,
            total: menu.price
        })
        console.log(cart)
        let notice = document.getElementById("Notification")
        notice.innerHTML = `${menu.Name} has been add to your cart`
        notice.classList.add("show")
       cartcount()
       setTimeout(() => {
        notice.classList.remove("show")
        },3)
    }else{
        items.quantity += 1;
        items.price = menu.price
        cart.total = items.quantity * menu.price
        // console.log(cart.total)
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}
function cartcount(){
    let addedItems = cart.length
   let count =  document.getElementById("number-cart")
   count.style.backgroundColor = "red"
   count.style.color = "white"
   count.innerHTML = addedItems
   localStorage.getItem("cart",JSON.stringify(cart))
}