<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'is_verified' => (bool)$this->email_verified_at,
            'role' => $this->role,
            'permissions' => $this->permissions,
            'joined_at' => $this->created_at->diffForHumans(),
        ];
    }
}
