"use client";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import GoogleLoginButton from "../components/GoogleLoginButton";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@cyberlegal.ai");
  const [password, setPassword] = useState("letmein");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const router = useRouter();

  const VALID_EMAIL = "admin@cyberlegal.ai";
  const VALID_PASSWORD = "letmein";

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        router.push("/chatbot");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loginSuccess]);

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
        Cookies.set("cyberlegal-auth", "true");
        setLoginSuccess(true);
        setIsLoggingIn(false);
      }, 1500);
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <main className="min-h-screen flex bg-[#0B0F1A] text-white font-poppins relative">
      {/* Left Side */}
      <div className="w-1/2 hidden lg:flex items-center justify-center px-10 relative z-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-snug">
            Your <br />
            <span className="text-white">Cybersecurity</span> <br />
            <span className="text-pinkAccent">Assistant</span>
          </h1>
        </div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/login-bg.png"
          alt="Background Graphic"
          layout="fill"
          objectFit="cover"
          className="opacity-30 lg:opacity-100"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-6 py-8">
        <div className="w-full max-w-sm bg-[#111827] rounded-lg border border-white/10 px-8 py-10 shadow-lg">
          <h2 className="text-center text-xl font-bold mb-6">
            Cyber <span className="text-pinkAccent">Legal</span>
          </h2>

          <h3 className="text-sm font-semibold mb-4">Sign In</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 rounded-full bg-transparent border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-pinkAccent"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-full bg-transparent border border-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-pinkAccent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-white/50"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2 rounded-full bg-pinkAccent hover:bg-pink-600 transition text-sm font-semibold text-white"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Signing in...
                </span>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          {/* 👇 Google login */}
          <div className=" rounded-full mt-6">
            <GoogleLoginButton />
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-500 font-medium">{error}</p>
          )}

          <p className="text-center mt-4 text-xs italic text-white/70">
            Forgot password?
          </p>

          <div className="mt-6 flex justify-center gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white">
              Terms
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
