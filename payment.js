// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {

    // Get elements
    const cardInput = document.getElementById("card");
    const nameInput = document.getElementById("name");
    const dateInput = document.getElementById("date");
    const cvvInput = document.getElementById("cvv");
    const payBtn = document.querySelector(".pay-btn");

    // Create message box dynamically (no HTML change needed)
    let messageBox = document.createElement("div");
    messageBox.id = "message";
    messageBox.style.textAlign = "center";
    messageBox.style.marginTop = "15px";
    messageBox.style.fontWeight = "bold";
    payBtn.parentNode.appendChild(messageBox);

    // -----------------------------
    // CARD NUMBER FORMAT
    // -----------------------------
    cardInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 16);

        let parts = value.match(/.{1,4}/g);
        this.value = parts ? parts.join(" ") : value;
    });

    // -----------------------------
    // EXPIRY DATE FORMAT (MM/YY)
    // -----------------------------
    dateInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 4);

        if (value.length >= 3) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }

        this.value = value;
    });

    // -----------------------------
    // CVV (only 3 digits)
    // -----------------------------
    cvvInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "").substring(0, 3);
    });

    // -----------------------------
    // SHOW MESSAGE
    // -----------------------------
    function showMessage(msg, color) {
        messageBox.innerText = msg;
        messageBox.style.color = color;
    }

    // -----------------------------
    // VALIDATION FUNCTION
    // -----------------------------
    function validateForm() {
        let card = cardInput.value.replace(/\s/g, "");
        let name = nameInput.value.trim();
        let date = dateInput.value;
        let cvv = cvvInput.value;

        // Empty fields
        if (!card || !name || !date || !cvv) {
            showMessage("⚠️ Please fill all fields", "red");
            return false;
        }

        // Card number
        if (card.length !== 16) {
            showMessage("❌ Card number must be 16 digits", "red");
            return false;
        }

        // Name
        if (name.length < 3) {
            showMessage("❌ Enter valid name", "red");
            return false;
        }

        // Expiry format
        if (!/^\d{2}\/\d{2}$/.test(date)) {
            showMessage("❌ Invalid expiry date", "red");
            return false;
        }

        let [month, year] = date.split("/");
        month = parseInt(month);
        year = parseInt("20" + year);

        let now = new Date();
        let currentYear = now.getFullYear();
        let currentMonth = now.getMonth() + 1;

        if (month < 1 || month > 12) {
            showMessage("❌ Invalid month", "red");
            return false;
        }

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            showMessage("❌ Card expired", "red");
            return false;
        }

        // CVV
        if (cvv.length !== 3) {
            showMessage("❌ CVV must be 3 digits", "red");
            return false;
        }

        return true;
    }

    // -----------------------------
    // PAY BUTTON CLICK
    // -----------------------------
    payBtn.addEventListener("click", function () {

        if (validateForm()) {

            showMessage("⏳ Processing payment...", "blue");

            // Simulate API delay
            setTimeout(() => {
                showMessage("✅ Payment Successful!", "green");

                // Optional: reset form
                cardInput.value = "";
                nameInput.value = "";
                dateInput.value = "";
                cvvInput.value = "";
            }, 2000);
        }

    });

});
