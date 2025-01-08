import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import { router } from '@inertiajs/react'
import Swal from "sweetalert2";

export default function OrderDetail({auth, ...props}){
    const {data, setData, errors, post} = useForm({...props.order,
        shoes: props.order.shoes.map(shoe => {
            const services = []
            for(let i = 0; i < 3; i++ ){
                const service = shoe.service.find(item => item.product_category == i);
                if(service){
                    services.push({ ...service})
                } else {
                    services.push({
                        product_category: i,
                        id: null,
                        product_name: null,
                        discount: 0,
                        price: 0
                    });
                }
            } return {
                ...shoe, service: services
            }
        })        
    })
    
    //shoes
    const [newShoes, setNewShoes] = useState({
        shoes_brand: '',
        colour: '',
        service : [
            {product_category: 0, id: "", product_name: "", discount: 0, price: 0},
            {product_category: 1, id: "", product_name: "", discount: 0, price: 0},
            {product_category: 2, id: "", product_name: "", discount: 0, price: 0},
        ],
        note: '',
        price: 0
    })

    const [shoesModal, setShoesModal] = useState(false)

    const shoesModalHandler = (e, index) => {
        e.preventDefault()
        if (shoesModal) {
            setShoesModal(false)
        } else {
            setShoesModal(true)
        }
        if (index == null){
            setNewShoes({
                shoes_brand: '',
                colour: '',
                service: [
                    {product_category: 0, id: "", product_name: "", discount: 0, price: 0},
                    {product_category: 1, id: "", product_name: "", discount: 0, price: 0},
                    {product_category: 2, id: "", product_name: "", discount: 0, price: 0},
                ],
                note: '',
                price: 0
            })
        } else {
            setNewShoes({
                id : data.shoes[index].id,
                shoes_brand: data.shoes[index].shoes_brand,
                colour: data.shoes[index].colour,
                service: data.shoes[index].service,
                note: data.shoes[index].note,
                price: data.shoes[index].price
            })
        }
    }

    const cleaning_products = props.products.filter(product => product.product_category == 0);
    
    const reglue_products = props.products.filter(product => product.product_category == 1);
    
    const repaint_products = props.products.filter(product => product.product_category == 2);
    
    const serviceHandler = (e, index, product) => {
        e.preventDefault()
        if(product != 0){
            let newProduct = JSON.parse(product)
            setNewShoes(prev => ({ ...prev, service : prev.service.map((service) => service.product_category == newProduct.product_category ? {...newProduct} : service)}))
        } else {
            setNewShoes(prev => ({ ...prev, service : prev.service.map((service) => service.product_category == index ? {
                    id: "", 
                    product_name: "", 
                    product_category: index, 
                    discount: 0, 
                    price: 0
            } : service)}))
        }
    }
    
    const addShoes = (e) => {
        e.preventDefault()
        if(newShoes.shoes_brand && newShoes.colour &&  (newShoes.service[0].product_name || newShoes.service[1].product_name || newShoes.service[2].product_name) && newShoes.note){
            if (newShoes.id == null) {
                setData('shoes', [...data.shoes,
                    {
                        id: data.shoes.length,
                        shoes_brand: newShoes.shoes_brand,
                        colour: newShoes.colour,
                        service: newShoes.service,
                        note: newShoes.note,
                        price: newShoes.price
                    }
                ])
            } else {
                setData('shoes', data.shoes.map(shoe => shoe.id === newShoes.id ? {...shoe, 
                    shoes_brand: newShoes.shoes_brand,
                    colour: newShoes.colour,
                    service: newShoes.service,
                    note: newShoes.note,
                    price: newShoes.price } : shoe)
                )
            }
            shoesModalHandler(e)
        } else {
            Swal.fire({
                text: 'Formulir tidak boleh ada yang kosong.',
                icon: "error"
            });
        }
    }

    const deleteShoes = (e, index) => {
        e.preventDefault()
        const updateShoes = [...data.shoes]
        updateShoes.splice(index, 1)
        setData('shoes', updateShoes)
    }
    
    React.useEffect(() => setNewShoes(prev => ({ ...prev, price: newShoes.service[0].price + newShoes.service[1].price + newShoes.service[2].price})), [newShoes.service])

    React.useEffect(() => { 
        const total = data.shoes.reduce((sum, shoe) => sum + (shoe.service[0].product_name == 'Deep Cleaning + Sterilisasi Ozon UV' ? 1 : 0) ,0)

        setData(prev => ({
            ...prev,
            sub_price: data.shoes.reduce((price, item) => price + item.price, 0),
            discount: total > 2 ? (total > 4 ? (total > 7 ? (total > 9 ? 150000 : 110000) : 50000) : 35000) : 0
        }));
    }, [data.shoes]);

    React.useEffect(() => { setData('price', data.sub_price - data.discount) }, [data.sub_price, data.discount]);

    const updateData = (e) => {
        e.preventDefault();
        post('/pesanan/'+data.id)
    };

    const updateStatus = (e, id) => {
        e.preventDefault()
        Swal.fire({
            title: "Finalisasi sekarang ?",
            text: "Pesanan yang telah difinalisasi tidak dapat diubah kembali.",
            icon: "question",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit('/pesanan/status', { method : 'post', data : {id : id, status : 4} })
            }
        });
    }

    const deleteOrder = (e) => {
        e.preventDefault()
        Swal.fire({
            text: "Anda yakin membatalkan ID Pesanan " + data.receipt + " ?",
            icon: "warning",
            reverseButtons: true,
            showCancelButton: true,
            cancelButtonColor: "#EF4444",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#1D4ED8",
            confirmButtonText: "Iya",
        }).then((result) => {
            if (result.isConfirmed) {
                router.visit('/pesanan/'+ data.id, { method : 'delete' })
            }
        });
    }

    const payment_status = [
        {nama : 'Belum Lunas'},
        {nama : 'Lunas'},
    ]

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
        {name : 'Pesanan dibatalkan', style: 'bg-red-500 bg-opacity-50 text-danger-1'}, 
        {name : 'Pesanan belum diproses', style: 'bg-light-3 bg-opacity-25 text-light-3 '}, 
        {name : 'Menunggu antrean', style: 'bg-success-1 bg-opacity-25 text-success-1'}, 
        {name : 'Sedang dikerjakan', style: 'bg-warning-1 bg-opacity-25 text-warning-1'},
        {name : 'Selesai dikerjakan', style: 'bg-primary bg-opacity-25 text-primary'},
    ]

    const showImage = (e,type, image) => {
        e.preventDefault()
        Swal.fire({
            title:'ID Pesanan ' + data.receipt, 
            text: type == 0 ? 'Foto Sebelum' : 'Foto Sesudah', 
            imageUrl: '/storage/' + image,
            imageWidth: 400,
            imageHeight: 200,
          });
    }

    const [cashModal, setCashModal] = useState(false)

    const paymentButton = (statusPesanan) => {

        const [paymentType, setPaymentType] = useState(0)

        if(statusPesanan.status == 4 && data.order_status == 4) {
            return(
                <div className='w-full'>
                    <select name="payment_type" id="" value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className='w-full mt-1.5 p-1 rounded'>
                        <option value="0">Tunai</option>
                        <option value="1">Non Tunai</option>
                    </select>
                    <button onClick={paymentType == 0 ? () => setCashModal(true) : (e) =>   qris(e)} className="w-full mt-1.5 btn-submit py-1 rounded">Bayar sekarang!</button>
                </div>
            )
        }
    }

    const [cashPayment, setCashPayment] = useState({
        pay : '',
        change : 0
    })

    React.useEffect(() => { setCashPayment(prev => ({...prev, change: cashPayment.pay - data.price}))}, [cashPayment.pay])

    const cash = (e) => {
        e.preventDefault()
        router.visit('/pembayaran', { 
            method : 'POST',
            data : {
                order_id: data.id,
                payment_method: 'CASH'
            }
        })
    }

    const qris = async (e) => {
        e.preventDefault
        const response = await fetch('/api/pembayaran/'+data.id);
        if (!response.ok) {
            alert('Network response was not ok.')
        } else {
            const token = await response.json()
            window.snap.pay(token, {
                onSuccess: function(result) {
                    Swal.fire({
                        icon: "success",
                        title: "Pembayaran Berhasil",
                        preConfirm: () => {
                            router.visit('/pesanan/'+ data.id, { method : 'get' })
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

    return(
        <AdminLayout className='flex flex-row space-x-5 ' user={auth.user} >
            <div className="w-3/4 space-y-5">
                <div className="w-full h-fit bg-white shadow-md overflow-hidden rounded-md">
                    <h1 className="p-5 text-lg border-b-2 border-slate-300">Data Pelanggan</h1>
                    <div className="w-full p-5 space-y-5">
                        <form encType='multipart/form-data' className="grid grid-cols-2 gap-x-5 gap-y-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Nama :</label>
                                <input type="text" name='customer_name' value={data.customer_name} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-1 text-input" />
                                <InputError message={errors.customer_name} className="text-xs text-danger-1" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Nomor Whatsapp :</label>
                                <div className="px-3 py-1 flex items-center space-x-1 rounded bg-white border border-gray-400">
                                    <span>+62</span>
                                    <input type="text" name='whatsapp_number' value={data.whatsapp_number} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" placeholder="..." className='m-0 w-full px-0 p-0 border-none ring-none bg-transparent focus:ring-0' />
                                </div>
                                <InputError message={errors.whatsapp_number} className="text-xs text-danger-1" />
                            </div>
                            <div className="flex flex-col gap-1 col-span-2">
                                <label htmlFor="" className="text-sm">Alamat :</label>
                                <input type="text" name='address' value={data.address} onChange={(e) => setData(e.target.name, e.target.value)} autoComplete="off" className="py-1 text-input" />
                                <InputError message={errors.address} className="text-xs text-danger-1" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Tipe Pesanan :</label>
                                <select name='order_type' value={data.order_type} onChange={(e) => setData(e.target.name, e.target.value)} className="py-1 text-input" disabled>
                                    <option value="0">Non Pickup</option>
                                    <option value="1">Pickup</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Status Pembayaran</label>
                                <input type="text" name='payment_type' value={payment_status[data.payment_status].nama} autoComplete="off" className="py-1 text-input" disabled />
                                <InputError message={errors.payment_type} className="text-xs text-danger-1" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Foto Sebelum :</label>
                                <button onClick={(e) => showImage(e, 0, data.before_photo)} className='py-1 btn-submit'>Lihat Foto</button>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-sm">Foto Sesudah :</label>
                                {
                                    props.order.after_photo == null ? 
                                        <input type="file" name='after_photo' onChange={(e) => setData(e.target.name, e.target.files[0])} className='text-input overflow-hidden' />
                                        :
                                        <button type='button' onClick={(e) => showImage(e, 1, props.order.after_photo)} className='py-1 btn-submit' disabled={data.order_status < 7 ? true : false}>Lihat Foto</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-full h-fit bg-white shadow-md rounded-md overflow-hidden">
                    <div className="p-5 flex items-center justify-between border-b border-light-3">
                        <h1 className="text-lg">Data Pesanan</h1>
                        {
                            data.order_status > 0 && data.order_status < 4 ? <button onClick={(e) => shoesModalHandler(e)} className="py-1 px-5 btn-submit">Tambah</button> : <></>
                        }
                    </div>
                    <div className="p-5 space-y-5">
                        <div>
                            <div className='w-full border border-light-3 rounded-md overflow-x-auto'>
                                <table className="w-full">
                                    <thead>
                                        <tr className="table-header">
                                            <th className="py-2.5 px-1 w-1/6">Merk</th>
                                            <th className="py-2.5 px-1 w-1/6">Warna</th>
                                            <th className="py-2.5 px-1 w-1/6">Layanan</th>
                                            <th className="py-2.5 px-1 w-1/6">Catatan</th>
                                            <th className="py-2.5 px-1 w-1/6">Harga</th>
                                            <th className="py-2.5 px-1 w-1/6">{data.order_status > 0 && data.order_status < 4 ? 'Aktivitas' : 'Status'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.shoes.length == 0 ?
                                            <tr className="border-b border-gray-400 bg-slate-100">
                                                    <td colSpan={6} className="py-2.5 px-1 text-center text-sm italic">Belum ada shoe yang ditambahkan.</td>
                                                </tr> 
                                            : data.shoes.map((shoe, index) => {
                                                return (
                                                    <tr key={index} className={'border-t border-light-3 ' + ( index  % 2 == 0 ? 'bg-light-1 ' : 'bg-white ')}>
                                                            <td className="px-2 py-2.5 text-center">{shoe.shoes_brand}</td>
                                                            <td className="px-2 py-2.5 text-center">{shoe.colour}</td>
                                                            <td className="px-2 py-2.5">
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
                                                                { data.order_status > 0 && data.order_status < 4 ?
                                                                    <div className="flex items-center justify-center space-x-2.5">
                                                                        <button onClick={(e) => shoesModalHandler(e, index)} className="p-1 btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentcolour" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg></button>
                                                                        <button onClick={(e) => deleteShoes(e, index)} className="p-1 btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="white" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path></svg></button>
                                                                    </div>
                                                                :   <span className={'px-3 py-1 text-sm rounded shadow font-medium text-nowrap ' + shoes_status[shoe.status].style}>{shoes_status[shoe.status].name}</span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <InputError message={errors.shoe} className="text-xs text-danger-1" />
                        </div>
                        <div className="flex gap-5">
                            <div className="w-2/3 flex flex-col text-sm p-5 rounded border border-light-3">
                                <span className="font-semibold">Catatan :</span>
                                <span className="italic">Pastikan nomor whatsapp diisi dengan benar agar dapat kami hubungi.</span>
                            </div>
                            <div className="w-1/3 ms-auto divide-y flex flex-col divide-light-3">
                                <div className="p-2 flex justify-between">
                                    <span>Sub Total</span>
                                    <span>Rp. {data.sub_price}</span>
                                </div>
                                <div className="p-2 flex justify-between">
                                    <span>Diskon</span>
                                    <span>Rp. {data.discount}</span>
                                </div>
                                <div className="p-2 flex justify-between">
                                    <span className="font-semibold">Total Harga</span>
                                    <span className="font-semibold">Rp. {data.price}</span>
                                </div>
                                { data.order_status > 0 && data.order_status < 9 ? <button onClick={(e) => updateData(e)} className="w-fit ms-auto px-5 py-1 btn-submit">Simpan Perubahan</button> : <></> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/4">
                <div className="w-full bg-white rounded shadow-md overflow-hidden">
                    <h1 className="py-2 px-5 bg-tertiary text-white font-bold">Progres ID Pesanan {data.receipt}</h1>
                    <div className="divide-y-2 divide-slate-300">
                        {
                            data.status.map((statusPesanan, index) => {
                                return(
                                    <div key={index} className={'p-3 flex flex-col space-y-1 ' + (statusPesanan.status == 9 ? 'bg-success-1 text-white ' :  (statusPesanan.status == 0 ? 'bg-danger-1 text-white ' :'bg-white '))}>
                                        <span className="font-semibold">{statusPesanan.status == 3 ? order_status[statusPesanan.status].name[data.order_type] : order_status[statusPesanan.status].name}</span>
                                        <span className="text-sm font-light">{props.order.created_at}</span>
                                    {statusPesanan.status == 3 && data.order_status == 3 ? <button onClick={(e) => updateStatus(e, data.id)} className="mt-1.5 py-1 btn-submit">Finalisasi Pesanan</button>: <></> }
                                    {paymentButton(statusPesanan)}
                                    {statusPesanan.status == data.order_status ^ (statusPesanan.status == 9 || statusPesanan.status == 0) ? <button onClick={(e) => deleteOrder(e)} className="mt-1.5 py-1 btn-danger">Batalkan Pesanan</button>: <></> }
                                </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <Modal show={shoesModal} onClose={() => setShoesModal(false)} maxWidth='xl'  >
                <form className='p-7 space-y-7 flex flex-col'>
                    <h1 className="mx-auto text-3xl font-semibold">Tambah Sepatu</h1>
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">Merk</label>
                            <input type="text" name="shoes_brand" value={newShoes.shoes_brand} onChange={(e) => setNewShoes({ ...newShoes, [e.target.name]: e.target.value })} className="py-1 text-input"/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">Warna</label>
                            <input type="text" name="colour" value={newShoes.colour} onChange={(e) => setNewShoes({ ...newShoes, [e.target.name]: e.target.value })} className="py-1 text-input"/>
                        </div>
                        <div className="border border-light-3 rounded-md overflow-x-auto">
                            <table className="">
                                <thead>
                                    <tr className="table-header">
                                        <th className="w-content px-3 py-1 text-nowrap">Kategori Layanan</th>
                                        <th className="w-full px-3 py-1 text-nowrap">Produk Layanan</th>
                                        <th className="w-full px-3 py-1 text-nowrap">Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-light-1">
                                        <td className="px-3 py-1">Cleaning</td>
                                        <td className="px-3 py-1">
                                            <select name="cleaning" id="" value={newShoes.service[0].product_name}  onChange={(e) => serviceHandler(e, 0, e.target.selectedOptions[0].dataset.product)} className="w-full py-1 text-sm text-nowrap">
                                                <option value="" data-product="0" className="px-1 text-nowrap">None</option>
                                                {
                                                    cleaning_products.map((product, index) => {
                                                    return(
                                                        <option key={index} value={product.product_name} data-product={JSON.stringify(product)} className="w-max px-1 text-nowrap">
                                                            {product.product_name}
                                                        </option>
                                                    )}
                                                )}
                                            </select>
                                        </td>
                                        <td className="px-3 py-1 text-nowrap">Rp. {newShoes.service[0].price}</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="px-3 py-1">Reglue</td>
                                        <td className="px-3 py-1">
                                            <select name="reglue" id="" value={newShoes.service[1].product_name}  onChange={(e) => serviceHandler(e, 1, e.target.selectedOptions[0].dataset.product)} className="w-full py-1 text-sm text-nowrap">
                                                <option value="" data-product="0" className="px-1 text-nowrap">None</option>
                                                {
                                                    reglue_products.map((product, index) => {
                                                        return(
                                                        <option key={index} value={product.product_name} data-product={JSON.stringify(product)} className="w-max px-1 text-nowrap">
                                                            {product.product_name}
                                                        </option>
                                                    )}
                                                )}
                                            </select>
                                        </td>
                                        <td className="px-3 py-1 text-nowrap">Rp. {newShoes.service[1].price}</td>
                                    </tr>
                                    <tr className="bg-light-1">
                                        <td className="px-3 py-1">Repaint</td>
                                        <td className="px-3 py-1">
                                            <select name="repaint" id="" value={newShoes.service[2].product_name}  onChange={(e) => serviceHandler(e, 2, e.target.selectedOptions[0].dataset.product)} className="w-full py-1 text-sm text-nowrap">
                                                <option value=""  data-product="0" className="px-1 text-nowrap">None</option>
                                                {
                                                    repaint_products.map((product, index) => {
                                                        return(
                                                            <option key={index} value={product.product_name} data-product={JSON.stringify(product)} className="w-max px-1 text-nowrap">
                                                            {product.product_name}
                                                        </option>
                                                    )}
                                                )}
                                            </select>
                                        </td>
                                        <td className="px-3 py-1 text-nowrap">Rp. {newShoes.service[2].price}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="px-2 py-2 flex items-center justify-between bg-tertiary bg-opacity-25 border border-blue-1 font-medium" >
                            <span>Harga</span>
                            <span>Rp. {newShoes.price}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-sm">Catatan</label>
                            <input type="text" name="note" value={newShoes.note} onChange={(e) => setNewShoes({ ...newShoes, [e.target.name]: e.target.value })} className="py-1 text-input"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                        <button onClick={(e) => shoesModalHandler(e)} className="px-5 py-1.5 btn-danger">Batal</button>
                        <button onClick={(e) => addShoes(e)} className="px-5 py-1.5 btn-submit">Simpan</button>
                    </div>
                </form>
            </Modal>
            <Modal show={cashModal} onClose={() => setCashModal(false)} maxWidth='xl'  >
                <form className='p-7 space-y-7 flex flex-col'>
                    <h1 className="mx-auto text-3xl  font-semibold">Pembayaran Tunai ID Pesanan {data.receipt}</h1>
                    <div className="flex flex-col space-y-3">
                        <div className="divide-y flex flex-col divide-light-3">
                            <div className="p-2 flex justify-between">
                                <span>Sub Total price</span>
                                <span>Rp. {data.sub_price}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span>Diskon</span>
                                <span>Rp. {data.discount}</span>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span className="font-semibold">Total harga</span>
                                <span className="font-semibold">Rp. {data.price}</span>
                            </div>
                            <div className="p-2 flex items-center justify-between">
                                <label htmlFor="" className="">Nominal yang dibayarkan</label>
                                <input type="text" autoComplete="off" name="pay" value={cashPayment.pay} onChange={(e) => setCashPayment({ ...cashPayment, [e.target.name]: e.target.value })} className="py-1 text-input"/>
                            </div>
                            <div className="p-2 flex justify-between">
                                <span>Nominal Kembali</span>
                                <span>Rp. {cashPayment.change}</span>
                            </div>
                         </div>
                    </div>
                    <div className="flex items-center justify-end space-x-3">
                        <button onClick={() => setCashModal(false)} className="px-5 py-1.5 btn-danger">Batal</button>
                        <button onClick={(e) => cash(e)} disabled={cashPayment.change < 0  ? true : false} className="px-5 py-1.5 btn-submit">Bayar</button>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}