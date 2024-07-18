import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ['var(--font-kanit)'],
      },
      colors:{
        kmsorange:'#FF6600',
        kmsblack:'#2a2d34',
        kmspurple:"#8159FF",
        kmsblue:"#3E56CA",
        kmsppad:"#4F1AFF",
        kmsdptitle:"#313131",
        kmsdpsubtitle:"#374151",
        kmsstone:'#555b5d',
      },
      keyframes: {
        toTopFromBottom: {
          '49%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '51%': { opacity: '1' },
        },
        orangePulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 102, 0, 1)' } ,
          '70%': { transform: 'scale(1)' , boxShadow: '0 0 0 10px rgba(255, 102, 0, 0)'},
          '100%': { transform: 'scale(1)' },
        },
        purplePulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(129, 89, 255, 1)' } ,
          '70%': { transform: 'scale(1)' , boxShadow: '0 0 0 10px rgba(129, 89, 255, 0)'},
          '100%': { transform: 'scale(1)' },
        },
        rollbtn: {
          '0%': { transform: 'rotate(0deg)' } ,
          '100%': { transform: 'rotate(-90deg)'},
        }
      },
      animation: {
        orangePulse: 'orangePulse 500ms infinite',
        purplePulse: 'purplePulse 500ms infinite',
        rollbtn: 'rollbtn 500ms ease',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // }
}
export default config
