import { montserrat } from './ui/fonts';
import './ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        {children}
        <footer className=' flex justify-center items-center h-20 bg-gray-800 text-white'>
          Esto es un footer
        </footer>
      </body>
    </html>
  );
}
