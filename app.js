
  let orders = [];
let adminUPI = "";

// PAGE SWITCH
function showPage(page) {
  document.getElementById("buyPage").style.display = "none";
  document.getElementById("sellPage").style.display = "none";
  document.getElementById("adminPage").style.display = "none";

  document.getElementById(page + "Page").style.display = "block";
}

// SELL FUNCTION
function addSell() {
  const amount = document.getElementById("amount").value;
  if (!amount) return alert("Enter amount");

  orders.push({
    id: Date.now(),
    amount: parseInt(amount),
    status: "pending"
  });

  document.getElementById("amount").value = "";
  renderBuy();
}

// RENDER BUY
function renderBuy() {
  const buyDiv = document.getElementById("buyPage");

  buyDiv.innerHTML = "<h3>Buy Orders</h3>";

  let pending = orders.filter(o => o.status === "pending");

  if (pending.length === 0) {
    buyDiv.innerHTML += "<p>No orders yet</p>";
  }

  pending.forEach(o => {
    buyDiv.innerHTML += 
      <div class="card">
        ₹${o.amount} + Reward ₹${Math.floor(o.amount * 0.05)}
        <br>
        <button onclick="buyOrder(${o.id})">Buy</button>
      </div>
    ;
  });

  if (adminUPI) {
    buyDiv.innerHTML += <p><b>Pay to:</b> ${adminUPI}</p>;
  }
}

// BUY CLICK
function buyOrder(id) {
  orders = orders.map(o => {
    if (o.id === id) o.status = "done";
    return o;
  });

  renderBuy();
}

// SELL PAGE UI
function loadSellPage() {
  document.getElementById("sellPage").innerHTML = 
    <h3>Sell</h3>
    <input id="amount" placeholder="Enter amount">
    <br><br>
    <button onclick="addSell()">Sell Now</button>
  ;
}

// ADMIN PAGE UI
function loadAdminPage() {
  document.getElementById("adminPage").innerHTML = 
    <h3>Admin Panel</h3>
    <input id="upi" placeholder="Enter UPI ID">
    <br><br>
    <button onclick="saveUPI()">Save</button>
  ;
}

// SAVE UPI
function saveUPI() {
  adminUPI = document.getElementById("upi").value;
  alert("UPI Saved");
  renderBuy();
}

// LOAD ON START
window.onload = function () {
  loadSellPage();
  loadAdminPage();
  renderBuy();
};
