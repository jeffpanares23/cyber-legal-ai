"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useRouter } from "next/navigation";
import LottiePlayer from "../components/LottieClientOnly";
import Cookies from "js-cookie";

Cookies.set("cyberlegal-auth", "true");

export default function LoginPage() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState("admin@cyberlegal.ai");
  const [password, setPassword] = useState("letmein");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        router.push("/chatbot");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess, router]);

  // Static credentials
  const VALID_EMAIL = "admin@cyberlegal.ai";
  const VALID_PASSWORD = "letmein";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setError("");
      setIsLoggingIn(true);

      setTimeout(() => {
        sessionStorage.setItem("cyberlegal-auth", "true");
        setLoginSuccess(true); // 👈 triggers the useEffect
        setIsLoggingIn(false);
      }, 3000);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* Left side */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
        <div className="max-w-md text-center">
          {isLoggingIn ? (
            loginSuccess ? (
              <LottiePlayer
                autoplay
                keepLastFrame
                src="https://lottie.host/19a10319-ef99-4b58-8381-0a09f6c845bb/N5vuJPPv6X.json"
                style={{ height: "200px", width: "200px" }}
              />
            ) : (
              <LottiePlayer
                autoplay
                loop
                src="https://lottie.host/19a10319-ef99-4b58-8381-0a09f6c845bb/N5vuJPPv6X.json"
                style={{ height: "180px", width: "180px" }}
              />
            )
          ) : (
            <>
              <h1 className="text-4xl font-bold text-indigo-700 mb-4">
                Your Cybersecurity
              </h1>
              <p className="text-gray-600">
                Access your AI-powered legal assistant anytime.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Login to Cyberlegal.AI
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center justify-center"
              disabled={isLoggingIn || loginSuccess}
            >
              {isLoggingIn && !loginSuccess ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Logging in...
                </>
              ) : loginSuccess ? (
                "Redirecting..."
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="flex items-center justify-center">
            <GoogleLoginButton />
          </div>

          <div className="flex justify-between text-sm mt-4 text-gray-600">
            <Link href="#" className="hover:underline text-indigo-600">
              Forgot password?
            </Link>
            <Link href="#" className="hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
