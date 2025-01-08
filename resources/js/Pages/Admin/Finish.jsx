import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import { router } from '@inertiajs/react'
import Swal from "sweetalert2";

export default function Pickup({auth, ...props}){

    const [rows, setRows] = useState(10)
    
    const rowOptions = ([5, 10, 15, 20, 25])
    
    const [currentPage, setCurrentPage] = useState(1);
    
    let pages = [];
    
    for (let i = 1; i <= Math.ceil(props.orders.length / rows) ; i++ ) {
        pages.push(i);
    }
    
    const orders = props.orders.slice((currentPage - 1) * rows , currentPage * rows)

    const order_type = [
        {name: 'Non-Pickup' , style: 'bg-warning-1 bg-opacity-25 text-warning-2'},
        {name: 'Pickup' , style: 'bg-success-1 bg-opacity-25 text-success-2'},
    ]

    const updateStatus = (e, order) => {
        e.preventDefault()
        Swal.fire({
            text: order.order_type == 0 ? "Apakah ID Pesanan "  + order.receipt + " telah diserahkan?" : "Anda akan mengantar ID Pesanan "  + order.receipt + " ?",
            icon: "question",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit('/pesanan/status', { method : 'post' , data: {id: order.id, status: (order.order_type == 0 ? 9 : 8)  }})
            }
        });
    }

    const deleteOrder = (e, id, order_id) => {
        e.preventDefault()
        Swal.fire({
            text: "Anda yakin membatalkan ID Pesanan " + order_id + " ?",
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit('/pesanan/'+id, { method : 'delete' })
            }
        });
    }

    return(
        <AdminLayout user={auth.user} >
            <h1 className="p-5 text-xl border-b border-light-3">Pesanan Selesai Dikerjakan</h1>
            <div className="p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <p>Jumlah baris</p>
                        <Dropdown className="w-auto mx-2">
                            <Dropdown.Trigger>
                                <button  className="flex items-center border border-light-3 shadow-sm">
                                    <p className="px-1">{rows}</p>
                                    <svg className="px-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15z"/></svg>                 
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="w-content">
                                {rowOptions.map((rowOption, index) => {
                                    return(
                                        <button key={index} onClick={() => setRows(rowOption)} className="mx-2 py-full px-1">{rowOption}</button>
                                    )
                                })}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                <div className="w-full rounded-md border border-light-3 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="py-3 px-2">No</th>
                                <th className="py-3 px-2">ID Pesanan</th>
                                <th className="py-3 px-2">Nama Pelanggan</th>
                                <th className="py-3 px-2">Alamat</th>
                                <th className="py-3 px-2">Tipe Pesanan</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length == 0 ?
                                <tr className="bg-light-1">
                                    <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> 
                            : orders.map((order, index) => {
                                return(
                                    <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                        <td className='py-3 px-1 text-center'>{(index + 1) + ((currentPage - 1) * rows)}</td>
                                        <td className='py-3 px-1 text-center'>{order.receipt}</td>
                                        <td className='py-3 px-1'>{order.customer_name}</td>
                                        <td className='py-3 px-1'>{order.address}</td>
                                        <td className='py-3 px-1 text-center'><span className={'px-3 py-1 text-sm rounded shadow font-semibold ' + order_type[order.order_type].style}>{order_type[order.order_type].name}</span></td>
                                        <td className='px-1 text-center'>
                                            <div className="flex justify-center space-x-2">
                                                <a href={'https://wa.me/62'+ order.whatsapp_number} className="p-1 btn-submit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M7 8h6"></path><path d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"></path></g></svg></a>
                                                <a href={'/pesanan/'+order.id} className="p-1 btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2}><path d="M3 12c5.4-8 12.6-8 18 0c-5.4 8-12.6 8-18 0z"></path><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"></path></g></svg></a>
                                                <a onClick={(e) => updateStatus(e, order)} className="p-1 btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg></a>
                                                <button onClick={(e) => deleteOrder(e, order.id, order.receipt)} className="p-1 btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"></path></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {orders.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + orders.length} of {props.orders.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}