/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwind-scrollbar'),
        require('flowbite/plugin'),
        require("daisyui")
    ],
    daisyui: {
        themes: true,
        styled: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
    },
}
