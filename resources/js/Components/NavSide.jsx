import { Link } from '@inertiajs/react';

export default function NavSide({ active = false, className = '', children, ...props }) {
    return (
        <Link {...props} className={'h-content text-left text-nowrap hover:bg-black hover:bg-opacity-20 hover:text-white ' + (active ? 'bg-black bg-opacity-40 text-white ' : 'bg-transparent text-light-1 '  ) + className }>
           {children} 
        </Link>
    );
}
