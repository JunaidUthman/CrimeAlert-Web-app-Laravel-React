<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CrimeAlert;

class LocationController extends Controller
{
    public function index()
    {
        return response()->json(
            CrimeAlert::where('isVerified', true)
                ->get(['lat', 'lng', 'description'])
        );
    }
}
