import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-q-dark flex items-center justify-center p-6 transition-colors">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-q-blue opacity-20 blur-2xl rounded-full" />
            <div className="relative bg-white dark:bg-[#0f172a] p-5 rounded-[28px] border border-slate-200 dark:border-white/10 shadow-2xl shadow-q-blue/5">
              <AlertCircle className="w-12 h-12 text-q-blue" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            404
          </h1>
          <p className="text-base text-slate-600 dark:text-white/60 font-medium">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-q-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-q-blue/25 transition-all hover:bg-q-blue-700 hover:shadow-q-blue/40"
          >
            <Home className="w-4 h-4" />
            {isAuthenticated ? "Dashboard" : "Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
