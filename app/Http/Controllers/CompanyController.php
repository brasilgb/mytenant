<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('q');

        $query = Company::with('company')->where('company_id', null)->orderBy('id', 'DESC');

        if ($search) {
            $query->where('corpreason', 'like', '%' . $search . '%')
                ->orWhere('cnpj', 'like', '%' . $search . '%');
        }

        $companies = $query->paginate(12);
        return Inertia::render('Company/index', ['companies' => $companies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companies = Company::get();
        return Inertia::render('Company/addCompany', ['companies' => $companies]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
// dd($data);
        $messages = [
            'required' => 'O campo :attribute deve ser preenchido',
            'cnpj' => 'CNPJ inválido',
            'unique' => 'CNPJ já está em uso',
        ];
        $request->validate(
            [
                'corpreason' => 'required',
                'subnumber' => 'required',
                'subname' => 'required',
                'address' => 'required',
                'number' => 'required',
                'cep' => 'required',
                'county' => 'required',
                'state' => 'required',
                'neighborhood' => 'required',
                'cnpj' => 'required|cnpj|unique:companies',
                'statereg' => 'required|inscricao_estadual_rs',
                'telephone' => 'required',
            ],
            $messages,
            [
                'corpreason' => 'razão social',
                'subnumber' => 'número filial',
                'subname' => 'nome filial',
                'address' => 'endereço',
                'number' => 'número',
                'county' => 'município',
                'state' => 'estado',
                'neighborhood' => 'bairro',
                'statereg' => 'inscrição estadual',
                'telephone' => 'telefone',
            ]
        );

        Company::create($data);
        Session::flash('success', 'Filial cadastrado com sucesso!');
        return redirect()->route('companies.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return Inertia::render('Company/editCompany', ['companies' => $company]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        return Redirect::route('companies.show', ['company' => $company->id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Company $company)
    {
        $data = $request->all();

        $messages = [
            'required' => 'O campo :attribute deve ser preenchido',
            'cnpj' => 'CNPJ inválido',
            'unique' => 'CNPJ já está em uso',
        ];
        $request->validate(
            [
                'subnumber' => 'required',
                'subname' => 'required',
                'address' => 'required',
                'number' => 'required',
                'cep' => 'required',
                'county' => 'required',
                'state' => 'required',
                'neighborhood' => 'required',
                'cnpj' => ['required', Rule::unique('companies')->ignore($company->id), 'cnpj'],
                'statereg' => 'required|inscricao_estadual_rs',
                'telephone' => 'required',
            ],
            $messages,
            [
                'subnumber' => 'número filial',
                'subname' => 'nome filial',
                'address' => 'endereço',
                'number' => 'número',
                'county' => 'município',
                'state' => 'estado',
                'neighborhood' => 'bairro',
                'statereg' => 'inscrição estadual',
                'telephone' => 'telefone',
            ]
        );
        $company->update($data);
        Session::flash('success', 'Empresa editada com sucesso!');
        return Redirect::route('companies.show', ['company' => $company->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();
        Session::flash('success', 'Filial deletado com sucesso');
        return Redirect::route('companies.index');
    }
}
