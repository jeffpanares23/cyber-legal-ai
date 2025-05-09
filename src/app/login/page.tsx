"use client";
import { useEffect } from "react";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import { BASE_URL } from "@/config";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

Cookies.set("cyberlegal-auth", "true");

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
      const response = await fetch(`${BASE_URL}/auth/login`, {
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

      console.log("Login Data: ", data);

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      sessionStorage.setItem("cyberlegal-auth", "true");
      sessionStorage.setItem("access_token", data.access_token);
      sessionStorage.setItem("user_name", data.name);
      setLoginSuccess(true);
      setIsLoggingIn(false);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred"
      setIsLoggingIn(false)
      setError(errorMsg)
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
        <div className="max-w-md text-start translate-x-[-35%] translate-y-[-80%]">
          <div className="w-1/2 hidden lg:flex flex-col justify-center items-start px-20">
            <h1 className="text-5xl mb-4 leading-tight tracking-wider font-poppins">
              Your <br />
              Cybersecurity <br />
              <span className="text-pink-500">Assistant</span>
            </h1>
            {/* Optional: use an animated SVG or Lottie for those gradient lines */}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 h-[100vh] flex items-center px-8 py-28 max-h">
        <div className="bg-[#212E4A33] p-10 sm:p-20 md:p-28 rounded-3xl w-full max-w-2xl h-full login-bg content-center">
          {/* <h2 className="text-center text-3xl font-bold mb-6">
            <span className="text-white">Cyber</span>
            <span className="text-pink-500"> Legal</span>
          </h2> */}
          <Image
            src="../../../Logo_Cyberlegal_light.svg"
            alt="Cyberlegal AI Logo"
            width={160}
            height={60}
            className="mx-auto mb-10 h-40 w-auto sm:h-20 md:h-20"
          />
          <h1 className="text-2xl font-semibold mb-6 text-white/80 tracking-wide text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 text-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:scale-105 transition"
                placeholder="you@example.com"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 text-md placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:scale-105 transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-pink-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3  rounded-full bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 transition"
              disabled={isLoggingIn || loginSuccess}
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={16} /> Signing in...
                </span>
              ) : (
                "SIGN IN"
              )}
            </button>
            {error && (
              <p className="mt-3 text-xs text-red-500 font-medium text-center">
                {error}
              </p>
            )}
            <div className="m-4 flex items-center gap-4 text-white/50 text-sm">
              <div className="flex-grow h-px bg-white/20"></div>
              <span className="text-xs text-white/60">Or</span>
              <div className="flex-grow h-px bg-white/20"></div>
            </div>
            <div className="w-full rounded-full overflow-hidden hover:scale-105 transition">
              <GoogleLoginButton />
            </div>
            <span className="text-white/60 text-sm">
              Don&apos;t you have an account? &nbsp;
            </span>
            <Link
              href="/register"
              className="text-white/60 text-sm hover:text-white transition cursor-pointer"
            >
              Sign up
            </Link>
          </form>
        </div>
        <div className="mt-8 flex justify-center gap-4 text-sm text-white/50 absolute bottom-12">
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
    </main>
  );
}
