<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequireAdmin2FA
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $admin = auth('admin')->user();

        if ($admin && $admin->two_factor_confirmed_at) {
            if (!$request->session()->has('admin_2fa_passed')) {
                return redirect()->route('admin.2fa.challenge');
            }
        }

        return $next($request);
    }
}
