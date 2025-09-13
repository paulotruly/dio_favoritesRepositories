/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
      background: '#010409',
      container: '#0D1117',
      card: '#212830',
      cardborder: '#3D444D',
      deletered: '#FA5E52',
      bluebutton: '#1F6FEB',
      },
    },
  },
  plugins: [],
}

