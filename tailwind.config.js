module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
			fontFamily: {
				'space': ['Space\\ Mono, Azeret\\ Mono, ui-monospace'],
			}
		}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
