import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BNI Divine Members Directory",
  description: "Patiala",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
     
    >
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
</head>

      <body>
                    <div className=" sticky top-0 z-50 bg-gray-800 text-white text-xs py-1 px-4 text-center font-medium tracking-wide">
        Made by{" "}
        <a 
          href="https://digitalpaaji.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors"
        >
          Digital Paaji
        </a>{" "}
        <span className=" ">·</span>{" "}
        <span className="text-gray-300">
          Digital Marketing Agency
        </span>
      </div>
        {children}</body>
    </html>
  );
}
