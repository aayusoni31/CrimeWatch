import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdRadioButtonChecked,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

export default function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    // TODO: replace with real API call — axios.post('/api/auth/login', form)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // Temporary: navigate to home after fake login
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#950101]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase">
              Crime<span className="text-[#FF0000]">Watch</span>
            </h1>
          </Link>
          <p className="text-slate-500 text-sm mt-2">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-[#080808] border border-[#3D0000] rounded-2xl p-8">
          <h2 className="text-xl font-black text-white mb-1">Welcome back</h2>
          <p className="text-slate-500 text-xs mb-6">
            Your identity is protected. Only police and admins can view your
            profile details.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                Email Address
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
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-black border border-[#3D0000] rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-700 focus:outline-none focus:border-[#FF0000] transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPass ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#950101] text-white font-black hover:bg-[#FF0000] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="animate-pulse">Signing in...</span>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#3D0000] text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#FF0000] font-bold hover:underline"
              >
                Create one free
              </Link>
            </p>
          </div>
        </div>

        {/* Privacy note */}
        <div className="mt-4 flex items-center justify-center gap-2 text-slate-600 text-xs">
          <MdRadioButtonChecked className="text-green-500 animate-pulse" />
          Your identity is only visible to verified police officers and admins
        </div>
      </div>
    </div>
  );
}
