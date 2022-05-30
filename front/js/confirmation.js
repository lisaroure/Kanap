function commandConfirmed() {
    const idOrder = document.getElementById("orderId");
    idOrder.innerText = localStorage.getItem("orderId");
    localStorage.clear();
}

commandConfirmed();