import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useNavigate } from "react-router-dom";
// Custom colored marker by severity
const getSeverityIcon = (severity) => {
  const colors = {
    critical: "#FF0000",
    high: "#FF6600",
    medium: "#FFAA00",
    low: "#00FF88",
  };
  const color = colors[severity] || "#FF0000";
  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: 14px; height: 14px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px ${color}, 0 0 20px ${color}44;
      "></div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
};

// Heatmap layer component
function HeatmapLayer({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    const heatData = points.map((p) => [
      p.location.coordinates[1],
      p.location.coordinates[0],
      p.severity === "critical" ? 1.0 : p.severity === "high" ? 0.7 : 0.4,
    ]);
    const heat = L.heatLayer(heatData, {
      radius: 35,
      blur: 25,
      maxZoom: 17,
      gradient: { 0.2: "#003300", 0.5: "#FF6600", 0.8: "#FF0000" },
    });
    heat.addTo(map);
    return () => map.removeLayer(heat);
  }, [points, map]);
  return null;
}

// Dummy incidents for now — replace with real API call later
const DUMMY_INCIDENTS = [
  {
    _id: "1",
    title: "Road Accident",
    description:
      "Two vehicles collided near the main market. Ambulance called.",
    severity: "critical",
    category: "Accident",
    status: "under_investigation",
    reportedBy: "Citizen",
    createdAt: new Date().toISOString(),
    location: { coordinates: [78.0081, 27.1767] }, // Agra
  },
  {
    _id: "2",
    title: "Suspicious Activity",
    description: "Group of unknown individuals loitering near school at night.",
    severity: "high",
    category: "Suspicious Activity",
    status: "reported",
    reportedBy: "Citizen",
    createdAt: new Date().toISOString(),
    location: { coordinates: [78.015, 27.18] },
  },
  {
    _id: "3",
    title: "Street Light Out",
    description: "Entire stretch of road dark since 3 days. Safety hazard.",
    severity: "medium",
    category: "Infrastructure",
    status: "reported",
    reportedBy: "Citizen",
    createdAt: new Date().toISOString(),
    location: { coordinates: [78.005, 27.172] },
  },
  {
    _id: "4",
    title: "Chain Snatching",
    description: "Woman reported chain snatching near bus stand.",
    severity: "critical",
    category: "Theft",
    status: "resolved",
    reportedBy: "Citizen",
    createdAt: new Date().toISOString(),
    location: { coordinates: [78.02, 27.185] },
  },
];

const STATUS_COLORS = {
  reported: "text-yellow-400 border-yellow-400",
  under_investigation: "text-blue-400 border-blue-400",
  resolved: "text-green-400 border-green-400",
};

const STATUS_LABELS = {
  reported: "Reported",
  under_investigation: "Under Investigation",
  resolved: "Resolved",
};

const SEVERITY_LABELS = {
  critical: { label: "Critical", color: "text-red-500" },
  high: { label: "High", color: "text-orange-400" },
  medium: { label: "Medium", color: "text-yellow-400" },
  low: { label: "Low", color: "text-green-400" },
};

export default function MapView() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState(DUMMY_INCIDENTS);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered =
    filter === "all"
      ? incidents
      : incidents.filter((i) => i.severity === filter);

  const stats = {
    total: incidents.length,
    critical: incidents.filter((i) => i.severity === "critical").length,
    resolved: incidents.filter((i) => i.status === "resolved").length,
    active: incidents.filter((i) => i.status !== "resolved").length,
  };

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#3D0000] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-black uppercase tracking-tight">
            Live <span className="text-[#FF0000]">Incident</span> Map
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Real-time incident tracking · Updates via WebSocket
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 text-xs">
          <div className="text-center">
            <div className="text-white font-black text-lg">{stats.total}</div>
            <div className="text-slate-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-red-500 font-black text-lg">
              {stats.critical}
            </div>
            <div className="text-slate-500">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-black text-lg">
              {stats.active}
            </div>
            <div className="text-slate-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-black text-lg">
              {stats.resolved}
            </div>
            <div className="text-slate-500">Resolved</div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar — incident list */}
        <div className="w-full md:w-80 flex-shrink-0 bg-[#080808] border-r border-[#3D0000] flex flex-col overflow-hidden">
          {/* Filter tabs */}
          <div className="flex gap-1 p-3 border-b border-[#3D0000] flex-wrap">
            {["all", "critical", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  filter === f
                    ? "bg-[#950101] text-white"
                    : "text-slate-400 hover:bg-[#3D0000]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Heatmap toggle */}
          <div className="px-3 py-2 border-b border-[#3D0000] flex items-center justify-between">
            <span className="text-xs text-slate-400">Heatmap overlay</span>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                showHeatmap ? "bg-[#FF0000]" : "bg-[#3D0000]"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                  showHeatmap ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          {/* Incident list */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 && (
              <div className="p-6 text-center text-slate-600 text-sm">
                No incidents found
              </div>
            )}
            {filtered.map((inc) => (
              <div
                key={inc._id}
                onClick={() => navigate(`/incidents/${inc._id}`)}
                className={`p-4 border-b border-[#1a0000] cursor-pointer transition-all hover:bg-[#1a0000] ${
                  selected?._id === inc._id ? "bg-[#3D0000]/40" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white leading-tight">
                      {inc.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {inc.description}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase flex-shrink-0 ${
                      SEVERITY_LABELS[inc.severity]?.color
                    }`}
                  >
                    {SEVERITY_LABELS[inc.severity]?.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded border font-medium ${
                      STATUS_COLORS[inc.status]
                    }`}
                  >
                    {STATUS_LABELS[inc.status]}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    {inc.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[27.1767, 78.0081]}
            zoom={14}
            className="w-full h-full"
            style={{ background: "#000" }}
          >
            <TileLayer
              //   url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              //   attribution='&copy; <a href="https://carto.com">CARTO</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
            />

            {showHeatmap && <HeatmapLayer points={filtered} />}

            {filtered.map((inc) => (
              <Marker
                key={inc._id}
                position={[
                  inc.location.coordinates[1],
                  inc.location.coordinates[0],
                ]}
                icon={getSeverityIcon(inc.severity)}
                eventHandlers={{ click: () => setSelected(inc) }}
              >
                <Popup className="crime-popup">
                  <div className="bg-[#0a0a0a] text-white p-3 rounded-lg min-w-[200px] border border-[#3D0000]">
                    <p className="font-black text-sm text-white">{inc.title}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {inc.description}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold ${SEVERITY_LABELS[inc.severity]?.color}`}
                      >
                        {SEVERITY_LABELS[inc.severity]?.label}
                      </span>
                      <span
                        className={`text-[10px] border px-1.5 rounded ${STATUS_COLORS[inc.status]}`}
                      >
                        {STATUS_LABELS[inc.status]}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 mt-2">
                      {new Date(inc.createdAt).toLocaleString()}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-[999] bg-black/80 border border-[#3D0000] rounded-xl p-3 backdrop-blur-sm">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">
              Severity
            </p>
            {Object.entries(SEVERITY_LABELS).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    background:
                      key === "critical"
                        ? "#FF0000"
                        : key === "high"
                          ? "#FF6600"
                          : key === "medium"
                            ? "#FFAA00"
                            : "#00FF88",
                  }}
                />
                <span className="text-[10px] text-slate-400">{val.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
