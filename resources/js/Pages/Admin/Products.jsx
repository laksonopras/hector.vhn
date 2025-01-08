import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react"
import InputError from '@/Components/InputError';

export default function Products({auth, ...props}){

    const {data, setData, errors, post} = useForm()

    const [tambahDataOpen, setTambahDataOpen] = useState(false)
    
    const tambahData = (e) => {
        e.preventDefault()
        setTambahDataOpen(true)
        setData({
            id: null,
            product_name: '',
            discount: 0,
            price: 0,
        })
    }

    const updateData = (e, product) => {
        e.preventDefault()
        setTambahDataOpen(true)
        setData({
            id: product.id,
            product_name: product.product_name,
            discount: product.discount,
            price: product.price,
        })
    }

    const submit = (e) => {
        e.preventDefault()
        if(data.id == null){
            post('produk-layanan', data)
        } else {
            post('produk-layanan/'+data.id)
        }
    };

    const hapusProduk = (e, id) => {
        e.preventDefault()
        post('produk-layanan/'+id+'/hapus')
    } 

    const [rows, setRows] = useState(10)
    const rowOptions = ([5, 10, 15, 20, 25])
    const [currentPage, setCurrentPage] = useState(1);
    let pages = [];
    for (let i = 1; i <= Math.ceil(props.products.length / rows) ; i++ ) {
        pages.push(i);
    }
    const products = props.products.slice((currentPage - 1) * rows , currentPage * rows)
    
    return(
        <AdminLayout user={auth.user} >
            <h1 className="px-5 py-3 text-3xl font-light border-b border-slate-300">Produk Layanan</h1>
            <div className="p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <p>Jumlah baris</p>
                        <Dropdown className="w-auto mx-2">
                            <Dropdown.Trigger>
                                <button  className="flex items-center border border-slate-300 shadow-sm">
                                    <p  className="px-1">{rows}</p>
                                    <svg className="px-1" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15"><path fill="currentColor" d="M7.5 12L0 4h15z"/></svg>                 
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content className="w-content">
                                {rowOptions.map((rowOption, index) => {
                                    return(
                                        <button key={index} onClick={() => setRows(rowOption)} className="mx-2 py-full px-1  focus:bg-yellow-500 ">{rowOption}</button>
                                    )
                                })}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <button onClick={(e) => tambahData(e)} className="px-5 py-1.5 btn-submit" >Tambah</button>
                    <Modal show={tambahDataOpen} onClose={() => setTambahDataOpen(false)} maxWidth='xl'>
                        <form  className='p-7 space-y-7 flex flex-col'>
                            <h1 className="mx-auto text-3xl  font-semibold">Tambah Produk</h1>
                            <div className="flex flex-col space-y-3">
                                <div className="flex flex-col">
                                    <label htmlFor="" className="">Nama Produk</label>
                                    <input type="text" name="product_name" value={data.product_name}  onChange={(e) => setData(e.target.name, e.target.value)} className="rounded-md"/>
                                    <InputError message={errors.product_name} className="mt-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className="">Diskon</label>
                                    <input type="text" name="discount" value={data.discount}  onChange={(e) => setData(e.target.name, e.target.value)} className="rounded-md"/>
                                    <InputError message={errors.discount} className="mt-2" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="" className="">Harga</label>
                                    <input type="text" name="price" value={data.price}  onChange={(e) => setData(e.target.name, e.target.value)} className="rounded-md"/>
                                    <InputError message={errors.price} className="mt-2" />
                                </div>
                            </div>
                            <div className="flex items-center justify-end space-x-3">
                                <button onClick={() => setTambahDataOpen(false)} className="px-5 py-1.5 btn-danger">Batal</button>
                                <button onClick={(e) => submit(e)} className="px-5 py-1.5 btn-primary">Simpan</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <div className="w-full rounded-md border border-light-3 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="py-3 px-2">Nomor</th>
                                <th className="py-3 px-2">Nama</th>
                                <th className="py-3 px-2">Diskon</th>
                                <th className="py-3 px-2">Harga</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            { props.products.length == 0 ? 
                                <tr className="bg-light-1">
                                    <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> :

                            products.map((produk, index) => {
                                return(
                                    <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                        <td className='text-center'>{produk.id}</td>
                                        <td className=''>{produk.product_name}</td>
                                        <td className="py-3 px-1 text-center">{produk.discount}</td>
                                        <td className="py-3 px-1 text-center">Rp. {produk.price}</td>
                                        <td className='px-1 text-center'>
                                            <div className="flex justify-center space-x-2">
                                                <button onClick={(e) => updateData(e, produk)} className="p-1 btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg></button>
                                                <button onClick={(e) => hapusProduk(e, produk.id)} className="p-1 btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="white" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            )
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {products.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + products.length} of {props.products.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}