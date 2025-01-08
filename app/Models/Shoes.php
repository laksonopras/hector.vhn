<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'shoes_brand',
        'colour',
        'note',
        'status',
        'price',
        'order_id',
    ];

    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function service(){
        return $this->hasMany(Service::class);
    }
    protected function casts():array {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
}
