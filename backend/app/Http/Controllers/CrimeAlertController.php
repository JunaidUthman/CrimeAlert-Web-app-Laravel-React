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
        $user = Auth::user();


        $originalDescription = $request->input('description');


        // $aiResponse = $this->cleanDescription($originalDescription); this is commented to not waste tokens in the dev phase
        if($originalDescription){// replace thios with $aiResponse
            $crime = $user->crimeAlerts()->create([
            'lat' => $request->input('lat'),
            'lng' => $request->input('lng'),
            'description' => $originalDescription,  // replace thios with $aiResponse
            'isVerified' => true
        ]);

        return response()->json([
            'message' => 'Crime alert created successfully',
            'crime' => $crime,
            'aiResponse' => $originalDescription // replace thios with $aiResponse
        ], 201);

        }
        else{
            return response()->json([
            'message' => 'a probleme accured while storing the crime',
            'crime' => $crime,
            'aiResponse' => $aiResponse
        ], 201);
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
                ->get()
        );
    }




}
