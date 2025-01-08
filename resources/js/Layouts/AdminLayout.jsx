import React, { useState } from "react";
import Sidebar from "@/Partials/Sidebar";
import Topbar from "@/Partials/Topbar";
import { router, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

export default function AdminLayout({user, children, className=''}){

    const { flash } = usePage().props

    React.useEffect(() => {
        if(flash?.success){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: flash.success
                });
        } else if (flash?.error) {
            Swal.fire({
                icon: "error",
                title: "Pencarian gagal!",
                text: flash.error,
            });
        }
    }, [flash]);
    React.useEffect(() => {
        if(user.status == 0){
            Swal.fire({
                title: "Akun Anda belum aktif.",
                text: "Silahkan hubungi manajer untuk mengaktifkan akun Anda!",
                icon: "warning",
                confirmButtonText: "Logout",
                confirmButtonColor: "#dc2626",
                allowOutsideClick: false
            }).then((result) => {
                router.visit(route('logout'), { method : 'post'})
            })    
        }}, [user.status]
    )
    return(
        <>
            <div className='w-full h-screen bg-light-1'>
                <div className="w-full h-full flex flex-col overflow-y-hidden">
                    <div className="w-full h-full flex ">
                        <Sidebar user={user} />
                        <div className="w-full min-h-full overflow-y-auto">
                            <Topbar user={user} />
                            <div className='p-5'>
                                <div className={route().current('dashboard') || route().current('detail-pesanan') || route().current('buat-pesanan-admin') ? (' ' + className)  :"w-full h-content bg-white rounded-xl border border-slate-300 shadow "}>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}