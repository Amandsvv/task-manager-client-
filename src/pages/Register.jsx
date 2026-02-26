import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await API.post("/auth/signup", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Organize tasks in one place",
    "Track progress effortlessly",
    "Free to get started",
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">

      {/* ── Left panel (hidden on mobile) ── */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-stone-900 p-14 md:flex md:w-[45%] lg:w-[40%]">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_55%,rgba(80,110,80,0.2),transparent_60%)]" />
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
            Start doing<br />more today.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
            Your workspace for focused,<br />
            intentional work.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative flex flex-col gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 text-[13.5px] text-stone-400">
              <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-600" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[360px]">

          <h1 className="font-serif text-[28px] font-semibold tracking-tight text-stone-900">
            Create account
          </h1>
          <p className="mt-1.5 mb-8 text-sm text-stone-400">
            Already have one?{" "}
            <Link to="/" className="font-medium text-stone-700 underline underline-offset-2 hover:text-stone-900">
              Sign in
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
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-[15px] text-stone-900 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-stone-600">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-stone-200 bg-white px-3.5 py-2.5 text-[15px] text-stone-900 placeholder-stone-300 outline-none transition-all focus:border-stone-400 focus:ring-2 focus:ring-stone-900/5"
                required
                onChange={handleChange}
              />
              <p className="mt-1.5 text-xs text-stone-400">
                At least 8 characters recommended.
              </p>
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
              ) : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-[13.5px] text-stone-400">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-stone-700 underline underline-offset-2 hover:text-stone-900">
              Log in
            </Link>
          </p>

          <p className="mt-4 text-center text-[12px] leading-relaxed text-stone-400">
            By signing up, you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-stone-600">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-stone-600">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}