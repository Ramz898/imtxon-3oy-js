document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const searchInput = document.getElementById("search");
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");
    const loading = document.getElementById("loading");

    let products = [];

    // Fake API dan mahsulotlarni yuklash
    async function fetchProducts() {
        loading.style.display = "block";
        try {
            const response = await fetch("https://fakestoreapi.com/products");
            products = await response.json();
            displayProducts(products);
            populateCategories(products);
        } catch (error) {
            console.error("Xatolik:", error);
        }
        loading.style.display = "none";
    }

    // Mahsulotlarni sahifada ko‘rsatish
    function displayProducts(filteredProducts) {
        productList.innerHTML = "";
        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" width="100">
                <h3>${product.title}</h3>
                <p>${product.price} $</p>
            `;
            productList.appendChild(productCard);
        });
    }

    // Kategoriyalarni filter uchun qo‘shish
    function populateCategories(products) {
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }

    // Qidiruv funksiyasi
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(query)
        );
        displayProducts(filteredProducts);
    });

    // Kategoriya bo‘yicha filterlash
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = selectedCategory === "all" 
            ? products 
            : products.filter(product => product.category === selectedCategory);
        displayProducts(filteredProducts);
    });

    // Narx bo‘yicha saralash
    priceSort.addEventListener("change", () => {
        const sortOrder = priceSort.value;
        let sortedProducts = [...products];

        if (sortOrder === "asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(sortedProducts);
    });

    fetchProducts();
});


