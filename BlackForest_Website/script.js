document.addEventListener('DOMContentLoaded', function() {
    let allProducts = []; // Array to store all products fetched from the API
    const container = document.getElementById('products-container');
    const productCardTemplate = document.getElementById('product-card-template');

    async function fetchProducts() {
        const response = await fetch('https://fakestoreapi.com/products');
        allProducts = await response.json();
        renderProducts(allProducts);
    }

    function renderProducts(products) {
        container.innerHTML = '';
        products.forEach(product => {
            const productCard = productCardTemplate.content.cloneNode(true);
            const card = productCard.querySelector('.card');
            card.querySelector('.card-img-top').src = product.image;
            card.querySelector('.card-img-top').alt = product.title;
            card.querySelector('.card-title').textContent = product.title;
            card.querySelector('.card-text').textContent = `$${product.price}`;
            card.querySelector('.category').textContent = product.category;
            card.querySelector('.add-to-cart-btn').dataset.id = product.id;
            container.appendChild(productCard);
        });
    }

    fetchProducts();

    // Search products by name and category
    function searchProduct() {
        const searchInput = document.getElementById('searchInput').value.toLowerCase();
        const categorySelect = document.getElementById('categorySelect').value.toLowerCase();
        const filteredProducts = allProducts.filter(product => {
            const productName = product.title.toLowerCase();
            const productCategory = product.category.toLowerCase();
            return productName.includes(searchInput) && (categorySelect === 'all' || productCategory === categorySelect);
        });
        renderProducts(filteredProducts);
    }

    document.getElementById('searchInput').addEventListener('input', searchProduct);
    document.getElementById('categorySelect').addEventListener('change', searchProduct);

    // On clicking add to cart button, display alert with the product name
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.getAttribute('data-id');
            const product = allProducts.find(product => product.id == productId);
            if (product) {
                showAlert(product.title);
            }
        }
    });

    // Function to display alert using native alert function
    function showAlert(productName) {
        alert(`${productName} has been added to your cart.`);
    }


});