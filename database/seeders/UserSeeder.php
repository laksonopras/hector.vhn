<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'hectorvhn@gmail.com',
            'whatsapp_number' => '85085085085',
            'role' => 1,
            'status' => 1,
            'password' => Hash::make('1234qwer')
        ]);
    }
}
