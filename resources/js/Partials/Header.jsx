import React from "react";
import { useState } from "react";
import NavTop from "@/Components/NavTop";

export default function Header({}){

    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 1) {
            setColor(true)
        } else {
            setColor(false)
        }
    }
    window.addEventListener('scroll', changeColor)
    
    const [open, setOpen] = useState(true)

    return(
        <div className={'w-full h-20 px-5 md:px-24 flex items-center justify-between z-40 drop-shadow-md duration-200 ' +  (route().current('buat-pesanan-guest') ? 'sticky top-0 bg-white ' : 'fixed ' + (route().current('buat-pesanan-guest') ? ' ' : (color ? 'bg-white md:text-black ' : 'md:text-white ')))}>
            <div className="flex items-center space-x-10 h-full">
                <img src={ (route().current('buat-pesanan-guest') ? '/assets/Logo-black.png': (color ? '/assets/Logo-black.png' : '/assets/Logo-white.png'))} alt="" className="h-16 py-4" />
                <div className={`h-fit md:h-full w-full absolute md:static z-[-1] md:z-auto md:flex md:flex-row flex-col md:items-center bg-white md:bg-transparent top-0 -translate-y-0 ${open ? 'hidden' : 'flex '} md:block`}>
                    <NavTop active={route().current('homepage')} href='/'>Beranda</NavTop>
                    <NavTop active={route().current('buat-pesanan-guest')} href={route('buat-pesanan-guest')}>Pesan Sekarang</NavTop>
                    <NavTop active={route().current('cek-pesanan')} href={route('cek-pesanan')}>Cek Pesanan</NavTop>
                </div>
            </div>

            <button onClick={() => setOpen(!open)} className="md:hidden text-xl focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke={color ? "black" : "white"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
        </div> 
    );
}