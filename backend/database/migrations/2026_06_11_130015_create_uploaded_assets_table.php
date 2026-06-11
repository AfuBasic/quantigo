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
        Schema::create('uploaded_assets', function (Blueprint $table) {
            $table->id();
            $table->string('file_hash')->unique()->index();
            $table->string('url');
            $table->string('file_name')->nullable();
            $table->unsignedInteger('file_size')->nullable();
            $table->string('mime_type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uploaded_assets');
    }
};
