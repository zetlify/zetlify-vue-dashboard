<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin
        $admin = User::create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'admin12345@'
        ]);

        $admin->assignRole('admin');

        // User
        $user = User::create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => 'user12345'
        ]);

        $user->assignRole('user');

        // Editor
        $editor = User::create([
            'name' => 'editor',
            'email' => 'editor@example.com',
            'password' => 'editor54321'
        ]);

        $editor->assignRole('editor');
    }
}
