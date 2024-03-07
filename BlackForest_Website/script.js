document.addEventListener('DOMContentLoaded', function () {
    async function fetchProducts() {
      const response = await fetch('https://fakestoreapi.com/products?limit=15');
      const products = await response.json();
      const container = document.getElementById('products-container');
      
      products.forEach(product => {
        const productCard = `
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        container.innerHTML += productCard;
      });
    }
  
    fetchProducts();
  
    // On clicking add to cart button, product will not be added to cart. Just logging to the console
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart-btn')) {
        const productId = event.target.getAttribute('data-id');
        console.log(`Product added to cart with ID: ${productId}`);
      }
    });
  });