import { useState, useContext } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/login", form);
      await fetchUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-stone-50">

      {/* ── Left panel (hidden on mobile) ── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-stone-900 p-14 md:flex md:w-[45%] lg:w-[40%]">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(120,100,80,0.25),transparent_60%)]" />
        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Logo */}
        <div className="relative flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-100/20 bg-stone-100/10">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="2" y="2" width="5" height="5" rx="1.5" fill="rgba(247,245,240,0.9)" />
              <rect x="9" y="2" width="5" height="5" rx="1.5" fill="rgba(247,245,240,0.4)" />
              <rect x="2" y="9" width="5" height="5" rx="1.5" fill="rgba(247,245,240,0.4)" />
              <rect x="9" y="9" width="5" height="5" rx="1.5" fill="rgba(247,245,240,0.9)" />
            </svg>
          </div>
          <span className="font-serif text-base font-semibold tracking-tight text-stone-50">
            TaskManager
          </span>
        </div>

        {/* Tagline */}
        <div className="relative">
          <h2 className="font-serif text-[36px] font-semibold leading-tight tracking-tight text-stone-50">
            Clarity for<br />everything you do.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
            Organize your work, set priorities,<br />
            and move forward with confidence.
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[360px]">

          <h1 className="font-serif text-[28px] font-semibold tracking-tight text-stone-900">
            Welcome back
          </h1>
          <p className="mt-1.5 mb-8 text-sm text-stone-400">
            New here?{" "}
            <Link to="/register" className="font-medium text-stone-700 underline underline-offset-2 hover:text-stone-900">
              Create an account
            </Link>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13.5px] text-red-600">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M7 4.5v3M7 9.5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-stone-600">
                Email address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-[15px] text-stone-900 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-stone-600">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-[15px] text-stone-900 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-stone-900 py-3 text-[15px] font-semibold text-stone-50 transition-all hover:bg-stone-800 hover:-translate-y-px hover:shadow-lg hover:shadow-stone-900/15 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
              ) : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-stone-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-stone-700 underline underline-offset-2 hover:text-stone-900">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}