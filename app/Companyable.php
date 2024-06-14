<?php

namespace App;

use App\Models\Company;
use App\Models\Scopes\CompanyScope;

trait Companyable
{
    protected static function bootCompanyable()
    {
        static::addGlobalScope(new CompanyScope);
        
        if(session()->has('company_id') && !is_null(session()->get('company_id'))) {
            static::creating(function($model) {
                $model->company_id = session()->get('company_id');
            });
        }
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
