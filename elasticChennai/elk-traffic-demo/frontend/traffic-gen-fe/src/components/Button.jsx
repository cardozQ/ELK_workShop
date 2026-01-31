export default function Button({ children }) {
  return (
    <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition">
      {children}
    </button>
  );
}
