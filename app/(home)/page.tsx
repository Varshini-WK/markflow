"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Zap, Lock, BookOpen, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  const { login, isLoading: authLoading, user } = useAuth();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const success = await login(username, password);
    if (!success) {
      setError("Invalid credentials. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#121212]">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="relative z-10 max-w-lg">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-float">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-7 h-7 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Markflow</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Organize your digital life with elegance.
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              The ultimate website bookmark manager for professionals. Categorize, explore, and access your favorite resources instantly.
            </p>

            <div className="space-y-4">
              {[
                { icon: BookOpen, text: "Smart Categorization" },
                { icon: Lock, text: "Private & Secure" },
                { icon: Zap, text: "Lightning Fast Search" }
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  </div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="max-w-md w-full animate-fade-in">
          <div className="text-center mb-10">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Zap className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-white">Markflow</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-[#2e2e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                placeholder="Enter your username"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1E1E1E] border border-[#2e2e2e] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-600"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || authLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center text-sm text-gray-500 pt-4">
              <p>Demo Credentials:</p>
              <p className="font-mono text-xs text-gray-400 mt-1">user: emilys | pass: emilyspass</p>
            </div>
          </form>
        </div>
        <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20">
          <div className="w-64 h-64 border border-blue-500/30 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
