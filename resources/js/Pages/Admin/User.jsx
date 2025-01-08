import AdminLayout from "@/Layouts/AdminLayout";
import Dropdown from "@/Components/Dropdown";
import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function User({auth, ...props}){
    
    const [rows, setRows] = useState(10)

    const rowOptions = ([5, 10, 15, 20, 25])

    const [currentPage, setCurrentPage] = useState(1);
    
    let pages = [];

    for (let i = 1; i <= Math.ceil(props.users.length / rows) ; i++ ) {
        pages.push(i);
    }
    
    const users = props.users.slice((currentPage - 1) * rows , currentPage * rows)
    
    // const [status, setStatus, post] = useState()

    const {data, setData, errors, post} = useForm({})

    const role = ['Staf', 'Manajer']

    const Status = ['Tidak Aktif', 'Aktif']

    const [modaluser, setModaluser] = useState(false)

    const modaluserHandler = (e, user) => {
        e.preventDefault()
        setModaluser(true)
        setData(user);
    }

    const roleHandler = (e, index) => {
        e.preventDefault()
        setData('role', index+1)
    }

    const statusHandler = (e, index) => {
        e.preventDefault()
        setData('status', index)
    }

    const simpan = (e) => {
        e.preventDefault()
        post('user/'+data.id)
        setModaluser(false)
    }

    const hapus = (e, id) => {
        e.preventDefault()
        post('user/'+id+'/hapus')
    }

    return(
        <AdminLayout user={auth.user} >
            <h1 className="p-5 text-xl border-b border-light-3">Data Staf</h1>
            <div className="p-5 space-y-5">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <p>Jumlah baris</p>
                        <Dropdown className="w-auto mx-2">
                            <Dropdown.Trigger>
                                <button  className="flex items-center border border-slate-300 shadow-sm">
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
                                <th className="py-3 px-2">Nomor</th>
                                <th className="py-3 px-2">Nama</th>
                                <th className="py-3 px-2">role</th>
                                <th className="py-3 px-2">Status</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length == 0 ?
                                <tr className="light-1">
                                    <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> 
                            : users.map((user, index) => {
                                return(
                                    <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                        <td className='py-3 text-center'>{user.id}</td>
                                        <td className='py-3 text-left'>{user.name}</td>
                                        <td className='py-3 text-center'>{role[user.role]}</td>
                                        <td className='text-center text-sm'>
                                            <span className={'px-3 py-1 text-sm rounded shadow font-medium ' + (user.status == 0 ? 'bg-red-200 text-red-500 ' : 'bg-green-200 text-green-600')} disabled={auth.user.role != 1 ? true : false}>{Status[user.status]}</span>
                                        </td>
                                        <td className='px-1 text-center'>
                                            <div className="flex justify-center space-x-2">
                                                <a href={'https://wa.me/62'+ user.whatsapp_number} className="p-1 btn-submit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M7 8h6"></path><path d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"></path></g></svg></a>
                                                <a onClick={(e) => modaluserHandler(e, user)} className="p-1 btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg></a>
                                                <button onClick={(e) => hapus(e, user.id)} className="p-1 btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"></path></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {users.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + users.length} of {props.users.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
            <Modal show={modaluser} onClose={() => setModaluser(false)} maxWidth='xl' >
                <form  className='p-7 space-y-7 flex flex-col'>
                    <h1 className="mx-auto text-3xl">Edit user</h1>
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col">
                            <label htmlFor="" className="">Nama</label>
                            <input type="text" name="name" value={data.name}  onChange={(e) => setData(e.target.name, e.target.value)} className="py-1 text-input"/>
                            <InputError message={errors.nama} className="text-xs text-danger-1" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="">Email</label>
                            <input type="email" name="email" value={data.email}  onChange={(e) => setData(e.target.name, e.target.value)} className="py-1 text-input"/>
                            <InputError message={errors.email} className="text-xs text-danger-1" />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="" className="text-sm">Nomor Whatsapp :</label>
                            <div className="px-3 py-1 flex items-center space-x-1 text-input">
                                <span>+62</span>
                                <input type="text" name='whatsapp_number' value={data.whatsapp_number} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" placeholder="..." className='m-0 w-full px-0 p-0 border-none ring-none bg-transparent focus:ring-0' />
                            </div>
                            <InputError message={errors.whatsapp_number} className="text-xs text-danger-1" />
                        </div>
                        <div className="flex flex-col">
                            <select name='role' value={data.role} onChange={(e) => setData(e.target.name, e.target.value)} className="py-1 text-input">
                                <option value="0">Staf</option>
                                <option value="1">Manajer</option>
                            </select>
                            <InputError message={errors.role} className="text-xs text-danger-1" />
                        </div>
                        <div className="flex flex-col">
                        <select name='status' value={data.status} onChange={(e) => setData(e.target.name, e.target.value)} className="py-1 text-input">
                                <option value="0">Tidak Aktif</option>
                                <option value="1">Aktif</option>
                            </select>
                            <InputError message={errors.status} className="text-xs text-danger-1"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                        <button onClick={() => setModaluser(false)} className="px-5 py-1.5 btn-danger">Batal</button>
                        <button onClick={(e) => simpan(e)} className="px-5 py-1.5 btn-submit">Simpan</button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}