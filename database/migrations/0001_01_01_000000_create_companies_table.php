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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->nullable()->constrained();
            $table->string('altername')->nullable();
            $table->string('corpreason');
            $table->string('cnpj');
            $table->string('statereg');
            $table->string('subnumber', 50);
            $table->string('subname', 50);
            $table->string('address', 80);
            $table->integer('number');
            $table->string('cep', 20);
            $table->string('county', 50);
            $table->string('state', 4);
            $table->string('neighborhood', 50);
            $table->string('telephone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->text('observation')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
