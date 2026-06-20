const order = [];

function addItem(name, price) {
  order.push({ name, price });
  displayOrder();
}

function displayOrder() {
  const orderList = document.getElementById("orderList");
  const totalText = document.getElementById("total");

  orderList.innerHTML = "";

  let total = 0;

  order.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price.toFixed(2)} `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeItem(index);

    li.appendChild(removeButton);
    orderList.appendChild(li);
  });

  totalText.textContent = `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {
  order.splice(index, 1);
  displayOrder();
}

function sendWhatsApp() {
  if (order.length === 0) {
    alert("Please add at least one item to your order.");
    return;
  }

  const customerName = document.getElementById("customerName").value || "Not provided";
  const orderNotes = document.getElementById("orderNotes").value || "No notes";

  let total = 0;
  let orderText = "";

  order.forEach((item) => {
    total += item.price;
    orderText += `- ${item.name} - $${item.price.toFixed(2)}\n`;
  });

  const message =
`Hello Fener's Place, I would like to place an order:

${orderText}
Total before HST: $${total.toFixed(2)}

Name: ${customerName}
Notes: ${orderNotes}`;

  const phoneNumber = "15062240209";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank");
}
