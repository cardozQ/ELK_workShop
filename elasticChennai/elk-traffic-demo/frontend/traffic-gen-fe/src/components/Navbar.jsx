import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TrafficGen
        </Link>

        <div className="flex gap-6 font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/cart" className="hover:text-blue-600">Cart</Link>
          <Link to="/checkout" className="hover:text-blue-600">Checkout</Link>
        </div>
      </nav>
    </header>
  );
}
