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
    public function handle(Request $request, Closure $next,...$rolenames): Response
    {
        if(Auth::check()) {
            foreach ($rolenames as $rolename)
                if (Auth::user()->role->name == $rolename)
                    return $next($request);
        }
        else{
            return redirect()->route('courses.index');
        }
        return response()->view('adm.errors.noperm');

    }
}
