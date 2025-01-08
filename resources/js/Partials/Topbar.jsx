import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function Topbar({user}){

    const [id, setId] = useState('');
    const submit = (e) => {
        e.preventDefault();
        router.visit(route('cari-pesanan'), { method : 'post', data : {receipt : id}})
    }

    const logout = (e) =>{
        e.preventDefault()
        Swal.fire({
            text: "Lanjutkan logout?",
            icon: "question",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit(route('logout'), { method : 'post'})
            }
        });
    }

    return(
        <>
            <div className={'w-full h-16 sticky top-0 flex items-center justify-between px-5 bg-white z-40 shadow-md '}>
                <div className="w-full flex items-center space-x-10">
                    {
                        user.role == 0 ? <></>: 
                        <>
                            <div className="flex items-center space-x-2">
                                <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="Masukkan Nomor Resi" className="py-2 text-input"/>
                                <button onClick={(e) => submit(e)} className="px-3 py-2 rounded-md btn-submit">Cari</button>
                            </div>
                        </>
                    }
                </div>
                <Dropdown className="w-auto">
                    <Dropdown.Trigger>
                        <button  className="flex items-center">
                            {
                                user.avatar == null ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><g fill="dark" fillRule="evenodd" clipRule="evenodd"><path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path><path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.986 8.986 0 0 1 12.065 14a8.984 8.984 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.963 8.963 0 0 1-5.672-2.012A6.992 6.992 0 0 1 12.065 16a6.991 6.991 0 0 1 5.689 2.92A8.964 8.964 0 0 1 12 21"></path></g></svg> 
                                :
                                <img src={'/storage/' + user.avatar} alt="" className="h-10 rounded-full"/>
                            }
                            
                            <p className="px-2">{user.name}</p>                    
                        </button>
                    </Dropdown.Trigger>
                    <Dropdown.Content className="min-w-fit max-w-full text-nowrap">
                        <Dropdown.Link href={route('profile')}>Profile</Dropdown.Link>
                        <Dropdown.Link onClick={e => logout(e)} method="post" as="button">
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
                    
            </div>
        </>
    )
}