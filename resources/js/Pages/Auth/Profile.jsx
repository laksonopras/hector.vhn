import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';

export default function Profile({auth}){

    const role = [
        {title : 'Staf', style : 'bg-secondary'},
        {title :'Manajer', style: 'bg-primary text-white'}
    ]
    const status = [
        {title : 'Tidak Aktif', style : 'bg-danger-1'},
        {title :'Aktif', style: 'bg-success-1'}
    ]
    
    const { data, setData, post, processing, errors, reset } = useForm(
        auth.user);

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {

        e.preventDefault();
        post('user/' + data.id)
        
    };
    return(
        <AdminLayout user={auth.user}>
            <div className="relative w-full h-16 md:h-32 bg-gradient-to-r from-purple-500 to-pink-500">
                <div className="absolute start-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 md:start-10 md:bottom-0 md:translate-x-0 md:translate-y-1/4 w-20  md:w-32 h-fit rounded-full overflow-hidden">
                    <img src={'/storage/' + auth.user.avatar} alt=""/>
                </div>
            </div>
            <div className="flex items-top pt-16 p-5 space-x-5">
                <form onSubmit={submit} encType="multipart/form-data" className="w-full h-content flex flex-col space-y-5" >
                    <div className="w-full h-content grid grid-cols-2 gap-5">
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Nama Lengkap :</label>
                            <input type="text" name='name' value={data.name} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-1 text-input"/>
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Nomor Whatsapp (+62) :</label>
                            <div className="px-3 py-1 flex items-center space-x-1 rounded bg-white border border-light-3">
                                <span>+62</span>
                                <input type="text" name='whatsapp_number' value={data.whatsapp_number} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" placeholder="..." className='m-0 w-full px-0 p-0 border-none ring-none bg-transparent focus:ring-0' />
                            </div>
                            <InputError message={errors.whatsapp_number} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Email :</label>
                            <input type="email" name='email' value={data.email} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off"  className="py-1 text-input"/>
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Foto Profil :</label>
                            <input type="file" name='avatar' onChange={(e) => setData(e.target.name, e.target.files[0])} className="p-1 text-input"/>
                            <InputError message={errors.avatar} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Jabatan :</label>
                            <input value={role[data.role].title} autoComplete="off"  className={"py-1 border-none rounded " + role[data.role].style} disabled/>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Status :</label>
                            <input value={status[data.status].title}  autoComplete="off"  className={"py-1 border-none rounded text-white " + status[data.status].style} disabled/>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Password :</label>
                            <input type="password" name='password' value={data.password} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-1 text-input" />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Konfirmasi Password :</label>
                            <input type="password" name='password_confirmation' value={data.password_confirmation} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-1 text-input"/>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>
                    </div>
                    <button className="w-fit px-5 py-2 btn-primary">Simpan</button>
                </form>
            </div>
        </AdminLayout>
    )
}