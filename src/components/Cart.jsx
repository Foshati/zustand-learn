import { useCartStore } from "../stores/useCartStore";

const products = [
  {
    id: 1,
    name: "product 1",
    img: "https://picsum.photos/seed/img6/600/400",
    price: 40,
  },
  {
    id: 2,
    name: "product 2",
    img: "https://picsum.photos/seed/img3/600/400",
    price: 20,
  },
  {
    id: 3,
    name: "product 3",
    img: "https://picsum.photos/seed/img2/600/400",
    price: 30,
  },
  {
    id: 4,
    name: "product 4",
    img: "https://picsum.photos/seed/img1/600/400",
    price: 130,
  },
  {
    id: 5,
    name: "product 5",
    img: "https://picsum.photos/seed/img7/600/400",
    price: 70,
  },
];

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, getTotalPrice } =
    useCartStore();

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">My Store</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Products</h2>
          <ul>
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between mb-2"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="object-cover w-16 h-16 mr-4"
                />

                <span>
                  {product.name} - {product.price} USD
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary btn-sm"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">Cart</h2>
          {cart.length === 0 ? (
            <p>The cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between mb-2"
                  >
                    <span>
                      {item.name} - {item.price} USD
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold">Total: {getTotalPrice()} USD</p>
              <button onClick={clearCart} className="mt-2 btn btn-warning">
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
