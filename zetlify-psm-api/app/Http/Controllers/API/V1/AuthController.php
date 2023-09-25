<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Register User
    public function register(Request $request)
    {
        $registerSchema = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed'
        ]);

        $user = User::create($registerSchema);
        $user->assignRole('user');

        // Email Verification Event
        // ....

        return response()->json([
            'message' => 'Account created successfully'
        ], 201);
    }

    // Login User
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!auth()->attempt($credentials, $request->filled('remember'))) {
            return response()->json([
                'message' => 'Invalid email or password'
            ], 422);
        }

        return response()->json([
            'message' => 'Login successful'
        ]);
    }

    // Auth Check
    public function authCheck() {
        return response()->json(auth()->check());
    }

    // Logout User
    public function logout()
    {
        auth('web')->logout();

        return response()->json([
            'message' => 'You are now logged out'
        ]);
    }
}
