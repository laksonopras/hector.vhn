<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use phpDocumentor\Reflection\Types\Nullable;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->integer('product_category');
            $table->integer('discount');
            $table->integer('price');
            $table->integer('status')->default(1);
            // $table->integer('operator')->nullable();
            $table->foreignId('operator')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->foreignId('shoes_id')->references('id')->on('shoes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
