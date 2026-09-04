import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vide Grenier',
  description: 'Liste des annonces du vide grenier',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}