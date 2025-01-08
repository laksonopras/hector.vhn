<?php

namespace Database\Factories;

use App\Models\Customer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $customer = Customer::updateOrCreate(
            ['whatsapp_number' => '85850435535'],
            [
                'customer_name' => fake()->name(),
                'whatsapp_number' => '85850435535',
                'address' => fake()->address(), 
            ]
        );

        return [
            'receipt' => 'Belum diupdate',
            'customer_name' => $customer->customer_name,
            'whatsapp_number' => $customer->whatsapp_number,
            'address' => $customer->address, 
            'order_type' => 0,  
            'order_status'=> rand(0,9), 
            'payment_status' => 0,
            'before_photo' => 'before/before.jpg',
            'sub_price' => 0,
            'discount' => 0, 
            'price' => 0
        ];
    }
}
