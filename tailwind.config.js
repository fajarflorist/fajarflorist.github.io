module.exports = {
  content: [
    './_drafts/**/*.html',
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_posts/*.md',
    './*.md',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        'color-1': 'rgb(var(--color-1) / <alpha-value>)',
        'color-2': 'rgb(var(--color-2) / <alpha-value>)',
        'color-3': 'rgb(var(--color-3) / <alpha-value>)',
        'color-4': 'rgb(var(--color-4) / <alpha-value>)',
      },
      fontFamily: {
        'theme-1': ['var(--font-1)'],
        'theme-2': ['var(--font-2)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
  darkMode: 'class',
}