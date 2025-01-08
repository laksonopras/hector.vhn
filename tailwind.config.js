import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                inter : ["inter", "sans-serif"]
            },
            colors: {
                primary : '#FDF101', 

                btn : {
                    1: '#FDF101',
                    2: '#4b5563',
                },

                secondary : '#3D4B64',
                tertiary : '#2563eb',

                light : {
                    1 : '#F1F5F9',  //background
                    2 : '#CBD5E1',  
                    3 : '#9CA3AF',  //border
                    4 : '#334155',  //text
                },
                blue : {
                    1 : '#DBEAFE',
                    2 : '#3B82F6',
                    3 : '#1E3A8A',
                },

                submit : {
                    1: '#2563eb',
                    2: '#4338ca',
                },
                success : {
                    1 : '#16a34a',
                    2 : '#15803d',
                },
                warning : {
                    1 : '#facc15',
                    2 : '#ca8a04',
                },
                danger : {
                    1 : '#dc2626',
                    2 : '#b91c1c',
                },
            }
        },
    },
    plugins: [forms],
};
