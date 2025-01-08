import React, { useState } from "react";
import { router } from "@inertiajs/react";
import Swal from "sweetalert2";
import Header from "@/Partials/Header";
import { usePage } from "@inertiajs/react";

export default function OrderDetail({...props}){

    const order_type = ['Non-Pickup Order', 'Pickup Order'];

    const payment_status = ['Belum Lunas', 'Lunas']

    const order_status = [
        {name : 'Pesanan dibatalkan'}, 
        {name : 'Pesanan menunggu diambil oleh kurir'}, 
        {name : 'Pesanan sedang diambil oleh kurir'}, 
        {name : ['Pesanan telah dibuat oleh admin', 'Pesanan telah diambil oleh kurir']},
        {name : 'Pesanan menunggu proses pembayaran'},
        {name : 'Pesanan telah dibayar'},
        {name : 'Pesanan sedang dikerjakan'},
        {name : 'Pesanan selesai dikerjakan'},
        {name : 'Pesanan sedang dikirim oleh kurir'}, 
        {name : 'Pesanan selesai'},
    ]

    const shoes_status = [
        {name : 'Pesanan dibatalkan', style: 'bg-danger-500 bg-opacity-50 text-danger-1'}, 
        {name : 'Pesanan belum diproses', style: 'bg-light-3 bg-opacity-25 text-light-3 '},
        {name : 'Menunggu antrean', style: 'bg-success-1, bg-opacity-25 text-success-1'}, 
        {name : 'Sedang dikerjakan', style: 'bg-warning-1 bg-opacity-25 text-warning-1'},
        {name : 'Selesai dikerjakan', style: 'bg-primary bg-opacity-25 text-primary'},
    ]

    const [id, setId] = useState('')

    const check = (e) => {
        e.preventDefault
        if(id != '') {
            router.post('cek-pesanan', {receipt: id})
        } else {
            Swal.fire({
                icon: "error",
                title: "Pencarian gagal!",
                text: "Nomor resi wajib diisi.",
            });
        }
    };

    const showImage = (e, type, image) => {
        e.preventDefault()
        Swal.fire({
            title:'ID Pesanan ' + props.order.receipt, 
            text: type == 0 ? 'Foto Sebelum' : 'Foto Sesudah', 
            imageUrl: '/storage/' + image,
            imageWidth: 400,
            imageHeight: 200,
          });
    }

    const getToken = async (e) => {
        e.preventDefault
        const response = await fetch('/api/pembayaran/'+props.order.id);
        if (!response.ok) {
            alert('Pembayaran non tunai sedang tidak bisa dilakukan.')
        } else {
            const token = await response.json()
            window.snap.pay(token, {
                onSuccess: function(result) {
                    Swal.fire({
                        icon: "success",
                        title: "Pembayaran Berhasil",
                        preConfirm: () => {
                            router.post('cek-pesanan', {receipt: props.order.receipt})
                        }
                    });
                },  
                onPending: function(result) {
                    Swal.fire({
                        icon: "warning",
                        title: "Pembayaran belum diselesaikan.",
                    });
                },  
                onError: function(result) {
                    Swal.fire({
                        icon: "error",
                        title: "Pembayaran Gagal!",
                    });
                }
            });
        }

    };

    const { flash } = usePage().props

    React.useEffect(() => {
        if(flash?.success){
            Swal.fire({
                title: "Pesanan berhasil dibuat!",
                text: "Kami telah mengirim detail pesanan ke nomor +62" + props.order.whatsapp_number + ". Jika Anda tidak menerima pesan tersebut, mohon lakukan pemesanan ulang dengan memasukkan nomor whatsapp Anda dengan benar. Terima kasih.",
                icon: "success"
            });
        } 
    }, [flash]);

    return(
        <div className="w-full min-h-screen bg-[url('/assets/sepatu-4.jpg')] bg-cover bg-fixed">
            <Header/>
            <div className="w-full min-h-screen p-5 md:px-24 md:py-10 backdrop-blur-sm bg-black/25 ">
                <div className='mt-16 flex md:flex-row flex-col space-x-0 md:space-x-5 space-y-5 md:space-y-0'>
                    <div className="w-full h-max space-y-5">
                        <div className="w-full flex justify-center bg-white rounded-md overflow-hidden">
                            <input type="text" name="id" value={id} onChange={(e) => setId(e.target.value)} id="" placeholder="Masukkan kode pesanan" className="w-full h-full ps-5 py-5 bg-transparent border-none focus:ring-0" required/>
                            <button onClick={(e) => check(e)} className="w-content px-5 flex  items-center btn-submit font-medium rounded-none text-nowrap">Lihat Pesanan</button>
                        </div>
                        <div className="w-full h-fit bg-white shadow-md overflow-hidden rounded-md">
                            <div className="p-5 flex items-center justify-between border-b border-light-3">
                                <h1 className="text-lg font-semibold">ID {props.order.receipt}</h1>
                            </div>
                            <div className='p-5 space-y-5 '>
                                <div className='w-fit grid grid-cols-2 gap-2'>
                                    <div className='py-1 flex items-center justify-between'>
                                        <span>Nama Pelanggan</span>
                                        <span>:</span>
                                    </div>
                                    <span className='py-1'>{props.order.customer_name}</span>
                                    <div className='py-1 flex items-center justify-between'>
                                        <span>Tipe pesanan</span>
                                        <span>:</span>
                                    </div> 
                                    <span className='py-1'>{order_type[props.order.order_type]}</span>
                                    <div className='py-1 flex items-center justify-between'>
                                        <span>Tipe pesanan</span>
                                        <span>:</span>
                                    </div>
                                    <span className='py-1'>{payment_status[props.order.payment_status]}</span>
                                    <div className='py-1 flex items-center justify-between'>
                                        <span>Foto Sebelum Pengerjaan</span>
                                        <span>:</span>
                                    </div>
                                    <button onClick={(e) => showImage(e, 0, props.order.before_photo)} className='w-fit px-5 py-1 btn-success'>Lihat Foto</button>
                                    <div className='py-1 flex items-center justify-between'>
                                        <span>Foto Sesudah Pengerjaan</span>
                                        <span>:</span>
                                    </div>
                                    {props.order.after_photo == null ? <span className='py-1'>Foto belum tersedia</span> : <button onClick={(e) => showImage(e, 1, props.order.after_photo)} className='w-fit btn-success px-5 py-1'>Lihat Foto</button>}
                                </div>
                                <div>
                                    <div className="w-full rounded-md border border-light-3 overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="bg-primary">
                                                    <th className="py-2.5 px-1 w-1/6">Merk</th>
                                                    <th className="py-2.5 px-1 w-1/6">Warna</th>
                                                    <th className="py-2.5 px-1 w-1/6">Layanan</th>
                                                    <th className="py-2.5 px-1 w-1/6">Catatan</th>
                                                    <th className="py-2.5 px-1 w-1/6">Harga</th>
                                                    <th className="py-2.5 px-1 w-1/6">{props.order.order_status > 0 && props.order.order_status < 4 ? 'Aktivitas' : 'Status'}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    props.order.shoes.length == 0 ?
                                                    <tr className="border-b border-gray-400 bg-slate-100">
                                                            <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Belum ada shoe yang ditambahkan.</td>
                                                        </tr> 
                                                    : props.order.shoes.map((shoe, index) => {
                                                        return (
                                                            <tr key={index} className={'border-t border-light-3 ' + ( index  % 2 == 0 ? 'bg-white ' : 'bg-white ')}>
                                                                    <td className="px-2 py-2.5 text-center">{shoe.shoes_brand}</td>
                                                                    <td className="px-2 py-2.5 text-center">{shoe.colour}</td>
                                                                    <td className="px-2 py-2.5 text-center">
                                                                        <div className="flex gap-1 flex-wrap items-center justify-center">
                                                                            {
                                                                                shoe.service.map((service, index) => {
                                                                                    return (
                                                                                        <div key={index} className="w-fit px-1 flex-none rounded-md flex items-center text-nowrap bg-yellow-200">
                                                                                            <span className="text-sm fle">{service.product_name}</span>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-2 py-2.5 text-center">{shoe.note}</td>
                                                                    <td className="px-2 py-2.5 text-center text-nowrap">Rp. {shoe.price}</td>
                                                                    <td className="px-2 py-2.5">
                                                                        <span className={'px-3 py-1 text-sm rounded shadow font-medium text-nowrap ' + shoes_status[shoe.status].style}>{shoes_status[shoe.status].name}</span>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="md:flex md:gap-5">
                                    <div className="md:w-2/3 flex flex-col text-sm p-5 rounded border border-light-3">
                                        <span className="font-semibold">Catatan :</span>
                                        <span className="italic">Jika Anda tidak mendapatkan pesan whatsapp berisi pesanan ini, mohon melakukan konfirmasi ke Admin atau membuat pesanan baru.</span>
                                    </div>
                                    <div className="md:w-1/3 ms-auto divide-y flex flex-col divide-light-3">
                                        <div className="p-2 flex justify-between">
                                            <span>Sub Total price</span>
                                            <span>Rp. {props.order.sub_price}</span>
                                        </div>
                                        <div className="p-2 flex justify-between">
                                            <span>Diskon</span>
                                            <span>Rp. {props.order.discount}</span>
                                        </div>
                                        <div className="p-2 flex justify-between">
                                            <span className="font-semibold">Total harga</span>
                                            <span className="font-semibold">Rp. {props.order.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className="w-full bg-white rounded-md shadow-md overflow-hidden">
                            <h1 className="py-2 px-5 bg-primary font-bold">Progres Pesanan</h1>
                                <div className="divide-y-2 divide-slate-300">
                                    {
                                        props.order.status.map((statusPesanan, index) => {
                                            return(
                                                <div key={index} className={'p-3 flex flex-col space-y-1 ' + (statusPesanan.status == 9 ? 'bg-success-1 text-white ' :  (statusPesanan.status == 0 ? 'bg-danger-1 text-white ' :'bg-white '))}>
                                                    <span className="font-semibold">{statusPesanan.status == 3 ? order_status[statusPesanan.status].name[props.order.order_type] : order_status[statusPesanan.status].name}</span>
                                                    <span className="text-sm font-light">{props.order.created_at}</span>    
                                                    {statusPesanan.status == 4 && props.order.order_status == 4 ? <button onClick={(e) => getToken(e)} className="mt-1.5 btn-submit py-1 rounded">Bayar sekarang!</button>: <></> }
                                                </div>
                                            )
                                        })
                                    }
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}