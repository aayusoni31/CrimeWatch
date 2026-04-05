// import { Link } from "react-router-dom";
// import {
//   MdGpsFixed,
//   MdShield,
//   MdTimeline,
//   MdArrowForward,
//   MdRadioButtonChecked,
// } from "react-icons/md";

// export default function Home() {
//   return (
//     <div className="flex flex-col w-full bg-[#000000] text-white selection:bg-[#FF0000] selection:text-white">
//       {/* --- 1. HERO SECTION --- */}
//       <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
//         {/* Background Decorative Elements */}
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
//           <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#950101]/20 blur-[120px] rounded-full opacity-50"></div>
//           <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3D0000] to-transparent"></div>
//         </div>

//         <div className="relative z-10 max-w-5xl mx-auto text-center">
//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3D0000] bg-[#3D0000]/20 text-[#FF0000] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
//             <MdRadioButtonChecked className="animate-pulse text-sm" />
//             Live Network Status: Active
//           </div>

//           <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
//             EYES ON THE <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF0000] to-[#3D0000]">
//               STREETS.
//             </span>
//           </h1>

//           <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
//             The next generation of public safety. Report incidents in seconds,
//             track hazards in real-time, and let{" "}
//             <span className="text-white">Gemini AI</span> handle the rest.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
//             <Link
//               to="/report"
//               className="group w-full sm:w-auto px-10 py-4 rounded-xl bg-[#FF0000] text-white font-black text-lg shadow-[0_0_40px_rgba(255,0,0,0.2)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
//             >
//               REPORT INCIDENT
//               <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
//             </Link>

//             <Link
//               to="/map"
//               className="w-full sm:w-auto px-10 py-4 rounded-xl border border-[#3D0000] bg-white/5 text-white font-bold text-lg hover:bg-[#3D0000]/30 transition-all flex items-center justify-center gap-2"
//             >
//               VIEW LIVE MAP
//             </Link>
//           </div>
//         </div>

//         {/* Floating "Live Info" Box - Bottom Left */}
//         <div className="hidden lg:block absolute bottom-12 left-12 p-4 rounded-xl border border-[#3D0000] bg-black/50 backdrop-blur-md">
//           <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
//             Recent Activity
//           </div>
//           <div className="text-sm font-medium text-white flex items-center gap-2">
//             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
//             Accident reported in Sector 4
//           </div>
//         </div>
//       </section>

//       {/* --- 2. THE TECH STACK GRID --- */}
//       <section className="py-24 border-t border-[#3D0000]">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//             <div className="space-y-4 group">
//               <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
//                 <MdGpsFixed className="text-[#FF0000] text-2xl" />
//               </div>
//               <h3 className="text-xl font-bold text-white">
//                 Precision Mapping
//               </h3>
//               <p className="text-slate-500 leading-relaxed text-sm">
//                 Leaflet.js integration allows for millimeter-perfect pin drops
//                 and localized heatmaps for authorities.
//               </p>
//             </div>

//             <div className="space-y-4 group">
//               <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
//                 <MdShield className="text-[#FF0000] text-2xl" />
//               </div>
//               <h3 className="text-xl font-bold text-white">AI Deduplication</h3>
//               <p className="text-slate-500 leading-relaxed text-sm">
//                 Gemini API scans all incoming reports, merges duplicates, and
//                 provides summarized data to response teams.
//               </p>
//             </div>

//             <div className="space-y-4 group">
//               <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
//                 <MdTimeline className="text-[#FF0000] text-2xl" />
//               </div>
//               <h3 className="text-xl font-bold text-white">Websocket Sync</h3>
//               <p className="text-slate-500 leading-relaxed text-sm">
//                 Powered by Socket.io. No refresh needed—new incidents appear on
//                 every user's screen in under 100ms.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* --- 3. CALL TO ACTION (CTA) --- */}
//       <section className="py-20 px-6">
//         <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-b from-[#3D0000]/40 to-[#000000] border border-[#3D0000] p-12 text-center relative overflow-hidden">
//           {/* Inner Glow */}
//           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF0000]/10 blur-[80px] rounded-full"></div>

//           <h2 className="text-3xl md:text-5xl font-black mb-6">
//             BECOME A WATCHMAN.
//           </h2>
//           <p className="text-slate-400 mb-8 max-w-xl mx-auto">
//             Join thousands of citizens making their cities safer. Your reports
//             directly help emergency services respond faster.
//           </p>
//           <Link
//             to="/register"
//             className="inline-block px-8 py-3 rounded-lg border border-[#FF0000] text-[#FF0000] font-bold hover:bg-[#FF0000] hover:text-white transition-all active:scale-95"
//           >
//             CREATE FREE ACCOUNT
//           </Link>
//         </div>
//       </section>
//       {/* --- RECENT COMPLAINTS FEED --- */}
//       <section className="py-16 border-t border-[#3D0000] px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex items-center justify-between mb-8">
//             <div>
//               <h2 className="text-2xl font-black uppercase tracking-tight">
//                 Live <span className="text-[#FF0000]">Incident</span> Feed
//               </h2>
//               <p className="text-slate-500 text-sm mt-1">
//                 Real-time reports from citizens across the city
//               </p>
//             </div>
//             <Link
//               to="/map"
//               className="text-xs text-[#FF0000] font-bold hover:underline flex items-center gap-1"
//             >
//               View All on Map <MdArrowForward />
//             </Link>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               {
//                 title: "Road Accident",
//                 area: "Sector 4, Near Market",
//                 time: "2 min ago",
//                 severity: "critical",
//                 status: "Under Investigation",
//                 category: "Accident",
//               },
//               {
//                 title: "Chain Snatching",
//                 area: "Bus Stand, Platform 2",
//                 time: "14 min ago",
//                 severity: "critical",
//                 status: "Reported",
//                 category: "Theft",
//               },
//               {
//                 title: "Suspicious Activity",
//                 area: "Near City School",
//                 time: "31 min ago",
//                 severity: "high",
//                 status: "Reported",
//                 category: "Suspicious",
//               },
//             ].map((inc, i) => (
//               <div
//                 key={i}
//                 className="bg-[#080808] border border-[#3D0000] rounded-xl p-4 hover:border-[#950101] transition-all"
//               >
//                 <div className="flex justify-between items-start mb-3">
//                   <span
//                     className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
//                       inc.severity === "critical"
//                         ? "bg-red-500/10 text-red-500"
//                         : "bg-orange-500/10 text-orange-400"
//                     }`}
//                   >
//                     {inc.severity}
//                   </span>
//                   <span className="text-[10px] text-slate-600">{inc.time}</span>
//                 </div>
//                 <p className="text-white font-bold text-sm mb-1">{inc.title}</p>
//                 <p className="text-slate-500 text-xs mb-3">{inc.area}</p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-[10px] text-slate-600 border border-slate-700 px-2 py-0.5 rounded">
//                     {inc.category}
//                   </span>
//                   <span className="text-[10px] text-yellow-400">
//                     {inc.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* --- NEAREST POLICE STATIONS --- */}
//       <section className="py-16 border-t border-[#3D0000] px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="mb-8">
//             <h2 className="text-2xl font-black uppercase tracking-tight">
//               Nearest <span className="text-[#FF0000]">Police</span> Stations
//             </h2>
//             <p className="text-slate-500 text-sm mt-1">
//               Auto-detected based on your location. Reports are routed to the
//               nearest active station.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               {
//                 name: "Taj Ganj Police Station",
//                 distance: "1.2 km",
//                 status: "Active",
//                 cases: 12,
//                 phone: "0562-240-1234",
//               },
//               {
//                 name: "Civil Lines Thana",
//                 distance: "2.8 km",
//                 status: "Active",
//                 cases: 7,
//                 phone: "0562-240-5678",
//               },
//               {
//                 name: "Sadar Bazar Chowki",
//                 distance: "3.5 km",
//                 status: "Active",
//                 cases: 4,
//                 phone: "0562-240-9012",
//               },
//             ].map((station, i) => (
//               <div
//                 key={i}
//                 className="bg-[#080808] border border-[#3D0000] rounded-xl p-5 hover:border-[#950101] transition-all"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <p className="text-white font-bold text-sm">
//                       {station.name}
//                     </p>
//                     <p className="text-slate-500 text-xs mt-0.5">
//                       {station.distance} away
//                     </p>
//                   </div>
//                   <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
//                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
//                     {station.status}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between text-xs">
//                   <span className="text-slate-500">
//                     {station.cases} active cases
//                   </span>
//                   <a
//                     href={`tel:${station.phone}`}
//                     className="text-[#FF0000] font-bold hover:underline"
//                   >
//                     {station.phone}
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MdGpsFixed,
  MdShield,
  MdTimeline,
  MdArrowForward,
  MdRadioButtonChecked,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";
import { DUMMY_INCIDENTS } from "../data/incidents";

const STATUS_LABELS = {
  reported: "Reported",
  under_investigation: "Under Investigation",
  resolved: "Resolved",
};

const SEVERITY_COLORS = {
  critical: "bg-red-500/10 text-red-500",
  high: "bg-orange-500/10 text-orange-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  low: "bg-green-500/10 text-green-400",
};

// Simulated real-time counter
function LiveCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [end]);
  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Home() {
  const [networkStatus, setNetworkStatus] = useState("connecting");

  // Simulate WebSocket connection status
  useEffect(() => {
    const t = setTimeout(() => setNetworkStatus("active"), 1500);
    return () => clearTimeout(t);
  }, []);

  const recentIncidents = DUMMY_INCIDENTS.slice(0, 3);

  const policeStations = [
    {
      name: "Taj Ganj Police Station",
      distance: "1.2 km",
      cases: 12,
      phone: "0562-240-1234",
      status: "active",
    },
    {
      name: "Civil Lines Thana",
      distance: "2.8 km",
      cases: 7,
      phone: "0562-240-5678",
      status: "active",
    },
    {
      name: "Sadar Bazar Chowki",
      distance: "3.5 km",
      cases: 4,
      phone: "0562-240-9012",
      status: "active",
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#000000] text-white selection:bg-[#FF0000] selection:text-white">
      {/* ── 1. HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#950101]/20 blur-[120px] rounded-full opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#3D0000] to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Live network status badge — actually changes state */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-all duration-500 ${
              networkStatus === "active"
                ? "border-green-500/40 bg-green-500/10 text-green-400"
                : "border-[#3D0000] bg-[#3D0000]/20 text-yellow-400"
            }`}
          >
            <MdRadioButtonChecked
              className={`text-sm ${networkStatus === "active" ? "animate-pulse text-green-400" : "text-yellow-400"}`}
            />
            {networkStatus === "active"
              ? "Live Network Status: Active"
              : "Connecting to network..."}
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            EYES ON THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FF0000] to-[#3D0000]">
              STREETS.
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            The next generation of public safety. Report incidents in seconds,
            track hazards in real-time, and let{" "}
            <span className="text-white font-bold">Gemini AI</span> handle the
            rest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/report"
              className="group w-full sm:w-auto px-10 py-4 rounded-xl bg-[#FF0000] text-white font-black text-lg shadow-[0_0_40px_rgba(255,0,0,0.2)] hover:shadow-[0_0_60px_rgba(255,0,0,0.4)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              REPORT INCIDENT
              <MdArrowForward className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/map"
              className="w-full sm:w-auto px-10 py-4 rounded-xl border border-[#3D0000] bg-white/5 text-white font-bold text-lg hover:bg-[#3D0000]/30 transition-all flex items-center justify-center gap-2"
            >
              VIEW LIVE MAP
            </Link>
          </div>

          {/* Live stats row */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: 2847, suffix: "+", label: "Reports Filed" },
              { value: 94, suffix: "%", label: "Resolution Rate" },
              { value: 38, suffix: " min", label: "Avg Response Time" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-[#FF0000]">
                  <LiveCounter end={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating recent activity card */}
        <div className="hidden lg:block absolute bottom-12 left-12 p-4 rounded-xl border border-[#3D0000] bg-black/60 backdrop-blur-md">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">
            Recent Activity
          </div>
          {DUMMY_INCIDENTS.slice(0, 2).map((inc) => (
            <div
              key={inc._id}
              className="text-xs font-medium text-white flex items-center gap-2 mb-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              {inc.title} — {inc.location.address.split(",")[0]}
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. HOW IT WORKS — KEY FEATURES ── */}
      <section className="py-20 border-t border-[#3D0000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-3">
              How <span className="text-[#FF0000]">CrimeWatch</span> Works
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Three technologies working together to keep your city safer in
              real time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <MdGpsFixed className="text-[#FF0000] text-2xl" />,
                title: "Precision Mapping",
                desc: "Leaflet.js renders an interactive live map. Citizens drop a pin at the exact incident location. Authorities see every report plotted in real time with severity color coding.",
                step: "01",
              },
              {
                icon: <MdShield className="text-[#FF0000] text-2xl" />,
                title: "Gemini AI Analysis",
                desc: "Every submitted report is sent to Google's Gemini API. It auto-categorises the incident, detects duplicate reports of the same event, and generates a plain-English summary for police.",
                step: "02",
              },
              {
                icon: <MdTimeline className="text-[#FF0000] text-2xl" />,
                title: "WebSocket Live Sync",
                desc: "Socket.io maintains a persistent connection between every browser and the server. When a new report is filed, it appears on every connected screen in under 100ms — no page refresh.",
                step: "03",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="group p-6 rounded-2xl border border-[#3D0000] bg-[#080808] hover:border-[#950101] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#3D0000]/40 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-[#3D0000] group-hover:text-[#950101]/40 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LIVE INCIDENT FEED ── */}
      <section className="py-16 border-t border-[#3D0000] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Live <span className="text-[#FF0000]">Incident</span> Feed
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real-time reports · Click any incident for full details
              </p>
            </div>
            <Link
              to="/map"
              className="text-xs text-[#FF0000] font-bold hover:underline flex items-center gap-1"
            >
              View All on Map <MdArrowForward />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentIncidents.map((inc) => (
              <Link to={`/incidents/${inc._id}`} key={inc._id}>
                <div className="bg-[#080808] border border-[#3D0000] rounded-xl p-4 hover:border-[#950101] transition-all cursor-pointer h-full">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${SEVERITY_COLORS[inc.severity]}`}
                    >
                      {inc.severity}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      {new Date(inc.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm mb-1">
                    {inc.title}
                  </p>
                  <p className="text-slate-500 text-xs mb-1">
                    {inc.location.address}
                  </p>
                  <p className="text-slate-600 text-xs mb-3 line-clamp-2">
                    {inc.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-600 border border-slate-700 px-2 py-0.5 rounded">
                      {inc.category}
                    </span>
                    <span className="text-[10px] text-yellow-400">
                      {STATUS_LABELS[inc.status]}
                    </span>
                  </div>
                  <div className="mt-3 text-[10px] text-[#FF0000] font-bold flex items-center gap-1">
                    View full details <MdArrowForward />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. NEAREST POLICE STATIONS ── */}
      <section className="py-16 border-t border-[#3D0000] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Nearest <span className="text-[#FF0000]">Police</span> Stations
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Auto-detected based on your location. Reports are routed to the
              nearest active station.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {policeStations.map((station, i) => (
              <div
                key={i}
                className="bg-[#080808] border border-[#3D0000] rounded-xl p-5 hover:border-[#950101] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold text-sm">
                      {station.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <MdLocationOn className="text-[#FF0000] text-xs" />
                      <p className="text-slate-500 text-xs">
                        {station.distance} away
                      </p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {station.cases} active cases
                  </span>
                  <a
                    href={`tel:${station.phone}`}
                    className="flex items-center gap-1 text-[#FF0000] text-xs font-bold hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MdPhone />
                    {station.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-b from-[#3D0000]/40 to-[#000000] border border-[#3D0000] p-12 text-center relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF0000]/10 blur-[80px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            BECOME A WATCHMAN.
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of citizens making their cities safer. Your identity
            is protected — only police and admins can see who filed a report.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-lg bg-[#FF0000] text-white font-black hover:bg-[#CC0000] transition-all active:scale-95"
            >
              CREATE FREE ACCOUNT
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-lg border border-[#3D0000] text-white font-bold hover:bg-[#3D0000] transition-all"
            >
              SIGN IN
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
