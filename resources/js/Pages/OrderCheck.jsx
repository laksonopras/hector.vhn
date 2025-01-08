import React, { useState } from "react";
import Guest from "@/Layouts/GuestLayout";
import { router, usePage} from '@inertiajs/react'
import Header from "@/Partials/Header";
import Swal from "sweetalert2";

export default function OrderCheck(){

    const [id, setId] = useState('')
    const check = (e) => {
        e.preventDefault
        router.post('cek-pesanan', {receipt: id})
    };

    const { flash } = usePage().props

    React.useEffect(() => {
        if(flash?.error){   
            Swal.fire({
                title: "Gagal!",
                text: flash.error,
                icon: "error"
              });
        }
    }, [flash]);

    return(
        <>
            <Header/>
                <div className="w-full h-screen flex items-center bg-[url('/assets/sepatu-4.jpg')] bg-cover">
                    <div className="w-full h-screen flex flex-col items-center justify-center backdrop-blur-sm bg-black/25 ">
                        <span className="mb-5 text-center text-3xl font-bold text-primary">CEK PESANANMU DI SINI!</span>
                        <div className="w-5/6 sm:w-2/3 lg:w-1/3 flex justify-center bg-white rounded-xl overflow-hidden">
                            <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} id="" placeholder="Masukkan kode pesanan" className="w-full h-full ps-5 py-5 bg-transparent border-none focus:ring-0" required/>
                            <button onClick={(e) => check(e)} className="w-content px-5 flex  items-center btn-submit font-medium text-nowrap">Lihat Pesanan</button>
                        </div>
                    </div>
                </div>
            
        </>
    );
}