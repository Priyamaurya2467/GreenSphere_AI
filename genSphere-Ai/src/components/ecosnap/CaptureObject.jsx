import { useRef, useState } from "react";


function CaptureObject() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (error) {
      console.log(error);
      alert("Camera permission denied or camera not available");
    }
  };

  // const captureImage = () => {
  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;

  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   const ctx = canvas.getContext("2d");
  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   canvas.toBlob((blob) => {
  //     const file = new File([blob], "img.jpg", { type: "image/jpeg" });

  //     setImage(file);
  //     setPreview(URL.createObjectURL(file));
  //     setResult(null);
  //   }, "image/jpeg");
  // };
const captureImage = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (!video) {
    alert("Video not found");
    return;
  }

  if (video.videoWidth === 0 || video.videoHeight === 0) {
    alert("Camera not ready. Wait 1 second and try again.");
    return;
  }

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob((blob) => {
    if (!blob) {
      alert("Blob not created");
      return;
    }

    const file = new File([blob], "img.jpg", {
      type: "image/jpeg",
    });

    const previewUrl = URL.createObjectURL(file);

    setImage(file);
    setPreview(previewUrl);
    setResult(null);

    console.log("File created:", file);
    console.log("Preview URL:", previewUrl);
  }, "image/jpeg", 0.95);
};
  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }

    setCameraOn(false);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please capture image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", image, "img.jpg");

    try {
      setLoading(true);
      // const response = await fetch("http://localhost:5000/analyze-waste", {
      //   method: "POST",
      //   body: formData,
      const response = await fetch("http://127.0.0.1:5000/analyze-waste", {
  method: "POST",
  body: formData,
});

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      setResult(data);
    } catch (error) {
      console.log(error);
      alert("Backend not running or error occurred");
    } finally {
      setLoading(false);
    }
  };

  const resetImage = () => {
    setImage(null);
    setPreview("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-green-700 text-center">
          EcoSnap
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Open camera, capture waste image, and send it to backend
        </p>

        <div className="mt-6 border-2 border-dashed border-green-400 rounded-xl p-5 text-center">
          {!preview && (
            // <video
            //   ref={videoRef}
            //   autoPlay
            //   playsInline
            //   className="w-full max-h-80 object-contain rounded-xl bg-black"
            // />
            <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full max-h-80 object-contain rounded-xl bg-black"
        />
          )}

          {preview && (
            <img
              src={preview}
              alt="Captured waste"
              className="w-full max-h-80 object-contain rounded-xl"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {!cameraOn && (
            <button
              onClick={startCamera}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700"
            >
              Open Camera
            </button>
          )}

          {cameraOn && !preview && (
            <button
              onClick={captureImage}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600"
            >
              Capture Image
            </button>
          )}

          {cameraOn && (
            <button
              onClick={stopCamera}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-700"
            >
              Stop Camera
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Analyzing..." : "Analyze Waste"}
          </button>

          <button
            onClick={resetImage}
            className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-black"
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-green-100 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-green-800">
              Analysis Result
            </h2>

            <p className="mt-3">
              <b>Detected Waste:</b> {result.object}
            </p>

            

            <p className="mt-2">
              <b>Composition:</b> {result.composition}
            </p>

            <p className="mt-2">
              <b>Decomposition Time:</b> {result.decompositionTime}
            </p>

            <div className="mt-4">
              <b>Recycle Process:</b>

              {Array.isArray(result.recycleProcess) ? (
                <ol className="list-decimal ml-6 mt-2">
                  {result.recycleProcess.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="mt-2">{result.recycleProcess}</p>
              )}
            </div>

            <p className="mt-4">
              <b>Eco Tip:</b> {result.ecoTip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CaptureObject;