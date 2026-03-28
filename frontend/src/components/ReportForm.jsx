import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  MdMyLocation,
  MdUploadFile,
  MdArrowForward,
  MdCheckCircle,
} from "react-icons/md";

const CATEGORIES = [
  "Accident",
  "Theft",
  "Assault",
  "Suspicious Activity",
  "Fire",
  "Infrastructure",
  "Harassment",
  "Other",
];

const SEVERITIES = [
  {
    value: "low",
    label: "Low",
    color: "border-green-500 text-green-400",
    desc: "Minor issue, not urgent",
  },
  {
    value: "medium",
    label: "Medium",
    color: "border-yellow-500 text-yellow-400",
    desc: "Needs attention soon",
  },
  {
    value: "high",
    label: "High",
    color: "border-orange-500 text-orange-400",
    desc: "Urgent response needed",
  },
  {
    value: "critical",
    label: "Critical",
    color: "border-red-500 text-red-500",
    desc: "Immediate danger",
  },
];

// Component to pick location on mini map
function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function ReportForm() {
  const [step, setStep] = useState(1); // 1: details, 2: location, 3: review
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);
  const fileRef = useRef();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    severity: "",
    photo: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, photo: file });
    setPreview(URL.createObjectURL(file));
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setPinLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () =>
        alert("Could not get your location. Please pin manually on the map."),
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Replace this with your actual API call later
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center">
          <MdCheckCircle className="text-green-500 text-7xl mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl font-black text-white mb-3">
            Report Submitted
          </h2>
          <p className="text-slate-400 mb-8 max-w-sm mx-auto">
            Your incident has been logged and nearby authorities have been
            notified. You can track the status in your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setForm({
                  title: "",
                  description: "",
                  category: "",
                  severity: "",
                  photo: null,
                });
                setPinLocation(null);
                setPreview(null);
              }}
              className="px-6 py-2.5 rounded-lg border border-[#3D0000] text-white text-sm font-bold hover:bg-[#3D0000] transition-all"
            >
              Report Another
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-[#950101] text-white text-sm font-bold hover:bg-[#FF0000] transition-all">
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tight">
            Report an <span className="text-[#FF0000]">Incident</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Your report goes live on the map instantly and alerts nearby police.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {["Incident Details", "Pin Location", "Review & Submit"].map(
            (s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 transition-all ${
                    step > i + 1
                      ? "bg-green-500 text-white"
                      : step === i + 1
                        ? "bg-[#FF0000] text-white"
                        : "bg-[#1a0000] text-slate-600 border border-[#3D0000]"
                  }`}
                >
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${step === i + 1 ? "text-white" : "text-slate-600"}`}
                >
                  {s}
                </span>
                {i < 2 && (
                  <div
                    className={`flex-1 h-px ${step > i + 1 ? "bg-green-500" : "bg-[#3D0000]"}`}
                  />
                )}
              </div>
            ),
          )}
        </div>

        {/* Step 1 — Incident Details */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Incident Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Chain snatching near bus stand"
                className="w-full bg-[#0a0a0a] border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FF0000] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe what happened in detail. Gemini AI will auto-categorise and summarise your report."
                className="w-full bg-[#0a0a0a] border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FF0000] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Category *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm({ ...form, category: cat })}
                    className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                      form.category === cat
                        ? "bg-[#950101] border-[#FF0000] text-white"
                        : "border-[#3D0000] text-slate-400 hover:border-[#950101]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Severity Level *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {SEVERITIES.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setForm({ ...form, severity: s.value })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      form.severity === s.value
                        ? `${s.color} bg-white/5`
                        : "border-[#3D0000] text-slate-500 hover:border-[#950101]"
                    }`}
                  >
                    <div
                      className={`text-sm font-black ${form.severity === s.value ? "" : "text-slate-400"}`}
                    >
                      {s.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Photo Evidence (optional)
              </label>
              <div
                onClick={() => fileRef.current.click()}
                className="border border-dashed border-[#3D0000] rounded-xl p-6 text-center cursor-pointer hover:border-[#950101] transition-colors"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-40 mx-auto rounded-lg object-cover"
                  />
                ) : (
                  <>
                    <MdUploadFile className="text-3xl text-slate-600 mx-auto mb-2" />
                    <p className="text-slate-500 text-sm">
                      Click to upload photo
                    </p>
                    <p className="text-slate-700 text-xs mt-1">
                      JPG, PNG up to 5MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhoto}
              />
            </div>

            <button
              onClick={() => {
                if (
                  !form.title ||
                  !form.description ||
                  !form.category ||
                  !form.severity
                ) {
                  alert("Please fill all required fields");
                  return;
                }
                setStep(2);
              }}
              className="w-full py-3.5 rounded-xl bg-[#950101] text-white font-black hover:bg-[#FF0000] transition-all flex items-center justify-center gap-2"
            >
              Next: Pin Location <MdArrowForward />
            </button>
          </div>
        )}

        {/* Step 2 — Location */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                onClick={getUserLocation}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#3D0000] text-sm text-white font-bold hover:bg-[#3D0000] transition-all"
              >
                <MdMyLocation className="text-[#FF0000]" />
                Use My Location
              </button>
              <p className="text-slate-500 text-xs self-center">
                or click anywhere on the map to drop a pin
              </p>
            </div>

            <div className="h-[400px] rounded-xl overflow-hidden border border-[#3D0000]">
              <MapContainer
                center={
                  pinLocation
                    ? [pinLocation.lat, pinLocation.lng]
                    : [27.1767, 78.0081]
                }
                zoom={14}
                className="w-full h-full"
              >
                <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                <LocationPicker onLocationSelect={setPinLocation} />
                {pinLocation && (
                  <Marker position={[pinLocation.lat, pinLocation.lng]} />
                )}
              </MapContainer>
            </div>

            {pinLocation && (
              <div className="bg-[#0a0a0a] border border-green-500/30 rounded-xl p-3 text-xs text-green-400 font-mono">
                ✓ Location pinned: {pinLocation.lat.toFixed(5)},{" "}
                {pinLocation.lng.toFixed(5)}
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl border border-[#3D0000] text-white font-bold text-sm hover:bg-[#3D0000] transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (!pinLocation) {
                    alert("Please pin a location on the map");
                    return;
                  }
                  setStep(3);
                }}
                className="flex-1 py-3 rounded-xl bg-[#950101] text-white font-black text-sm hover:bg-[#FF0000] transition-all flex items-center justify-center gap-2"
              >
                Review Report <MdArrowForward />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="bg-[#0a0a0a] border border-[#3D0000] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white font-black text-lg">{form.title}</p>
                  <p className="text-slate-500 text-sm mt-1">
                    {form.description}
                  </p>
                </div>
                <span
                  className={`text-xs font-black px-2 py-1 rounded border ${
                    SEVERITIES.find((s) => s.value === form.severity)?.color
                  }`}
                >
                  {form.severity?.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-black rounded-lg p-3">
                  <p className="text-slate-500 mb-1">Category</p>
                  <p className="text-white font-bold">{form.category}</p>
                </div>
                <div className="bg-black rounded-lg p-3">
                  <p className="text-slate-500 mb-1">Location</p>
                  <p className="text-white font-bold font-mono">
                    {pinLocation?.lat.toFixed(4)}, {pinLocation?.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              {preview && (
                <img
                  src={preview}
                  alt="evidence"
                  className="w-full max-h-48 object-cover rounded-lg"
                />
              )}

              <div className="bg-[#3D0000]/20 border border-[#3D0000] rounded-lg p-3 text-xs text-slate-400">
                <span className="text-[#FF0000] font-bold">Gemini AI</span> will
                auto-categorise, detect duplicate reports, and alert nearest
                police station upon submission.
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 rounded-xl border border-[#3D0000] text-white font-bold text-sm hover:bg-[#3D0000] transition-all"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 rounded-xl bg-[#FF0000] text-white font-black text-sm hover:bg-[#CC0000] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-pulse">Submitting...</span>
                ) : (
                  <>
                    {" "}
                    Submit Report <MdArrowForward />{" "}
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
