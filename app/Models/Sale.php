<?php

namespace App\Models;

use App\Traits\TenantAttributeTrait;
use App\Traits\TenantScoped;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'key',
        'cnpj',
        'filial',
        'descfilial',
        'dtvenda',
        "anomes",
        'valdevolucao',
        'valvenda',
        'margem',
        'representa',
        'valmeta'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
