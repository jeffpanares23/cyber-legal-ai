// src/components/GoogleLoginButton.tsx
"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/google`, {
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
        sessionStorage.setItem("user_name", data.user.name);
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
