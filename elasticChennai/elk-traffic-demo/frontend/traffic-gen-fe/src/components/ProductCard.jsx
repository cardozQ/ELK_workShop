export default function ProductCard({ product }) {
  return (
    <div
      className="
        group bg-white rounded-xl border
        transition-all duration-200
        hover:-translate-y-1 hover:shadow-md
      "
    >
      {/* Image */}
     <div className="h-56 overflow-hidden rounded-t-xl bg-gray-50">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
      />
    </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-[#000B4F]">
            {product.name}
          </h3>
          <span className="font-semibold text-[#000B4F]">
            ${product.price}
          </span>
        </div>

        <button
          className="
            mt-4 w-full rounded-lg border
            border-[#000B4F]/20
            py-2 text-sm font-medium
            text-[#000B4F]
            hover:bg-[#000B4F]/5
            transition
          "
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
