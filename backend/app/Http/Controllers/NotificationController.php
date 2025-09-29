<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getMyNotifications(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $notifications = $user->notifications()->orderBy('created_at', 'desc')->get();

        return response()->json(['notifications' => $notifications ], 201);
    }
}
