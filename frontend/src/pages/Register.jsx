import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdPerson,
  MdShield,
  MdAdminPanelSettings,
  MdVisibility,
  MdVisibilityOff,
  MdCheckCircle,
} from "react-icons/md";

const ROLES = [
  {
    value: "citizen",
    label: "Citizen",
    icon: <MdPerson className="text-2xl" />,
    desc: "Report incidents. Your identity stays private from other citizens.",
    color: "border-blue-500/50 text-blue-400",
    activeBg: "bg-blue-500/10",
  },
  {
    value: "police",
    label: "Police Officer",
    icon: <MdShield className="text-2xl" />,
    desc: "View all reports in your jurisdiction. Update case status. See reporter identities.",
    color: "border-yellow-500/50 text-yellow-400",
    activeBg: "bg-yellow-500/10",
    note: "Requires badge ID verification",
  },
  {
    value: "admin",
    label: "Admin",
    icon: <MdAdminPanelSettings className="text-2xl" />,
    desc: "Full access. View analytics, manage users, delete reports, generate PDF reports.",
    color: "border-red-500/50 text-red-400",
    activeBg: "bg-red-500/10",
    note: "Requires admin approval",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: choose role, 2: fill details
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    badgeId: "", // police only
    adminCode: "", // admin only
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.role === "police" && !form.badgeId) {
      setError("Badge ID is required for police registration.");
      return;
    }
    if (form.role === "admin" && !form.adminCode) {
      setError("Admin code is required.");
      return;
    }
    setLoading(true);
    // TODO: replace with real API — axios.post('/api/auth/register', form)
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#950101]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
              Crime<span className="text-[#FF0000]">Watch</span>
            </h1>
          </Link>
          <p className="text-slate-500 text-sm mt-2">Create your account</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-6">
          {["Choose Role", "Your Details"].map((s, i) => (
            <div key={i} className="flex items-center gap-2 flex-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
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
              {i < 1 && (
                <div
                  className={`flex-1 h-px ${step > i + 1 ? "bg-green-500" : "bg-[#3D0000]"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#080808] border border-[#3D0000] rounded-2xl p-8">
          {/* Step 1 — Role selection */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-black text-white mb-1">
                Who are you?
              </h2>
              <p className="text-slate-500 text-xs mb-6">
                Your role determines what you can see and do on the platform.
              </p>

              <div className="space-y-3 mb-6">
                {ROLES.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: role.value })}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      form.role === role.value
                        ? `${role.color} ${role.activeBg}`
                        : "border-[#3D0000] hover:border-[#950101]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          form.role === role.value
                            ? role.color.split(" ")[1]
                            : "text-slate-500"
                        }
                      >
                        {role.icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-bold text-sm ${form.role === role.value ? "text-white" : "text-slate-300"}`}
                          >
                            {role.label}
                          </p>
                          {form.role === role.value && (
                            <MdCheckCircle className="text-green-400 text-lg" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {role.desc}
                        </p>
                        {role.note && (
                          <p className="text-[10px] text-yellow-500 mt-1">
                            ⚠ {role.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (!form.role) {
                    setError("Please select a role.");
                    return;
                  }
                  setError("");
                  setStep(2);
                }}
                disabled={!form.role}
                className="w-full py-3.5 rounded-xl bg-[#950101] text-white font-black hover:bg-[#FF0000] transition-all disabled:opacity-40"
              >
                Continue as{" "}
                {form.role
                  ? ROLES.find((r) => r.value === form.role)?.label
                  : "..."}
              </button>

              {error && (
                <p className="text-red-400 text-xs text-center mt-3">{error}</p>
              )}
            </div>
          )}

          {/* Step 2 — Fill details */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-slate-500 hover:text-white text-xs"
                >
                  ← Back
                </button>
                <span className="text-xs text-slate-600">
                  Registering as{" "}
                  <span className="text-white font-bold">
                    {ROLES.find((r) => r.value === form.role)?.label}
                  </span>
                </span>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors"
                />
                <p className="text-[10px] text-slate-600 mt-1">
                  Visible only to police and admin — never shown publicly
                </p>
              </div>

              {/* Police badge field */}
              {form.role === "police" && (
                <div>
                  <label className="text-xs font-bold text-yellow-400 uppercase tracking-wider mb-1.5 block">
                    Police Badge ID *
                  </label>
                  <input
                    type="text"
                    name="badgeId"
                    value={form.badgeId}
                    onChange={handleChange}
                    placeholder="e.g. UP-CID-2024-1234"
                    className="w-full bg-black border border-yellow-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                  <p className="text-[10px] text-yellow-600 mt-1">
                    Your badge ID will be verified by admin before account
                    activation
                  </p>
                </div>
              )}

              {/* Admin code field */}
              {form.role === "admin" && (
                <div>
                  <label className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1.5 block">
                    Admin Access Code *
                  </label>
                  <input
                    type="password"
                    name="adminCode"
                    value={form.adminCode}
                    onChange={handleChange}
                    placeholder="Enter admin access code"
                    className="w-full bg-black border border-red-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <p className="text-[10px] text-red-600 mt-1">
                    Contact your system administrator for the access code
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors"
                />
              </div>

              <div className="bg-[#3D0000]/20 border border-[#3D0000] rounded-lg p-3 text-xs text-slate-400">
                🔒 Your personal details (name, phone, email) are{" "}
                <span className="text-white font-bold">
                  never shown to other citizens
                </span>
                . Only verified police officers and admins can see your identity
                when reviewing a report you filed.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#950101] text-white font-black hover:bg-[#FF0000] transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">Creating account...</span>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#3D0000] text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#FF0000] font-bold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
