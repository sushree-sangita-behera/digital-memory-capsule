function upgrade() {
  let confirmPay = confirm("Proceed to payment?");

  if (confirmPay) {
    alert("Processing...");
    
    setTimeout(() => {
      alert("Payment Successful ✅");
      localStorage.setItem("plan", "pro");
    }, 1500);
  }
}