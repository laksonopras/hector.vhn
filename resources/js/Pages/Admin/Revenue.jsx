import Dropdown from "@/Components/Dropdown";
import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { router } from '@inertiajs/react'

export default function({auth, ...props}){

    const [rows, setRows] = useState(10)
    
    const rowOptions = ([5, 10, 15, 20, 25])
    
    const [currentPage, setCurrentPage] = useState(1);
    
    let pages = [];
    
    for (let i = 1; i <= Math.ceil(props.transactions.length / rows) ; i++ ) {
        pages.push(i);
    }
    
    const transactions = props.transactions.slice((currentPage - 1) * rows , currentPage * rows)
    
    const [datetime, setDatetime] = useState(props.datetime)
    
    const submit = (e) => {
        e.preventDefault
        router.post(route('pendapatan'), {datetime})
    }

    const print = (e) => {
        e.preventDefault
        const queryParams = new URLSearchParams({
            datetime: datetime,
        }).toString();
        window.location.href = `/pendapatan/export?${queryParams}`
    }

    return(
        <AdminLayout user={auth.user}>
            <h1 className="p-5 text-xl border-b border-light-3">Pendapatan</h1>
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
                    <div className="flex items-center space-x-5">
                        <span>Bulan :</span>
                        <input type="month" id="month" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="px-5 py-1.5 rounded-md"/>
                        <button onClick={(e) => submit(e)} className="px-5 py-1.5 btn-submit">Tampilkan</button>
                        <button onClick={(e) => print(e)} className="px-5 py-1.5 btn-success">Ekspor PDF</button>
                    </div>
                </div>
                <div className="w-full rounded-md border border-light-3 overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="table-header">
                                <th className="py-3 px-2">No</th>
                                <th className="py-3 px-2">Tanggal dan Waktu</th>
                                <th className="py-3 px-2">ID Pesanan</th>
                                <th className="py-3 px-2">Nama Pelangan</th>
                                <th className="py-3 px-2">Metode Pembayaran</th>
                                <th className="py-3 px-2">Harga</th>
                                <th className="py-3 px-2">Diskon</th>
                                <th className="py-3 px-2">Jumlah</th>
                                <th className="py-3 px-2">Operator</th>
                                <th className="py-3 px-2">Aktivitas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length == 0 ?
                                <tr className="bg-light-1">
                                    <td colSpan={10} className="py-2.5 px-1 text-center text-sm italic">Tidak ada data yang ditampilkan.</td>
                                </tr> 
                            : transactions.map((transaction, index) => {return(
                                <tr key={index} className={'text-black ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                    <td className='py-3 px-1 text-center'>{(index + 1) + ((currentPage - 1) * rows)}</td>
                                    <td className='py-3 px-1 text-center'>{transaction.created_at}</td>
                                    <td className='py-3 px-1 text-center'>{transaction.receipt}</td>
                                    <td className='py-3 px-1 text-left'>{transaction.customer_name}</td>
                                    <td className='py-3 px-1 text-center'>{transaction.payment_method}</td>
                                    <td className='py-3 px-1 text-center'>Rp. {transaction.sub_price}</td>
                                    <td className='py-3 px-1 text-center'>{transaction.discount}%</td>
                                    <td className='py-3 px-1 text-center'>Rp. {transaction.price}</td>
                                    <td className='py-3 px-1 text-center'>{transaction.operator}</td>
                                    <td className='px-1 text-center'>
                                        <div className="flex justify-center space-x-2">
                                            <a href={'https://wa.me/62'+ transaction.whatsapp_number} className="p-1 btn-submit"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12h10M7 8h6"></path><path d="M3 20.29V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.961a2 2 0 0 0-1.561.75l-2.331 2.914A.6.6 0 0 1 3 20.29Z"></path></g></svg></a>
                                            <a href={'/pesanan/'+transaction.id} className="p-1 btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={2}><path d="M3 12c5.4-8 12.6-8 18 0c-5.4 8-12.6 8-18 0z"></path><path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0z"></path></g></svg></a>
                                        </div>
                                    </td>
                                </tr>
                            )})}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between space-x-1">
                    <p>Show {transactions.length == 0 ? 0 : ((currentPage - 1) * rows) + 1} to {((currentPage - 1) * rows) + transactions.length} of {props.transactions.length} entries</p>
                    <div className="flex items-stretch space-x-1">
                        <button onClick={() => setCurrentPage((prev) => prev - 1 )} disabled={currentPage == 1} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == 1 ? 'bg-light-1 ' : 'bg-white ')} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth={2} d="M17 2L7 12l10 10"></path></svg></button>
                        <button onClick={() => setCurrentPage((prev) => prev + 1 )} disabled={currentPage == Math.max(...pages)} className={'px-2.5 py-1 text-black border-light-3 border ' + (currentPage == Math.max(...pages) ? 'bg-light-1 ' : 'bg-white ')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20"><path fill="currentColor" d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"></path></svg></button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}