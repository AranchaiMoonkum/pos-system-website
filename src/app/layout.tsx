import type { Metadata } from "next"
import { Geist, Geist_Mono, Kanit } from "next/font/google"
import "./globals.css"

//components
import Navbar from "./components/Navbar"

const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ["200", "300", "400", "500", "600"], 
})

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// })

export const metadata: Metadata = {
    title: "POS-system",
    description: "Generated by 3Men",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="th">
            <body
                className={`${kanit.className} antialiased bg-background text-night flex `}
            >
                <Navbar/>
                <div className="mx-5 mt-5 w-screen flex justify-center">{children}</div>
            </body>
        </html>
    )
}
