let cart = JSON.parse(localStorage.getItem("cart")) || [];
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
function displayCart() {
  const table = document.querySelector("table");
  const totalDisplay = document.querySelector(".total");
  if (!table || !totalDisplay) return;

  table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

  let totalAmount = 0;

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    row.innerHTML = `
      <td><img src="${item.img}" alt="${item.name}" /></td>
      <td>${item.name}</td>
      <td>Rs.${item.price}</td>
      <td>
        <button class="decrease" data-index="${index}">-</button>
        ${item.quantity}
        <button class="increase" data-index="${index}">+</button>
      </td>
      <td>Rs.${itemTotal}</td>
    `;
    table.appendChild(row);
  });

  totalDisplay.textContent = `Total Amount: Rs.${totalAmount}`;


  document.querySelectorAll(".increase").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(btn.dataset.index, 1))
  );
  document.querySelectorAll(".decrease").forEach(btn =>
    btn.addEventListener("click", () => changeQuantity(btn.dataset.index, -1))
  );
}


function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}


document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const product = {
        name: button.dataset.name,
        price: parseInt(button.dataset.price),
        img: button.dataset.img
      };
      addToCart(product);
    });
  });


  if (window.location.href.includes("cart.html")) {
    displayCart();
  }
});
