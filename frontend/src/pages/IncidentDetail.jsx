import { useParams, useNavigate } from "react-router-dom";
import {
  MdArrowBack,
  MdLocationOn,
  MdAccessTime,
  MdPerson,
  MdShield,
} from "react-icons/md";

// Dummy data — replace with API call later
const DUMMY_INCIDENTS = [
  {
    _id: "1",
    title: "Road Accident",
    description:
      "Two vehicles collided near the main market. A truck and a motorcycle were involved. The motorcycle rider is injured and has been taken to SN Medical College. Road is partially blocked.",
    severity: "critical",
    category: "Accident",
    status: "under_investigation",
    createdAt: new Date().toISOString(),
    location: {
      coordinates: [78.0081, 27.1767],
      address: "Main Market Road, Taj Ganj, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "Black truck, number plate UP-80 XX 1234, fled the scene heading towards Fatehabad Road.",
    policeStation: "Taj Ganj Police Station",
    updates: [
      {
        text: "Report received and assigned to patrol unit.",
        time: "2 min ago",
        by: "System",
      },
      {
        text: "Patrol unit dispatched to location.",
        time: "5 min ago",
        by: "Officer Sharma",
      },
    ],
  },
  {
    _id: "2",
    title: "Suspicious Activity",
    description:
      "Group of 4-5 unknown individuals loitering near the school boundary wall after midnight. They appeared to be checking the gate locks.",
    severity: "high",
    category: "Suspicious Activity",
    status: "reported",
    createdAt: new Date(Date.now() - 14 * 60000).toISOString(),
    location: {
      coordinates: [78.015, 27.18],
      address: "Near City School, Civil Lines, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "4-5 males, ages approximately 20-30, wearing dark clothing. One had a red jacket.",
    policeStation: "Civil Lines Thana",
    updates: [
      { text: "Report received and logged.", time: "14 min ago", by: "System" },
    ],
  },
  {
    _id: "3",
    title: "Street Light Out",
    description:
      "Entire stretch of road dark since 3 days. Multiple residents have complained. Two minor accidents already happened due to this.",
    severity: "medium",
    category: "Infrastructure",
    status: "reported",
    createdAt: new Date(Date.now() - 31 * 60000).toISOString(),
    location: {
      coordinates: [78.005, 27.172],
      address: "Sector 4, Kamla Nagar, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo: null,
    policeStation: "Sadar Bazar Chowki",
    updates: [
      {
        text: "Report received. Forwarded to municipal authority.",
        time: "31 min ago",
        by: "System",
      },
    ],
  },
  {
    _id: "4",
    title: "Chain Snatching",
    description:
      "A woman was returning from the market when two bike-borne individuals snatched her gold chain and fled. Victim is safe but shaken.",
    severity: "critical",
    category: "Theft",
    status: "resolved",
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    location: {
      coordinates: [78.02, 27.185],
      address: "Bus Stand, Platform 2, Agra",
    },
    reportedBy: { name: "Anonymous Citizen", isAnonymous: true },
    photo: null,
    suspectInfo:
      "Two males on a black Honda Activa scooter. No helmet. One wearing blue shirt.",
    policeStation: "Taj Ganj Police Station",
    updates: [
      {
        text: "Suspects identified via CCTV footage.",
        time: "45 min ago",
        by: "Officer Kumar",
      },
      {
        text: "Suspects arrested. Case resolved.",
        time: "20 min ago",
        by: "Officer Kumar",
      },
    ],
  },
];

const SEVERITY_STYLES = {
  critical: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    border: "border-red-500/30",
    label: "Critical",
  },
  high: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/30",
    label: "High",
  },
  medium: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
    label: "Medium",
  },
  low: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/30",
    label: "Low",
  },
};

const STATUS_STYLES = {
  reported: { text: "text-yellow-400", label: "Reported" },
  under_investigation: { text: "text-blue-400", label: "Under Investigation" },
  resolved: { text: "text-green-400", label: "Resolved" },
};

export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = DUMMY_INCIDENTS.find((i) => i._id === id);

  if (!incident) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-6xl font-black text-[#FF0000] mb-4">404</p>
          <p className="text-slate-400 mb-6">Incident not found</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-[#950101] rounded-xl font-bold text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const sev = SEVERITY_STYLES[incident.severity];
  const stat = STATUS_STYLES[incident.status];

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors"
        >
          <MdArrowBack /> Back to incidents
        </button>

        {/* Header card */}
        <div className={`rounded-2xl border ${sev.border} ${sev.bg} p-6 mb-4`}>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`text-xs font-black uppercase px-2 py-0.5 rounded ${sev.text} border ${sev.border}`}
                >
                  {sev.label}
                </span>
                <span className={`text-xs font-bold ${stat.text}`}>
                  ● {stat.label}
                </span>
                <span className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded">
                  {incident.category}
                </span>
              </div>
              <h1 className="text-2xl font-black text-white">
                {incident.title}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Case ID</p>
              <p className="text-xs font-mono text-slate-400">
                #{incident._id.padStart(6, "0")}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Main details — 2 cols */}
          <div className="md:col-span-2 space-y-4">
            {/* Description */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-5">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                Incident Description
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {incident.description}
              </p>
            </div>

            {/* Suspect info */}
            {incident.suspectInfo && (
              <div className="bg-[#080808] border border-orange-500/20 rounded-xl p-5">
                <h3 className="text-xs font-black uppercase text-orange-400 tracking-wider mb-3">
                  ⚠ Suspect Information
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {incident.suspectInfo}
                </p>
                <p className="text-xs text-slate-600 mt-3">
                  This information is visible only to police and admins. Public
                  view shows this section as redacted.
                </p>
              </div>
            )}

            {/* Photo evidence */}
            {incident.photo ? (
              <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-5">
                <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                  Photo Evidence
                </h3>
                <img
                  src={incident.photo}
                  alt="evidence"
                  className="w-full rounded-lg object-cover max-h-64"
                />
              </div>
            ) : (
              <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-5">
                <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                  Photo Evidence
                </h3>
                <p className="text-slate-600 text-sm">
                  No photo evidence attached to this report.
                </p>
              </div>
            )}

            {/* Activity timeline */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-5">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-4">
                Case Timeline
              </h3>
              <div className="space-y-4">
                {incident.updates.map((update, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF0000] mt-1 flex-shrink-0" />
                      {i < incident.updates.length - 1 && (
                        <div className="w-px flex-1 bg-[#3D0000] mt-1" />
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm text-white">{update.text}</p>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs text-slate-600">
                          {update.time}
                        </span>
                        <span className="text-xs text-slate-500">
                          by {update.by}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — 1 col */}
          <div className="space-y-4">
            {/* Location */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                Location
              </h3>
              <div className="flex items-start gap-2">
                <MdLocationOn className="text-[#FF0000] text-lg flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300">
                  {incident.location.address}
                </p>
              </div>
              <div className="mt-3 font-mono text-xs text-slate-600">
                {incident.location.coordinates[1].toFixed(5)},{" "}
                {incident.location.coordinates[0].toFixed(5)}
              </div>
              <a
                href={`https://maps.google.com/?q=${incident.location.coordinates[1]},${incident.location.coordinates[0]}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center py-1.5 rounded-lg border border-[#3D0000] text-xs text-[#FF0000] font-bold hover:bg-[#3D0000] transition-all"
              >
                Open in Google Maps
              </a>
            </div>

            {/* Assigned station */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                Assigned Station
              </h3>
              <div className="flex items-start gap-2">
                <MdShield className="text-[#FF0000] text-lg flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-300 font-medium">
                  {incident.policeStation}
                </p>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Active</span>
              </div>
            </div>

            {/* Reporter info */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                Reported By
              </h3>
              <div className="flex items-center gap-2">
                <MdPerson className="text-slate-500 text-lg" />
                <p className="text-sm text-slate-400">Anonymous Citizen</p>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Identity protected. Visible only to police and admin.
              </p>
            </div>

            {/* Time */}
            <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-4">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider mb-3">
                Reported At
              </h3>
              <div className="flex items-center gap-2">
                <MdAccessTime className="text-slate-500" />
                <p className="text-sm text-slate-300">
                  {new Date(incident.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
