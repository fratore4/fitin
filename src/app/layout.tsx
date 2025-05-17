import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FitIn - Trova i mobili perfetti per il tuo spazio',
  description: 'Confronta diversi annunci di mobili online e filtra in base alle tue esigenze',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={`${inter.className} bg-cream`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
} 