<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/User', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'whatsapp_number' => 'required|string|lowercase|max:255',
            'avatar' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'password' => ['required', 'confirmed', Rules\Password::default()],
        ], [
                'name.required' => 'Nama lengkap wajib diisi.',
                'whatsapp_number.required' => 'Nomor Whatsapp wajib diisi.',
                'email.required' => 'Email wajib diisi.',
                'email.email' => 'Format email tidak valid.',
                'avatar.required' => 'Foto profil wajib diisi.',
                'avatar.mimes' => 'Foto profil wajib menggunakan ekstensi .jpeg/.png/.jpg',
                'avatar.max' => 'Foto profil maksimal berukuran 2 GB.',
                'password.required' => 'Password wajib diisi.',
                'password.confirmed' => 'Password tidak sama.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'whatsapp_number' => $request->whatsapp_number,
            'avatar' => Storage::disk('public')->put('avatar', $request->file('avatar')),
            'password' => Hash::make($request->password),
        ]);

        Auth::login($user);
        return redirect('/dashboard')->with('success', 'Selamat datang ' . Auth::user()->name);
    }

    /**
     * Display the specified resource.
     */
    public function show(){
        return Inertia::render('Auth/Profile');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'whatsapp_number' => 'required|string|lowercase|max:255',
            'role' => 'integer',
            'status' => 'integer',
            'password' => ['confirmed', Rules\Password::default()],
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'whatsapp_number.required' => 'Nomor Whatsapp wajib diisi.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'avatar.mimes' => 'Foto profil wajib menggunakan ekstensi .jpeg/.png/.jpg',
            'avatar.max' => 'Foto profil maksimal berukuran 2 GB.',
            'password.confirmed' => 'Password tidak sama.',
        ]);

        $user = User::find($id);

        if ($user->email == $request->email) {
            $request->validate([
                'email' => 'string|lowercase|email|max:255',
            ]);
        } else {
            $request->validate([
                'email' => 'string|lowercase|email|max:255|unique:'.User::class,
            ]);
        }

        if($request->file('avatar') != null){
            $request->validate([
                'avatar' => 'image|mimes:jpeg,png,jpg|max:2048',
            ]);
            if(File::exists('storage/' . $user->avatar)){
                File::delete('storage/' .$user->avatar);
            }
            $user->update([
                'avatar' => Storage::disk('public')->put('avatar', $request->file('avatar'))
            ]);
        } 

        $user->update([
            'name' => $request->name,
            'email' => $request->email != null ? $request->email : $user->email,
            'password' => $request->password != null ? Hash::make($request->password) : $user->password,
            'whatsapp_number' => $request->whatsapp_number,
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Data pengguna berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
