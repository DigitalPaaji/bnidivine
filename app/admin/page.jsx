"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_URL } from "../src/lib/api";

// --- Icons ---
const EmailIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PasswordIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = ({ visible }) => (
  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {visible ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a10.07 10.07 0 014.136-5.4M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18" />
      </>
    )}
  </svg>
);

const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 533.5 544.3">
    <path d="M533.5 277.8c0-16.8-1.5-33-4.3-48.5H272.5v103.6h147c-6.3 34.3-24.8 63.3-52.6 82.4v68.4h86.7c50.8-46.8 80-116.3 80-195.9z" fill="#4285F4" />
    <path d="M272.5 544.3c72.4 0 133.1-23.9 177.4-64.6l-86.7-68.4c-24.1 16.1-54.8 25.7-90.7 25.7-69.8 0-128.8-47.1-149.9-110.2H35.7v68.6c44.8 88.9 137.4 148.9 236.8 148.9z" fill="#34A853" />
    <path d="M122.6 327.3c-5.4-16.1-8.4-33.2-8.4-51.3 0-18.2 3-35.2 8.4-51.3V156.1H35.7c-18.3 36.7-28.6 78.4-28.6 122.8 0 44.4 10.3 86.1 28.6 122.8l86.9-68.4z" fill="#FBBC05" />
    <path d="M272.5 107.3c38.2 0 72.4 13.2 99.3 39.2l74.4-74.4C398.7 32.3 339.3 0 272.5 0 173.1 0 80.5 60 35.7 148.9l86.9 68.4C143.7 154.4 202.7 107.3 272.5 107.3z" fill="#EA4335" />
  </svg>
);

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("bni_admin_token", result.token);
      router.push("/admin/members");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center font-sans overflow-x-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Other/banner0.webp"
          alt="Background Banner"
          fill
          className="object-cover backdrop-opacity-75"
          priority
        />
        {/* Subtle dark overlay for readability if needed */}
        <div className="absolute inset-0 bg-black/65 backdrop-blur-xs" />
      </div>

      {/* Content Layout Grid */}
      <div className="relative z-10 w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center px-6 lg:px-16 py-10 gap-8">
        
        {/* Left Side: Brand Text & Tagline */}
        <div className="lg:col-span-7 flex flex-col justify-center text-white space-y-4">
          <div className="text-lg tracking-tight">-- by Digital Paaji</div>
          <h1 className="text-3xl sm:text-4xl font-normal lg:text-5xl tracking-tight leading-tight max-w-xl">
          BUILDING STRONG ROOTS. DRIVING GROWTH.
          </h1>
          <p className="text-base sm:text-lg text-white/90 font-medium">
            Log in and continue growing.
          </p>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-center w-full">
          <div className="w-full max-w-md bg-[#FFFBF7] rounded-4xl p-8 sm:p-10 shadow-2xl border border-white/40 backdrop-blur-sm">
            
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-[26px] text-gray-900 tracking-tight">
                Log in to your account
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* EMAIL FIELD */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-gray-700 mb-2"
                >
                  Email address
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4">
                    <EmailIcon />
                  </span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all"
                  />
                </div>
              </div>

              {/* PASSWORD FIELD */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4">
                    <PasswordIcon />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-white pl-12 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-600/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon visible={showPassword} />
                  </button>
                </div>
                
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-[#68A52B] text-white font-semibold text-sm shadow-md hover:bg-[#5b9125] focus:outline-none focus:ring-2 focus:ring-green-600/50 disabled:opacity-50 transition-all duration-200 mt-2 cursor-pointer"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
}