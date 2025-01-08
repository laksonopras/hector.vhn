import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import { router, useForm } from '@inertiajs/react'
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputError from "@/Components/InputError";

export default function Archive({auth, ...props}){

    const [rows, setRows] = useState(10)
    const rowOptions = ([5, 10, 15, 20, 25])
    const [currentPage, setCurrentPage] = useState(1);
    let pages = [];
    for (let i = 1; i <= Math.ceil(props.customers.length / rows) ; i++ ) {
        pages.push(i);
    }
    
    const customers = props.customers.slice((currentPage - 1) * rows , currentPage * rows)

    const {data, setData, errors, post} = useForm()

    const [modalOpen, setModalOpen] = useState(false)
    
    const addCustomer = (e) => {
        e.preventDefault()
        setModalOpen(true)
        setData({
            id: null,
            customer_name: '',
            whatsapp_number: '',
            address: '',
        })
    }

    const updateCustomer = (e, customer) => {
        e.preventDefault()
        setModalOpen(true)
        setData({
            id: customer.id,
            customer_name: customer.customer_name,
            whatsapp_number: customer.whatsapp_number,
            address: customer.address,
        })
    }

    const submit = (e) => {
        e.preventDefault()
        if(data.customer_name && data.whatsapp_number && data.address){
            if(data.id == null){
                post('/pelanggan', data)
            } else {
                post('pelanggan/'+data.id)
            }
            setModalOpen(false)
        } else {
            Swal.fire({
                text: 'Formulir tidak boleh ada yang kosong.',
                icon: "error"
            });
        }
    };

    const deleteCustomer = (e, id, customer_name) => {
        e.preventDefault()
        Swal.fire({
            text: "Anda yakin menghapus " + customer_name + " sebagai pelanggan?",
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit('/pelanggan/'+id, { method : 'delete' })
            }
        });
    }

    return(
        <AdminLayout user={auth.user} >
            <h1 className="p-5 text-xl border-b border-light-3">Data Pelanggan</h1>
            <div className="p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center space-x-2">
                        <p>Jumlah baris</p>
                        <Dropdown className="w-auto">
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
                    <button onClick={(e) => addCustomer(e)} className="px-5 py-1.5 btn-submit" >Tambah</button>
                    <Modal show={modalOpen} onClose={() => setModalOpen(false)} maxWidth='xl'>
                        <form className='p-7 space-y-7 flex flex-col'>
                            <h1 className="mx-auto text-3xl  font-semibold">Tambah Pelanggan</h1>
                            <div className="flex flex-col space-y-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="" className="text-sm">Nama Pelanggan :</label>
                                    <input type="text" name='customer_name' value={data.customer_name} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-2 text-input" />
                                    <InputError message={errors.customer_name} className="text-xs text-danger-1" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className="">Nomor Whatsapp :</label>
                                    <div className="px-3 py-2 flex items-center space-x-1 text-input">
                                        <span>+62</span>
                                        <input type="text" name='whatsapp_number' value={data.whatsapp_number} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" placeholder="..." className='m-0 w-full px-0 p-0 border-none ring-none bg-transparent focus:ring-0' />
                                    </div>
                                    <InputError message={errors.whatsapp_number} className="mt-2 text-danger-1" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="" className="text-sm">Alamat :</label>
                                    <input type="text" name='address' value={data.address} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-2 text-input" />
                                    <InputError message={errors.address} className="text-xs text-danger-1" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-3">
                                <button onClick={() => setModalOpen(false)} className="px-5 py-1.5 btn-danger">Batal</button>
                                <button onClick={(e) => submit(e)} className="px-5 py-1.5 btn-submit">Simpan</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="w-full rounded-md border border-light-3 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="py-3 px-2">No</th>
                                <th className="py-3 px-2">Nomor Whatsapp</th>
                                <th className="py-3 px-2">Nama Pelanggan</th>
                                <th className="py-3 px-2">Alamat</th>
                                <th className="py-3 px-2">Jumlah Pesanan</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length == 0 ?
                                <tr className="bg-light-1">
                                    <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> 
                            : customers.map((customer, index) => {
                                return(
                                    <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                        <td className='py-3 px-1 text-center'>{(index + 1) + ((currentPage - 1) * rows)}</td>
                                        <td className='py-3 px-1 text-center'>+62{customer.whatsapp_number}</td>
                                        <td className='py-3 px-1'>{customer.customer_name}</td>
                                        <td className='py-3 px-1'>{customer.address}</td>
                                        <td className='py-3 px-1'>{customer.order_count}</td>
                                        <td className='px-1 text-center'>
                                            <div className="flex justify-center space-x-2">
                                                <a onClick={(e) => updateCustomer(e, customer)} className="p-1 btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg></a>
                                                <button onClick={(e) => deleteCustomer(e, customer.id, customer.customer_name)} className="p-1 btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"></path></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {customers.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + customers.length} of {props.customers.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}