document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("myModal");
    var closeBtn = document.getElementsByClassName("close")[0];
    var infoPopup = document.getElementById("infoPopup");
    var closeInfoBtn = document.getElementsByClassName("close-info")[0];
    var quantityInput = document.getElementById("quantity");
    var quantityWarning = document.getElementById("quantityWarning");

    // Load items from JSON
    fetch('items.json')
        .then(response => response.json())
        .then(data => {
            var itemContainer = document.getElementById("itemContainer");
            data.forEach(item => {
                var itemCard = document.createElement("div");
                itemCard.className = "item-card";
                itemCard.setAttribute("data-item-name", item.name);
                itemCard.setAttribute("data-type", item.type);

                itemCard.innerHTML = `
                    <h2>${item.name} (${item.type.charAt(0).toUpperCase() + item.type.slice(1)})</h2>
                    <img src="${item.image}" alt="${item.name} Image">
                    <p>${item.description}</p>
                    <button class="select-btn">Select</button>
                    <span class="info-btn">?</span>
                `;
                itemContainer.appendChild(itemCard);
            });

            addEventListeners();
        });

    function addEventListeners() {
        var selectButtons = document.getElementsByClassName("select-btn");
        Array.prototype.forEach.call(selectButtons, function(button) {
            button.addEventListener("click", function() {
                var itemCard = this.parentElement;
                var itemName = itemCard.getAttribute("data-item-name");
                document.getElementById("itemName").value = itemName;
                modal.style.display = "block";
            });
        });

        closeBtn.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            } else if (event.target == infoPopup) {
                infoPopup.style.display = "none";
            }
        }

        // Filtering
        var filterButtons = document.getElementsByClassName("filter-btn");
        Array.prototype.forEach.call(filterButtons, function(button) {
            button.addEventListener("click", function() {
                var type = this.getAttribute("data-type");
                var itemCards = document.getElementsByClassName("item-card");
                Array.prototype.forEach.call(itemCards, function(card) {
                    if (type === "all" || card.getAttribute("data-type") === type) {
                        card.style.display = "inline-block";
                    } else {
                        card.style.display = "none";
                    }
                });

                // Highlight the selected filter button
                Array.prototype.forEach.call(filterButtons, function(btn) {
                    btn.classList.remove("active");
                });
                this.classList.add("active");
            });
        });

        // Set default active filter
        document.querySelector('.filter-btn[data-type="all"]').classList.add("active");

        // Info popup
        var infoButtons = document.getElementsByClassName("info-btn");
        Array.prototype.forEach.call(infoButtons, function(button) {
            button.addEventListener("click", function() {
                var itemCard = this.parentElement;
                var itemName = itemCard.getAttribute("data-item-name");
                var itemDescription = itemCard.querySelector("p").textContent;
                var itemImage = itemCard.querySelector("img").src;

                var infoDetails = document.getElementById("infoDetails");
                infoDetails.innerHTML = `
                    <h2>${itemName}</h2>
                    <img src="${itemImage}" alt="${itemName}">
                    <p>${itemDescription}</p>
                `;
                infoPopup.style.display = "block";
            });
        });

        closeInfoBtn.onclick = function() {
            infoPopup.style.display = "none";
        }
    }

     // Quantity input validation
     quantityInput.addEventListener("input", function() {
        if (quantityInput.value > 250000) {
            quantityWarning.textContent = "Value cannot exceed 250,000";
            quantityWarning.style.display = "inline-block";
            quantityInput.value = 250000;
        } else {
            quantityWarning.style.display = "none";
        }
    });

});