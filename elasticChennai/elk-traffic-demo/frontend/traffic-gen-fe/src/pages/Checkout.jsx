import Button from "../components/Button";

export default function Checkout() {
  return (
    <section className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <form className="bg-white border rounded-xl p-6 space-y-4">
        <input
          placeholder="Full Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          placeholder="Address"
          className="w-full border rounded px-3 py-2"
        />
        <input
          placeholder="Card Number"
          className="w-full border rounded px-3 py-2"
        />

        <Button>Place Order</Button>
      </form>
    </section>
  );
}
