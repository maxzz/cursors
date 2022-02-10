module.exports = {
    content: ['./index.html', './src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms')
    ],
};
