import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import {
  MdDashboard,
  MdReport,
  MdLogout,
  MdPerson,
  MdAdminPanelSettings,
} from "react-icons/md";
import { IoNotificationsOutline, IoMapOutline } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";
// Temporary mock — replace with useContext(AuthContext) after backend

const ROLE_COLORS = {
  citizen: "text-blue-400",
  police: "text-yellow-400",
  admin: "text-red-400",
};

const ROLE_ICONS = {
  citizen: <MdPerson />,
  police: <MdAdminPanelSettings />,
  admin: <MdAdminPanelSettings />,
};

export default function Navbar() {
  const navigate = useNavigate();
  // const  { user, logout } = useMockAuth();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Mock notifications — replace with real data later
  const notifications = [
    {
      id: 1,
      text: "Your report 'Road Accident' has been updated.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      text: "Police have been dispatched to your reported location.",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      text: "New incident reported 0.5km from you.",
      time: "1 hr ago",
      read: true,
    },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const linkBase =
    "flex items-center gap-2 px-3 py-1 rounded-xl text-slate-300 text-sm font-medium transition-all duration-300 hover:bg-[#3D0000] hover:text-[#FF0000]";
  const activeLink =
    "bg-[#950101] text-white shadow-[0_0_15px_rgba(149,1,1,0.4)] hover:text-white hover:bg-[#950101]";

  // Protected nav click — if not logged in show modal
  const handleProtectedNav = (e, path) => {
    if (!user) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-[#000000] sticky top-0 z-50 border-b border-[#3D0000] shadow-2xl">
        <div className="max-w-9xl mx-auto px-6 py-2 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <h1 className="text-lg font-black tracking-tighter text-white uppercase">
              Crime<span className="text-[#FF0000] animate-pulse">Watch</span>
            </h1>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : ""}`
              }
              onClick={(e) => handleProtectedNav(e, "/dashboard")}
            >
              <MdDashboard className="text-base" />
              Dashboard
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : ""}`
              }
              onClick={(e) => handleProtectedNav(e, "/report")}
            >
              <MdReport className="text-base" />
              Report
            </NavLink>

            <NavLink
              to="/map"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeLink : ""}`
              }
              onClick={(e) => handleProtectedNav(e, "/map")}
            >
              <IoMapOutline className="text-base" />
              Live Map
            </NavLink>
          </div>

          {/* Right side — notifications + user/login */}
          <div className="hidden md:flex items-center gap-3">
            {/* Notification bell */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1.5 rounded-full text-slate-400 hover:bg-[#3D0000] hover:text-[#FF0000] transition-all"
                >
                  <IoNotificationsOutline className="text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF0000] rounded-full text-[9px] font-black text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 top-10 w-80 bg-[#0a0a0a] border border-[#3D0000] rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#3D0000] flex items-center justify-between">
                      <p className="text-sm font-black text-white">
                        Notifications
                      </p>
                      <span className="text-[10px] text-[#FF0000] font-bold">
                        {unreadCount} unread
                      </span>
                    </div>
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b border-[#1a0000] hover:bg-[#1a0000] transition-all ${
                          !n.read ? "bg-[#3D0000]/10" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {!n.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] flex-shrink-0 mt-1.5" />
                          )}
                          <div>
                            <p className="text-xs text-slate-300">{n.text}</p>
                            <p className="text-[10px] text-slate-600 mt-1">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="px-4 py-2 text-center">
                      <button className="text-xs text-[#FF0000] font-bold hover:underline">
                        Mark all as read
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User profile OR login/signup buttons */}
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#3D0000] hover:border-[#950101] transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-[#950101] flex items-center justify-center text-white text-xs font-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white leading-none">
                      {user.name}
                    </p>
                    <p
                      className={`text-[10px] capitalize leading-none mt-0.5 ${ROLE_COLORS[user.role]}`}
                    >
                      {user.role}
                    </p>
                  </div>
                </button>

                {/* User dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-[#0a0a0a] border border-[#3D0000] rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#3D0000]">
                      <p className="text-xs font-black text-white">
                        {user.name}
                      </p>
                      <p
                        className={`text-[10px] capitalize ${ROLE_COLORS[user.role]}`}
                      >
                        {user.role}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/dashboard");
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-slate-300 hover:bg-[#3D0000] hover:text-white transition-all"
                    >
                      <MdDashboard /> My Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-[#3D0000] transition-all border-t border-[#3D0000]"
                    >
                      <MdLogout /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-1.5 rounded-lg bg-[#950101] text-white text-sm font-bold hover:bg-[#FF0000] active:scale-90 transition-all"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1 rounded-lg text-white hover:bg-[#3D0000] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden absolute w-full bg-[#000000] border-b border-[#3D0000] transition-all duration-500 ease-in-out ${
            isOpen
              ? "max-h-[400px] opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="px-6 py-4 space-y-2">
            <NavLink
              to="/dashboard"
              onClick={(e) => {
                handleProtectedNav(e, "/dashboard");
                setIsOpen(false);
              }}
              className="flex items-center gap-4 p-3 rounded-xl text-slate-300 text-sm hover:bg-[#3D0000] hover:text-white transition"
            >
              <MdDashboard className="text-[#950101]" /> Dashboard
            </NavLink>
            <NavLink
              to="/report"
              onClick={(e) => {
                handleProtectedNav(e, "/report");
                setIsOpen(false);
              }}
              className="flex items-center gap-4 p-3 rounded-xl text-slate-300 text-sm hover:bg-[#3D0000] hover:text-white transition"
            >
              <MdReport className="text-[#950101]" /> Report Incident
            </NavLink>
            <NavLink
              to="/map"
              onClick={(e) => {
                handleProtectedNav(e, "/map");
                setIsOpen(false);
              }}
              className="flex items-center gap-4 p-3 rounded-xl text-slate-300 text-sm hover:bg-[#3D0000] hover:text-white transition"
            >
              <IoMapOutline className="text-[#950101]" /> Live Map
            </NavLink>
            <div className="pt-2 flex gap-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl border border-[#3D0000] text-white text-sm font-bold"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      navigate("/login");
                      setIsOpen(false);
                    }}
                    className="flex-1 py-3 rounded-xl border border-[#3D0000] text-white text-sm font-bold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setIsOpen(false);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#FF0000] text-white text-sm font-black"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login required modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center px-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-[#080808] border border-[#3D0000] rounded-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-[#3D0000]/40 flex items-center justify-center mx-auto mb-4">
              <MdReport className="text-[#FF0000] text-3xl" />
            </div>
            <h2 className="text-xl font-black text-white mb-2">
              Login Required
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              This is a secure platform. You must sign in or create an account
              to access this feature.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/login");
                }}
                className="w-full py-3 rounded-xl bg-[#950101] text-white font-black hover:bg-[#FF0000] transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  navigate("/register");
                }}
                className="w-full py-3 rounded-xl border border-[#3D0000] text-white font-bold hover:bg-[#3D0000] transition-all"
              >
                Create Free Account
              </button>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-slate-600 text-xs hover:text-slate-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
