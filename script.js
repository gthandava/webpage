console.log("Restarent website javaScript is loaded");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
function updateCartTotal()
{
    let total = 0;
    cart.forEach(function(item)
    {
        total += item.price * item.quantity;
    });
    let cartTotal = document.querySelector("#cart-total");

    if(cartTotal !== null)
    {
        cartTotal.innerHTML =
            "Total: $" + total.toFixed(2);
    }
}

function updateCartCount()
{
    let cartcount = 0;
    cart.forEach(function(item)
    {
        cartcount += item.quantity;
    });
    let cartCountElement = document.querySelector("#cart-count");
    if(cartCountElement !== null)
    {
        cartCountElement.innerHTML = cartcount;
    }
}

function displayCart()
{
    let cartItems = document.querySelector("#cart-items");
    if(cartItems===null)
    {
        return;
    }
    cartItems.innerHTML = "";
    if(cart.length === 0)
    {
        cartItems.innerHTML = "<p>Your cart is empty lets add some items.</p>";
        return;
    }
    cart.forEach(function(item)
    {
        let cartItem = document.createElement("div");
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button class="decrease-btn">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="increase-btn">+</button>
            <button class="remove-btn">Remove</button>
        `;
        cartItems.appendChild(cartItem);
        let increaseButton = cartItem.querySelector(".increase-btn");
        increaseButton.addEventListener("click", function()
                {
                    item.quantity++;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart();
                    updateCartTotal();
                    updateCartCount();
                });
        let decreaseButton =cartItem.querySelector(".decrease-btn");
        decreaseButton.addEventListener("click", function()
        {
           if(item.quantity > 1)
            {
                    item.quantity--;
                    localStorage.setItem("cart", JSON.stringify(cart));
                    displayCart();
                    updateCartTotal();
                    updateCartCount();
                }
        });
        let removeBtn = cartItem.querySelector(".remove-btn");

        removeBtn.addEventListener("click", function()
        {
            cart = cart.filter(function(cartItem)
            {
                return cartItem.name !== item.name;
            });
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
            updateCartTotal();
            updateCartCount();
        });
    });
}
let cartButtons = document.querySelectorAll(".addtocart-btn");
cartButtons.forEach(function(button)
{
    button.addEventListener("click", function()
    {
        let itemName =button.parentElement.querySelector("h3").innerText;
        let itemPrice =button.parentElement.querySelector("h4").innerText;
        itemPrice = itemPrice.replace("$", "");
        itemPrice = parseFloat(itemPrice);
        if(cart.find(item => item.name === itemName))
        {
            cart.find(item => item.name === itemName).quantity++;
        }
        else
        {
            cart.push({
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        updateCartTotal();
        updateCartCount();
    });
});


displayCart();

updateCartTotal();

updateCartCount();


let searchInput = document.querySelector("#searchinput");

let foodItems = document.querySelectorAll(".fooditems > div");
if(searchInput !== null)
{
    searchInput.addEventListener("input",function()
{
    let searchText = searchInput.value.toLowerCase();
    foodItems.forEach(function(foodItem)
{
    let foodName = foodItem.querySelector("h3").innerText.toLowerCase();
    if(foodName.includes(searchText))
    {
        foodItem.style.display = "block";
    }
    else
    {
        foodItem.style.display= "none";
    }
});
});
}
let exploreMenu = document.querySelector(".explore-btn");
if(exploreMenu !== null)
{
    exploreMenu.addEventListener("click",function()
{
     document.querySelector("#our-menu").scrollIntoView();
});
}

let categoryButtons = document.querySelectorAll(".category-btn");
let menuFoodItems = document.querySelectorAll(".fooditems .fooditem");
console.log(menuFoodItems);

categoryButtons.forEach(function(button)
{
    button.addEventListener("click",function()
{
    let selectedCategory = button.innerText.toLowerCase();
    categoryButtons.forEach(function(categoryButton)
        {
            categoryButton.classList.remove("active");
        });
    button.classList.add("active");
    menuFoodItems.forEach(function(foodItem)
{
    let foodCategory = foodItem.dataset.category;
    if(selectedCategory === "all" || foodCategory === selectedCategory)
    {
        foodItem.style.display = "block";
    }
    else
    {
        foodItem.style.display = "none";
    }
});
});
});