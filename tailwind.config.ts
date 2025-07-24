import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Romantic Love Colors
				heart: {
					pink: 'hsl(var(--heart-pink))',
					red: 'hsl(var(--heart-red))',
					glow: 'hsl(var(--heart-glow))'
				},
				// Universe Theme Colors
				'universe-ocean': 'hsl(var(--ocean))',
				'universe-stardust': 'hsl(var(--stardust))',
				'universe-forest': 'hsl(var(--forest))',
				'universe-cyber': 'hsl(var(--cyber))',
				'universe-sunset': 'hsl(var(--sunset))',
				'universe-crystal': 'hsl(var(--crystal))',
				'universe-nebula': 'hsl(var(--nebula))',
				'universe-garden': 'hsl(var(--garden))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontFamily: {
				'romantic': ['Great Vibes', 'cursive'],
				'script': ['Dancing Script', 'cursive'],
				'body': ['Poppins', 'sans-serif']
			},
			backgroundImage: {
				'gradient-love': 'var(--gradient-love)',
				'gradient-universe': 'var(--gradient-universe)',
				'gradient-stardust': 'var(--gradient-stardust)',
				'gradient-portal': 'var(--gradient-portal)'
			},
			boxShadow: {
				'romantic': 'var(--shadow-romantic)',
				'magical': 'var(--shadow-magical)',
				'heart-glow': 'var(--glow-heart)',
				'star-glow': 'var(--glow-star)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				// Romantic Animations
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'pulse-heart': {
					'0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
					'50%': { transform: 'scale(1.1)', opacity: '1' }
				},
				'twinkle': {
					'0%': { opacity: '0.3', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1.2)' }
				},
				'gentle-spin': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' }
				},
				'portal-spin': {
					'from': { transform: 'rotate(0deg) scale(1)' },
					'to': { transform: 'rotate(360deg) scale(1.05)' }
				},
				'petal-fall': {
					'0%': { 
						transform: 'translateY(-100vh) rotate(0deg)', 
						opacity: '1' 
					},
					'100%': { 
						transform: 'translateY(100vh) rotate(360deg)', 
						opacity: '0' 
					}
				},
				'typewriter': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Romantic Animations
				'float': 'float 3s ease-in-out infinite',
				'pulse-heart': 'pulse-heart 1.2s ease-in-out infinite',
				'twinkle': 'twinkle 2s ease-in-out infinite alternate',
				'gentle-spin': 'gentle-spin 20s linear infinite',
				'portal-spin': 'portal-spin 8s linear infinite',
				'petal-fall': 'petal-fall 8s linear infinite',
				'typewriter': 'typewriter 3s steps(40) 1s 1 normal both'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
