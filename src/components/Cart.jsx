import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingBag, ShoppingCart, X } from "lucide-react";

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

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold text-red-800 ">p2:My Store</h1>

      {/* Cart */}
      <div className="relative">
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowCart(!showCart)}
            className="btn btn-primary"
          >
            <ShoppingCart />
          </button>
          <div className="badge badge-primary ml-2">{cart.length}</div>
        </div>

        {showCart && (
          <div className="fixed right-0 top-0 h-full w-64 bg-black text-white shadow-lg z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="btn btn-sm btn-circle btn-error"
              >
                <X />
              </button>
            </div>
            {cart.length === 0 ? (
              <p>The cart is empty</p>
            ) : (
              <>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="card bg-gray-800 shadow-sm flex items-center justify-between p-2"
                    >
                      <div className="card-body p-2">
                        <h2 className="card-title text-sm">{item.title}</h2>
                        <p>{item.price} USD</p>
                        <div className="card-actions justify-start">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="btn btn-error btn-xs"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="btn btn-primary btn-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn btn-error btn-xs"
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

      {/* Products */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="card card-compact bg-black shadow-xl m-2 p-4"
            >
              <figure className="flex justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-40 object-cover rounded-lg"
                />
              </figure>
              <div className="card-body p-2 text-center">
                <h2 className="card-title text-sm">{product.title}</h2>
                <p className="text-sm">{product.price} USD</p>
                <div className="card-actions justify-center">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary btn-sm"
                  >
                    <ShoppingBag />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
