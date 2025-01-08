
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({auth, ...props}){
    const order_status = [
        {status : 'Pesanan Baru', colour : 'border-gray-500'},
        {status : 'Pickup Pesanan', colour : 'border-red-500'},
        {status : 'Finalisasi Pesanan', colour : 'border-orange-500'},
        {status : 'Pembayaran', colour : 'border-yellow-500'},
        {status : 'Menunggu Antrean', colour : 'border-green-500'},
        {status : 'Pengerjaan', colour : 'border-blue-500'},
        {status : 'Selesai dikerjakan', colour : 'border-pink-500'},
        {status : 'Delivery', colour : 'border-purple-500'},
    ]
    
    const data = {
        labels: props.service_statistics.map((item) => item.product_name),
        datasets: [
            {
                label: 'Produk Layanan',
                data: props.service_statistics.map((item) => item.count),
                backgroundColor: '#3b82f6',
                barThickness: 30
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const reports = [
        {border : 'bg-danger-1',  img : '/assets/R1-white.png', desc: 'Pelanggan', count: props.customer_count},
        {border : 'bg-success-1', img : '/assets/R3-white.png', desc: 'Pesanan', count: props.order_count},
        {border : 'bg-submit-1',  img : '/assets/R2-white.png', desc: 'Pasang Sepatu', count: props.shoes_count},
    ]

    return(
        <AdminLayout user={auth.user} className="space-y-5">
                    <div className="flex items-center justify-between">
                        <span className="text-xl">Dashboard</span>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        {
                            reports.map((report, index) => {
                                return(
                                    <div key={index} className={'ps-10 p-5 flex items-center text-left shadow-md rounded-md overflow-hidden space-x-5 ' + report.border}>
                                        <div className={"p-3 w-20 rounded-full border-2 border-white"}>
                                            <img src={report.img} alt="" className="w-full"/>
                                        </div>
                                        <div className='flex flex-col text-white '>
                                            <span className="text-3xl font-medium">{report.count}</span>
                                            <span className="text-xl font-light">{report.desc}</span>
                                        </div>
                                    </div> 
                                );
                            })
                        }
                    </div>
                    <div className="space-y-2">
                        <span className="text-xl">Statistik Status Pesanan</span>
                        <div className="grid grid-cols-4 gap-5">
                            {
                                props.order_statistics.map((order_statistic, index) => {
                                    return(
                                        <div key={index} className={"p-5  ps-5 border-l-8 flex flex-col text-left bg-white shadow-md rounded-md " +order_status[index].colour}>
                                            <span className="text-3xl font-medium">{order_statistic.order_count}</span>
                                            <span className="text-lg font-light">{order_status[order_statistic.order_status - 1].status}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="bg-white border border-light-3 shadow-md rounded-md">
                        <h1 className="p-5 text-xl border-b border-light-3">Statistik Layanan</h1>
                        <Bar data={data} options={options} width={100} height={50} className="p-5"/>
                    </div>       
        </AdminLayout>
    )
}