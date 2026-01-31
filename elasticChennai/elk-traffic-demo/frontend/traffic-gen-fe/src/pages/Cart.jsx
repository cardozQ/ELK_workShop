export default function Cart() {
  const cart = [
    { id: 1, name: "Product One", price: 999 },
    { id: 2, name: "Product Two", price: 1499 }
  ];

  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <section className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white border rounded-xl p-6 space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <div className="border-t pt-4 font-semibold flex justify-between">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>
    </section>
  );
}
