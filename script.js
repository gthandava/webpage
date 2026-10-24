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
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)} each</p>
                    </div>
                    <div class="cart-item-controls">
                        <button class="decrease-btn">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-btn">+</button>
                        <button class="remove-btn">Remove</button>
                        </div>
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
    searchInput.addEventListener("input", function()
    {
        filterFoodItems();
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
let selectedCategory = "all";


function filterFoodItems()
{
    let searchText = searchInput.value.toLowerCase();
    let visibleItems = 0;

    menuFoodItems.forEach(function(foodItem)
    {
        let foodCategory = foodItem.dataset.category;
        let foodName = foodItem.querySelector("h3").innerText.toLowerCase();

        let categoryMatches = selectedCategory === "all" || foodCategory === selectedCategory;

        let searchMatches = foodName.includes(searchText);

        if(categoryMatches && searchMatches)
        {
            foodItem.style.display = "block";
            visibleItems++;
        }
        else
        {
            foodItem.style.display = "none";
        }
    });

    let noFoodMessage = document.querySelector("#no-food-message");

    if(visibleItems === 0)
    {
        noFoodMessage.style.display = "block";
    }
    else
    {
        noFoodMessage.style.display = "none";
    }
}

categoryButtons.forEach(function(button)
{
    button.addEventListener("click",function()
{
    selectedCategory = button.innerText.toLowerCase();
    categoryButtons.forEach(function(categoryButton)
        {
            categoryButton.classList.remove("active");
        });
    button.classList.add("active");
    filterFoodItems();
});
});

let checkoutButton = document.querySelector("#checkout-btn");

if(checkoutButton !== null)
{
    checkoutButton.addEventListener("click", function()
    {
        if(cart.length === 0)
        {
            alert("Your cart is empty.");
        }
        else
        {
            alert("Order placed successfully!");
        }
    });
}


// Login Form Validation

let loginForm = document.querySelector("#login-form");

if(loginForm !== null)
{
    loginForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        let email = document.querySelector("#email").value.trim();

        let password = document.querySelector("#password").value.trim();


        if(email === "")
        {
            alert("Please enter your email.");
            return;
        }


        if(password === "")
        {
            alert("Please enter your password.");
            return;
        }


        alert("Login  successful!");
    });
}


// Register Form Validation

let registerForm = document.querySelector("#register-form");

if(registerForm !== null)
{
    registerForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        let username =
            document.querySelector("#username").value.trim();

        let email =
            document.querySelector("#register-email").value.trim();

        let mobile =
            document.querySelector("#mobile").value.trim();

        let password =
            document.querySelector("#register-password").value.trim();

        let confirmPassword =
            document.querySelector("#confirm-password").value.trim();


        if(username === "")
        {
            alert("Please enter your username.");
            return;
        }


        if(email === "")
        {
            alert("Please enter your email.");
            return;
        }


        if(mobile === "")
        {
            alert("Please enter your mobile number.");
            return;
        }


        if(password === "")
        {
            alert("Please enter your password.");
            return;
        }


        if(password.length < 8)
        {
            alert("Password must contain at least 6 characters.");
            return;
        }


        if(confirmPassword === "")
        {
            alert("Please confirm your password.");
            return;
        }


        if(password !== confirmPassword)
        {
            alert("Passwords do not match.");
            return;
        }


        alert("Registration successful!");
    });
}