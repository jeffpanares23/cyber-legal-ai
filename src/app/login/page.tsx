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
    <main className="min-h-screen flex text-white font-poppins relative">
      {/* Left Side */}
      <div className="w-1/2 hidden lg:flex items-center justify-center px-10 relative z-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-snug">
            Your <br />
            <span className="text-white">Cybersecurity</span> <br />
            <span className="text-pink-500">Assistant</span>
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
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-4 sm:px-6 md:px-10 py-12">
        <div className="w-full max-w-2xl bg-[#1B2238] rounded-[36px] px-32 py-10">
          <h2 className="text-center text-2xl font-bold mb-6 leading-snug">
            <span className="text-white">Cyber</span>{" "}
            <span className="text-pink-500">Legal</span>
          </h2>

          <h3 className="text-sm font-semibold mb-6 text-white/80 text-center tracking-wide">
            Sign In
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[13px] text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-full bg-pink-500 text-white font-semibold text-sm transition hover:bg-pink-600 hover:scale-[1.02]"
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

          <div className="mt-4 rounded-full overflow-hidden">
            <GoogleLoginButton />
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-500 font-medium text-center">
              {error}
            </p>
          )}

          <div className="mt-4 text-left">
            <p className="text-xs italic text-white/60 hover:text-white transition cursor-pointer">
              Forgot password?
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-4 text-xs text-white/50">
            <a href="#" className="hover:text-white transition">
              Privacy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">
              Terms
            </a>
            <span>|</span>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
