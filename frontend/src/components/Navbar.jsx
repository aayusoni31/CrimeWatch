// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { MdDashboard, MdReport } from "react-icons/md";
// import { IoNotificationsOutline, IoMapOutline } from "react-icons/io5";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Style Logic for Dark Theme
//   const linkBase =
//     "flex items-center gap-2 px-4 py-2 rounded-xl text-slate-300 font-medium transition-all duration-300 hover:bg-[#3D0000] hover:text-[#FF0000]";

//   const activeLink =
//     "bg-[#950101] text-white shadow-[0_0_15px_rgba(149,1,1,0.4)] hover:text-white hover:bg-[#950101]";

//   return (
//     <nav className="bg-[#000000] sticky top-0 z-50 border-b border-[#3D0000] shadow-2xl">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo Section */}
//         <div className="flex items-center gap-2 group cursor-pointer">
//           {/* <div className="w-10 h-10 bg-[#3D0000] rounded-lg flex items-center justify-center transition-all group-hover:bg-[#950101] group-hover:shadow-[0_0_20px_#FF0000] duration-500">
//             <MdReport className="text-[#FF0000] text-2xl group-hover:text-white" />
//           </div> */}
//           <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
//             Crime<span className="text-[#FF0000] animate-pulse">Watch</span>
//           </h1>
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex items-center gap-1">
//           <NavLink
//             to="/dashboard"
//             end
//             className={({ isActive }) =>
//               `${linkBase} ${isActive ? activeLink : ""}`
//             }
//           >
//             <MdDashboard className="text-lg" />
//             Dashboard
//           </NavLink>

//           <NavLink
//             to="/report"
//             className={({ isActive }) =>
//               `${linkBase} ${isActive ? activeLink : ""}`
//             }
//           >
//             <MdReport className="text-lg" />
//             Report
//           </NavLink>

//           <NavLink
//             to="/map"
//             className={({ isActive }) =>
//               `${linkBase} ${isActive ? activeLink : ""}`
//             }
//           >
//             <IoMapOutline className="text-lg" />
//             Live Map
//           </NavLink>
//         </div>

//         {/* Action Side */}
//         <div className="hidden md:flex items-center gap-4">
//           <button className="p-2 rounded-full text-slate-400 hover:bg-[#3D0000] hover:text-[#FF0000] transition-all">
//             <IoNotificationsOutline className="text-2xl" />
//           </button>

//           <button className="px-6 py-2.5 rounded-xl bg-[#950101] text-white font-bold hover:bg-[#FF0000] active:scale-90 transition-all duration-200 shadow-lg shadow-[#950101]/20">
//             Login
//           </button>
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           className="md:hidden p-2 rounded-lg text-white hover:bg-[#3D0000] transition-colors"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`md:hidden absolute w-full bg-[#000000] border-b border-[#3D0000] transition-all duration-500 ease-in-out ${
//           isOpen
//             ? "max-h-[500px] opacity-100 visible"
//             : "max-h-0 opacity-0 invisible"
//         }`}
//       >
//         <div className="px-6 py-8 space-y-4">
//           <NavLink
//             to="/"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center gap-4 p-4 rounded-2xl text-slate-300 hover:bg-[#3D0000] hover:text-white transition"
//           >
//             <MdDashboard className="text-[#950101]" /> Dashboard
//           </NavLink>

//           <NavLink
//             to="/report"
//             onClick={() => setIsOpen(false)}
//             className="flex items-center gap-4 p-4 rounded-2xl text-slate-300 hover:bg-[#3D0000] hover:text-white transition"
//           >
//             <MdReport className="text-[#950101]" /> Report Incident
//           </NavLink>

//           <div className="pt-6">
//             <button className="w-full py-4 rounded-2xl bg-[#FF0000] text-white font-black shadow-[0_0_25px_rgba(255,0,0,0.3)] active:scale-95 transition-all">
//               LOGIN
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdDashboard, MdReport } from "react-icons/md";
import { IoNotificationsOutline, IoMapOutline } from "react-icons/io5";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Style Logic for Dark Theme
  const linkBase =
    "flex items-center gap-2 px-3 py-1 rounded-xl text-slate-300 text-sm font-medium transition-all duration-300 hover:bg-[#3D0000] hover:text-[#FF0000]";

  const activeLink =
    "bg-[#950101] text-white shadow-[0_0_15px_rgba(149,1,1,0.4)] hover:text-white hover:bg-[#950101]";

  return (
    <nav className="bg-[#000000] sticky top-0 z-50 border-b border-[#3D0000] shadow-2xl">
      <div className="max-w-9xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <h1 className="text-lg font-black tracking-tighter text-white uppercase">
            Crime<span className="text-[#FF0000] animate-pulse">Watch</span>
          </h1>
        </div>
        {/* <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,0,0,0.3)] group-hover:scale-110 transition-transform">
            <span className="text-black font-black text-xl italic">C</span>
          </div>
          <span className="text-white font-black tracking-tighter text-xl italic group-hover:text-[#FF0000] transition-colors">
            CRIME
            <span className="text-[#FF0000] group-hover:text-white">WATCH</span>
          </span>
        </Link> */}
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : ""}`
            }
          >
            <MdDashboard className="text-base" />
            Dashboard
          </NavLink>

          <NavLink
            to="/report"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : ""}`
            }
          >
            <MdReport className="text-base" />
            Report
          </NavLink>

          <NavLink
            to="/map"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : ""}`
            }
          >
            <IoMapOutline className="text-base" />
            Live Map
          </NavLink>
        </div>

        {/* Action Side */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-1 rounded-full text-slate-400 hover:bg-[#3D0000] hover:text-[#FF0000] transition-all">
            <IoNotificationsOutline className="text-xl" />
          </button>

          <button className="px-4 py-1.5 rounded-lg bg-[#950101] text-white text-sm font-bold hover:bg-[#FF0000] active:scale-90 transition-all duration-200 shadow-lg shadow-[#950101]/20">
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-1 rounded-lg text-white hover:bg-[#3D0000] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-[#000000] border-b border-[#3D0000] transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[400px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        <div className="px-6 py-4 space-y-3">
          <NavLink
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 p-3 rounded-xl text-slate-300 text-sm hover:bg-[#3D0000] hover:text-white transition"
          >
            <MdDashboard className="text-[#950101]" /> Dashboard
          </NavLink>

          <NavLink
            to="/report"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-4 p-3 rounded-xl text-slate-300 text-sm hover:bg-[#3D0000] hover:text-white transition"
          >
            <MdReport className="text-[#950101]" /> Report Incident
          </NavLink>

          <div className="pt-4">
            <button className="w-full py-3 rounded-xl bg-[#FF0000] text-white text-sm font-black shadow-[0_0_25px_rgba(255,0,0,0.3)] active:scale-95 transition-all">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
