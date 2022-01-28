/************* DEFINE VARIABLES *****************/
// Mobile menu
let menuBtn = document.querySelector(".header--menu-btn");
let mobileMenu = document.querySelector(".menu");
let mobileDropdown = document.querySelector(".menu--nav--drop");

// Shop elements
let shopHtml = document.querySelector("#shop");
let shopNav = document.querySelectorAll(".shop--nav--link");
let carsHtml;

// Config window
let configWindow = document.querySelector(".config");
let configCloseBtn = document.querySelector(".config .config--close");

// Buy window
let buyPrompt = document.querySelector(".buy");
let buyBtn = document.querySelector(".buy .buy--confirm");
let buyCloseBtn = document.querySelector(".buy .buy--close");

// Contact form elements
let contactFields = document.querySelectorAll(".contact .contact--field");

// Create array of cars (can be received from API for example)
let cars = [
    {
        "id": 1,
        "category": "Hatchback",
        "image": "product-card-audi-q3.png",
        "name": "Audi Q3 2020",
        "seats": "5",
        "doors": "4",
        "features" : ["Includes 300 free km", "Theft Protection", "Non Refundable"],
        "price" : 29999,
        "new": false,
        "configuration": [
            {
                "name" : "48-V electrical system",
                "price": 0,
                "checked": false
            },
            {
                "name" : "Adaptive air suspension - sport",
                "price": 278.60,
                "checked": false
            },
            {
                "name" : "Acoustic side windows - optional",
                "price": 558.78,
                "checked": false
            },
            {
                "name" : "Acoustic and heat-insulting glass",
                "price": 357.29,
                "checked": false
            },
            {
                "name" : "Ambiental LED",
                "price": 637.48,
                "checked": false
            },
        ]
    },
    {
        "id": 2,
        "category": "Limousine",
        "image": "product-card-audi-a4.png",
        "name": "Audi A4 2020",
        "seats": "5",
        "doors": "4",
        "features" : ["Includes 400 free km", "Theft Protection", "Non Refundable"],
        "price" : 24999,
        "new": false,
        "configuration": [
            {
                "name" : "Adaptive air suspension - sport",
                "price": 278.60,
                "checked": false
            },
            {
                "name" : "Acoustic side windows - optional",
                "price": 558.78,
                "checked": false
            },
            {
                "name" : "Acoustic and heat-insulting glass",
                "price": 357.29,
                "checked": false
            },
            {
                "name" : "Ambiental LED",
                "price": 637.48,
                "checked": false
            }
        ]
    },
    {
        "id": 3,
        "category": "Hatchback",
        "image": "product-card-audi-a3.png",
        "name": "Audi A3 2020",
        "seats": "5",
        "doors": "4",
        "features" : ["Includes 200 free km", "Theft Protection", "Non Refundable"],
        "price" : 19999,
        "new": true,
        "configuration": [
            {
                "name" : "48-V electrical system",
                "price": 0,
                "checked": false
            },
            {
                "name" : "Adaptive air suspension - sport",
                "price": 278.60,
                "checked": false
            },
            {
                "name" : "Acoustic side windows - optional",
                "price": 558.78,
                "checked": false
            },
            {
                "name" : "Acoustic and heat-insulting glass",
                "price": 357.29,
                "checked": false
            }
        ]
    },
    {
        "id": 4,
        "category": "SUV",
        "image": "product-card-audi-q7.png",
        "name": "Audi Q7 2020",
        "seats": "5",
        "doors": "4",
        "features" : ["Includes 300 free km", "Theft Protection", "Non Refundable"],
        "price" : 39999,
        "new": true,
        "configuration": [
            {
                "name" : "48-V electrical system",
                "price": 0,
                "checked": false
            },
            {
                "name" : "Adaptive air suspension - sport",
                "price": 278.60,
                "checked": false
            },
            {
                "name" : "Acoustic side windows - optional",
                "price": 558.78,
                "checked": false
            },
            {
                "name" : "Ambiental LED",
                "price": 637.48,
                "checked": false
            }
        ]
    }
];



/************* MOBILE MENU FUNCTION *****************/

// Add event listener to menu button
menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("header--menu-btn__active");
    mobileMenu.classList.toggle("menu__active");
    document.querySelector("html").classList.toggle("menu-open");
});

// Add event listener to dropdown list in mobile menu
mobileDropdown.addEventListener("click", () => {
    mobileDropdown.classList.toggle("menu--nav--drop__open");
})



/************* CAR LISTING FUNCTION *****************/

// Function to generate shop on frontend
function generateShop(cars) {
    shopHtml.innerHTML = "";
    cars.forEach(car => {
        var html = 
        `
        <div class="car" data-id="${car.id}" data-category="${car.category}">
            ${car.new == true ? '<span class="car--badge">New</span>' : ''}
            <img src="assets/Product Images/${car.image}" alt="${car.name}" class="car--img">
            <span class="car--specs">${car.seats} Seats, ${car.doors} Doors</span>
            <h3 class="car--name">${car.name}</h3>
            <button class="car--config" data-id="${car.id}">Configurator</button>
            <ul class="car--info">
                ${listFeatures(car.features)}
            </ul>
            <div class="car--bottom">
                <div class="car--price">
                    Starting from <br>
                    <span>${car.price.toLocaleString()} €</span>
                </div>
                <div class="car--btn">
                    <button data-id="${car.id}">Buy Now</button>
                </div>
            </div>
        </div>
        `;
        shopHtml.innerHTML += html;
    });
    // Insert HTML
    carsHtml = document.querySelectorAll("#shop .car");

    // Iniiate buttons and links event listeners
    configListener();
    buyListener();
}

// Function to get car features and return it as html
function listFeatures(features) {
    var html = ``;
    features.forEach(feature => {
        html += `<li>${feature}</li>`
    });
    return html;
}

// Function for setting event listeners to configurator links
function configListener() {
    var configLinks = document.querySelectorAll(".car .car--config");
    configLinks.forEach(link => {
        link.addEventListener("click", () => {
            openConfig(link.dataset.id);
        })
    })
}

// Function for setting event listeners to buy buttons
function buyListener() {
    var buyButtons = document.querySelectorAll(".car .car--btn button");
    buyButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            openBuyPrompt(btn.dataset.id);
        })
    });
}

// Call function for generating shop
generateShop(cars);



/************* BUY PROMPT POPUP FUNCTION *****************/

// Function for opening popup
function openBuyPrompt(id) {
    // Get car from array
    var car = cars.find(x => x.id == id);
    
    // Put car name and price in confirmation window
    document.querySelector(".buy .buy--title").innerHTML = `Are you sure you want to proceed with the purchase of <strong>${car.name} (${car.price.toLocaleString(undefined, {maximumFractionDigits: 2})} €)</strong>?`;


    buyPrompt.classList.remove("buy__hidden");
    document.querySelector("html").style.overflowY = "hidden";
}

// Function for closing popup
function closeBuyPrompt() {
    buyPrompt.classList.add("buy__hidden");
    document.querySelector("html").style.overflowY = "scroll";
}

// Add event listeners to buttons in popup
buyBtn.addEventListener("click", () => {
    closeBuyPrompt();
});
buyCloseBtn.addEventListener("click", () => {
    closeBuyPrompt();
});



/************* CONFIG POPUP FUNCTION *****************/

// Open configuration window
function openConfig(id) {
    // Get car from array
    var car = cars.find(x => x.id == id);
    // Clear config window previous info
    document.querySelector(".config .config--left").innerHTML = "";
    document.querySelector(".config .config--right .config--list").innerHTML = "";
    // Generate html for left config part
    var configLeft = 
    `
    <div class="config--img">
        ${car.new == true ? '<span class="config--badge">New</span>' : ''}
        <img src="assets/Product Images/${car.image}" alt="Audi">
    </div>
        <span class="config--specs">${car.seats} Seats, ${car.doors} Doors</span>
        <h3 class="config--name">${car.name}</h3>
    <div class="config--price">
        Starting from <br>
        <span class="config--price--num">${car.price.toLocaleString(undefined, {maximumFractionDigits: 2})} €</span>
    </div>
    `;
    // Generate html for right config part
    var configRight = listConfigItems(car.configuration);

    // Insert HTML
    document.querySelector(".config .config--left").innerHTML = configLeft;
    document.querySelector(".config .config--right .config--list").innerHTML = configRight;

    // Initiate event listeners for checkboxes
    initiateCheckboxes(car.id, car.price);

    // Open config window
    configWindow.classList.remove("config__hidden");
    document.querySelector("html").style.overflowY = "hidden";
}

// Add close btn event listener for config popup
configCloseBtn.addEventListener("click", () => {
    configWindow.classList.add("config__hidden");
    document.querySelector("html").style.overflowY = "scroll";
});

// Function for generating configuration items
function listConfigItems(items) {
    var html = ``;
    items.forEach((item, i) => {
        html += 
        `
        <div class="config--row row justify-content-between">
            <label class="col config--label">
                <input data-index="${i}" data-name="${item.name}" data-price="${item.price}" type="checkbox" hidden ${item.checked == true ? 'checked' : ''}>
                <div class="config--checkmark"><img src="assets/Icons/checkmark.png" alt="Checkmark"></div>
                <p>${item.name}</p>
            </label>
            <span class="col">
                ${item.price.toLocaleString(undefined, {maximumFractionDigits: 2})} EUR
            </span>
        </div>
        `;
    });
    return html;
}

// Function for initiating event listeners to checkboxes for configuration
function initiateCheckboxes(id) {
    var checkboxes = document.querySelectorAll(".config .config--list .config--label input");
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            var car = cars.find(x => x.id == id);
            if (checkbox.checked == true) {
                car.price = Number(car.price) + Number(checkbox.dataset.price);
                car.configuration[checkbox.dataset.index].checked = true;
                updatePriceHtml(car.id, car.price);
            }
            else {
                car.price = Number(car.price) - Number(checkbox.dataset.price);
                car.configuration[checkbox.dataset.index].checked = false;
                updatePriceHtml(car.id, car.price);
            }
        });
    });
}

// Function for updating price in HTML for specific car
function updatePriceHtml(id, price) {
    document.querySelector(".config .config--price .config--price--num").innerHTML = `${price.toLocaleString(undefined, {maximumFractionDigits: 2})} €`;
    document.querySelector(".car[data-id='" + id + "'] .car--price span").innerHTML = `${price.toLocaleString(undefined, {maximumFractionDigits: 2})} €`;
}




/************* FILTERING FUNCTION *****************/

// Add event listener to shop navigation categories
shopNav.forEach(nav => {
    nav.addEventListener("click", function() {
        filterCars(this.dataset.cat);
        clearCarNav();
        nav.classList.add("shop--nav__active");
    });
})

// Function for clearing nav links from active class
function clearCarNav() {
    shopNav.forEach(nav => {
        nav.classList.remove("shop--nav__active");
    })
}

// Function filter cars
function filterCars(category) {
    if (category == "All") {
        carsHtml.forEach(car => {
            car.classList.remove("car__hidden");
        })
    }
    else {
        carsHtml.forEach(car => {
            if (car.dataset.category == category) {
                car.classList.remove("car__hidden");
            }
            else {
                car.classList.add("car__hidden");
            }
        })
    }
}



/************* CONTACT FORM FUNCTION *****************/
contactFields.forEach(field => {
    field.addEventListener("focus", () => {
        hideLabel(field.previousElementSibling);
    })
    field.addEventListener("blur", () => {
        if (!field.value) {
            showLabel(field.previousElementSibling);
        }
        else {
            hideLabel(field.previousElementSibling);
        }
    })
})

// Function for hiding label
function hideLabel(field) {
    field.style.display = "none";
}

// Function for showing label
function showLabel(field) {
    field.style.display = "block";
}