/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			height: {
				100: "26rem",
				192: "48rem",
			},
		},
	},
	plugins: [],
};
