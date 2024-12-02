import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner';

// const satoshi = localFont({
// 	src: [
// 		{
// 			path: '../fonts/Satoshi-Light.woff2',
// 			weight: '300',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/Satoshi-Regular.woff2',
// 			weight: '400',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/Satoshi-Medium.woff2',
// 			weight: '500',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/Satoshi-Bold.woff2',
// 			weight: '700',
// 			style: 'normal',
// 		},
// 		{
// 			path: '../fonts/Satoshi-Black.woff2',
// 			weight: '900',
// 			style: 'normal',
// 		},
// 	],
// 	variable: '--font-satoshi',
// })

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
})

export const metadata: Metadata = {
	title: 'Semat.ai',
	description: '',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${openSans.variable} font-sans antialiased`}>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
