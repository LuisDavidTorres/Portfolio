/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				"green-custom": "#0bff84",
				"gray-custom": "#1b1a1b",
				"gray-ligh": "#9f9f9f"
			}
		},
	},
	plugins: [],
}
