<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_category',
        'discount',
        'price',
        'status',
        'shoes_id',
        'operator',
    ];

    public function shoes(){
        return $this->belongsTo(Shoes::class);
    }

    public function operator(){
        return $this->belongsTo(User::class);
    }
    protected function casts():array {
        return [
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
        ];
    }
}
