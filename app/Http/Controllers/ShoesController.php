<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Shoes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShoesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shoes = Service::with('shoes.order')->orderBy('status', 'asc')->get();
        return Inertia::render('Admin/Shoes', ['shoes' => $shoes]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Shoes $shoes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shoes $shoes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shoes $shoes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shoes $shoes)
    {
        //
    }
}
