const responseDiv = document.getElementById('response');

// Create Product
document.getElementById('create-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('create-productName').value;
    const price = document.getElementById('create-productPrice').value;

    try {
        const response = await fetch('http://localhost:3000/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        });
        const data = await response.json();
        responseDiv.innerText = JSON.stringify(data, null, 4);
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
});

// Get All Products
document.getElementById('get-products-btn').addEventListener('click', async function() {
    try {
        const response = await fetch('http://localhost:3000/api/v1/products');
        const data = await response.json();
        responseDiv.innerText = JSON.stringify(data, null, 4);
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
});

// Get Product by ID
document.getElementById('get-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('get-productId').value;

    try {
        const response = await fetch(`http://localhost:3000/api/v1/products/${id}`);
        const data = await response.json();
        responseDiv.innerText = JSON.stringify(data, null, 4);
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
});

// Update Product
document.getElementById('update-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('update-productId').value;
    const name = document.getElementById('update-productName').value;
    const price = document.getElementById('update-productPrice').value;

    try {
        const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, price }),
        });
        const data = await response.json();
        responseDiv.innerText = JSON.stringify(data, null, 4);
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
});

// Delete Product
document.getElementById('delete-product-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('delete-productId').value;

    try {
        const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        responseDiv.innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        responseDiv.innerText = 'Error: ' + error.message;
    }
});
