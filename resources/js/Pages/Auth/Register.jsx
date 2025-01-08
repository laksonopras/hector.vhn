import React from "react";
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';

export default function Register(){

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        whatsapp_number: '',
        avatar : null,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {

        e.preventDefault();
        post(route('register'))
        
    };

    return(
        <>
            <div className="relative w-full h-screen bg-secondary">
                <div className='absolute start-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit sm:w-2/3 md:w-1/2 lg:w-2/3'>
                    <img src='/assets/Logo-white.png' alt="" className="w-1/12 mx-auto" />
                    <form onSubmit={submit} encType="multipart/form-data" className="w-full h-content flex flex-col space-y-3.5 p-10 bg-white rounded-lg" >
                        <p className="text-center text-3xl font-semibold">REGISTER</p>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Nama Lengkap :</label>
                                <input type="text" name='name' value={data.name} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0"/>
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Nomor Whatsapp (+62) :</label>
                                <div className="px-3 py-2 flex items-center space-x-1 bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0">
                                    <span>+62</span>
                                    <input type="text" name='whatsapp_number' value={data.whatsapp_number} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" placeholder="..." className='m-0 w-full px-0 p-0 border-none ring-none bg-transparent focus:ring-0' />
                                </div>
                                <InputError message={errors.whatsapp_number} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Email :</label>
                                <input type="email" name='email' value={data.email} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off"  className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0"/>
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Foto Profil :</label>
                                <input type="file" name='avatar' onChange={(e) => setData(e.target.name, e.target.files[0])} autoComplete="off"  className="p-1.5 bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0"/>
                                <InputError message={errors.avatar} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Password :</label>
                                <input type="password" name='password' value={data.password} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0" />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="" className="text-sm">Konfirmasi Password :</label>
                                <input type="password" name='password_confirmation' value={data.password_confirmation} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0"/>
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>
                        <button className="p-2 btn-submit rounded border border-submit-1 hover:border hover:border-submit-1">Register</button>
                        <p className="text-sm text-center">Sudah punya akun? <a href="/login" className="text-submit-1">Login disini!</a></p>
                        <a href="/" className="flex items-end text-light-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m6.921 12.5l5.793 5.792L12 19l-7-7l7-7l.714.708L6.92 11.5H19v1z"/></svg><p className="text-sm underline underline-offset-1">Kembali ke halaman utama</p></a>
                    </form>
                </div>
            </div>
        </>
    );
}