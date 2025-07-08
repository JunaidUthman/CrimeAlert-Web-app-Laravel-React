<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\User;
use Illuminate\Support\Facades\Auth;

class authController extends Controller
{
    public function register(Request $request)
    {
        $fullName = $request->input('fullName');
        $email = $request->input('email');
        $password = $request->input('password');

        // Create a new user
        $user = User::create([
            'fullName' => $fullName,
            'email' => $email,
            'password' => bcrypt($password), // Hash the password
        ]);

        //Auth::login($user);

        // Return a success response
        return response()->json(['message' => 'User registered successfully', 'user' => $user ], 201);
    }


    public function login(Request $request)
    {

        // Check if user exists
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'the email do not exist.'
            ], 404);
        }

        // Check password
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'message' => 'there is no password matching the password entred.'
            ], 401);
        }

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Return token
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        // Revoke the token
        $request->user()->currentAccessToken()->delete();

        // Return a success response
        return response()->json(['message' => 'User logged out successfully']);
    }
}
