<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'receipt',
        'customer_name',
        'whatsapp_number',
        'address',
        'order_type',
        'order_status',
        'payment_status',
        'payment_method',
        'payment_token',
        'before_photo',
        'after_photo',
        'sub_price',
        'discount',
        'price',
    ];

    public function shoes(){
        return $this->HasMany(Shoes::class);
    }
    public function status(){
        return $this->HasMany(Status::class);
    }
    protected function casts():array {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
}
