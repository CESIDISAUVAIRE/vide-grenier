import type { Metadata } from 'next';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vide Grenier — Collection privée',
  description:
    'Marketplace premium de pièces rares et vintage, sélectionnées avec exigence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider />
        {children}
      </body>
    </html>
  );
}