import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { ServerCrash, RefreshCcw, Home } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function RootErrorPage() {
  const error = useRouteError();
  const { isAuthenticated } = useAuth();
  
  // Determine if it's a 404 from the error boundary
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-q-dark flex items-center justify-center p-6 transition-colors">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              404
            </h1>
            <p className="text-base text-slate-600 dark:text-white/60 font-medium">
              We couldn't find the page you were looking for.
            </p>
          </div>
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-q-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-q-blue/25 transition-all hover:bg-q-blue-700"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // General error (e.g. 500, syntax error, missing module)
  const errorMessage = isRouteErrorResponse(error) 
    ? error.data?.message || error.statusText 
    : error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-q-dark flex items-center justify-center p-6 transition-colors">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 opacity-20 blur-2xl rounded-full" />
            <div className="relative bg-white dark:bg-[#0f172a] p-5 rounded-[28px] border border-slate-200 dark:border-white/10 shadow-2xl shadow-red-500/5">
              <ServerCrash className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Oops! Something went wrong
          </h1>
          <p className="text-sm text-slate-600 dark:text-white/60 font-medium">
            We've encountered an unexpected issue. Our team has been notified.
          </p>
          
          {import.meta.env.DEV && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-500/20 rounded-xl text-left overflow-auto">
              <p className="text-xs font-mono text-red-600 dark:text-red-400">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button 
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-q-blue px-6 py-3 text-sm font-bold text-white shadow-lg shadow-q-blue/25 transition-all hover:bg-q-blue-700 hover:shadow-q-blue/40"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh Page
          </button>
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-3 text-sm font-bold text-slate-700 dark:text-white transition-all hover:bg-slate-50 dark:hover:bg-white/10"
          >
            <Home className="w-4 h-4" />
            {isAuthenticated ? "Dashboard" : "Home"}
          </Link>
        </div>
      </div>
    </div>
  );
}
