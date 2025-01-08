import React, { useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Homepage(){
    
    const products = [
        {img : '/assets/B01.png', title : 'CLEANING', desc : 'Cleaning adalah teknik membersihkan sepatu seluruh bagian sepatu secara detail meliputi midsole, outsolte, upper, dan lace.'},
        {img : '/assets/B02.png', title : 'REGLUE', desc : 'Reglue adalah teknik reparasi sepatu untuk merekatkan kembali bagian-bagian sepatu yang mungkin sudah mulai renggang.'},
        {img : '/assets/B02.png', title : 'UNYELLOWING', desc : 'Reglue adalah teknik reparasi sepatu untuk merekatkan kembali bagian-bagian sepatu yang mungkin sudah mulai renggang.'},
        {img : '/assets/B03.png', title : 'REPAINT', desc : 'Repaint adalah teknik mengubah warna sepatu dengan warna yang berbeda dari aslinya atau memperkuat warna asli sepatu yang telah pudar.'},
    ]

    const strengths = [
        {img : '/assets/D01.png', title : 'HARGA TERJANGKAU', desc : 'Kami menawarkan jasa cuci sepatu dengan harga terjangkau tanpa mengurangi kualitas layanan kami.'},
        {img : '/assets/D02.png', title : 'PROSES CEPAT', desc : 'Kami mengutamakan kepuasan pelanggan melalui perhatian pada detail dan respon cepat.'},
        {img : '/assets/D03.png', title : 'BERKUALITAS', desc : 'Kami berani memberi garansi untuk menjamin kualitas setiap produk layanan kami.'},
        {img : '/assets/D04.png', title : 'PROFESIONAL', desc : 'Kami mempekerjakan tenaga profesional untuk menjaga kualitas layanan kami.'},
        {img : '/assets/D05.png', title : 'BERGARANSI', desc : 'Kami berani memberi garansi untuk menjamin kualitas setiap produk layanan kami.'},
        {img : '/assets/D06.png', title : 'GRATIS PICKUP AND DELIVERY', desc : 'Kami menyediakan layanan pickup and delivery agar Anda tidak menghabiskan waktu untuk datang langsung ke tempat kami..'},
    ]

    const steps = [
        {img : '/assets/S1.png', title : 'Pemesanan', desc: 'Pelanggan membuat pesanan melalui website dengan mengisikan data pesanan dengan lengkap dan akurat.', colour: 'bg-[#ef4444] bg-opacity-75'},
        {img : '/assets/S2.png', title : 'Pickup', desc: 'Kami akan mengambil sepatu Anda ke alamat yang Anda isikan saat membuat pesanan.', colour: 'bg-[#f97316] bg-opacity-75'}, 
        {img : '/assets/S3.png', title : 'Pembayaran', desc: 'Pelanggan dapat melakukan pembayaran non-tunai tanpa harus datang ke toko.', colour: 'bg-[#eab308] bg-opacity-75'},
        {img : '/assets/S4.png', title : 'Pengerjaan', desc: 'Kami akan mengerjakan sepatu Anda sesuai dengan pesanan yang telah Anda bayar sebelumnya.', colour: 'bg-[#16a34a] bg-opacity-75'},
        {img : '/assets/S5.png', title : 'Delivery', desc: 'Kami akan mengantar sepatu Anda ke alamat yang Anda isikan saat membuat pesanan.', colour: 'bg-[#1d4ed8] bg-opacity-75'},
        {img : '/assets/S6.png', title : 'Terima Sepatu', desc: 'Anda dapat menerima sepatu Anda dengan kondisi terbaik.', colour: 'bg-[#9333ea] bg-opacity-75'},
    ]

    const reports = [
        {img : '/assets/R1-white.png', desc: 'Pelanggan', count: 1000},
        {img : '/assets/R2-white.png', desc: 'Pasang Sepatu', count: 1000},
        {img : '/assets/R3-white.png', desc: 'Pesanan', count: 1000},
    ]

    const reviews = [
        {name: 'Ragel Bhakti', review: 'Nyucinya bersih wangi juga noda2 kuning disepatu juga hilang, yang mau nyuci ngga usah ragu top terpercaya !!!!'},
        {name: 'Rosyda Ratna', review: 'Mantap pengerjaan cepat dan bersih harum sepatunya… mumpung promo lumayan…'},
        {name: 'Gelora Pratama', review: 'Cuci sepatunya sangat bersih dan wangi, pelayanan ramah..'},
    ]

    const photos = [
        {img : '/assets/G-1.jpg'},
        {img : '/assets/G-2.jpg'},
        {img : '/assets/G-3.jpg'},
        {img : '/assets/G-3.jpg'},
        {img : '/assets/G-1.jpg'},
        {img : '/assets/G-2.jpg'},
        {img : '/assets/G-2.jpg'},
        {img : '/assets/G-3.jpg'},
        {img : '/assets/G-1.jpg'},
    ]

    return(
        <GuestLayout>
            <div className="w-full h-auto pt-20 p-5 md:p-0 md:h-screen bg-[url('/assets/cover-1.jpg')] bg-cover">
                <div className="w-full md:h-full flex items-center text-white md:px-36">
                    <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left space-y-5">
                        <div>
                            <div className="w-full flex font-bold text-xl md:text-7xl tracking-widest">
                                <h1 className="w-full">JASA <span className=" text-primary">CUCI SEPATU</span></h1>
                            </div>
                            <h1 className="w-full inline-block font-bold text-xl md:text-7xl">BERGARANSI!</h1>
                        </div>
                        <p className="w-full inline-bolck text-sm md:text-lg justify-between">Rawat sepatu kesayangan Anda bersama kami. Nikmati semua layanan kami yang akan membuat sepatu Anda tampak seperti baru kembali.</p>
                        <a type href={route('buat-pesanan-guest')} className="w-fit mt-5 px-6 py-3 bg-primary text-black rounded-xl shadow-lg hover:scale-105 ease-in-out duration-200">Coba Sekarang!</a>
                    </div>
                </div>
            </div>
            
            <div className="w-full h-fit p-5 bg-white space-y-5 lg:p-24 md:flex md:items-center md:justify-center md:space-x-5 lg:space-x-10 ">
                <div className="md:w-1/2 overflow-hidden">
                    <img src="/assets/Ilustration-4.jpeg" alt="" className="w-full scale hover:scale-125 duration-500 hover:-rotate-6" />
                </div>
                <div className="md:w-1/2 flex-col flex items-center space-y-5">
                    <p className="text-3xl font-medium border-b pb-5 px-10 border-light-4">HECTOR VHN</p>
                    <p className="text-justify leading-loose text-black">Hector VHN adalah jasa layanan cuci sepatu yang berdiri sejak tahun 2015 di Malang, Jawa Timur. Kami hadir dengan memberikan solusi untuk merawat sepatu agar tetap bersih dan tahan lama. Sepuluh tahun berkiprah dalam industri ini memberikan pengalaman bagi kami untuk merawat sepatu dengan berbagai bahan yang memiliki cara berbeda-beda dalam perawatannya, mulai dari karet, sintesis, nylon, kanvas, mesh, denim, kulit hingga suede. Kami menggunakan teknik pembersihan yang aman dan efektif agar dapat memberikan pelayanan dengan kualitas terbaik. Kami berani memberi garansi untuk setiap produk layanan kami. Sehingga Anda tidak perlu khawatir untuk menggunakan jasa layanan kami.</p>
                </div>
            </div>

            <div className="w-full h-fit p-5 sm:px-24 sm:py-12 space-y-5 sm:space-y-12 bg-light-1 ">
                <div className="w-fit mx-auto space-y-2 text-center">
                    <p className="w-fit mx-auto text-3xl font-medium border-b pb-5 px-10 border-light-4">Produk Layanan Kami</p>
                    <p className="text-lg">Kami menyediakan semua yang Anda butuhkan untuk menunjang perawatan sepatu Anda.</p>
                </div>
                <div className="w-full h-content md:flex md:items-stretch md:justify-center space-y-5 md:space-y-0 md:space-x-7">
                    {
                        products.map((produk, index) => {
                            return(
                                <div key={index} className="md:w-1/4 self-auto overflow-hidden bg-white rounded-lg shadow-xl border border-light-3 hover:-translate-y-2 duration-500">
                                    <div className="w-full h-auto overflow-hidden">
                                        <img src={produk.img} alt=""/>
                                    </div>
                                    <div className="p-5 md:py-10 md:px-5 space-y-2 md:space-y-5">
                                        <p className="text-center text-2xl font-semibold">{produk.title}</p>
                                        <p className="text-center text-light-4 leading">{produk.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-full flex justify-center">
                    <button className="bg-primary rounded-lg px-7 py-5 shadow-xl hover:scale-105 ease-in-out duration-200 ">Lihat Daftar Harga</button>
                </div>
            </div>

            <div className="w-full h-fit p-5 sm:px-24 sm:py-12 space-y-5 sm:space-y-12 bg-white">
                <h1 className="w-fit mx-auto text-3xl font-medium border-b pb-5 px-10 border-light-4">Mengapa kami?</h1>
                <div className="w-full h-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        strengths.map((strength, index) => {
                            return(
                                <div key={index} className="w-full p-2.5 md:p-5 bg-white space-y-5 flex flex-col  rounded-lg hover:shadow-xl">
                                    <img src={strength.img} alt="" className="w-1/5 mx-auto " />
                                    <div>
                                        <p className="w-full text-center text-lg font-semibold">{strength.title}</p>
                                        <p className="text-center text-light-4 leading">{strength.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
            <div className="w-full h-fit p-5 sm:py-12 space-y-5 sm:space-y-12 bg-light-1">
                <h1 className="text-center text-3xl font-bold">Tetap dirumah, biarkan kami bekerja!</h1>
                <div className="md:mx-12 md:flex md:justify-center space-y-5 md:space-y-0 md:space-x-5 ">
                    {
                        steps.map((step, index) => {
                            return(
                                <div key={index} className={"w-full md:w-1/3 space-y-3 hover:-translate-y-2 duration-500  "}>
                                    <div className="w-2/5 mx-auto p-4 bg-primary  rounded-full">

                                        <img src={step.img} alt="" />
                                    </div>
                                    <div className="">
                                        <p className="w-full text-center text-lg font-bold">{step.title}</p>
                                        <p className="w-full text-center text-sm ">{step.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="w-full h-fit p-5 space-y-5 bg-[url('/assets/coba.png')] bg-fixed bg-cover lg:py-12 lg:space-y-12">
                <div className="lg:w-2/3 mx-auto font-medium text-center space-y-2">
                    <p className="text-primary text-3xl font-bold">Kami telah dipercaya sejak tahun 2015</p>
                    <p className="text-white">Kami telah menjadi tujuan utama bagi pelanggan kami untuk memberikan pelayanan terbaik dalam merawat sepatu. Dengan pengalaman sejauh ini, memacu kami untuk terus meningkatkan kualitas dan kepuasan pelanggan. Kami akan terus berinovasi dan memastikan setiap pesanan dapat diproses dengan cermat dan tepat waktu. Kepercayaan yang diberikan kepada kami menjadi motivasi untuk terus memberikan yang terbaik.</p>
                </div>
                <div className="space-y-5 sm-space-y-0 sm:flex sm:items-center sm:justify-center sm:divide-x-2 sm:divide-white">
                    {
                        reports.map((report, index) => {
                            return(
                                <div key={index} className="sm:w-1/3 flex flex-col text-black space-y-2">
                                    <img src={report.img} alt="" className="w-1/6 mx-auto" />
                                    <div className="text-center text-white font-bold">
                                        <p className="text-4xl">{report.count}</p>
                                        <p className="text-2xl">{report.desc}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="w-full h-content p-5 lg:py-12 lg:px-24 bg-white space-y-12 ">
                <p className="text-center text-3xl font-semibold">Apa Kata Mereka?</p>
                <div className="space-y-5 md:grid md:grid-cols-3 md:gap-5 md:space-y-0">
                    {
                        reviews.map((review, index) => {
                            return(
                                <div key={index} className="space-y-5 text-center">
                                    <img src="/assets/quotation.png" alt="" className="w-1/6 mx-auto"/>
                                    <div className="flex flex-col justify-between space-y-5">
                                        <p className="italic">{review.review}</p>
                                        <p className="text-xl font-semibold">{review.name}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="w-full h-fit p-5 space-y-5 sm:py-12 sm:px-12 sm:space-x-5 bg-primary sm:justify-between sm:flex sm:items-center sm:space-y-0">
                <p className="text-center sm:text-left text-3xl font-bold leading-tight">JELAJAHI SEMUA PRODUK LAYANAN KAMI DAN DAPATKAN HARGA SPESIAL</p>
                <div className="w-full sm:w-fit flex justify-center">
                    <button className="w-fit py-3 px-5 text-nowrap bg-black text-white rounded">Coba Sekarang</button>
                </div>
            </div>

            <div className="w-full h-fit p-5 sm:px-48 sm:py-12 space-y-5 sm:space-y-12 bg-white">
                <h1 className="text-center text-3xl font-semibold">Galeri Kami</h1>
                <div className="grid grid-cols-3 gap-10">
                    {
                        photos.map((photo, index) => {
                            return(
                                <div key={index} className="">
                                    <img src={photo.img} alt="" className="w-full aspect-square overflow-hidden object-cover" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            
        </GuestLayout>
    );
}