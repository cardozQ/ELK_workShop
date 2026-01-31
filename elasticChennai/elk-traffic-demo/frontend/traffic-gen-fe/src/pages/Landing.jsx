import ProductCard from "../components/ProductCard";

const PRODUCTS = [
  {
    id: 1,
    name: "Classic Black",
    price: 14,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyYtEFv88ax2ZpTn07hppOXhE2mDAPLBFUw&s"
  },
  {
    id: 2,
    name: "Vanilla Coffee",
    price: 14,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyYtEFv88ax2ZpTn07hppOXhE2mDAPLBFUw&s"
  },
  {
    id: 3,
    name: "Churro Coffee",
    price: 14,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyYtEFv88ax2ZpTn07hppOXhE2mDAPLBFUw&s"
  }
];

export default function Landing() {
  return (
    <section>
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#000B4F]">
          Products
        </h1>
      
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
