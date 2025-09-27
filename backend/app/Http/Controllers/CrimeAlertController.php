<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CrimeAlert;
use Illuminate\Support\Facades\Http;

class CrimeAlertController extends Controller
{

    public function create(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'message' => 'Unauthorized: User not authenticated',
                ], 401);
            }

            $originalDescription = $request->input('description');
            $lat = $request->input('lat');
            $lng = $request->input('lng');

            // Check for missing required fields
            if (empty($originalDescription) || empty($lat) || empty($lng)) {
                return response()->json([
                    'message' => 'Missing required fields',
                ], 400);
            }

            // $aiResponse = $this->cleanDescription($originalDescription); // Uncomment in production

            $crime = $user->crimeAlerts()->create([
                'lat' => $lat,
                'lng' => $lng,
                'description' => $originalDescription, // Replace with $aiResponse in production
                'isVerified' => true
            ]);

            return response()->json([
                'message' => 'Crime alert created successfully',
                'crime' => $crime,
                'aiResponse' => $originalDescription // Replace with $aiResponse in production
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while storing the crime',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function Update(Request $request)
    {
        $user = Auth::user();
        $crime = CrimeAlert::find($request->input('id'));

        if (!$crime ) {
            return response()->json(['message' => 'Crime alert not found or unauthorized'], 404);
        }

        $originalDescription = $request->input('description');
        // $aiResponse = $this->cleanDescription($originalDescription); this is commented to not waste tokens in the dev phase
        if($originalDescription){// replace thios with $aiResponse
            $crime->update([
                'lat' => $request->input('lat'),
                'lng' => $request->input('lng'),
                'description' => $originalDescription, // replace thios with $aiResponse
                'isVerified' => true
            ]);

            return response()->json([
                'message' => 'Crime alert updated successfully',
                'crime' => $crime,
                'aiResponse' => $originalDescription // replace this with $aiResponse
            ],201);
        }
        else{
            return response()->json([
            'message' => 'a probleme accured while updating the crime',
            'crime' => $crime,
            'aiResponse' => null
        ],404);
        }
    }
    public function Delete(Request $request)
    {
        $user = Auth::user();
        $crime = CrimeAlert::find($request->input('id'));

        if (!$crime ) {
            return response()->json(['message' => 'Crime alert not found or unauthorized'], 404);
        }

        $crime->delete();

        return response()->json([
            'message' => 'Crime alert deleted successfully'
        ],201);
    }

    private function cleanDescription(string $description)
    {
        // The endpoint from the TS example
        $endpoint = "https://models.github.ai/inference";
        $model = "meta/Llama-4-Scout-17B-16E-Instruct";

        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('GITHUB_TOKEN'),
            'Content-Type'  => 'application/json',
        ])->post($endpoint . "/chat/completions", [
            "model" => $model,
            "messages" => [
                [
                    "role" => "system",
                    "content" => "You are an anonymizer. Remove any personal information (names, phone numbers, IDs, license plates, etc.) from user text. Keep only the crime details."
                ],
                [
                    "role" => "user",
                    "content" => $description
                ]
            ],
            "temperature" => 0.8,
            "top_p"       => 0.1,
            "max_tokens"  => 2048,
        ]);

        if ($response->failed()) {
            return null;
        }

        $result = $response->json();

        // Extract the cleaned text
        return $result['choices'][0]['message']['content'] ;
    }
    public function getMyAlerts(){
        $user = Auth::user();
        return response()->json(
            $user->crimeAlerts()
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }

    public function getNearByAlerts(Request $request)
    {
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $lat = $request->input('lat');
        $lng = $request->input('lng');

        // Radius in kilometers
        $radius = 1; 

        // Haversine formula in raw SQL
        $nearbyAlerts = CrimeAlert::select('*')
            ->selectRaw("(6371 * acos(cos(radians(?)) * cos(radians(lat)) * cos(radians(lng) - radians(?)) + sin(radians(?)) * sin(radians(lat)))) AS distance", [$lat, $lng, $lat])
            ->having('distance', '<=', $radius)
            ->orderBy('distance', 'asc')
            ->get();

        $count = $nearbyAlerts->count();

       if ($count > 0) {
            return response()->json([
                'message' => "There were {$count} crime(s) reported near your current location.Be Safe!!",
                'alerts' => $nearbyAlerts
            ]);
        } else {
            return response()->json([
                'message' => "No crimes were reported near your current location."
            ]);
        }

    }




}
  