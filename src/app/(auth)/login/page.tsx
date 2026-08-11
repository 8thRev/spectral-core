"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Hardcoded credentials check
    if (email === "admin@admin.com" && password === "12345678") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-[#fae8ff] bg-gradient-to-br from-[#f3e8ff] via-[#ffe4e6] to-[#ffedd5]">
      {/* Decorative radial lines background simulation */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 15deg, rgba(0,0,0,0.05) 15deg 16deg)`
        }}
      />
      
      <div className="z-10 flex flex-col items-center w-full max-w-md px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="bg-[#fde047] text-[#854d0e] px-4 py-1 rounded-md text-sm font-medium mb-4">
            Otake Login
          </div>
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">
            Welcome Otake!
          </h1>
        </div>

        {/* Login Card */}
        <div className="w-full bg-white/20 backdrop-blur-xl border border-white/40 p-8 rounded-2xl shadow-xl shadow-pink-900/5">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-zinc-800">
                Email Address
              </Label>
              <Input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="batuhankra312@gmail.com" 
                required
                className="bg-white border-zinc-200 h-11 focus-visible:ring-indigo-400 focus-visible:ring-2 focus-visible:border-indigo-400 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-zinc-800">
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••" 
                required
                className="bg-white border-zinc-200 h-11 focus-visible:ring-indigo-400 shadow-sm"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" className="border-zinc-300 bg-white data-[state=checked]:bg-zinc-900" />
                <Label 
                  htmlFor="remember" 
                  className="text-sm font-medium leading-none text-zinc-500 cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm font-semibold text-zinc-900 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-11 bg-[#09090b] hover:bg-zinc-800 text-white font-medium rounded-xl mt-2 shadow-md shadow-zinc-900/10">
              Create an Account
            </Button>
            
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-300/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-2 text-zinc-500 font-medium tracking-wider">
                  or
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-11 bg-white hover:bg-zinc-50 border-white/60 font-medium rounded-xl shadow-sm text-zinc-800"
              onClick={handleLogin}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>

          </form>
        </div>
      </div>
    </div>
  );
}
