import { Link } from "@inertiajs/react";
import React from "react";

export default function NavTop({ active = false, className = '', children, ...props}){
    return(
        <Link {...props} className={'p-5 h-full content-center ' + (active ? 'bg-primary text-black ': 'hover:bg-primary hover:text-black hover:scale-[1.03] ease-in-out duration-100 ')}>
            {children}
        </Link>
    );
}