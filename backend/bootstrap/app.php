<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function (): void {
            Route::middleware('web')
                ->prefix('admin')
                ->name('admin.')
                ->group(base_path('routes/admin-auth.php'));

            Route::middleware(['web', 'auth:admin'])
                ->prefix('admin')
                ->name('admin.')
                ->group(base_path('routes/admin.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');

        $middleware->redirectGuestsTo(function (Request $request) {
            if ($request->is('admin') || $request->is('admin/*')) {
                return route('admin.login');
            }
            
            return route('login');
        });

        $middleware->alias([
            '2fa.admin' => \App\Http\Middleware\RequireAdmin2FA::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        // Production-safe error responses (no stack traces)
        $exceptions->render(function (\Throwable $e, Request $request) {
            if (app()->hasDebugModeEnabled()) {
                return null; // Let Laravel show full debug info locally
            }

            $status = method_exists($e, 'getStatusCode')
                ? $e->getStatusCode()
                : 500;

            // API & JSON requests get clean JSON
            if ($request->is('api/*') || $request->expectsJson()) {
                $response = [
                    'error' => match (true) {
                        $e instanceof \Illuminate\Auth\AuthenticationException => 'Unauthenticated.',
                        $e instanceof \Illuminate\Auth\Access\AuthorizationException => 'Forbidden.',
                        $e instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException => 'Resource not found.',
                        $e instanceof \Illuminate\Validation\ValidationException => 'Validation failed.',
                        $e instanceof \Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException => 'Too many requests.',
                        $e instanceof \Symfony\Component\HttpKernel\Exception\HttpException => $e->getMessage() ?: 'An error occurred.',
                        default => 'Internal server error.',
                    },
                    'status' => $status,
                ];

                if ($e instanceof \Illuminate\Validation\ValidationException) {
                    $response['errors'] = $e->errors();
                    $status = 422;
                }

                return response()->json($response, $status);
            }

            return null; // Let Laravel handle web errors with its default error views
        });
    })->create();
