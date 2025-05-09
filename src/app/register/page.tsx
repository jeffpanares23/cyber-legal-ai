"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import { BASE_URL } from "@/config";


export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      setIsRegistering(true);
      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Registration failed");
      }

      router.push("/login");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <main className="min-h-screen flex text-white">
      {/* Left side visual */}
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
              Join your <br />
              Cybersecurity <br />
              <span className="text-pink-500">Ally</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 h-[100vh] flex items-center px-8 py-28">
        <div className="bg-[#212E4A33] p-10 sm:p-20 md:p-28 rounded-3xl w-full max-w-2xl h-full login-bg content-center">
          <Image
            src="../../../Logo_Cyberlegal_light.svg"
            alt="Cyberlegal AI Logo"
            width={160}
            height={60}
            className="mx-auto mb-10 h-40 w-auto sm:h-20 md:h-20"
          />

          <h1 className="text-2xl font-semibold mb-6 text-white/80 tracking-wide text-center">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:scale-105 transition"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:scale-105 transition"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-3 rounded-full bg-[#2A314B] border border-white/10 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500 hover:scale-105 transition"
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
              className="w-full py-3 rounded-full bg-pink-500 text-white hover:bg-pink-600 hover:scale-105 transition"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Creating...
                </span>
              ) : (
                "SIGN UP"
              )}
            </button>

            {error && (
              <p className="mt-3 text-xs text-red-500 font-medium text-center">
                {error}
              </p>
            )}
            <span className="text-white/60 text-sm">
              Already have an account? &nbsp;
            </span>
            <Link
              href="/login"
              className="text-white/60 text-sm hover:text-white transition cursor-pointer"
            >
              Sign In
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
