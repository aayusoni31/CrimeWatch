import { Link } from "react-router-dom";
import {
  MdGpsFixed,
  MdShield,
  MdTimeline,
  MdArrowForward,
  MdRadioButtonChecked,
} from "react-icons/md";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#000000] text-white selection:bg-[#FF0000] selection:text-white">
      {/* --- 1. HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#950101]/20 blur-[120px] rounded-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#3D0000] to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3D0000] bg-[#3D0000]/20 text-[#FF0000] text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <MdRadioButtonChecked className="animate-pulse text-sm" />
            Live Network Status: Active
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
            <span className="text-white">Gemini AI</span> handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
        </div>

        {/* Floating "Live Info" Box - Bottom Left */}
        <div className="hidden lg:block absolute bottom-12 left-12 p-4 rounded-xl border border-[#3D0000] bg-black/50 backdrop-blur-md">
          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">
            Recent Activity
          </div>
          <div className="text-sm font-medium text-white flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            Accident reported in Sector 4
          </div>
        </div>
      </section>

      {/* --- 2. THE TECH STACK GRID --- */}
      <section className="py-24 border-t border-[#3D0000]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
                <MdGpsFixed className="text-[#FF0000] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Precision Mapping
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Leaflet.js integration allows for millimeter-perfect pin drops
                and localized heatmaps for authorities.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
                <MdShield className="text-[#FF0000] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Deduplication</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Gemini API scans all incoming reports, merges duplicates, and
                provides summarized data to response teams.
              </p>
            </div>

            <div className="space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-[#3D0000]/30 flex items-center justify-center border border-[#950101]/30 group-hover:border-[#FF0000] transition-colors">
                <MdTimeline className="text-[#FF0000] text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-white">Websocket Sync</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                Powered by Socket.io. No refresh needed—new incidents appear on
                every user's screen in under 100ms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CALL TO ACTION (CTA) --- */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-[2rem] bg-gradient-to-b from-[#3D0000]/40 to-[#000000] border border-[#3D0000] p-12 text-center relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#FF0000]/10 blur-[80px] rounded-full"></div>

          <h2 className="text-3xl md:text-5xl font-black mb-6">
            BECOME A WATCHMAN.
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Join thousands of citizens making their cities safer. Your reports
            directly help emergency services respond faster.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-3 rounded-lg border border-[#FF0000] text-[#FF0000] font-bold hover:bg-[#FF0000] hover:text-white transition-all active:scale-95"
          >
            CREATE FREE ACCOUNT
          </Link>
        </div>
      </section>
      {/* --- RECENT COMPLAINTS FEED --- */}
      <section className="py-16 border-t border-[#3D0000] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Live <span className="text-[#FF0000]">Incident</span> Feed
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Real-time reports from citizens across the city
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
            {[
              {
                title: "Road Accident",
                area: "Sector 4, Near Market",
                time: "2 min ago",
                severity: "critical",
                status: "Under Investigation",
                category: "Accident",
              },
              {
                title: "Chain Snatching",
                area: "Bus Stand, Platform 2",
                time: "14 min ago",
                severity: "critical",
                status: "Reported",
                category: "Theft",
              },
              {
                title: "Suspicious Activity",
                area: "Near City School",
                time: "31 min ago",
                severity: "high",
                status: "Reported",
                category: "Suspicious",
              },
            ].map((inc, i) => (
              <div
                key={i}
                className="bg-[#080808] border border-[#3D0000] rounded-xl p-4 hover:border-[#950101] transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                      inc.severity === "critical"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-orange-500/10 text-orange-400"
                    }`}
                  >
                    {inc.severity}
                  </span>
                  <span className="text-[10px] text-slate-600">{inc.time}</span>
                </div>
                <p className="text-white font-bold text-sm mb-1">{inc.title}</p>
                <p className="text-slate-500 text-xs mb-3">{inc.area}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-600 border border-slate-700 px-2 py-0.5 rounded">
                    {inc.category}
                  </span>
                  <span className="text-[10px] text-yellow-400">
                    {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEAREST POLICE STATIONS --- */}
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
            {[
              {
                name: "Taj Ganj Police Station",
                distance: "1.2 km",
                status: "Active",
                cases: 12,
                phone: "0562-240-1234",
              },
              {
                name: "Civil Lines Thana",
                distance: "2.8 km",
                status: "Active",
                cases: 7,
                phone: "0562-240-5678",
              },
              {
                name: "Sadar Bazar Chowki",
                distance: "3.5 km",
                status: "Active",
                cases: 4,
                phone: "0562-240-9012",
              },
            ].map((station, i) => (
              <div
                key={i}
                className="bg-[#080808] border border-[#3D0000] rounded-xl p-5 hover:border-[#950101] transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white font-bold text-sm">
                      {station.name}
                    </p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      {station.distance} away
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    {station.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">
                    {station.cases} active cases
                  </span>
                  <a
                    href={`tel:${station.phone}`}
                    className="text-[#FF0000] font-bold hover:underline"
                  >
                    {station.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
