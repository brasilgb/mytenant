<?php

namespace App\Http\Controllers;

use App\Models\Association;
use App\Models\Company;
use App\Models\Sale;
use App\Models\Total;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $compexists = Company::where('id', $user->company_id)->exists();
        $cnpj = $compexists ? Company::where('id', $user->company_id)->first()->cnpj : null;

        $sales = Sale::when(
            $request->has('dt'),
            function ($wquery) use ($request, $cnpj) {
                $wquery->where('cnpj', $cnpj)->where('dtvenda', $request->dt);
            },
            function ($wquery) use ($request, $cnpj) {
                $lastDate = Sale::where('cnpj', $cnpj)->orderBy('dtvenda', 'DESC')->first();
                if ($lastDate !== null) $wquery->where('dtvenda', $lastDate->dtvenda);
            }
        )->paginate(15);

        $association = Association::when(
            $request->has('dt'),
            function ($wquery) use ($request, $cnpj) {
                $wquery->where('cnpj', $cnpj)->where('dtvenda', $request->dt);
            },
            function ($wquery) use ($request, $cnpj) {
                $lastDate = Association::where('cnpj', $cnpj)->orderBy('dtvenda', 'DESC')->first();
                if ($lastDate !== null) $wquery->where('dtvenda', $lastDate->dtvenda);
            }
        )->paginate(15);

        $totalsday = Total::when(
            $request->has('dt'),
            function ($wquery) use ($request, $cnpj) {
                $wquery->where('cnpj', $cnpj)->where('datatu', $request->dt);
            },
            function ($wquery) use ($request, $cnpj) {
                $lastDate = Total::where('cnpj', $cnpj)->orderBy('id', 'DESC')->first();
                if ($lastDate !== null) $wquery->where('datatu', $lastDate->datatu);
            }
        )->get();

        return Inertia::render('Sale/index', ['sales' => $sales, 'association' => $association, 'totalsday' => $totalsday]);
    }

    // public function filterSale(Request $request)
    // {
    //     $sales = Sale::where('dtvenda', '>=', $request->dtini)->where('dtvenda', '<=', $request->dtfim)->paginate(15);
    //     $association = Association::where('dtvenda', '>=', $request->dtini)->where('dtvenda', '<=', $request->dtfim)->paginate(15);
    //     return Inertia::render('Sale/index', ['sales' => $sales, 'association' => $association]);
    // }
}
