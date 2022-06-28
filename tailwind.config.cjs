/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				Amatic: ['Amatic SC', 'cursive'],
				Josefin: ['Josefin Sans', 'sans-serif']
			}
		}
	},
	plugins: []
};
