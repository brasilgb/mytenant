<?php

namespace App\Http\Controllers;

use App\Models\Association;
use App\Models\Company;
use App\Models\Sale;
use App\Models\Total;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user();
        $compexists = Company::where('id', $user->company_id)->exists();
        $cnpj = $compexists ? Company::where('id', $user->company_id)->first()->cnpj : null;
        $companies = Company::get();

        $sales = Sale::when($request->has('dt'), function ($wquery) use ($request, $cnpj) {
            $wquery->where('cnpj', $cnpj)->where('dtvenda', $request->dt);
        })->orderBy('id', 'desc')->first();

        $associations = Association::when($request->has('dt'), function ($wquery) use ($request, $cnpj) {
            $wquery->where('cnpj', $cnpj)->where('dtvenda', $request->dt);
        })->orderBy('id', 'desc')->first();

        $totalsday = Total::when($request->has('dt'), function ($wquery) use ($request, $cnpj) {
            $wquery->where('cnpj', $cnpj)->where('datatu', $request->dt);
        })->orderBy('id', 'desc')->first();

        $saleschart = Sale::when($request->has('dt'), function ($wquery) use ($request, $cnpj) {
            $wquery->where('cnpj', $cnpj)->where('anomes', substr($request->dt, 0, 6));
        })->orderBy('id', 'desc')->get();

        // dd(substr($request->dt, 0, 6));
        return Inertia::render('Home/index', [
            "sales" => $sales,
            "associations" => $associations,
            "totalsday" => $totalsday,
            "saleschart" => $saleschart,
            "companies" => count($companies)
        ]);
    }
    public function unauthorized()
    {
        return Inertia::render('Unauthorized/index');
    }
}
