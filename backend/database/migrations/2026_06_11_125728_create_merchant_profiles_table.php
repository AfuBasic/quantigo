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
        Schema::create('merchant_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Business Details
            $table->string('business_name');
            $table->enum('registration_type', ['sole_proprietorship', 'limited_liability', 'cooperative']);
            $table->string('registration_number');
            $table->text('business_address');
            $table->string('business_phone');

            // Cloudinary Document Paths
            $table->string('cac_certificate_path')->nullable();
            $table->string('cac_status_report_path')->nullable();
            $table->string('proof_of_address_path')->nullable();

            // Director Details
            $table->string('director_name');
            $table->string('director_phone');
            $table->string('director_bvn');
            $table->string('director_nin');
            $table->string('director_identity_path')->nullable();

            // Status Check
            $table->enum('verification_status', ['unsubmitted', 'pending', 'approved', 'rejected'])->default('unsubmitted');
            $table->text('verification_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchant_profiles');
    }
};
