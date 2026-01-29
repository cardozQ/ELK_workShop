import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:3000'; // Update with your API URL
const CART_ID = 'user-cart-1'; // Using a fixed cart ID for simplicity

export default function ShoppingCartApp() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data);
      console.log('Products:', data);
    } catch (error) {
      showNotification('Error fetching products');
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${CART_ID}`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      showNotification('Error fetching cart');
    }
  };

  const addToCart = async (productId, quantity) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${CART_ID}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        showNotification('Item added to cart');
        fetchCart();
      } else {
        const error = await response.json();
        showNotification(error.error || 'Failed to add item');
      }
    } catch (error) {
      showNotification('Error adding to cart');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getProductDetails = (productId) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">Shop</h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Cart:</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item, index) => {
                      const product = getProductDetails(item.productId);
                      return (
                        <div key={index} className="flex justify-between items-start border-b pb-3">
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {product ? product.name : `Product ${item.productId}`}
                            </p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-blue-600">${getCartTotal()}</span>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, loading }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setQuantity(1);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
      {product.description && (
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
      )}
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-blue-600">${product.price}</span>
      </div>
      
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}