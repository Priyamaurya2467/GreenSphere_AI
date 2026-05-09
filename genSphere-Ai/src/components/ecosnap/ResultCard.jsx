const analysisPoints = [
  "Identified as food-grade PET plastic used in beverage packaging.",
  "Material is highly suitable for recycling and reuse.",
  "AI confidence score indicates highly accurate detection.",
];

const resultData = {
  title: "Plastic - PET 01",
  recyclability: "100% Recyclable",
  decomposition: "450+ Years",
  carbonFootprint: "Moderate",
  confidence: 98.4,
};

export default function ResultCard() {
  return (
    <div className="overflow-hidden rounded-[32px] bg-white/70 backdrop-blur-xl shadow-2xl border border-white/50">
      
      {/* Header */}
      <div className="bg-emerald-800 p-8 text-center">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
          Classification Result
        </p>

        <h2 className="text-3xl font-bold text-white">
          
        </h2>
      </div>

      {/* Body */}
      <div className="p-8 space-y-8">
        
        {/* Stats */}
        <div className="space-y-5">
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">
              Recyclability
            </span>

            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">
              {resultData.recyclability}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">
              Decomposition
            </span>

            <span className="text-red-500 font-bold">
              {resultData.decomposition}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">
              Carbon Footprint
            </span>

            <span className="text-emerald-700 font-bold">
              {resultData.carbonFootprint}
            </span>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* AI Analysis */}
        <div>
          <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide mb-5">
            AI Material Analysis
          </h4>

          <div className="space-y-4">
            {analysisPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4"
              >
                <span className="material-symbols-outlined text-emerald-500">
                  check_circle
                </span>

                <p className="text-gray-700 leading-7">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence */}
        <div className="rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-emerald-900">
              Confidence Score
            </span>

            <span className="text-sm font-bold text-emerald-700">
              {resultData.confidence}%
            </span>
          </div>

          <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full"
              style={{ width: `${resultData.confidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}