import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                "megb-blue-login": "#008ECC",
                "megb-blue-plus": "#2E3247",
                "megb-blue-primary": "#0C356A",
                "megb-blue-secundary": "#0F52BA",
                "megb-blue-terciary": "#0E4D92",
                "megb-yellow-primary": "#FF5003",
                "megb-yellow-secundary": "#FFAE08",
                "megb-red-primary": "#CA0156",
                "automa-green-primary": "#749324",
                "automa-green-secundary": "#67821d",
                "automa-green-terciary": "#a0bc53",
            },
        },
    },

    plugins: [forms],
};
