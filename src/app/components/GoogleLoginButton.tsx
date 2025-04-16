// src/components/GoogleLoginButton.tsx
"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();

      if (data?.user?.email) {
        console.log("[Frontend] Logged in user:", {
          name: data.user.name,
          email: data.user.email,
        });
        toast.success(`Welcome, ${data.user.name}`);
        sessionStorage.setItem("cyberlegal-auth", "true");
        router.push("/chatbot");
      } else {
        toast.error("Google login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during Google login.");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google login failed")}
    />
  );
}
