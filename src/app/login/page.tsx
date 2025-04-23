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

const customBG = {};

export default function LoginPage() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setIsLoggingIn(true);
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      sessionStorage.setItem("cyberlegal-auth", "true");
      sessionStorage.setItem("access_token", data.access_token);
      setLoginSuccess(true);
      setIsLoggingIn(false);
    } catch (err: any) {
      setIsLoggingIn(false);
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen flex text-white">
      {/* Left side */}
      <div
        className="w-1/2 hidden md:flex items-center justify-center"
        style={{
          backgroundImage: "url('../../../loginbg.png')",
          backgroundSize: "cover",
          backgroundPositionY: "center",
        }}
      >
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
              {/* <h1 className="text-4xl font-bold text-indigo-700 mb-4">
                Your Cybersecurity
              </h1>
              <p className="text-gray-600">
                Access your AI-powered legal assistant anytime.
              </p> */}
              <div className="w-1/2 hidden lg:flex flex-col justify-center items-start px-20">
                <h1 className="text-4xl font-semibold mb-4">
                  Your <br />
                  Cybersecurity <br />
                  <span className="text-pink-500">Assistant</span>
                </h1>
                {/* Optional: use an animated SVG or Lottie for those gradient lines */}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-16">
        <div className="bg-[#263149] p-32 rounded-xl shadow-xl w-full max-w-2xl login-bg">
          <h2 className="text-center text-xl font-bold mb-6">
            <span className="text-white">Cyber</span>
            <span className="text-pink-500"> Legal</span>
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full mt-4 py-2 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
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
          <div className="flex items-center justify-center py-3">
            <GoogleLoginButton />
          </div>

          <div className="flex justify-between text-sm mt-4 text-gray-600">
            <Link href="#" className="hover:underline text-indigo-600">
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="hover:underline text-indigo-600 cursor-pointer"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
