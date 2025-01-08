import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return(
        <>
            <div className="relative w-full h-screen bg-secondary flex flex-col items-center">
                <div className='absolute start-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit sm:w-2/3 md:w-1/2 lg:w-1/3 space-y-5'>
                    <img src='/assets/Logo-white.png' alt="" className="w-1/6 mx-auto" />
                    <form onSubmit={submit} className="w-full h-content p-8 flex flex-col space-y-3.5 bg-white rounded-xl " >
                        <p className="text-center text-3xl font-semibold">LOGIN</p>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Email :</label>
                            <input type="email" name='email' value={data.email} onChange={(e) => setData('email', e.target.value)} autoComplete='off' className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0"/>
                            <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor="" className="text-sm">Password :</label>
                            <input type="password" name='password' value={data.password} onChange={(e) => setData('password', e.target.value)} autoComplete='off' className="bg-transparent rounded-md border border-light-3 focus:border-light-3 focus:ring-0" />
                            <InputError message={errors.password} className="mt-2" />
                        </div>
                        <button className="mt-3.5 p-2 btn-submit">Login</button>
                        <p className="text-sm text-center">Belum punya akun? <a href="/register" className="text-submit-1">Daftar di sini!</a></p>
                        <a href="/" className="flex items-end text-light-4"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m6.921 12.5l5.793 5.792L12 19l-7-7l7-7l.714.708L6.92 11.5H19v1z"/></svg><p className="text-sm underline underline-offset-1">Kembali ke halaman utama</p></a>
                    </form>
                </div>
            </div>
        </>
    );
}
