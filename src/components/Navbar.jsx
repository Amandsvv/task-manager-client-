import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex h-[62px] items-center justify-between border-b border-stone-200 bg-stone-50/85 px-8 backdrop-blur-md">

      {/* Logo */}
      <div
        className="flex cursor-pointer select-none items-center gap-2.5"
        onClick={() => navigate(user ? "/dashboard" : "/")}
      >
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-stone-900">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="5" height="5" rx="1.5" fill="#F7F5F0" />
            <rect x="9" y="2" width="5" height="5" rx="1.5" fill="#F7F5F0" fillOpacity="0.45" />
            <rect x="2" y="9" width="5" height="5" rx="1.5" fill="#F7F5F0" fillOpacity="0.45" />
            <rect x="9" y="9" width="5" height="5" rx="1.5" fill="#F7F5F0" />
          </svg>
        </div>
        <span className="font-serif text-[17px] font-semibold tracking-tight text-stone-900">
          TaskManager
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        {!user ? (
          <>
            <Link
              to="/"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-stone-900 px-3.5 py-1.5 text-sm font-medium text-stone-50 transition-all hover:bg-stone-800 hover:shadow-md hover:-translate-y-px"
            >
              Get Started
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="rounded-md px-3 py-1.5 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              Dashboard
            </Link>

            <div className="mx-2 h-4 w-px bg-stone-200" />

            <span className="max-w-[180px] truncate rounded-full border border-stone-200 bg-stone-100 px-3 py-1 font-mono text-xs text-stone-400">
              {user.email}
            </span>

            <button
              onClick={handleLogout}
              className="rounded-md border border-stone-200 bg-transparent px-3.5 py-1.5 text-sm font-medium text-stone-700 transition-all hover:bg-stone-100 hover:border-stone-300"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </nav>
  );
}