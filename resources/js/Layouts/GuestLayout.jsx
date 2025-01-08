import React from "react";
import Header from '@/Partials/Header';
import Footer from '@/Partials/Footer';
import { usePage } from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function GuestLayout({ children }) {

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
    
    return (
        <div className="w-full min-h-screen bg-light-1">
            <Header/>
            <div className='w-full me-0 '>{children}</div>
            <Footer/>
        </div>
    );
}