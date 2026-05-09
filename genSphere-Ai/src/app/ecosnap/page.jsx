import RecyclingCard from "../../components/ecosnap/RecyclingIdeas";
import ResultCard from "../../components/ecosnap/ResultCard"
import UploadCard from "../../components/ecosnap/UploadCard";
import CaptureObject from "../../components/ecosnap/CaptureObject";
export default function EcoSnapPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 px-6 py-10">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl pt-10 font-bold text-emerald-900 leading-tight break-words mb-4">
              EcoSnap AI
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl leading-8">
              Precision computer vision for circular economy. Upload items to
              identify materials and receive high-impact reuse strategies.
            </p>
          </div>

          {/* Eco Impact Card */}
          <div className="bg-white/70 backdrop-blur-xl border border-emerald-100 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-lg">
            
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <span className="material-symbols-outlined text-emerald-700">
                eco
              </span>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Eco Impact Saved
              </p>

              <p className="text-2xl font-bold text-emerald-900">
                1,284 kg CO₂
              </p>
            </div>
          </div>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Upload Section */}
          <div className="lg:col-span-2">
            {/* <UploadCard /> */}
            <CaptureObject/>

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ResultCard />
            <RecyclingCard />
          </div>
        </div>
      </div>
    </main>
  );
}