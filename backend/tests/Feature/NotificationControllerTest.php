<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase; // resets DB for each test

    /** @test */
    public function unauthenticated_user_cannot_get_notifications()
    {
        $response = $this->getJson('/api/getMyNotifications');

        $response->assertStatus(401)
                 ->assertJson(['message' => 'Unauthenticated.']);
    }

    /** @test */
    public function authenticated_user_can_get_their_notifications()
    {
        // Create a user
        $user = User::factory()->create();

        // Create notifications for this user
        $notifications = Notification::factory()->count(3)->create([
            'user_id' => $user->id,
        ]);

        // Make request as this user
        $response = $this->actingAs($user, 'sanctum')
                         ->getJson('/api/getMyNotifications');

        $response->assertStatus(201);

    }
}
