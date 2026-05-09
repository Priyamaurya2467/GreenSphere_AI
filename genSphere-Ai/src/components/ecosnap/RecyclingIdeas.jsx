const recyclingSteps = [
  "Rinse thoroughly to remove residue.",
  "Crush to minimize transport volume.",
  "Place in yellow-lid bins.",
];

export default function RecyclingCard() {
  return (
    <div className="rounded-[32px] bg-white/70 backdrop-blur-xl p-8 shadow-xl border border-white/50">
      <h4 className="text-sm font-bold text-emerald-900 mb-6 uppercase tracking-wide">
        Recycling Instructions
      </h4>
	   <ul className="space-y-4">
        {recyclingSteps.map((step, index) => (
          <li key={index} className="flex gap-4">
            <span className="material-symbols-outlined text-emerald-500">
              check_circle
            </span>

            <span className="text-gray-700">
              {step}
            </span>
          </li>
        ))}
      </ul>
	  <button className="w-full mt-8 py-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition">
        Find Nearest Collection Point
      </button>
    </div>
  );
}