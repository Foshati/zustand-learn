import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

export default function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCartStore();
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Store</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Sidebar - Products */}
        <div>
          <h2 className="mb-2 text-xl font-semibold">Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
            {products.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 shadow-xl image-full"
              >
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-32 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-sm">{product.title}</h2>
                  <p>{product.price} USD</p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="btn btn-primary btn-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div>
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowCart(!showCart)}
              className="btn btn-primary"
            >
              {showCart ? "Close Cart" : "Open Cart"}
            </button>
            <div className="badge badge-primary ml-2">{cart.length}</div>
          </div>
          {showCart && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">Cart</h2>
              {cart.length === 0 ? (
                <p>The cart is empty</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="card bg-base-100 shadow-xl flex items-center justify-between"
                      >
                        <div className="card-body">
                          <h2 className="card-title text-sm">{item.title}</h2>
                          <p>{item.price} USD</p>
                          <div className="card-actions justify-start">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="btn btn-error btn-sm"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="btn btn-primary btn-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="btn btn-error btn-sm mr-4"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold">Total: {getTotalPrice()} USD</p>
                    <button onClick={clearCart} className="btn btn-warning">
                      Clear Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
