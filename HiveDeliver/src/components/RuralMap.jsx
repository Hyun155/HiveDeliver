export default function RuralMap() {
  return (
    <div className="mt-4 h-[200px] bg-green-200 rounded-lg p-4 relative">
      <div className="absolute top-6 left-6">🏠 Village A</div>
      <div className="absolute bottom-6 right-6">🏠 Village B</div>

      <div className="absolute top-12 right-20 text-red-600">
        🚫 No Fly Zone
      </div>

      <div className="absolute bottom-12 left-24 text-blue-600">
        📦 Delivery Point
      </div>
    </div>
  );
}
