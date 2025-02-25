<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$rolenames): Response
    {
        // Проверяем, авторизован ли пользователь
        if (!Auth::check()) {
            return $this->handleErrorResponse($request, 'Доступ запрещен. Требуется авторизация.');
        }

        // Получаем пользователя
        $user = Auth::user();

        // Проверяем, есть ли у пользователя роль
        if (!$user->role) {
            return $this->handleErrorResponse($request, 'Доступ запрещен. У вас нет назначенной роли.');
        }

        // Проверяем, соответствует ли роль пользователя нужным ролям
        if (!in_array($user->role->name, $rolenames)) {
            return $this->handleErrorResponse($request, 'Доступ запрещен. У вас недостаточно прав.');
        }

        return $next($request);
    }

    /**
     * Обрабатывает ошибки доступа
     */
    private function handleErrorResponse(Request $request, string $message)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'success' => false,
                'message' => $message
            ], 403);
        }

        return response()->view('errors.forbidden', ['message' => $message], 403);
    }
}
