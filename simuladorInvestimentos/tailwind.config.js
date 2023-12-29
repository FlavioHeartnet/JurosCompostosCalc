/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
			colors: {
				'blue-modernize': '#5D87FF',
				'blue-modernize-dark': '#4570EA',
				'soft-blue': '#FFF2EC',
				'light-grey': '#E5EAEF'
			},
			fontFamily: {
				jakarta: 'Plus Jakarta Sans, sans-serif'
			}
		},
  },
  plugins: [],
}

