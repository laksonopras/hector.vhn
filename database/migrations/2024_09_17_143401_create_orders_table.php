<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('receipt', 14);
            $table->string('customer_name');
            $table->string('whatsapp_number');
            $table->foreign('whatsapp_number')->references('whatsapp_number')->on('customers');
            $table->string('address')->nullable();
            $table->integer('order_type')->default(0);
            $table->integer('order_status')->default(1);
            $table->string('payment_method')->nullable();
            $table->integer('payment_status')->default(0);
            $table->string('payment_token')->nullable();
            $table->string('before_photo');
            $table->string('after_photo')->nullable();
            $table->string('sub_price')->nullable();
            $table->integer('discount')->default(0);
            $table->integer('price')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
