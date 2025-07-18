let cart = [];

function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach(s => {
    grid.innerHTML += `
      <div class="card">
        <img src="${s.image}" alt="${s.name}" />
        <div class="card-body">
          <h3 class="card-title">${s.name}</h3>
          <p class="card-brand">${s.brand}</p>
          <p class="card-price">${s.price} ₽</p>
          <button class="buy-btn" onclick="addToCart(${s.id})">Купить</button>
        </div>
      </div>
    `;
  });
}

function filterBrand(brand) {
  const filtered = brand === 'all' ? sneakers : sneakers.filter(s => s.brand === brand);
  renderProducts(filtered);
}

document.getElementById('search').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = sneakers.filter(s => s.name.toLowerCase().includes(q));
  renderProducts(filtered);
});

function addToCart(id) {
  const item = sneakers.find(s => s.id === id);
  cart.push(item);
  updateCart();
}

function updateCart() {
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  cart.forEach((item, i) => {
    list.innerHTML += `<li>${item.name} — ${item.price} ₽ <button onclick="removeItem(${i})">✖</button></li>`;
  });
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  document.getElementById('cartTotal').textContent = `Итого: ${total} ₽`;
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function checkout() {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  const items = cart.map(i => `- ${i.name}: ${i.price} ₽`).join('\\n');
  alert(`Ваш заказ:\\n${items}\\n\\nИтого: ${total} ₽\\n\\nСпасибо за покупку!`);
  cart = [];
  updateCart();
}

renderProducts(sneakers);
