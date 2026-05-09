
import { useRef } from "react";

export default function UploadCard() {
    const imageInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Select from device
  const handleSelectImage = () => {
    imageInputRef.current.click();
  };

  // Open camera
  const handleOpenCamera = () => {
    cameraInputRef.current.click();
  };

  // Handle selected file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      console.log("Selected File:", file);

      // Preview URL
      const imageUrl = URL.createObjectURL(file);
      console.log(imageUrl);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[32px] border-2 border-dashed border-emerald-200 bg-white/60 backdrop-blur-xl p-10 min-h-[500px] flex flex-col items-center justify-center group shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 text-center">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
          <span className="material-symbols-outlined text-emerald-700 text-6xl">
            cloud_upload
          </span>
        </div>
		  <h2 className="text-3xl font-bold text-emerald-900 mb-3">
          Drop your item here
        </h2>

        <p className="text-gray-600 mb-10 text-lg">
          or click to browse from your device
        </p>

        <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Hidden Input for Camera */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        
        {/* Camera Button */}
        <button
          onClick={handleOpenCamera}
          className="bg-emerald-800 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:bg-emerald-700 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">
            photo_camera
          </span>

          Scan with Camera
        </button>

        {/* Upload Button */}
        <button
          onClick={handleSelectImage}
          className="bg-white/70 backdrop-blur border border-gray-200 text-emerald-800 px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-white transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">
            upload_file
          </span>

          Select Image
        </button>
      </div>
      </div>
    </div>
  );
}
