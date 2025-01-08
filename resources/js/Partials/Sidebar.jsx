import React, { useState, useRef } from "react";
import NavSide from "@/Components/NavSide";

export default function Sidebar({user}){

    const [pesananOpen, setPesananOpen] = useState(false)

    const pesananOpenHandler = (e) => {
        e.preventDefault(); 
        setPesananOpen(!pesananOpen)
    }

    return(
        <div className='w-0 md:w-80 h-full invisible md:visible flex flex-col bg-secondary ' >
            <div className="flex-1 overflow-y-auto">
                <a href="/" className='w-full h-16 bg-secondary sticky top-0 flex items-center justify-center z-50'>
                    <img src='/assets/Logo-white.png' alt="" className="h-16 py-4" />
                </a>
                <div className='flex-col flex'>
                    <NavSide href={route('dashboard')} active={route().current('dashboard')} className="px-5 py-5 flex items-center space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" d="M5.616 20q-.667 0-1.141-.475T4 18.386V12.25h6.5V20zm5.884 0v-7.75H20v6.135q0 .666-.475 1.14t-1.14.475zM4 11.25V5.616q0-.667.475-1.141T5.615 4h12.77q.666 0 1.14.475T20 5.615v5.635z"></path></svg>
                        <span>Dashboard</span>
                    </NavSide>
                    {
                        user.status == 0 ? 
                        <></>
                        : 
                        <>
                            <NavSide href={route('buat-pesanan-admin')} active={route().current('buat-pesanan-admin')} className="px-5 py-5 flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 512 512"><path fill="currentColor" d="M459.94 53.25a16.06 16.06 0 0 0-23.22-.56L424.35 65a8 8 0 0 0 0 11.31l11.34 11.32a8 8 0 0 0 11.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38M399.34 90L218.82 270.2a9 9 0 0 0-2.31 3.93L208.16 299a3.91 3.91 0 0 0 4.86 4.86l24.85-8.35a9 9 0 0 0 3.93-2.31L422 112.66a9 9 0 0 0 0-12.66l-9.95-10a9 9 0 0 0-12.71 0"/><path fill="currentColor" d="M386.34 193.66L264.45 315.79A41.1 41.1 0 0 1 247.58 326l-25.9 8.67a35.92 35.92 0 0 1-44.33-44.33l8.67-25.9a41.1 41.1 0 0 1 10.19-16.87l122.13-121.91a8 8 0 0 0-5.65-13.66H104a56 56 0 0 0-56 56v240a56 56 0 0 0 56 56h240a56 56 0 0 0 56-56V199.31a8 8 0 0 0-13.66-5.65"/></svg>
                                <span>Buat Pesanan</span>
                            </NavSide>
                            <NavSide onClick={(e) => pesananOpenHandler(e)} className="px-5 py-5 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20"><path fill="currentColor" d="M7.085 3H5.5A1.5 1.5 0 0 0 4 4.5v12A1.5 1.5 0 0 0 5.5 18h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 14.5 3h-1.585A1.5 1.5 0 0 0 11.5 2h-3a1.5 1.5 0 0 0-1.415 1M8.5 3h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1M9 8.5a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H9.5a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H9.5a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H9.5a.5.5 0 0 1-.5-.5m-1-6a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m0 3a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-.75 3.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5"></path></svg>
                                    <span>Pesanan Aktif</span>
                                </div>
                                <svg className={pesananOpen ? 'rotate-180' : '' } xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M13.06 16.06a1.5 1.5 0 0 1-2.12 0l-5.658-5.656a1.5 1.5 0 1 1 2.122-2.121L12 12.879l4.596-4.596a1.5 1.5 0 0 1 2.122 2.12l-5.657 5.658Z"></path></g></svg>
                            </NavSide>
                            {pesananOpen && (
                                <div className="h-content flex flex-col">
                                    <NavSide className="ps-16 py-3" active={route().current('pesanan-baru')} href={route('pesanan-baru', {status : 1})}>Pesanan Baru</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('pickup-pesanan')} href={route('pickup-pesanan', {status : 2})}>Pickup Pesanan</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('finalisasi-pesanan')} href={route('finalisasi-pesanan', {status : 3})}>Finalisasi Pesanan</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('pembayaran')} href={route('pembayaran', {status : 4})}>Pembayaran</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('menunggu-antrean')} href={route('menunggu-antrean', {status : 5})}>Menunggu Antrean</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('sedang-dikerjakan')} href={route('sedang-dikerjakan', {status : 6})}>Pengerjaan</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('selesai-dikerjakan')} href={route('selesai-dikerjakan', {status : 7})}>Selesai dikerjakan</NavSide>
                                    <NavSide className="ps-16 py-3" active={route().current('delivery-pesanan')} href={route('delivery-pesanan', {status : 8})}>Delivery</NavSide>
                                </div>
                            )}
                            <NavSide href={route('arsip', {status : 9})} active={route().current('arsip')} className="px-5 py-5 flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zm-7 3q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25z"/></svg>
                                <span>Arsip Pesanan</span>
                            </NavSide> 
                            <NavSide href={route('pelanggan')} active={route().current('pelanggan')} className="px-5 py-5 flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 14 14"><path fill="currentColor" fillRule="evenodd" d="M12.918 1.623a1.623 1.623 0 1 1-3.246 0a1.623 1.623 0 0 1 3.246 0m1.024 5.037a.75.75 0 0 1-.732.586H7.098a.75.75 0 1 1 0-1.5h1.596A2.706 2.706 0 0 1 14 6.493a.27.27 0 0 1-.058.167M1.359 3.324a1.811 1.811 0 1 0 3.622 0a1.811 1.811 0 0 0-3.622 0M0 9.019a3.17 3.17 0 1 1 6.34 0v.858a.5.5 0 0 1-.5.5h-.86l-.398 3.185a.5.5 0 0 1-.496.438H2.253a.5.5 0 0 1-.496-.438l-.399-3.185H.5a.5.5 0 0 1-.5-.5z" clipRule="evenodd"/></svg>
                                <span>Pelanggan</span>
                            </NavSide> 
                            <NavSide href={route('produk-layanan')} active={route().current('produk-layanan')} className="px-5 py-5 flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1024 1024"><path fill="currentColor" fillRule="evenodd" d="M160 144h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V160c0-8.837 7.163-16 16-16m564.314-25.333l181.019 181.02c6.248 6.248 6.248 16.378 0 22.627l-181.02 181.019c-6.248 6.248-16.378 6.248-22.627 0l-181.019-181.02c-6.248-6.248-6.248-16.378 0-22.627l181.02-181.019c6.248-6.248 16.378-6.248 22.627 0M160 544h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H160c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16m400 0h304c8.837 0 16 7.163 16 16v304c0 8.837-7.163 16-16 16H560c-8.837 0-16-7.163-16-16V560c0-8.837 7.163-16 16-16"/></svg>
                                <span>Produk Layanan</span>
                            </NavSide>
                            <NavSide href={route('pengumuman')} active={route().current('pengumuman')} className="px-5 py-5 flex items-center space-x-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><defs><mask id="ipSAnnouncement0"><g fill="none" strokeLinejoin="round" strokeWidth="4"><rect width="40" height="26" x="4" y="15" fill="#fff" stroke="#fff" rx="2"/><path fill="#fff" stroke="#fff" strokeLinecap="round" d="m24 7l-8 8h16z"/><path stroke="#000" strokeLinecap="round" d="M12 24h18m-18 8h8"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSAnnouncement0)"/></svg>
                                <span>Pengumuman</span>
                            </NavSide>
                            {
                                user.role == 0 ? 
                                <></>
                                :
                                <>
                                    <NavSide href={route('pendapatan')} active={route().current('pendapatan')} className="px-5 py-5 flex items-center space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="m6 16.5l-3 2.94V11h3m5 3.66l-1.57-1.34L8 14.64V7h3m5 6l-3 3V3h3m2.81 9.81L17 11h5v5l-1.79-1.79L13 21.36l-3.47-3.02L5.75 22H3l6.47-6.34L13 18.64"/></svg>
                                        <span>Pendapatan</span>
                                    </NavSide>
                                    <NavSide href={route('pengguna')} active={route().current('pengguna')} className="px-5 py-5 flex items-center space-x-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="currentColor"/><path fill="currentColor" d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"/></svg>
                                        <span>Pengguna</span>
                                    </NavSide>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    );
}