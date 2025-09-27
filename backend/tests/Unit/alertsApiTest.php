<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class AlertsApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function unauthenticated_user_cannot_create_alert()
    {
        $response = $this->postJson('/api/createAlert', [
            'description' => 'Test crime',
            'lat' => 34.02,
            'lng' => -6.83,
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     'message' => 'Unauthenticated.',
                 ]);
    }

    /** @test */
    public function creating_alert_requires_all_fields()
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/createAlert', [
            'description' => '',
            'lat' => '',
            'lng' => '',
        ]);

        $response->assertStatus(400)
                 ->assertJson([
                     'message' => 'Missing required fields',
                 ]);
    }

    /** @test */
    public function authenticated_user_can_create_alert_successfully()
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/createAlert', [
            'description' => 'Robbery near park',
            'lat' => 34.02,
            'lng' => -6.83,
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure([
                     'message',
                     'crime' => ['id', 'lat', 'lng', 'description', 'isVerified', 'user_id', 'created_at', 'updated_at'],
                     'aiResponse',
                 ])
                 ->assertJson([
                     'message' => 'Crime alert created successfully',
                     'aiResponse' => 'Robbery near park',
                 ]);
        
        // Optionally: check database
        $this->assertDatabaseHas('crime_alerts', [
            'description' => 'Robbery near park',
            'user_id' => $user->id,
        ]);
    }
}
